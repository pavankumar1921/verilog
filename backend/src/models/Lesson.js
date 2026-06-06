const mongoose = require("mongoose");

// Each lesson has an ordered array of content blocks
// type: "text"  → value is HTML/markdown string
// type: "image" → value is uploaded file URL
// type: "video" → value is uploaded file URL
const ContentBlockSchema = new mongoose.Schema(
  {
    type:  { type: String, required: true, enum: ["text", "image", "video"] },
    value: { type: String, required: true },   // text content or file URL
    caption: { type: String, default: "" },    // optional caption for image/video
  },
  { _id: false }
);

const LessonSchema = new mongoose.Schema(
  {
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: "Module", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title:    { type: String, required: true, trim: true },
    order:    { type: Number, required: true },
    duration: { type: String, default: "" },   // e.g. "12 min"
    content:  { type: [ContentBlockSchema], default: [] },
  },
  { timestamps: true }
);

LessonSchema.index({ moduleId: 1, order: 1 });

module.exports = mongoose.model("Lesson", LessonSchema);
