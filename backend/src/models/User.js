const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: { type: String, default: null },
    xp: { type: Number, default: 0 },
    coins: { type: Number, default: 0 },
    rank: { type: Number, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
