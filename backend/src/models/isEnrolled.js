const Enrollment = require("../models/Enrollment");

// Must be used after the `authenticate` middleware (req.user must exist)
module.exports = async (req, res, next) => {
  const { courseId } = req.params;
  try {
    const enrollment = await Enrollment.findOne({
      userId: req.user.userId,
      courseId,
      status: "active",
    });
    if (!enrollment) {
      return res.status(403).json({ message: "You are not enrolled in this course" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
