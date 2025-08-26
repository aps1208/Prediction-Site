const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors")
require("dotenv").config();

const app=express();
app.use(cors());
app.use(express.json());

// Basic Route
app.get("/", (req, res) =>{
  res.send("Backend is running and mongo db is connected");
});

app.get("/api/test", (req, res)=> {
  res.json({ message: "Backend is working"});
});

app.post("/api/predict", (req, res) => {
  const {teamA, teamB } = req.body;
  res.json({winner: teamA});
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));