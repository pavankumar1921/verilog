require("./src/config/env");
const mongoose = require("mongoose");
const Course     = require("./src/models/Course");
const Module     = require("./src/models/Module");
const Lesson     = require("./src/models/Lesson");
const Enrollment = require("./src/models/Enrollment");
const User       = require("./src/models/User");
 
async function seed() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("✅ Connected to MongoDB");
 
  // Clear existing data
  await Promise.all([
    Course.deleteMany({}),
    Module.deleteMany({}),
    Lesson.deleteMany({}),
    Enrollment.deleteMany({}),
  ]);
  console.log("🗑️  Cleared existing course data");
 
  // ─────────────────────────────────────────────
  // COURSES
  // ─────────────────────────────────────────────
  const courses = await Course.insertMany([
    // VERILOG
    {
      title: "Verilog Basics",
      description: "Start from zero — learn Verilog syntax, data types, and basic combinational design.",
      category: "verilog",
      level: "Beginner",
      duration: "6 hrs",
      isPublished: true,
    },
    {
      title: "Advanced Verilog",
      description: "Deep dive into FSMs, parameterized modules, and synthesis-ready code.",
      category: "verilog",
      level: "Advanced",
      duration: "10 hrs",
      isPublished: true,
    },
    // SYSTEMVERILOG
    {
      title: "SystemVerilog for Design",
      description: "Understand interfaces, packages, and the enhancements SV brings to RTL design.",
      category: "systemverilog",
      level: "Intermediate",
      duration: "8 hrs",
      isPublished: true,
    },
    {
      title: "SystemVerilog for Verification",
      description: "Constrained random, covergroups, assertions — everything for a verification engineer.",
      category: "systemverilog",
      level: "Advanced",
      duration: "12 hrs",
      isPublished: true,
    },
    // DIGITAL
    {
      title: "Digital Logic Fundamentals",
      description: "Boolean algebra, logic gates, Karnaugh maps, and combinational circuits.",
      category: "digital",
      level: "Beginner",
      duration: "5 hrs",
      isPublished: true,
    },
    {
      title: "Sequential Logic Design",
      description: "Flip-flops, latches, counters, shift registers, and synchronous design practices.",
      category: "digital",
      level: "Intermediate",
      duration: "7 hrs",
      isPublished: true,
    },
    // UVM
    {
      title: "UVM Fundamentals",
      description: "Build your first UVM testbench — agents, sequences, scoreboards from scratch.",
      category: "uvm",
      level: "Intermediate",
      duration: "10 hrs",
      isPublished: true,
    },
    {
      title: "Advanced UVM Techniques",
      description: "Factory overrides, RAL model, virtual sequences, and reusable VIPs.",
      category: "uvm",
      level: "Advanced",
      duration: "14 hrs",
      isPublished: true,
    },
  ]);
  console.log(`📚 Created ${courses.length} courses`);
 
  // ─────────────────────────────────────────────
  // MODULES  (3 per course for brevity)
  // ─────────────────────────────────────────────
  const allModules = [];
 
  for (const course of courses) {
    const mods = await Module.insertMany([
      { courseId: course._id, title: "Introduction & Setup",           order: 1 },
      { courseId: course._id, title: "Core Concepts",                  order: 2 },
      { courseId: course._id, title: "Hands-on Practice & Projects",   order: 3 },
    ]);
    allModules.push(...mods);
  }
  console.log(`📦 Created ${allModules.length} modules`);
 
  // ─────────────────────────────────────────────
  // LESSONS  (3 per module, mixed content blocks)
  // ─────────────────────────────────────────────
  const allLessons = [];
 
  for (const mod of allModules) {
    const lessons = await Lesson.insertMany([
      {
        moduleId: mod._id,
        courseId: mod.courseId,
        title: "Overview & Goals",
        order: 1,
        duration: "8 min",
        content: [
          {
            type: "text",
            value: `<h2>Welcome to ${mod.title}</h2>
<p>In this lesson we cover the big picture of what you'll learn and why it matters in real VLSI design workflows.</p>
<p>By the end of this module you will be comfortable reading and writing industry-standard code for this topic.</p>`,
          },
          {
            type: "image",
            value: "https://placehold.co/800x400/1e293b/10b981?text=Module+Overview",
            caption: "High-level view of the module structure",
          },
        ],
      },
      {
        moduleId: mod._id,
        courseId: mod.courseId,
        title: "Key Theory Explained",
        order: 2,
        duration: "14 min",
        content: [
          {
            type: "text",
            value: `<h2>Theory Deep Dive</h2>
<p>This lesson walks through the foundational theory with annotated examples. Pay close attention to the timing diagrams shown in the video below — they appear frequently in interviews.</p>
<ul>
  <li>Concept A — why it exists</li>
  <li>Concept B — how it works</li>
  <li>Concept C — when to use it</li>
</ul>`,
          },
          {
            type: "video",
            value: "https://www.w3schools.com/html/mov_bbb.mp4",
            caption: "Walkthrough: timing diagrams and waveforms",
          },
          {
            type: "text",
            value: `<h3>Summary</h3>
<p>Key takeaways: always consider setup and hold time constraints when placing flip-flops in your design. We will build on this in the next lesson.</p>`,
          },
        ],
      },
      {
        moduleId: mod._id,
        courseId: mod.courseId,
        title: "Coding Exercise",
        order: 3,
        duration: "20 min",
        content: [
          {
            type: "text",
            value: `<h2>Hands-on Exercise</h2>
<p>Open the Coding Playground and implement the following design. Use the testbench provided to verify your output.</p>
<pre style="background:#0f172a;padding:1rem;border-radius:8px;overflow:auto"><code>module example (
  input  clk, rst,
  output reg q
);
  always @(posedge clk or posedge rst)
    if (rst) q <= 0;
    else     q <= ~q;
endmodule</code></pre>
<p>Extend this to a 4-bit version and verify with a testbench.</p>`,
          },
          {
            type: "image",
            value: "https://placehold.co/800x300/0f172a/10b981?text=Expected+Waveform",
            caption: "Expected output waveform for the exercise",
          },
          {
            type: "text",
            value: `<h3>Checklist before moving on</h3>
<ul>
  <li>✅ Does your module compile without errors?</li>
  <li>✅ Does the waveform match the expected output?</li>
  <li>✅ Have you handled the reset correctly?</li>
</ul>`,
          },
        ],
      },
    ]);
    allLessons.push(...lessons);
  }
  console.log(`📝 Created ${allLessons.length} lessons`);
 
  // ─────────────────────────────────────────────
  // OPTIONAL — enroll the first user (if one exists) in the first course
  // ─────────────────────────────────────────────
  const firstUser = await User.findOne();
  if (firstUser) {
    await Enrollment.create({
      userId: firstUser._id,
      courseId: courses[0]._id,
      status: "active",
    });
    console.log(`🎓 Enrolled user "${firstUser.email}" in "${courses[0].title}"`);
  } else {
    console.log("ℹ️  No users found — skipping enrollment. Sign up first, then re-run to enroll.");
  }
 
  console.log("\n✅ Seed complete!");
  console.log("   Categories seeded: verilog, systemverilog, digital, uvm");
  console.log(`   Courses: ${courses.length}  |  Modules: ${allModules.length}  |  Lessons: ${allLessons.length}`);
  await mongoose.disconnect();
  process.exit(0);
}
 
seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});