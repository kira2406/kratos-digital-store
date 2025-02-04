# lstm_model.py

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dropout, Dense

def create_lstm_model(input_shape):
    model = Sequential([

        LSTM(128, return_sequences=True, input_shape=input_shape),
        Dropout(0.2),

        LSTM(128, return_sequences=True),
        Dropout(0.2),

        LSTM(128, return_sequences=False),
        Dropout(0.2),

        Dense(64, activation='relu'),
        Dense(32, activation='relu'),

        Dense(1)
    ])
    return model
