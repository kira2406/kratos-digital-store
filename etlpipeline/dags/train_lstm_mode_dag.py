from airflow import DAG
from airflow.providers.http.operators.http import HttpOperator
from airflow.providers.postgres.hooks.postgres import PostgresHook
from airflow.utils.task_group import TaskGroup
from datetime import datetime, timedelta
from airflow.decorators import task
import pandas as pd
from airflow.utils.dates import days_ago

# Define the default arguments for the DAG
default_args = {
    'owner': 'kushwanth',
    'start_date': days_ago(1),
}

LSTM_MODEL_CONN = 'lstm_model_conn'  # Connection ID for the LSTM model API

# Define the DAG
with DAG(
    'train_lstm_model_with_http',
    default_args=default_args,
    description='A simple DAG to trigger the LSTM training script via HTTP',
    schedule_interval=None,  # This means the DAG won't run on a schedule, only when triggered
    catchup=False,
) as dag:
    
    # game_id = "4bde6e96-2352-4c65-a61a-b5d153129f64"

    # Task to trigger the model training (GET request with no params)
    # trigger_training_task = HttpOperator(
    #     task_id=f'train_all_lstm_model_task',  # Unique task_id for the HTTP request
    #     method='GET',  # Using GET method to trigger the training
    #     http_conn_id=LSTM_MODEL_CONN,  # Connection ID for LSTM model API
    #     endpoint=f'/train_model',  # The endpoint you want to trigger
    #     response_check=lambda response: response.status_code == 200,  # Check if the response is successful
    #     log_response=True  # Log the response for debugging purposes
    # )

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
    def trigger_training(game_id):
        """Trigger training for a single game_id"""
        print("game_id", game_id)
        return HttpOperator(
            task_id=f'train_lstm_model_task_{game_id}',
            method='GET',
            http_conn_id=LSTM_MODEL_CONN,
            endpoint=f'/train_model_game?game_id={game_id}',  # Pass game_id in query params
            response_check=lambda response: response.status_code == 200,
            log_response=True
        ).execute({})
    
    game_ids = fetch_game_ids()

    trigger_training.expand(game_id=game_ids)
