from airflow import DAG
from airflow.providers.http.operators.http import HttpOperator
from airflow.providers.postgres.hooks.postgres import PostgresHook
from airflow.decorators import task
import pandas as pd
from airflow.utils.dates import days_ago
import json

default_args = {
    'owner': 'kushwanth',
    'start_date': days_ago(1),
}

POSTGRES_CONN_ID='postgres_local'
LSTM_MODEL_CONN = 'lstm_model_conn'
S3_BUCKET = 'kp-artifacts-data'
S3_FILE_PATH = "kratos/sales_data/"

with DAG(dag_id='daily_sales_forecasting',
    default_args=default_args,
    schedule_interval='@daily',
    description='A simple DAG to get sales forecast for the next 60 days using the trained LSTM model',
    catchup=False,
) as dag:
    
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
    def get_inference(game_id):
        """Trigger training for a single game_id"""
        print("game_id", game_id)
        response = HttpOperator(
            task_id=f'lstm_model_predict_task_{game_id}',
            method='GET',
            http_conn_id=LSTM_MODEL_CONN,
            endpoint=f'/get_prediction?game_id={game_id}',  # Pass game_id in query params
            response_check=lambda response: response.status_code == 200,
            log_response=True
        ).execute({})

        forecast_data = json.loads(response)  # Convert JSON response to Python list

        if forecast_data.get("status") == "success":
            return {
                "game_id": game_id,
                "forecast_data": forecast_data.get("forecast")
                }
        else:
            raise ValueError(f"Failed to get forecast for game_id {game_id}: {forecast_data}")
    
    @task()
    def insert_forecasted_sales(forecast_sales):
        """Inserts the forecasted sales into PostgreSQL after clearing the existing forecasted data."""
        pg_hook = PostgresHook(postgres_conn_id=POSTGRES_CONN_ID)
        conn = pg_hook.get_conn()
        cursor = conn.cursor()

        game_id = forecast_sales['game_id']
        forecast_data = forecast_sales['forecast_data']
        
        # SQL to delete previous forecasted data for the game_id
        delete_query = """
        DELETE FROM forecasted_sales
        WHERE game_id = %s
        """
        
        # Execute the delete query to remove old forecasted sales for this game_id
        cursor.execute(delete_query, (game_id,))
        
        # SQL to insert new forecasted data
        insert_query = """
        INSERT INTO forecasted_sales (game_id, forecast_date, predicted_sales)
        VALUES (%s, %s, %s)
        """
        
        # Insert each forecasted sale (forecast_sales contains [date, predicted_sales])
        for date, prediction in forecast_data:
            cursor.execute(insert_query, (game_id, date, prediction))
        
        conn.commit()  # Commit changes to DB
        cursor.close()
        conn.close()

    game_ids = fetch_game_ids()

    forecasted_sales_list = get_inference.expand(game_id=game_ids)

    insert_forecasted_sales.expand(forecast_sales=forecasted_sales_list)

    
