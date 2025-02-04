from airflow import DAG
from airflow.providers.postgres.hooks.postgres import PostgresHook
from airflow.providers.amazon.aws.hooks.s3 import S3Hook
from airflow.decorators import task
from airflow.utils.dates import days_ago
from sklearn.preprocessing import MultiLabelBinarizer
import pandas as pd
import logging
import os

S3_BUCKET_NAME = "kp-artifacts-data"
POSTGRES_CONN_ID='postgres_local'
LOCAL_STORAGE_PATH = '/tmp/data/'
S3_FILE_PATH = "kratos/sales_data/"
AWS_CONN_ID = "aws_s3"

default_args = {
    'owner':'kushwanth',
    'start_date': days_ago(1)
}


LOG_FILE_PATH = "/tmp/data/logging/sales_data_transformation.log"  # Set your log file path here

log_dir = os.path.dirname(LOG_FILE_PATH)
if not os.path.exists(log_dir):
    os.makedirs(log_dir)

# Set up logging to file
logging.basicConfig(
    level=logging.INFO,  # Set the logging level (INFO will capture info, warnings, and errors)
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_FILE_PATH),
        logging.StreamHandler()  # Also print to console
    ]
)

with DAG(dag_id="sales_forecast_etl_pipeline",
         default_args=default_args,
         schedule_interval="@daily",
         catchup=False):
    
    @task()
    def extract_sales_data():
        pg_hook = PostgresHook(postgres_conn_id="postgres_local")
        conn = pg_hook.get_conn()
        cursor = conn.cursor()

        create_table_query = """
        CREATE TABLE IF NOT EXISTS staging_sales_data (
            username VARCHAR(255),
            title VARCHAR(255),
            release_date DATE,
            rating FLOAT,
            reviews TEXT,
            payment_method VARCHAR(50),
            unit_price DECIMAL,
            discount DECIMAL,
            quantity INT,
            created_at TIMESTAMP,
            game_id UUID,
            genres TEXT[]
        );
        """
        cursor.execute(create_table_query)
        conn.commit()

        query = """ SELECT 
                    u.username, 
                    g.title, 
                    g.release_date, 
                    g.rating, 
                    g.reviews, 
                    o.payment_method, 
                    ot.unit_price, 
                    ot.discount, 
                    ot.quantity,
                    o.created_at,
                    g.game_id,
                    ARRAY_AGG(DISTINCT c.name) AS genres
                FROM "Users" u
                JOIN "Orders" o ON u.user_id = o.user_id
                JOIN "OrderItems" ot ON o.order_id = ot.order_id
                JOIN "Games" g ON ot.game_id = g.game_id
                JOIN "GameCategories" gc ON g.game_id = gc.game_id
                JOIN "Categories" c ON gc.category_id = c.category_id
                GROUP BY u.username, g.title, g.release_date, g.rating, g.reviews, o.payment_method, ot.unit_price, ot.discount, ot.quantity, o.created_at, g.game_id;
                """  # Query for extracting sales data
        df = pd.read_sql(query, conn)

        for index, row in df.iterrows():
            insert_query = """
                INSERT INTO staging_sales_data (
                    username, title, release_date, rating, reviews, payment_method, 
                    unit_price, discount, quantity, created_at, game_id, genres
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """
            cursor.execute(insert_query, tuple(row))

        # conn = pg_hook.get_conn()
        # df.to_sql('staging_sales_data', conn, if_exists='replace', index=False)

        conn.commit()
        cursor.close()

        conn.close()
    
    @task()
    def fetch_game_ids():
        pg_hook = PostgresHook(postgres_conn_id="postgres_local")
        conn = pg_hook.get_conn()
        query = """SELECT game_id FROM "Games";"""
        
        df = pd.read_sql(query, conn)
        conn.close()
        
        # Return the list of game_ids
        return df['game_id'].tolist()
    
    @task()
    def transform_sales_data(game_ids):
        try:
            s3_hook = S3Hook(AWS_CONN_ID)

            for game_id in game_ids:
                # Setup logging
                logging.info(f"Starting transformation for game_id: {game_id}")
                
                pg_hook = PostgresHook(postgres_conn_id="postgres_local")
                conn = pg_hook.get_conn()
                
                # Fetch sales data for the current game_id
                query = f"""
                SELECT username, title, release_date, rating, reviews, payment_method, 
                    unit_price, discount, quantity, created_at, genres
                FROM staging_sales_data
                WHERE game_id = '{game_id}';
                """
                df_sales = pd.read_sql(query, conn)
                conn.close()

                if df_sales.empty:
                    logging.warning(f"No sales data found for game_id: {game_id}")
                    return f"No data found for game_id {game_id}"

                logging.info(f"Fetched data for game_id {game_id}")

                # Rename columns
                df_sales.rename(columns={
                    'username': 'user_name',
                    'title': 'game_title',
                    'release_date': 'release_date',
                    'rating': 'game_rating',
                    'reviews': 'game_review',
                    'payment_method': 'payment_type',
                    'unit_price': 'unit_price',
                    'discount': 'discount_rate',
                    'quantity': 'quantity',
                    'created_at': 'purchase_date',
                    'genres': 'game_genres'
                }, inplace=True)

                df_sales['purchase_date'] = pd.to_datetime(df_sales['purchase_date'], utc=True)
                df_sales['release_date'] = pd.to_datetime(df_sales['release_date'])

                # One-hot encoding of game genres
                mlb = MultiLabelBinarizer()
                genre_encoded = mlb.fit_transform(df_sales['game_genres'])
                genre_df = pd.DataFrame(genre_encoded, columns=mlb.classes_)

                # Attach one-hot encoded genres with sales data
                df_sales = df_sales.drop(columns=['game_genres']).join(genre_df)

                # Feature engineering for game review
                review_mapping = {'Negative': 0, 'Mostly Negative': 1, 'Mixed': 2, 'Somewhat Positive': 3, 'Very Positive': 4, 'Overwhelmingly Positive': 5}
                df_sales['game_review_encoded'] = df_sales['game_review'].map(review_mapping)

                # Adding additional features
                df_sales['days_since_release'] = (df_sales['purchase_date'].dt.date - df_sales['release_date'].dt.date).apply(lambda x: x.days)
                df_sales['launch_boost'] = (df_sales['days_since_release'] <= 7).astype(int)
                df_sales['purchase_date'] = df_sales['purchase_date'].dt.date
                df_sales['purchase_date'] = pd.to_datetime(df_sales['purchase_date'], errors='coerce')

                # Create time series data
                df_time_series = df_sales.groupby(['purchase_date', 'game_title'])['quantity'].sum().reset_index()
                df_remaining_columns = df_sales[['purchase_date', 'game_title', 'game_rating', 'unit_price', 'discount_rate', 'game_review_encoded', 'launch_boost', 'days_since_release']].drop_duplicates()
                
                df_time_series = pd.merge(df_time_series, df_remaining_columns, on=['purchase_date', 'game_title'], how='left')

                # Check if data exists after processing
                if df_time_series.empty:
                    logging.warning(f"No time series data generated for game_id: {game_id}")
                    return f"No time series data for game_id {game_id}"

                logging.info(f"Processed data for game_id {game_id}")

                # Fill missing values and sort
                df_time_series.fillna(0, inplace=True)
                df_time_series = df_time_series.sort_values(by=['purchase_date'])

                df_sales['purchase_date'] = pd.to_datetime(df_sales['purchase_date'])

                df_sales['purchase_date'] = df_sales['purchase_date'].dt.date

                df_sales['purchase_date'] = pd.to_datetime(df_sales['purchase_date'], errors='coerce')

                # Save to local file
                game_folder = os.path.join(LOCAL_STORAGE_PATH, f'game_{game_id}')
                os.makedirs(game_folder, exist_ok=True)
                file_path = os.path.join(game_folder, f'game_{game_id}_sales_data.csv')
                df_time_series.to_csv(file_path, index=False)

                s3_file_path = S3_FILE_PATH + f"{game_id}/sales_data.csv"
                s3_hook.load_file(file_path, key=s3_file_path, bucket_name=S3_BUCKET_NAME, replace=True)

                logging.info(f"Uploaded {file_path} to s3://{S3_BUCKET_NAME}/{s3_file_path}")

                os.remove(file_path)

                logging.info(f"Successfully saved data for game_id {game_id} at {file_path}")

            return f'Files uploaded to s3://{S3_BUCKET_NAME}'

        except Exception as e:
            logging.error(f"Error during transformation for game_id {game_id}: {e}")
            raise

    @task()
    def cleanup_staging_table():
        pg_hook = PostgresHook(postgres_conn_id="postgres_local")
        conn = pg_hook.get_conn()
        cursor = conn.cursor()

        drop_table_query = "DROP TABLE IF EXISTS staging_sales_data;"
        
        cursor.execute(drop_table_query)
        conn.commit()
        cursor.close()
        conn.close()

        logging.info("Dropped staging_sales_data table after DAG execution.")

    

    sales_data = extract_sales_data()

    game_ids = fetch_game_ids()

    transform_and_upload_data = transform_sales_data(game_ids)

    cleanup_table = cleanup_staging_table()

    sales_data >> game_ids >> transform_and_upload_data >> cleanup_table
