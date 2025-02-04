from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam
import numpy as np
import pandas as pd
import boto3
import io
import os
from lstm_model import create_lstm_model
import joblib

s3 = boto3.client('s3')

bucket_name = 'kp-artifacts-data'

def fetch_game_data_from_s3(game_id):
    """
    Fetches the CSV data from S3 for a specific game based on game_id.
    """
    # Define the file path for the game CSV
    file_key = f'kratos/sales_data/{game_id}/sales_data.csv'

    # Fetch the file from S3
    obj = s3.get_object(Bucket=bucket_name, Key=file_key)
    data = pd.read_csv(io.BytesIO(obj['Body'].read()))

    return data

def fetch_model_weights_from_s3(game_id, model):

    # S3 file path
    file_key = f'kratos/models/{game_id}/model_weights.h5'
    local_model_path = f'/tmp/{game_id}_model_weights.h5' 

    # Download from S3
    s3.download_file(bucket_name, file_key, local_model_path)

    # Load weights into model
    model.load_weights(local_model_path)

    # Cleanup
    os.remove(local_model_path)

    return model

# def model_predict(game_id, df_sales):


def train_model(game_id, df_sales):

    print("df_sales", len(df_sales))

    df_time_series = df_sales.groupby(['purchase_date', 'game_title'])[["quantity"]].sum().reset_index()

    df_remaining_columns = df_sales[['purchase_date', 'game_title','game_rating', 'unit_price', 'discount_rate', 'game_review_encoded', 'launch_boost', 'days_since_release']].drop_duplicates()

    df_time_series = pd.merge(df_time_series, df_remaining_columns, on=['purchase_date', 'game_title'], how='left')

    print(df_time_series.head())

    def create_sequences(X, y, seq_length=7):
        X_seq, y_seq = [], []
        for i in range(len(X) - seq_length):
            X_seq.append(X[i:i+seq_length])
            y_seq.append(y[i+seq_length])
        
        return np.array(X_seq), np.array(y_seq)

    train_size = int(len(df_time_series) * 0.8)
    train, test = df_time_series[:train_size], df_time_series[train_size:]
    
    n_timesteps = 20

    # Initialize scaler
    scaler_X = MinMaxScaler()
    scaler_y = MinMaxScaler()

    X_train, y_train = train.drop(columns=['quantity', 'purchase_date', 'game_title']), train['quantity']
    X_test, y_test = test.drop(columns=['quantity', 'purchase_date', 'game_title']), test['quantity']

    # Scale the data (already shown earlier)
    X_train_scaled = scaler_X.fit_transform(X_train)
    X_test_scaled = scaler_X.transform(X_test)
    y_train_scaled = scaler_y.fit_transform(y_train.values.reshape(-1, 1))
    y_test_scaled = scaler_y.transform(y_test.values.reshape(-1, 1))

    # Create sequences for LSTM input
    X_train_seq, y_train_seq = create_sequences(X_train_scaled, y_train_scaled, n_timesteps)
    X_test_seq, y_test_seq = create_sequences(X_test_scaled, y_test_scaled, n_timesteps)

    # Reshape X to (samples, time steps, features)
    X_train_seq = np.reshape(X_train_seq, (X_train_seq.shape[0], X_train_seq.shape[1], X_train_seq.shape[2]))
    X_test_seq = np.reshape(X_test_seq, (X_test_seq.shape[0], X_test_seq.shape[1], X_test_seq.shape[2]))

    input_shape = (X_train_seq.shape[1], X_train_seq.shape[2])

    model = create_lstm_model(input_shape)

    model.compile(optimizer=Adam(), loss='mean_squared_error')
    model.fit(X_train_seq, y_train_seq, epochs=100, batch_size=16, validation_data=(X_test_seq, y_test_seq))

    loss = model.evaluate(X_test_seq, y_test_seq)
    print(f"Test Loss: {loss}")

    y_pred = model.predict(X_test_seq)

    # Print the first 10 predicted values
    print(f"Predicted values (first 10): {y_pred[:10].flatten()}")
    print(f"Actual values (first 10): {y_test_seq[:10]}")

    model_weights_path = f'/tmp/{game_id}_model_weights.h5'
    model.save_weights(model_weights_path)

    joblib.dump(scaler_X, f"/tmp/{game_id}_scaler_X.pkl")
    joblib.dump(scaler_y, f"/tmp/{game_id}_scaler_y.pkl")

    s3_key = f'kratos/models/{game_id}/model_weights.h5'
    with open(model_weights_path, 'rb') as data:
        s3.upload_fileobj(data, bucket_name, s3_key)

    s3.upload_file(f"/tmp/{game_id}_scaler_X.pkl", bucket_name, f'kratos/models/{game_id}/scaler_X.pkl')
    s3.upload_file(f"/tmp/{game_id}_scaler_y.pkl", bucket_name, f'kratos/models/{game_id}/scaler_y.pkl')

    print("pickle files", f"/tmp/{game_id}_scaler_X.pkl")

    # Clean up the local weights file
    os.remove(model_weights_path)
    os.remove(f"/tmp/{game_id}_scaler_X.pkl")
    os.remove(f"/tmp/{game_id}_scaler_y.pkl")

