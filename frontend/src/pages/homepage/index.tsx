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

  return (
    <main
      // Let the page (body) scroll; no inner scroll container here
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {/* Section 0 (Hero) */}
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

        {/* Snackbar floats above content; fine with document scroll */}
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

      {/* Section 1 */}
      <section id="sec1" data-snap className="firstSection min-h-[100svh] w-full">
        <div className="topSection">
          <h1>🚀 Welcome to Section 1</h1>
          <p>This is styled with grid background, padding, and flex centering.</p>
        </div>
        <div className="bottomSection">
          <img
            className="w-full h-full object-cover"
            src="https://cdn.codechef.com/images/homepage/course-banner.avif"
            alt="Banner 1"
          />
        </div>
      </section>

      {/* Section 2 */}
      <section id="sec2" data-snap className="secondSection min-h-[100svh] w-full">
        <div className="topSection">
          <h1>🔥 This is Section 2</h1>
          <p>Content inside topSection, styled same as Section 1.</p>
        </div>
        <div className="bottomSection">
          <img
            className="w-full h-full object-cover"
            src="https://cdn.codechef.com/images/homepage/course-banner.avif"
            alt="Banner 2"
          />
        </div>
      </section>

      {/* Section 3 */}
      <section id="sec3" data-snap className="thirdSection min-h-[100svh] w-full">
        <div className="topSection">
          <h1>💡 Section 3</h1>
          <p>You can add text, buttons, or images here.</p>
        </div>
        <div className="bottomSection">
          <img
            className="w-full h-full object-cover"
            src="https://cdn.codechef.com/images/homepage/course-banner.avif"
            alt="Banner 3"
          />
        </div>
      </section>

      {/* Footer will be rendered by App.tsx; we just give the page an end snap */}
      <div data-snap-end />
    </main>
  );
};

export default Homepage;

// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Button,
//   Stack,
//   Snackbar,
//   Alert,
//   useTheme,
//   type Theme,
// } from "@mui/material";
// import AnimatedTable from "../../components/AnimatedTable";
// import { useLocation } from "react-router-dom";

// const Homepage: React.FC = () => {
//   const theme: Theme = useTheme();
//   const words: string[] = ["Climb", "Explore", "Master", "Advance"];
//   const [wordIndex, setWordIndex] = useState<number>(0);
//   const [typed, setTyped] = useState<string>("");
//   const [charIndex, setCharIndex] = useState<number>(0);
//   const [deleting, setDeleting] = useState<boolean>(false);
//   const location = useLocation();
//   const [showSnackbar, setShowSnackbar] = useState(location.state?.showSuccess || false);


//   useEffect(() => {
//     const currentWord = words[wordIndex];
//     let timeout: ReturnType<typeof setTimeout>;

//     if (!deleting && charIndex <= currentWord.length) {
//       timeout = setTimeout(() => {
//         setTyped(currentWord.substring(0, charIndex));
//         setCharIndex(charIndex + 1);
//       }, 150);
//     } else if (deleting && charIndex >= 0) {
//       timeout = setTimeout(() => {
//         setTyped(currentWord.substring(0, charIndex));
//         setCharIndex(charIndex - 1);
//       }, 75);
//     } else if (!deleting && charIndex > currentWord.length) {
//       timeout = setTimeout(() => setDeleting(true), 1000);
//     } else if (deleting && charIndex < 0) {
//       setDeleting(false);
//       setWordIndex((prev) => (prev + 1) % words.length);
//       setCharIndex(0);
//     }

//     return () => clearTimeout(timeout);
//   }, [charIndex, deleting, wordIndex]);

//   return (
//     <div
//       className="min-h-[90vh] flex items-center justify-center px-6 md:px-16"
//       style={{
//         backgroundColor: theme.palette.background.default,
//         color: theme.palette.text.primary,
//       }}
//     >
//       <section>
//       <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl gap-24">
        
//         <div className="w-full md:w-1/2 space-y-6">
//           <Typography variant="h3" fontWeight="bold" gutterBottom>
//             Welcome to <span style={{ color: "limegreen" }}>S</span>ilicon
//             <span style={{ color: "limegreen" }}>S</span>andbox
//           </Typography>

//           <Typography variant="h4" fontWeight="medium" gutterBottom>
//             <span
//               style={{
//                 borderRight: "20px solid",
//                 paddingRight: 4,
//                 color: "limegreen",
//                 fontFamily: "monospace",
//               }}
//             >
//               {typed}
//             </span>{" "}
//             through levels of logic design
//           </Typography>

