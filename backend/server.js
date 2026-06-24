require("./src/config/env");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────
app.use("/api", require("./src/routes/auth"));
// app.use("/api", require("./src/routes/courses"));
// app.use("/api", require("./src/routes/modules"));
// app.use("/api", require("./src/routes/questions"));
// app.use("/api", require("./src/routes/submissions"));
// app.use("/api", require("./src/routes/enrollments"));
// app.use("/api", require("./src/routes/progress"));
app.use("/api", require("./src/routes/simulate"));
app.use("/api", require("./src/routes/courses"));

// ─── Static files (simulation output) ────────────────────────
app.use(
  "/simulations",
  (req,res,next)=>{
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(process.cwd(), "src", "simulations"))
);

// ─── Health check ─────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("backend running...");
});

// ─── DB + Server ──────────────────────────────────────────────
if (!process.env.MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined in env");
}

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