def train_models():
    """
    Function to loop through all the game CSVs in the S3 bucket and train a model for each game.
    """
    # List the game IDs from S3 bucket
    response = s3.list_objects_v2(Bucket=bucket_name, Prefix='kratos/sales_data/', Delimiter='/')

    game_folders = [folder['Prefix'] for folder in response.get('CommonPrefixes', [])]

    print("game_folders", game_folders)

    for folder in game_folders:
        game_id = folder.split('/')[-2]  # Extract game_id from folder name
        
        # Fetch the data for the current game
        print(f"Fetching data {game_id}")
        game_data = fetch_game_data_from_s3(game_id)
        
        # Train the model for the current game
        print(f"Training model {game_id}")
        train_model(game_id, game_data)

def load_lstm_model(input_shape, game_id):
    """ Load LSTM model architecture and apply trained weights """
    model = create_lstm_model(input_shape)  # Ensure this function is defined
    model_weights_path = f'/tmp/{game_id}_model_weights.h5'

    # Download model weights from S3
    s3.download_file(bucket_name, f'kratos/models/{game_id}/model_weights.h5', model_weights_path)
    model.load_weights(model_weights_path)

    return model

def make_prediction_60_days(game_id, df_sales):

    df_time_series = df_sales.groupby(['purchase_date', 'game_title'])[["quantity"]].sum().reset_index()

    df_remaining_columns = df_sales[['purchase_date', 'game_title','game_rating', 'unit_price', 'discount_rate', 'game_review_encoded', 'launch_boost', 'days_since_release']].drop_duplicates()

    df_time_series = pd.merge(df_time_series, df_remaining_columns, on=['purchase_date', 'game_title'], how='left')

    last_20_days = df_time_series.iloc[-20:].drop(columns=['quantity','purchase_date', 'game_title'])

    print("last_20_days", last_20_days.columns)

    # Initialize scaler
    s3.download_file(bucket_name, f'kratos/models/{game_id}/scaler_X.pkl', "/tmp/{game_id}_scaler_X.pkl")
    s3.download_file(bucket_name, f'kratos/models/{game_id}/scaler_y.pkl', "/tmp/{game_id}_scaler_y.pkl")

    # Load scalers
    scaler_X = joblib.load("/tmp/{game_id}_scaler_X.pkl")
    scaler_y = joblib.load("/tmp/{game_id}_scaler_y.pkl")

    
    X_input = scaler_X.transform(last_20_days)

    X_input = X_input.reshape(1, X_input.shape[0], X_input.shape[1])

    days_since_release = X_input[0, -1, -1]

    # Create sequences for LSTM input
    model = load_lstm_model((20, X_input.shape[2]), game_id)

    predictions = []
    for _ in range(30):
        y_pred_scaled = model.predict(X_input)
        # Convert back to original scale
        y_pred = scaler_y.inverse_transform(y_pred_scaled)[0][0]

        predictions.append(y_pred)

        X_input = np.roll(X_input, shift=-1, axis=1)
        X_input[0, -1, :-1] = X_input[0, -2, :-1]
        X_input[0, -1, -1] = days_since_release + 1
        X_input[0, -1, -2] = y_pred

        days_since_release += 1


    last_date = pd.to_datetime(df_time_series['purchase_date']).max()
    next_date = last_date + pd.Timedelta(days=1)  

    next_date_str = next_date.strftime('%Y-%m-%d')

    forecast_dates = pd.date_range(next_date_str, periods=30)

    forecast_list = [[str(date.date()), round(float(pred))] for date, pred in zip(forecast_dates, predictions)]
    
    return forecast_list

    
def train_model_for_game(game_id):

    print(f"Fetching data {game_id}")
    game_data = fetch_game_data_from_s3(game_id)

    print(f"Training model {game_id}")
    train_model(game_id, game_data)

def get_prediction_60_days(game_id):

    print(f"Fetching data for game {game_id}")
    game_data = fetch_game_data_from_s3(game_id)

    print(f"Forecasting sales for game {game_id}")
    forecast_list = make_prediction_60_days(game_id, game_data)
    return forecast_list







# train_models()