import React, { useState } from "react";
import "./Prediction.css";

function Prediction() {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [score, setScore] = useState("");
  const [overs, setOvers] = useState("");
  const [target, setTarget] = useState("");
  const [city, setCity] = useState("");
  const [wickets, setWickets] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const teams = [
    "Mumbai Indians", "Chennai Super Kings", "Royal Challengers Bengaluru",
    "Kolkata Knight Riders", "Sunrisers Hyderabad", "Delhi Capitals",
    "Rajasthan Royals", "Punjab Kings"
  ]; 

  const venues = [
    "Bengaluru", "Mumbai", "Kolkata", "Bangalore", "Hyderabad", "Delhi", "Ranchi",
    "Chennai", "Visakhapatnam", "Sharjah", "Dharamsala", "Jaipur", "Indore",
    "Mohali", "Ahmedabad", "Chandigarh", "Raipur", "Cuttack", "Pune", "Nagpur"
  ];

  const handlePredict = async () => {
    // ✅ Validation
    if (!teamA || !teamB || !city || !target || !score || !overs || !wickets) {
      alert("Please fill all fields!");
      return;
    }

    // ✅ Overs conversion (10.3 overs -> 63 balls)
    let ballsBowled = 0;
    if (overs.includes(".")) {
      const [o, b] = overs.split(".");
      ballsBowled = parseInt(o) * 6 + parseInt(b);
    } else {
      ballsBowled = parseInt(overs) * 6;
    }

    const ballsLeft = 120 - ballsBowled; // T20 match
    const runsLeft = parseInt(target) - parseInt(score);

    const data = {
      batting_team: teamA,
      bowling_team: teamB,
      venue: city,
      runs_left: runsLeft,
      balls_left: ballsLeft,
      wickets_left: 10 - parseInt(wickets),
      total_runs_x: parseInt(target),
      crr: parseInt(score)*6/parseInt(ballsBowled),
      rrr: runsLeft*6/ballsLeft
    };

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-app">
      <div className="overlay">
        <div className="card">
          <h1>Cricket Win Predictor</h1>

          <div className="inputs">
            {/* Batting Team */}
            <select value={teamA} onChange={(e) => setTeamA(e.target.value)}>
              <option value="">Select Batting Team</option>
              {teams.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* Bowling Team */}
            <select value={teamB} onChange={(e) => setTeamB(e.target.value)}>
              <option value="">Select Bowling Team</option>
              {teams.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* Venue */}
            <select className="venue-select" value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">Select Venue</option>
              {venues.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>

            {/* Target */}
            <input
              className="target-input"
              type="number"
              placeholder="Target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />

            {/* Current Score */}
            <input
              className="score-input"
              type="number"
              placeholder="Score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />


            {/* Overs Completed */}
            <input
              type="text"
              placeholder="Overs Completed (e.g. 10.3)"
              value={overs}
              onChange={(e) => setOvers(e.target.value)}
            />

            {/* Wickets Down */}
            <input
              type="number"
              placeholder="Wickets Down"
              value={wickets}
              onChange={(e) => setWickets(e.target.value)}
            />

            <button onClick={handlePredict} disabled={loading}>
              {loading ? "Predicting..." : "Predict"}
            </button>
          </div>

          {prediction && (
            <div className="result">
              <h2>Win Prediction</h2>
              <p>{teamA || "Batting Team"}: {prediction.teamA}%</p>
              <p>{teamB || "Bowling Team"}: {prediction.teamB}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prediction;