//           <Typography variant="body1" paragraph>
//             We provide top-quality courses and interview support to help you
//             achieve your career goals.
//             <br />
//             Explore our resources and start learning today with expert mentorship
//             and real-world projects.
//           </Typography>

//           <Stack direction="row" spacing={2} mt={2}>
//             <Button variant="contained" color="primary" size="large">
//               Browse Courses
//             </Button>
//             <Button variant="outlined" color="primary" size="large">
//               Start Practicing
//             </Button>
//           </Stack>
//         </div>

//         <div className="w-full md:w-1/2 flex justify-center">
//           <AnimatedTable />
//         </div>
//       </div>
//       <Snackbar
//   open={showSnackbar}
//   autoHideDuration={3000}
//   onClose={() => setShowSnackbar(false)}
//   anchorOrigin={{ vertical: "top", horizontal: "center" }}
//   sx={{ mt: 2 }}
// >
//   <Alert
//     severity="success"
//     sx={{
//       width: "100%",
//       fontSize: "1rem",
//       py: 1.5,
//       px: 4,
//       borderRadius: 2,
//     }}
//   >
//     ✅ Signed in successfully.
//   </Alert>
// </Snackbar>
// </section>
// {/* <!-- Section 1 --> */}
// <section className="firstSection">
//   <div className="topSection">
//     <h1>🚀 Welcome to Section 1</h1>
//     <p>This is styled with grid background, padding, and flex centering.</p>
//   </div>
//   <div className="bottomSection">
//     <img src="https://cdn.codechef.com/images/homepage/course-banner.avif" alt="Banner 1" />
//   </div>
// </section>

// {/* <!-- Section 2 --> */}
// <section className="secondSection">
//   <div className="topSection">
//     <h1>🔥 This is Section 2</h1>
//     <p>Content inside topSection, styled same as Section 1.</p>
//   </div>
//   <div className="bottomSection">
//     <img src="https://cdn.codechef.com/images/homepage/course-banner.avif" alt="Banner 2" />
//   </div>
// </section>

// {/* <!-- Section 3 --> */}
// <section className="thirdSection">
//   <div className="topSection">
//     <h1>💡 Section 3</h1>
//     <p>You can add text, buttons, or images here.</p>
//   </div>
//   <div className="bottomSection">
//     <img src="https://cdn.codechef.com/images/homepage/course-banner.avif" alt="Banner 3" />
//   </div>
// </section>

//     </div>
//   );
// };

// export default Homepage;

// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Button,
//   Container,
//   Box,
//   Stack,
//   Chip,
//   Paper,
//   Divider,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Avatar,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import CodeIcon from "@mui/icons-material/Code";
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import SchoolIcon from "@mui/icons-material/School";
// import ForumIcon from "@mui/icons-material/Forum";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import AnimatedTable from "../../components/AnimatedTable";

// const useSmoothScroll = () => {
//   const scroll = (id: string) => {
//     const el = document.getElementById(id);
//     if (!el) return;
//     const y = el.getBoundingClientRect().top + window.scrollY - 76;
//     window.scrollTo({ top: y, behavior: "smooth" });
//   };
//   return scroll;
// };

// const navItems = [
//   { id: "practice", label: "Practice" },
//   { id: "contests", label: "Contests" },
//   { id: "courses", label: "Courses" },
//   { id: "discuss", label: "Discuss" },
//   { id: "leaderboard", label: "Leaderboard" },
//   { id: "faq", label: "FAQ" },
// ];

// const HomePage: React.FC = () => {
//   const navigate = useNavigate();
//   const smoothScroll = useSmoothScroll();
//   const words = ["Climb", "Explore", "Master", "Advance"];
//   const [wordIndex, setWordIndex] = useState(0);
//   const [typed, setTyped] = useState("");
//   const [charIndex, setCharIndex] = useState(0);
//   const [deleting, setDeleting] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [snack, setSnack] = useState({ open: false, msg: "", sev: "info" as "success" | "error" | "info" });

//   useEffect(() => {
//     const current = words[wordIndex];
//     const delay = deleting ? 65 : 120;
//     const t = setTimeout(() => {
//       setTyped(current.slice(0, charIndex));
//       setCharIndex((c) => (deleting ? c - 1 : c + 1));
//       if (!deleting && charIndex > current.length) setDeleting(true);
//       if (deleting && charIndex < 0) {
//         setDeleting(false);
//         setWordIndex((i) => (i + 1) % words.length);
//         setCharIndex(0);
//       }
//     }, deleting ? delay : delay);
//     return () => clearTimeout(t);
//   }, [charIndex, deleting, wordIndex]);

