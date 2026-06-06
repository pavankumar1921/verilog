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

// PUT /api/auth/profile  — update email, avatar, or password
router.put("/auth/profile", authenticate, async (req, res) => {
  const { email, avatar, currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (email && email !== user.email) {
      const taken = await User.findOne({ email });
      if (taken) return res.status(400).json({ message: "Email already in use" });
      user.email = email;
    }

    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    if (newPassword) {
      if (!currentPassword)
        return res.status(400).json({ message: "Current password is required" });
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Current password is incorrect" });
      if (newPassword.length < 6)
        return res.status(400).json({ message: "New password must be at least 6 characters" });
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    res.json({
      email: user.email,
      username: user.username,
      role: user.role,
      avatar: user.avatar,
      xp: user.xp,
      coins: user.coins,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/admin/users  — admin only: list all users
router.get("/admin/users", authenticate, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin access required" });
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;