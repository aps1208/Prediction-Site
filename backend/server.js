const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Auth Routes - MOVE THIS UP BEFORE OTHER ROUTES
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes); // Changed from "/api/auth" to "/api"

app.post("/api/predict", async (req, res) => {
  try {
    const flaskResponse = await axios.post("http://127.0.0.1:5001/predict", req.body);
    res.json(flaskResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Prediction service failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));