//   const featuredProblems = useMemo(
//     () => [
//       { title: "4-bit Adder", tags: ["Combinational", "Easy"], to: "/coding" },
//       { title: "Priority Encoder", tags: ["Combinational", "Easy"], to: "/coding" },
//       { title: "Traffic Light FSM", tags: ["Sequential", "Medium"], to: "/coding" },
//       { title: "Mini ALU", tags: ["Datapath", "Medium"], to: "/coding" },
//       { title: "UART TX", tags: ["Protocol", "Hard"], to: "/coding" },
//     ],
//     []
//   );

//   const topLearners = [
//     { name: "Aisha", score: 1240 },
//     { name: "Ravi", score: 1165 },
//     { name: "Mei", score: 1102 },
//   ];

//   const handleNav = (to: string | (() => void)) => () => {
//     if (typeof to === "string") navigate(to);
//     else to();
//     setMobileOpen(false);
//   };

//   return (
//     <Box className="bg-background-default text-text-primary">
//       <AppBar position="sticky" color="default" elevation={1}>
//         <Toolbar className="gap-2">
//           <Typography variant="h6" className="font-extrabold">
//             <span className="text-lime-500">S</span>ilicon
//             <span className="text-lime-500">S</span>andbox
//           </Typography>
//           <Box sx={{ flexGrow: 1 }} />
//           <Stack direction="row" spacing={1} className="hidden md:flex">
//             {navItems.map((n) => (
//               <Button key={n.id} color="inherit" onClick={() => smoothScroll(n.id)}>
//                 {n.label}
//               </Button>
//             ))}
//           </Stack>
//           <Stack direction="row" spacing={1}>
//             <Button variant="outlined" onClick={() => navigate("/login")} className="hidden md:inline-flex">Sign In</Button>
//             <Button variant="contained" onClick={() => navigate("/signup")} className="hidden md:inline-flex">Sign Up</Button>
//             <IconButton edge="end" className="md:hidden" onClick={() => setMobileOpen(true)}>
//               <MenuIcon />
//             </IconButton>
//           </Stack>
//         </Toolbar>
//       </AppBar>

//       <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
//         <Box className="w-72">
//           <List>
//             {navItems.map((n) => (
//               <ListItem key={n.id} disablePadding>
//                 <ListItemButton onClick={handleNav(() => smoothScroll(n.id))}>
//                   <ListItemText primary={n.label} />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//             <Divider className="my-2" />
//             <ListItem disablePadding>
//               <ListItemButton onClick={handleNav("/coding")}>Start Coding</ListItemButton>
//             </ListItem>
//             <ListItem disablePadding>
//               <ListItemButton onClick={handleNav("/courses")}>Browse Courses</ListItemButton>
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>

//       {/* Hero */}
//       <Box id="hero" className="py-10">
//         <Container maxWidth="lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//             <div className="space-y-4">
//               <Chip label="Learn • Practice • Compete" color="success" variant="outlined" />
//               <Typography variant="h3" fontWeight={800}>
//                 Your Verilog <span className="text-green-500">Playground</span>
//               </Typography>
//               <Typography variant="h5" className="font-mono text-green-500">
//                 {typed}<span className="border-r-2 ml-1" /> through levels of logic design
//               </Typography>
//               <Typography color="text.secondary">
//                 Practice HDL problems, simulate waveforms, view RTL schematics, and climb the leaderboard.
//               </Typography>
//               <Stack direction="row" spacing={2}>
//                 <Button variant="contained" size="large" startIcon={<PlayArrowIcon />} onClick={() => navigate("/coding")}>
//                   Start Coding
//                 </Button>
//                 <Button variant="outlined" size="large" onClick={() => navigate("/courses")}>
//                   Browse Courses
//                 </Button>
//               </Stack>
//             </div>
//             <div>
//               <Paper elevation={4} className="p-4 rounded-2xl">
//                 <AnimatedTable />
//               </Paper>
//             </div>
//           </div>
//         </Container>
//       </Box>

