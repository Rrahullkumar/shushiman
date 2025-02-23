const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Modified registerUser function
const registerUser = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      
      // Validate required fields
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      // Case-insensitive email search
      const existingUser = await User.findOne({ 
        email: { $regex: new RegExp(email, "i") }
      });
  
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role || "customer"
      });
  
      const token = jwt.sign(
        { id: newUser._id, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(201).json({
        message: "User registered successfully",
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email }
      });
  
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ 
        message: "Server error",
        error: error.message 
      });
    }
  };
  
  // Modified loginUser function
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }
  
      const user = await User.findOne({ 
        email: { $regex: new RegExp(email, "i") }
      });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.json({
        message: "Login successful",
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
  
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ 
        message: "Server error",
        error: error.message 
      });
    }
  };

// Correct Export
module.exports = { registerUser, loginUser };
