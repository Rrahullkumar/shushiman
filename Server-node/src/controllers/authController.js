const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const registerUser = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      console.log("Registration request body:", { name, email, password, role });
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log("User already exists:", email);
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Password hashed successfully");
  
      const newUser = new User({ name, email, password: hashedPassword, role });
      await newUser.save();
      console.log("User saved to database:", newUser);
  
      const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
      console.log("Token generated:", token);
  
      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Login request body:", { email, password });
  
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User not found:", email);
        return res.status(400).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Invalid credentials for:", email);
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
      console.log("Token generated:", token);
  
      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

// Correct Export
module.exports = { registerUser, loginUser };