//       {/* Practice Categories using Tailwind */}
//       <Box id="practice" className="py-16 bg-background-paper">
//         <Container maxWidth="lg">
//           <div className="flex justify-between items-center mb-6">
//             <Typography variant="h4" fontWeight={800}>Practice</Typography>
//             <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate("/coding")}>See all</Button>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//             <Paper className="p-4 rounded-2xl cursor-pointer hover:-translate-y-0.5 transition" onClick={() => navigate("/coding?cat=combinational")}>
//               <div className="flex items-center gap-3 mb-1"><CodeIcon fontSize="small"/><Typography fontWeight={700}>Combinational</Typography></div>
//               <Typography variant="body2" color="text.secondary">Gates, adders, encoders, muxes</Typography>
//             </Paper>
//             <Paper className="p-4 rounded-2xl cursor-pointer hover:-translate-y-0.5 transition" onClick={() => navigate("/coding?cat=sequential")}>
//               <div className="flex items-center gap-3 mb-1"><EmojiEventsIcon fontSize="small"/><Typography fontWeight={700}>Sequential</Typography></div>
//               <Typography variant="body2" color="text.secondary">FFs, counters, FSMs</Typography>
//             </Paper>
//             <Paper className="p-4 rounded-2xl cursor-pointer hover:-translate-y-0.5 transition" onClick={() => navigate("/coding?cat=datapath")}>
//               <div className="flex items-center gap-3 mb-1"><SchoolIcon fontSize="small"/><Typography fontWeight={700}>Datapath</Typography></div>
//               <Typography variant="body2" color="text.secondary">ALUs, pipelines</Typography>
//             </Paper>
//             <Paper className="p-4 rounded-2xl cursor-pointer hover:-translate-y-0.5 transition" onClick={() => navigate("/coding?cat=protocols")}>
//               <div className="flex items-center gap-3 mb-1"><ForumIcon fontSize="small"/><Typography fontWeight={700}>Protocols</Typography></div>
//               <Typography variant="body2" color="text.secondary">UART, SPI, AXI-lite</Typography>
//             </Paper>
//           </div>
//         </Container>
//       </Box>

//       {/* Contests (Tailwind grid) */}
//       <Box id="contests" className="py-16">
//         <Container maxWidth="lg">
//           <div className="flex justify-between items-center mb-6">
//             <Typography variant="h4" fontWeight={800}>Contests</Typography>
//             <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate("/contests")}>View contests</Button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[1,2,3].map((i) => (
//               <Paper key={i} className="p-6 rounded-2xl" elevation={2}>
//                 <div className="flex items-center gap-2 mb-1">
//                   <EmojiEventsIcon color="warning" />
//                   <Typography variant="h6" fontWeight={700}>Silicon Sprint #{i}</Typography>
//                 </div>
//                 <Typography variant="body2" color="text.secondary">90-min Verilog challenge. Problems from easy to hard.</Typography>
//                 <div className="flex gap-2 mt-3">
//                   <Chip label={i===1?"Live":"Upcoming"} color={i===1?"success":"default"} size="small" />
//                   <Chip label="Rated" size="small" />
//                 </div>
//                 <Button fullWidth variant="outlined" className="mt-3" onClick={() => navigate(`/contests/${i}`)}>Enter</Button>
//               </Paper>
//             ))}
//           </div>
//         </Container>
//       </Box>

//       {/* Courses (Tailwind grid) */}
//       <Box id="courses" className="py-16 bg-background-paper">
//         <Container maxWidth="lg">
//           <div className="flex justify-between items-center mb-6">
//             <Typography variant="h4" fontWeight={800}>Courses</Typography>
//             <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate("/courses")}>Browse courses</Button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {["Beginner Track","Intermediate FSMs","Advanced Datapaths"].map((t, idx) => (
//               <Paper key={idx} className="p-6 rounded-2xl h-full" elevation={2}>
//                 <Typography variant="h6" fontWeight={700}>{t}</Typography>
//                 <Typography variant="body2" color="text.secondary" className="my-2">Hands-on lessons with auto-graded labs and waveforms.</Typography>
//                 <div className="flex gap-2">
//                   <Chip label="Self-paced" size="small" />
//                   <Chip label="Projects" size="small" />
//                 </div>
//                 <Button variant="contained" className="mt-3" onClick={() => navigate("/courses")}>Start</Button>
//               </Paper>
//             ))}
//           </div>
//         </Container>
//       </Box>

