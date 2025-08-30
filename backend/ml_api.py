from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS  # ✅ allow React to call Flask

app = Flask(__name__)
CORS(app)

# Load the trained model
model = joblib.load(r"C:\Users\aman2\Desktop\Cricket-Win-Predictor\backend\winpredictor.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    batting_team = data["batting_team"]
    bowling_team = data["bowling_team"]
    venue = data["venue"]
    runs_left = data["runs_left"]
    balls_left = data["balls_left"]
    wickets_left = data["wickets_left"]
    target = data["total_runs_x"]
    crr=data["crr"]
    rrr=data["rrr"]

    # Make features
    input_df = pd.DataFrame([{
        "batting_team": batting_team,
        "bowling_team": bowling_team,
        "city": venue,
        "runs_left": runs_left,
        "balls_left": balls_left,
        "wickets_left": wickets_left,
        "total_runs_x": target,
        "crr": crr,
        "rrr": rrr
    }])

    # Predict probabilities
    win_prob = model.predict_proba(input_df)[0]

    response = {
        "teamA": round(win_prob[1] * 100, 2),  # Batting team win %
        "teamB": round(win_prob[0] * 100, 2)   # Bowling team win %
    }
    return jsonify(response)


if __name__ == "__main__":
    app.run(port=5001, debug=True)
