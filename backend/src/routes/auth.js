const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authenticate = require("../middleware/authentication");
 
const router = express.Router();
const SECRET = process.env.JWT_SECRET || "yourSecretKey";
 
// POST /api/auth/signup
router.post("/auth/signup", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    if (!username) return res.status(400).json({ message: "Username is required" });
    if (!email)    return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });
 
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser)
      return res.status(400).json({ message: "Email or username already exists" });
 
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();
 
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email, role: newUser.role },
      SECRET,
      { expiresIn: "1h" }
    );
 
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
        avatar: newUser.avatar,
        xp: newUser.xp,
        coins: newUser.coins,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
 
// POST /api/auth/login
router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
 
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      SECRET,
      { expiresIn: "1h" }
    );
 
    res.json({
      message: "Login successful",
      token,
      user: {
        email: user.email,
        username: user.username,
        role: user.role,
        avatar: user.avatar,
        xp: user.xp,
        coins: user.coins,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
 
// GET /api/auth/user  — get current logged-in user profile
router.get("/auth/user", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
 
module.exports = router;