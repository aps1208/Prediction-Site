import React, { useState } from "react";
import "./Prediction.css";

function Prediction() {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [score, setScore] = useState("");
  const [overs, setOvers] = useState("");
  const [wickets, setWickets] = useState("");
  const [prediction, setPrediction] = useState(null);

  const teams = ["India", "Pakistan", "Australia", "England", "South Africa", "Sri Lanka", "New Zealand", "Bangladesh"];

  const handlePredict = async () => {
    // 🔗 Later connect this to backend
    const winA = Math.floor(Math.random() * 100);
    const winB = 100 - winA;
    setPrediction({ teamA: winA, teamB: winB });
  };

  return (
    <div className="prediction-app">
      <div className="overlay">
        <div className="card">
          <h1>Cricket Win Predictor</h1>

          <div className="inputs">
            <select value={teamA} onChange={(e) => setTeamA(e.target.value)}>
              <option value="">Select Batting Team</option>
              {teams.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select value={teamB} onChange={(e) => setTeamB(e.target.value)}>
              <option value="">Select Bowling Team</option>
              {teams.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Score"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />

            <input
              type="number"
              placeholder="Overs Completed"
              value={overs}
              onChange={(e) => setOvers(e.target.value)}
            />

            <input
              type="number"
              placeholder="Wickets Down"
              value={wickets}
              onChange={(e) => setWickets(e.target.value)}
            />

            <button onClick={handlePredict}>Predict</button>
          </div>

          {prediction && (
            <div className="result">
              <h2>Win Prediction</h2>
              <p>{teamA}: {prediction.teamA}%</p>
              <p>{teamB}: {prediction.teamB}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prediction;
