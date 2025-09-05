const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors")
const bcrypt=require("bcrypt.js");
const jwt=require("jsonwebtoken");
const axios=require("axios");
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


// ------------- User Model --------------
const userSchema=new mongoose.Schema({
  name: {type: String, required: true},
  email:{type: String, required: true, unique: true},
  password: {type: String, reuqired: true}
});
const User = mongoose.model("User", userSchema);

// -------------- Auth APIs -------------

// SignUp
app.post("/api/signup", async (req, res) => {
  try {
    const {name, email, password} = req.body;

    // check if user already exists
    const existingUser = await User.findOne({email});
    if(existingUser) return req.status(400).json({message: "User already exists"});

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const newUser = new User({name, email, password: hashedPassword});
    await newUser.save();

    res.status(201).json({message: "User Created Successfully"});
  } catch (error) {
    res.status(500).jsnon({message: "Server Error"});
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const {email, password} = req.body;

    // check user
    const user = await User.findOne((email));
    if(!user) return res.status(400).json({error: "Invalid email or password"});

    // Verify Password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({error: "Invalid email or password"});

    // generate JWT token 

    const token = jwt.sign({id: user_id}, process.env.JWT_SECRET, {
      expiresIn: "1h",});

    // send response

      res.json({message: "Login Successful", token, user: {name: user.name, email: user.email}});
  } catch (error) {
    res.status(500).json({message: "Server Error"});
  }
});

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if(!token) return res.status(401).json({error: "Token authorization denied"});

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({error: "Token is not valid"});
  }
};


// Exapmle of protected route
app.get("/api/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
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