//       {/* Featured Problems (horizontal scroll) */}
//       <Box className="py-16">
//         <Container maxWidth="lg">
//           <div className="flex justify-between items-center mb-6">
//             <Typography variant="h4" fontWeight={800}>Featured Problems</Typography>
//             <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate("/coding")}>Practice all</Button>
//           </div>
//           <div className="flex gap-4 overflow-x-auto pb-2">
//             {featuredProblems.map((p, i) => (
//               <Paper key={i} elevation={2} className="p-4 rounded-2xl min-w-[260px]">
//                 <Typography fontWeight={700}>{p.title}</Typography>
//                 <div className="flex gap-2 mt-2">
//                   {p.tags.map((t) => <Chip key={t} label={t} size="small" />)}
//                 </div>
//                 <Button size="small" className="mt-2" onClick={() => navigate(p.to)}>Solve</Button>
//               </Paper>
//             ))}
//           </div>
//         </Container>
//       </Box>

//       {/* Leaderboard Preview */}
//       <Box id="leaderboard" className="py-16 bg-background-paper">
//         <Container maxWidth="lg">
//           <div className="flex justify-between items-center mb-6">
//             <Typography variant="h4" fontWeight={800}>Top Learners</Typography>
//             <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate("/leaderboard")}>Full leaderboard</Button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {topLearners.map((u) => (
//               <Paper key={u.name} elevation={2} className="p-6 rounded-2xl">
//                 <div className="flex items-center gap-3">
//                   <Avatar>{u.name[0]}</Avatar>
//                   <div>
//                     <Typography fontWeight={700}>{u.name}</Typography>
//                     <Typography variant="body2" color="text.secondary">Score: {u.score}</Typography>
//                   </div>
//                 </div>
//               </Paper>
//             ))}
//           </div>
//         </Container>
//       </Box>

//       {/* Discuss / Community */}
//       <Box id="discuss" className="py-16">
//         <Container maxWidth="lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//             <div>
//               <Typography variant="h4" fontWeight={800} gutterBottom>Discuss & Learn Together</Typography>
//               <Typography color="text.secondary">Ask questions, share solutions, and learn best practices from peers and mentors.</Typography>
//               <div className="flex gap-3 mt-3">
//                 <Button variant="outlined" startIcon={<ForumIcon />} onClick={() => navigate("/discuss")}>Open forums</Button>
//                 <Button variant="text" onClick={() => navigate("/guides")}>Read guides</Button>
//               </div>
//             </div>
//             <div>
//               <Paper elevation={0} className="p-4 rounded-2xl border" >
//                 <Typography variant="subtitle2" color="text.secondary">Live activity</Typography>
//                 <Divider className="my-2" />
//                 <Stack spacing={1}>
//                   <Typography variant="body2">• Priya solved <b>Traffic Light FSM</b></Typography>
//                   <Typography variant="body2">• Arjun started <b>Mini ALU</b></Typography>
//                   <Typography variant="body2">• Hao posted in <b>Protocols</b> forum</Typography>
//                 </Stack>
//               </Paper>
//             </div>
//           </div>
//         </Container>
//       </Box>

//       {/* FAQ */}
//       <Box id="faq" className="py-16 bg-background-paper">
//         <Container maxWidth="lg">
//           <Typography variant="h4" fontWeight={800} gutterBottom>FAQ</Typography>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[{q:"Do I need to install tools?",a:"No, everything runs in the cloud using Icarus Verilog and Yosys."},{q:"Can I view waveforms?",a:"Yes, VCD is parsed and shown in the Waveform Viewer after each run."},{q:"Is there a leaderboard?",a:"Yes, solve problems and compete in rated contests."}].map((f,i)=> (
//               <Paper key={i} elevation={1} className="p-6 rounded-2xl h-full">
//                 <Typography fontWeight={700}>{f.q}</Typography>
//                 <Typography color="text.secondary" className="mt-1">{f.a}</Typography>
//               </Paper>
//             ))}
//           </div>
//         </Container>
//       </Box>

//       {/* Footer */}
//       <Box component="footer" className="py-10">
//         <Container maxWidth="lg">
//           <Divider className="mb-4" />
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//             <Typography variant="body2">© {new Date().getFullYear()} SiliconSandbox</Typography>
//             <div className="flex gap-4">
//               <Button size="small" onClick={() => smoothScroll("practice")}>Practice</Button>
//               <Button size="small" onClick={() => smoothScroll("contests")}>Contests</Button>
//               <Button size="small" onClick={() => smoothScroll("courses")}>Courses</Button>
//               <Button size="small" onClick={() => smoothScroll("discuss")}>Discuss</Button>
//             </div>
//           </div>
//         </Container>
//       </Box>

//       <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
//         <Alert severity={snack.sev}>{snack.msg}</Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default HomePage;
