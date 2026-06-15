const express = require("express");
const router = express.Router();

const Course     = require("../models/Course");
const Module     = require("../models/Module");
const Lesson     = require("../models/Lesson");
const Enrollment = require("../models/Enrollment");
const authenticate = require("../middleware/authentication");
const isEnrolled   = require("../middleware/isEnrolled");

// ─────────────────────────────────────────────────────────────
// COURSES
// ─────────────────────────────────────────────────────────────

// GET /api/courses?category=verilog  — public
router.get("/courses", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isPublished: true };
    if (category) filter.category = category.toLowerCase();
    const courses = await Course.find(filter).sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/courses/:courseId  — public (single course detail)
router.get("/courses/:courseId", async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
// MODULES  (public)
// ─────────────────────────────────────────────────────────────

// GET /api/courses/:courseId/modules  — public
router.get("/courses/:courseId/modules", async (req, res) => {
  try {
    const modules = await Module.find({ courseId: req.params.courseId }).sort({ order: 1 });
    res.json(modules);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
// LESSONS
// ─────────────────────────────────────────────────────────────

// GET /api/courses/:courseId/modules/:moduleId/lessons
// Public — returns lesson list (title, duration, order) WITHOUT content
router.get("/courses/:courseId/modules/:moduleId/lessons", async (req, res) => {
  try {
    const lessons = await Lesson.find(
      { moduleId: req.params.moduleId, courseId: req.params.courseId },
      "title duration order"       // exclude content field
    ).sort({ order: 1 });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/courses/:courseId/modules/:moduleId/lessons/:lessonId
// Auth + enrolled only — full lesson with content blocks
router.get(
  "/courses/:courseId/modules/:moduleId/lessons/:lessonId",
  authenticate,
  isEnrolled,
  async (req, res) => {
    try {
      const lesson = await Lesson.findOne({
        _id: req.params.lessonId,
        moduleId: req.params.moduleId,
        courseId: req.params.courseId,
      });
      if (!lesson) return res.status(404).json({ message: "Lesson not found" });
      res.json(lesson);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

// ─────────────────────────────────────────────────────────────
// ENROLLMENT
// ─────────────────────────────────────────────────────────────

// POST /api/courses/:courseId/enroll  — auth required, free for now
router.post("/courses/:courseId/enroll", authenticate, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const existing = await Enrollment.findOne({
      userId: req.user.userId,
      courseId: req.params.courseId,
    });
    if (existing) return res.status(400).json({ message: "Already enrolled" });

    const enrollment = new Enrollment({
      userId: req.user.userId,
      courseId: req.params.courseId,
    });
    await enrollment.save();
    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET /api/courses/:courseId/enrollment  — check if current user is enrolled
router.get("/courses/:courseId/enrollment", authenticate, async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      userId: req.user.userId,
      courseId: req.params.courseId,
      status: "active",
    });
    res.json({ enrolled: !!enrollment });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// PATCH /api/courses/:courseId/lessons/:lessonId/complete — mark lesson done
router.patch(
  "/courses/:courseId/lessons/:lessonId/complete",
  authenticate,
  isEnrolled,
  async (req, res) => {
    try {
      await Enrollment.findOneAndUpdate(
        { userId: req.user.userId, courseId: req.params.courseId },
        { $addToSet: { completedLessons: req.params.lessonId } }
      );
      res.json({ message: "Lesson marked complete" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
);

module.exports = router;
