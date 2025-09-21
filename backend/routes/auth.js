const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => { // Fixed: req instead of requestAnimationFrame
  try {
    const { username, email, password } = req.body; // Fixed: username instead of name
    
    console.log('Signup request received:', { username, email }); // Debug log
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" }); // Fixed typo
    
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10); // Fixed typo
    
    // Create new user
    const newUser = new User({ name: username, email, password: hashedPassword }); // Fixed: map username to name
    await newUser.save();
    
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.error('Signup error:', error); // Debug log
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login request received:', { email }); // Debug log
    
    // Find User
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Invalid Credentials" });
    
    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password); // Fixed: user.password instead of user.passowrd
    if (!isMatch) return res.status(404).json({ message: "Invalid Credentials" });
    
    // Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" }); // Fixed: user._id instead of user_id
    
    res.json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error); // Debug log
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;