import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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

  const teamColors = {
  "Mumbai Indians": "#004BA0",        // Blue
  "Chennai Super Kings": "#FFD700",   // Yellow
  "Royal Challengers Bengaluru": "#DA291C", // Red
  "Kolkata Knight Riders": "#3A225D", // Purple
  "Sunrisers Hyderabad": "#FF822A",   // Orange
  "Delhi Capitals": "#2bbee3ff",        // Dark Blue
  "Rajasthan Royals": "#EA1A8E",      // Pink
  "Punjab Kings": "#dc8f8ffb"           // Red
};


  const handlePredict = async () => {
    // ✅ Validation
    if (!teamA || !teamB || !city || !target || !score || !overs || !wickets) {
      alert("Please fill all fields!");
      return;
    }

    if(teamA == teamB)
    {
      alert("Batting and Bowling teams must be different!");
      return;
    }

    if(wickets < 0 || wickets > 9)
    {
      alert("Wickets must be between 0 and 10!");
      return;
    }

    if(wickets==10 && score < target)
    {
      alert("All out! Batting team cannot win!");
      return;
    }
    if(wickets==10 && score >= target)
    {
      alert("All out! Batting team has already won!");
      return;
    }

    if(wickets<10 && overs == 20 && score < target)
    {
      alert('Inning is Over! Batting team cannot win!');
      return;
    }

    if(wickets<10 && overs == 20 && score >= target)
    {
      alert('Inning is Over! Batting team has already won!');
      return;
    }

    if(overs < 0 || overs > 20)
    {
      alert("Overs must be between 0 and 20!");
      return;
    }

    if(target <= score)
    {
      alert("Batting team has already won!");
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
        <div className="container">
          {/* Left - Prediction form */}
          <div className="card">
            <h2>Cricket Win Predictor</h2>
            <div className="inputs">
              <select value={teamA} onChange={(e) => setTeamA(e.target.value)}>
                <option value="">Select Batting Team</option>
                {teams.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>

              <select value={teamB} onChange={(e) => setTeamB(e.target.value)}>
                <option value="">Select Bowling Team</option>
                {teams.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>

              <select className="venue-select" value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">Select Venue</option>
                {venues.map((v) => <option key={v} value={v}>{v}</option>)}
              </select>

              <input className="target-input" type="number" placeholder="Target" value={target} onChange={(e) => setTarget(e.target.value)}/>

              <input className="score-input" type="number" placeholder="Score" min="0" max={target ? target - 1 : undefined} value={score} onChange={(e) => setScore(e.target.value)} required />

              <input type="number" placeholder="Overs Completed (e.g. 10.3)" min="0" max="20" step="0.1" value={overs} onChange={(e) => setOvers(e.target.value)} required />

              <input type="number" placeholder="Wickets Down" min="0" max="10" value={wickets} onChange={(e) => setWickets(e.target.value)} required />

              <button onClick={handlePredict} disabled={loading}>
                {loading ? "Predicting..." : "Predict"}
              </button>
            </div>
          </div>

          {/* Right - Results */}
          {prediction && (
  <div className="result-container">
    <h2>Win Prediction</h2>

    <div className="probabilities">
      <p>{teamA || "Batting Team"}: {prediction.teamA}%</p>
      <p>{teamB || "Bowling Team"}: {prediction.teamB}%</p>
    </div>

    {/* Pie Chart */}
    <div className="chart-container">
      <Pie
        data={{
          labels: [teamA, teamB],
          datasets: [
            {
              data: [prediction.teamA, prediction.teamB],
              backgroundColor: [
                teamColors[teamA] || "#36A2EB",
                teamColors[teamB] || "#FF6384"
              ],
              borderColor: ["#fff", "#fff"],
              borderWidth: 2,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: { color: "#fff" },
            },
          },
        }}
      />
    </div>
  </div>
)}
        </div>
      </div>
    </div>
  );
}

export default Prediction;