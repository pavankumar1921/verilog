const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category:    { type: String, required: true, enum: ["verilog", "systemverilog", "digital", "uvm"], lowercase: true },
    thumbnail:   { type: String, default: null },   // uploaded file URL
    level:       { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    duration:    { type: String, default: "" },      // e.g. "6 hrs"
    isPaid:      { type: Boolean, default: false },  // ready for payment later
    price:       { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
