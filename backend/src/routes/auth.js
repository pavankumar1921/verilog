const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const authenticate = require("../middleware/authentication");

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "yourSecretKey";

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    console.log("signup",req.body)
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
    try{
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
          }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid email or password"})
        }
          const token = jwt.sign({ userId: user._id,email:user.email }, SECRET, { expiresIn: "1h" });
          res.json({message:"Login successful", token });
    }catch(err){
        res.status(500).json({message:"SErver error",error:err.message})
    }
  
});


router.get("/protected", authenticate, (req, res) => {
  res.json({ message: `Hello ${req.user.email}, you're authenticated!` });
});

module.exports = router;
