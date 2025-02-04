from flask import Flask, request, jsonify
from lstm_training_script import train_models, train_model_for_game, get_prediction_60_days  # Make sure you import your model training function

app = Flask(__name__)

@app.route('/train_model', methods=['GET'])
def train_model_endpoint():
    try:
        train_models()  # Train the model
        return jsonify({'status': 'success', 'message': 'Model training and logged !'}), 200
    except Exception as e:
        return jsonify({'status': 'failure', 'message': str(e)}), 500
    
@app.route('/get_prediction', methods=['GET'])
def get_prediction_endpoint():
    try:
        game_id = request.args.get('game_id')

        if not game_id:
            return jsonify({'status': 'failure', 'message': 'Missing game_id parameter'}), 400
        
        forecast_list = get_prediction_60_days(game_id)  # Train the model


        return jsonify({'status': 'success', 'forecast': forecast_list}), 200
    except Exception as e:
        return jsonify({'status': 'failure', 'message': str(e)}), 500


@app.route('/train_model_game', methods=['GET'])
def train_model__for_game_endpoint():
    try:
        game_id = request.args.get('game_id')

        if not game_id:
            return jsonify({'status': 'failure', 'message': 'Missing game_id parameter'}), 400
        
        train_model_for_game(game_id)  # Train the model

        return jsonify({'status': 'success', 'message': 'Model training and logged !'}), 200
    except Exception as e:
        return jsonify({'status': 'failure', 'message': str(e)}), 500


@app.route('/train_model_for_game', methods=['POST'])
def train_model_game_endpoint():
    # Extract game_id from the request JSON
    data = request.get_json()
    game_id = data.get('game_id')

    if not game_id:
        return jsonify({"message": "game_id is required"}), 400

    try:
        # Trigger the model training script (for the specific game)
        train_model_for_game(game_id)

        return jsonify({'status': 'success', 'message': 'Model training and logged !'}), 200
    except Exception as e:
        return jsonify({'status': 'failure', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Expose Flask app on port 5000
