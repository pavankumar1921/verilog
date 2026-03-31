import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
  useTheme,
  type Theme,
} from "@mui/material";
import AnimatedTable from "../../components/AnimatedTable";
import { useLocation } from "react-router-dom";
import "../../App.css";

const Homepage: React.FC = () => {
  const theme: Theme = useTheme();
  const words = ["Climb", "Explore", "Master", "Advance"];
  const [wordIndex, setWordIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const location = useLocation();
  const [showSnackbar, setShowSnackbar] = useState(
    (location.state as any)?.showSuccess || false
  );

  useEffect(() => {
    const currentWord = words[wordIndex];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && charIndex <= currentWord.length) {
      t = setTimeout(() => {
        setTyped(currentWord.substring(0, charIndex));
        setCharIndex((c) => c + 1);
      }, 150);
    } else if (deleting && charIndex >= 0) {
      t = setTimeout(() => {
        setTyped(currentWord.substring(0, charIndex));
        setCharIndex((c) => c - 1);
      }, 75);
    } else if (!deleting && charIndex > currentWord.length) {
      t = setTimeout(() => setDeleting(true), 1000);
    } else if (deleting && charIndex < 0) {
      setDeleting(false);
      setWordIndex((p) => (p + 1) % words.length);
      setCharIndex(0);
    }
    return () => clearTimeout(t);
  }, [charIndex, deleting, wordIndex]);

  const questions = [
    { id: 1, title: "Half Adder Design", difficulty: "Easy", points: 100, category: "Combinational", solved: 1234 },
    { id: 2, title: "Full Adder Design", difficulty: "Easy", points: 150, category: "Combinational", solved: 987 },
    { id: 3, title: "4-bit Counter", difficulty: "Medium", points: 200, category: "Sequential", solved: 756 },
    { id: 4, title: "Traffic Light FSM", difficulty: "Medium", points: 250, category: "FSM", solved: 543 },
    { id: 5, title: "UART Transmitter", difficulty: "Hard", points: 400, category: "Protocol", solved: 234 },
    { id: 6, title: "Mini ALU Design", difficulty: "Hard", points: 500, category: "Datapath", solved: 189 },
  ];

  const courses = [
    { id: 1, title: "Verilog Fundamentals", level: "Beginner", lessons: 24, duration: "8 hrs", image: "🎯", color: "#10b981" },
    { id: 2, title: "Combinational Circuits", level: "Beginner", lessons: 18, duration: "6 hrs", image: "⚡", color: "#3b82f6" },
    { id: 3, title: "Sequential Logic Design", level: "Intermediate", lessons: 32, duration: "12 hrs", image: "🔄", color: "#8b5cf6" },
    { id: 4, title: "FSM Design Patterns", level: "Intermediate", lessons: 28, duration: "10 hrs", image: "🎛️", color: "#f59e0b" },
    { id: 5, title: "Advanced Datapaths", level: "Advanced", lessons: 36, duration: "15 hrs", image: "🚀", color: "#ef4444" },
    { id: 6, title: "Protocol Implementation", level: "Advanced", lessons: 42, duration: "18 hrs", image: "📡", color: "#06b6d4" },
  ];

  const getDifficultyColor = (diff: string) => {
    if (diff === "Easy") return { bg: "#10b98120", color: "#10b981" };
    if (diff === "Medium") return { bg: "#f59e0b20", color: "#f59e0b" };
    return { bg: "#ef444420", color: "#ef4444" };
  };

  const getLevelColor = (level: string) => {
    if (level === "Beginner") return "#10b981";
    if (level === "Intermediate") return "#f59e0b";
    return "#ef4444";
  };

  return (
    <main
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {/* Section 0 (Hero) - UNCHANGED */}
      <section
        id="hero"
        data-snap
        className="min-h-[100svh] w-full flex items-center px-6 md:px-16"
      >
        <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl gap-24 mx-auto">
          <div className="w-full md:w-1/2 space-y-6">
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Welcome to <span style={{ color: "limegreen" }}>S</span>ilicon
              <span style={{ color: "limegreen" }}>S</span>andbox
            </Typography>

            <Typography variant="h4" fontWeight="medium" gutterBottom>
              <span
                style={{
                  borderRight: "20px solid",
                  paddingRight: 4,
                  color: "limegreen",
                  fontFamily: "monospace",
                }}
              >
                {typed}
              </span>{" "}
              through levels of logic design
            </Typography>

            <Typography variant="body1" paragraph>
              We provide top-quality courses and interview support to help you
              achieve your career goals.
              <br />
              Explore our resources and start learning today with expert mentorship
              and real-world projects.
            </Typography>

            <Stack direction="row" spacing={2} mt={2}>
              <Button variant="contained" color="primary" size="large">
                Browse Courses
              </Button>
              <Button variant="outlined" color="primary" size="large">
                Start Practicing
              </Button>
            </Stack>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <AnimatedTable />
          </div>
        </div>

        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          sx={{ mt: 2, position: "fixed" }}
        >
          <Alert
            severity="success"
            sx={{ width: "100%", fontSize: "1rem", py: 1.5, px: 4, borderRadius: 2 }}
          >
            ✅ Signed in successfully.
          </Alert>
        </Snackbar>
      </section>

      {/* Section 1 - Practice Questions */}
      <section
        id="sec1"
        data-snap
        className="min-h-[100svh] w-full py-16 px-6 md:px-16"
        style={{ background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.mode === 'dark' ? '#0a1628' : '#f0fdf4'} 100%)` }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Typography variant="overline" sx={{ color: "limegreen", letterSpacing: 3, fontWeight: 600 }}>
              PRACTICE & COMPETE
            </Typography>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mt: 1 }}>
              Featured <span style={{ color: "limegreen" }}>Challenges</span>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
              Sharpen your Verilog skills with hands-on problems ranging from basic gates to complex protocols
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questions.map((q) => (
              <div
                key={q.id}
                className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
                style={{
                  background: theme.palette.mode === 'dark' 
                    ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' 
                    : 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#e2e8f0'}`,
                }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10" style={{
                  background: `radial-gradient(circle, limegreen 0%, transparent 70%)`,
                }}/>
                
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: getDifficultyColor(q.difficulty).bg, color: getDifficultyColor(q.difficulty).color }}
                  >
                    {q.difficulty}
                  </span>
                  <span className="text-sm font-bold" style={{ color: "limegreen" }}>
                    +{q.points} pts
                  </span>
                </div>

                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {q.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Category: {q.category}
                </Typography>

                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: theme.palette.text.secondary }}>
                    👥 {q.solved} solved
                  </span>
                  <Button
                    size="small"
                    sx={{
                      color: "limegreen",
                      "&:hover": { backgroundColor: "rgba(50, 205, 50, 0.1)" },
                    }}
                  >
                    Solve →
                  </Button>
                </div>

                <div
                  className="absolute bottom-0 left-0 h-1 transition-all duration-300 group-hover:w-full"
                  style={{ width: "0%", backgroundColor: "limegreen" }}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "limegreen",
                color: "limegreen",
                px: 4,
                "&:hover": { borderColor: "limegreen", backgroundColor: "rgba(50, 205, 50, 0.1)" },
              }}
            >
              View All Challenges
            </Button>
          </div>
        </div>
      </section>

      {/* Section 2 - Courses with Horizontal Scroll */}
      <section
        id="sec2"
        data-snap
        className="min-h-[100svh] w-full py-16 px-6 md:px-16"
        style={{ background: theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Typography variant="overline" sx={{ color: "limegreen", letterSpacing: 3, fontWeight: 600 }}>
              STRUCTURED LEARNING
            </Typography>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mt: 1 }}>
              Expert-Led <span style={{ color: "limegreen" }}>Courses</span>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
              From fundamentals to advanced protocols, master VLSI design with our comprehensive curriculum
            </Typography>
          </div>

          <div 
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide"
            style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                className="flex-shrink-0 w-80 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
                style={{
                  scrollSnapAlign: "start",
                  background: theme.palette.mode === 'dark' 
                    ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' 
                    : '#ffffff',
                  border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#e2e8f0'}`,
                }}
              >
                <div 
                  className="h-32 flex items-center justify-center text-6xl"
                  style={{ background: `linear-gradient(135deg, ${course.color}20 0%, ${course.color}40 100%)` }}
                >
                  {course.image}
                </div>
                
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="px-2 py-0.5 rounded text-xs font-semibold"
                      style={{ backgroundColor: `${getLevelColor(course.level)}20`, color: getLevelColor(course.level) }}
                    >
                      {course.level}
                    </span>
                  </div>
                  
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {course.title}
                  </Typography>
                  
                  <div className="flex items-center gap-4 text-sm" style={{ color: theme.palette.text.secondary }}>
                    <span>📚 {course.lessons} lessons</span>
                    <span>⏱️ {course.duration}</span>
                  </div>
                  
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      backgroundColor: course.color,
                      "&:hover": { backgroundColor: course.color, filter: "brightness(1.1)" },
                    }}
                  >
                    Start Learning
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Typography variant="body2" color="text.secondary">
              ← Scroll to explore more courses →
            </Typography>
          </div>
        </div>
      </section>

      {/* Section 3 - About VLSI & Application */}
      <section
        id="sec3"
        data-snap
        className="min-h-[100svh] w-full py-16 px-6 md:px-16"
        style={{ background: `linear-gradient(180deg, ${theme.palette.mode === 'dark' ? '#0a1628' : '#f0fdf4'} 0%, ${theme.palette.background.default} 100%)` }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Typography variant="overline" sx={{ color: "limegreen", letterSpacing: 3, fontWeight: 600 }}>
              WHY CoreBugs
            </Typography>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mt: 1 }}>
              Your Gateway to <span style={{ color: "limegreen" }}>VLSI Excellence</span>
            </Typography>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                What is VLSI Design?
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Very Large Scale Integration (VLSI) is the process of creating integrated circuits by combining millions of transistors into a single chip. It's the backbone of modern electronics - from smartphones to supercomputers.
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Mastering Verilog HDL opens doors to careers in semiconductor companies, FPGA development, ASIC design, and cutting-edge technology firms worldwide.
              </Typography>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🎯", title: "Interactive Coding", desc: "Write, simulate, and debug Verilog in real-time" },
                { icon: "📊", title: "Waveform Viewer", desc: "Visualize signal behavior with VCD analysis" },
                { icon: "🏆", title: "Gamified Learning", desc: "Earn points, badges, and climb leaderboards" },
                { icon: "💼", title: "Interview Prep", desc: "Practice real VLSI interview questions" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: theme.palette.mode === 'dark' 
                      ? 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)' 
                      : '#ffffff',
                    border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#e2e8f0'}`,
                  }}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-2xl p-8 md:p-12"
            style={{
              background: `linear-gradient(135deg, rgba(50, 205, 50, 0.1) 0%, rgba(50, 205, 50, 0.05) 100%)`,
              border: "1px solid rgba(50, 205, 50, 0.3)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "500+", label: "Coding Challenges" },
                { value: "50+", label: "Courses & Tracks" },
                { value: "10K+", label: "Active Learners" },
                { value: "95%", label: "Success Rate" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <Typography variant="h3" fontWeight="bold" sx={{ color: "limegreen" }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Ready to Start Your VLSI Journey?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: "auto" }}>
              Join thousands of engineers mastering digital design with CoreBugs
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "limegreen",
                  color: "#000",
                  px: 4,
                  "&:hover": { backgroundColor: "#22c55e" },
                }}
              >
                Get Started Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "limegreen",
                  color: "limegreen",
                  px: 4,
                  "&:hover": { borderColor: "limegreen", backgroundColor: "rgba(50, 205, 50, 0.1)" },
                }}
              >
                Explore Features
              </Button>
            </Stack>
          </div>
        </div>
      </section>

      <div data-snap-end />
    </main>
  );
};

export default Homepage;
