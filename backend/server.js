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

// Route to interact with Flask ML model
const axios = require("axios");

app.post("/api/predict", async (req, res) => {
  try {
    const flaskResponse = await axios.post("http://127.0.0.1:5001/predict", req.body);
    res.json(flaskResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Prediction service failed" });
  }
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));