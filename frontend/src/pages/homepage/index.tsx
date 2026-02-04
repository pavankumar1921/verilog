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
// import "../../App.css";

// const Homepage: React.FC = () => {
//   const theme: Theme = useTheme();
//   const words = ["Climb", "Explore", "Master", "Advance"];
//   const [wordIndex, setWordIndex] = useState(0);
//   const [typed, setTyped] = useState("");
//   const [charIndex, setCharIndex] = useState(0);
//   const [deleting, setDeleting] = useState(false);
//   const location = useLocation();
//   const [showSnackbar, setShowSnackbar] = useState(
//     (location.state as any)?.showSuccess || false
//   );

//   useEffect(() => {
//     const currentWord = words[wordIndex];
//     let t: ReturnType<typeof setTimeout>;
//     if (!deleting && charIndex <= currentWord.length) {
//       t = setTimeout(() => {
//         setTyped(currentWord.substring(0, charIndex));
//         setCharIndex((c) => c + 1);
//       }, 150);
//     } else if (deleting && charIndex >= 0) {
//       t = setTimeout(() => {
//         setTyped(currentWord.substring(0, charIndex));
//         setCharIndex((c) => c - 1);
//       }, 75);
//     } else if (!deleting && charIndex > currentWord.length) {
//       t = setTimeout(() => setDeleting(true), 1000);
//     } else if (deleting && charIndex < 0) {
//       setDeleting(false);
//       setWordIndex((p) => (p + 1) % words.length);
//       setCharIndex(0);
//     }
//     return () => clearTimeout(t);
//   }, [charIndex, deleting, wordIndex]);

//   return (
//     <main
//       // Let the page (body) scroll; no inner scroll container here
//       style={{
//         backgroundColor: theme.palette.background.default,
//         color: theme.palette.text.primary,
//       }}
//     >
//       {/* Section 0 (Hero) */}
//       <section
//         id="hero"
//         data-snap
//         className="min-h-[100svh] w-full flex items-center px-6 md:px-16"
//       >
//         <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl gap-24 mx-auto">
//           <div className="w-full md:w-1/2 space-y-6">
//             <Typography variant="h3" fontWeight="bold" gutterBottom>
//               Welcome to <span style={{ color: "limegreen" }}>S</span>ilicon
//               <span style={{ color: "limegreen" }}>S</span>andbox
//             </Typography>

//             <Typography variant="h4" fontWeight="medium" gutterBottom>
//               <span
//                 style={{
//                   borderRight: "20px solid",
//                   paddingRight: 4,
//                   color: "limegreen",
//                   fontFamily: "monospace",
//                 }}
//               >
//                 {typed}
//               </span>{" "}
//               through levels of logic design
//             </Typography>

//             <Typography variant="body1" paragraph>
//               We provide top-quality courses and interview support to help you
//               achieve your career goals.
//               <br />
//               Explore our resources and start learning today with expert mentorship
//               and real-world projects.
//             </Typography>

//             <Stack direction="row" spacing={2} mt={2}>
//               <Button variant="contained" color="primary" size="large">
//                 Browse Courses
//               </Button>
//               <Button variant="outlined" color="primary" size="large">
//                 Start Practicing
//               </Button>
//             </Stack>
//           </div>

//           <div className="w-full md:w-1/2 flex justify-center">
//             <AnimatedTable />
//           </div>
//         </div>

//         {/* Snackbar floats above content; fine with document scroll */}
//         <Snackbar
//           open={showSnackbar}
//           autoHideDuration={3000}
//           onClose={() => setShowSnackbar(false)}
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//           sx={{ mt: 2, position: "fixed" }}
//         >
//           <Alert
//             severity="success"
//             sx={{ width: "100%", fontSize: "1rem", py: 1.5, px: 4, borderRadius: 2 }}
//           >
//             ✅ Signed in successfully.
//           </Alert>
//         </Snackbar>
//       </section>

//       {/* Section 1 */}
//       <section id="sec1" data-snap className="firstSection min-h-[100svh] w-full">
//         <div className="topSection">
//           <h1>🚀 Welcome to Section 1</h1>
//           <p>This is styled with grid background, padding, and flex centering.</p>
//         </div>
//         <div className="bottomSection">
//           <img
//             className="w-full h-full object-cover"
//             src="https://cdn.codechef.com/images/homepage/course-banner.avif"
//             alt="Banner 1"
//           />
//         </div>
//       </section>

//       {/* Section 2 */}
//       <section id="sec2" data-snap className="secondSection min-h-[100svh] w-full">
//         <div className="topSection">
//           <h1>🔥 This is Section 2</h1>
//           <p>Content inside topSection, styled same as Section 1.</p>
//         </div>
//         <div className="bottomSection">
//           <img
//             className="w-full h-full object-cover"
//             src="https://cdn.codechef.com/images/homepage/course-banner.avif"
//             alt="Banner 2"
//           />
//         </div>
//       </section>

//       {/* Section 3 */}
//       <section id="sec3" data-snap className="thirdSection min-h-[100svh] w-full">
//         <div className="topSection">
//           <h1>💡 Section 3</h1>
//           <p>You can add text, buttons, or images here.</p>
//         </div>
//         <div className="bottomSection">
//           <img
//             className="w-full h-full object-cover"
//             src="https://cdn.codechef.com/images/homepage/course-banner.avif"
//             alt="Banner 3"
//           />
//         </div>
//       </section>

//       {/* Footer will be rendered by App.tsx; we just give the page an end snap */}
//       <div data-snap-end />
//     </main>
//   );
// };

// export default Homepage;

// // import React, { useState, useEffect } from "react";
// // import {
// //   Typography,
// //   Button,
// //   Stack,
// //   Snackbar,
// //   Alert,
// //   useTheme,
// //   type Theme,
// // } from "@mui/material";
// // import AnimatedTable from "../../components/AnimatedTable";
// // import { useLocation } from "react-router-dom";

// // const Homepage: React.FC = () => {
// //   const theme: Theme = useTheme();
// //   const words: string[] = ["Climb", "Explore", "Master", "Advance"];
// //   const [wordIndex, setWordIndex] = useState<number>(0);
// //   const [typed, setTyped] = useState<string>("");
// //   const [charIndex, setCharIndex] = useState<number>(0);
// //   const [deleting, setDeleting] = useState<boolean>(false);
// //   const location = useLocation();
// //   const [showSnackbar, setShowSnackbar] = useState(location.state?.showSuccess || false);


// //   useEffect(() => {
// //     const currentWord = words[wordIndex];
// //     let timeout: ReturnType<typeof setTimeout>;

// //     if (!deleting && charIndex <= currentWord.length) {
// //       timeout = setTimeout(() => {
// //         setTyped(currentWord.substring(0, charIndex));
// //         setCharIndex(charIndex + 1);
// //       }, 150);
// //     } else if (deleting && charIndex >= 0) {
// //       timeout = setTimeout(() => {
// //         setTyped(currentWord.substring(0, charIndex));
// //         setCharIndex(charIndex - 1);
// //       }, 75);
// //     } else if (!deleting && charIndex > currentWord.length) {
// //       timeout = setTimeout(() => setDeleting(true), 1000);
// //     } else if (deleting && charIndex < 0) {
// //       setDeleting(false);
// //       setWordIndex((prev) => (prev + 1) % words.length);
// //       setCharIndex(0);
// //     }

// //     return () => clearTimeout(timeout);
// //   }, [charIndex, deleting, wordIndex]);

// //   return (
// //     <div
// //       className="min-h-[90vh] flex items-center justify-center px-6 md:px-16"
// //       style={{
// //         backgroundColor: theme.palette.background.default,
// //         color: theme.palette.text.primary,
// //       }}
// //     >
// //       <section>
// //       <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl gap-24">
        
// //         <div className="w-full md:w-1/2 space-y-6">
// //           <Typography variant="h3" fontWeight="bold" gutterBottom>
// //             Welcome to <span style={{ color: "limegreen" }}>S</span>ilicon
// //             <span style={{ color: "limegreen" }}>S</span>andbox
// //           </Typography>

// //           <Typography variant="h4" fontWeight="medium" gutterBottom>
// //             <span
// //               style={{
// //                 borderRight: "20px solid",
// //                 paddingRight: 4,
// //                 color: "limegreen",
// //                 fontFamily: "monospace",
// //               }}
// //             >
// //               {typed}
// //             </span>{" "}
// //             through levels of logic design
// //           </Typography>

// //           <Typography variant="body1" paragraph>
// //             We provide top-quality courses and interview support to help you
// //             achieve your career goals.
// //             <br />
// //             Explore our resources and start learning today with expert mentorship
// //             and real-world projects.
// //           </Typography>

// //           <Stack direction="row" spacing={2} mt={2}>
// //             <Button variant="contained" color="primary" size="large">
// //               Browse Courses
// //             </Button>
// //             <Button variant="outlined" color="primary" size="large">
// //               Start Practicing
// //             </Button>
// //           </Stack>
// //         </div>

// //         <div className="w-full md:w-1/2 flex justify-center">
// //           <AnimatedTable />
// //         </div>
// //       </div>
// //       <Snackbar
// //   open={showSnackbar}
// //   autoHideDuration={3000}
// //   onClose={() => setShowSnackbar(false)}
// //   anchorOrigin={{ vertical: "top", horizontal: "center" }}
// //   sx={{ mt: 2 }}
// // >
// //   <Alert
// //     severity="success"
// //     sx={{
// //       width: "100%",
// //       fontSize: "1rem",
// //       py: 1.5,
// //       px: 4,
// //       borderRadius: 2,
// //     }}
// //   >
// //     ✅ Signed in successfully.
// //   </Alert>
// // </Snackbar>
// // </section>
// // {/* <!-- Section 1 --> */}
// // <section className="firstSection">
// //   <div className="topSection">
// //     <h1>🚀 Welcome to Section 1</h1>
// //     <p>This is styled with grid background, padding, and flex centering.</p>
// //   </div>
// //   <div className="bottomSection">
// //     <img src="https://cdn.codechef.com/images/homepage/course-banner.avif" alt="Banner 1" />
// //   </div>
// // </section>

// // {/* <!-- Section 2 --> */}
// // <section className="secondSection">
// //   <div className="topSection">
// //     <h1>🔥 This is Section 2</h1>
// //     <p>Content inside topSection, styled same as Section 1.</p>
// //   </div>
// //   <div className="bottomSection">
// //     <img src="https://cdn.codechef.com/images/homepage/course-banner.avif" alt="Banner 2" />
// //   </div>
// // </section>

// // {/* <!-- Section 3 --> */}
// // <section className="thirdSection">
// //   <div className="topSection">
// //     <h1>💡 Section 3</h1>
// //     <p>You can add text, buttons, or images here.</p>
// //   </div>
// //   <div className="bottomSection">
// //     <img src="https://cdn.codechef.com/images/homepage/course-banner.avif" alt="Banner 3" />
// //   </div>
// // </section>

// //     </div>
// //   );
// // };

// // export default Homepage;

// // import React, { useEffect, useMemo, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import {
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   IconButton,
// //   Button,
// //   Container,
// //   Box,
// //   Stack,
// //   Chip,
// //   Paper,
// //   Divider,
// //   Drawer,
// //   List,
// //   ListItem,
// //   ListItemButton,
// //   ListItemText,
// //   Avatar,
// //   Snackbar,
// //   Alert,
// // } from "@mui/material";
// // import MenuIcon from "@mui/icons-material/Menu";
// // import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// // import CodeIcon from "@mui/icons-material/Code";
// // import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// // import SchoolIcon from "@mui/icons-material/School";
// // import ForumIcon from "@mui/icons-material/Forum";
// // import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// // import AnimatedTable from "../../components/AnimatedTable";

// // const useSmoothScroll = () => {
// //   const scroll = (id: string) => {
// //     const el = document.getElementById(id);
// //     if (!el) return;
// //     const y = el.getBoundingClientRect().top + window.scrollY - 76;
// //     window.scrollTo({ top: y, behavior: "smooth" });
// //   };
// //   return scroll;
// // };

// // const navItems = [
// //   { id: "practice", label: "Practice" },
// //   { id: "contests", label: "Contests" },
// //   { id: "courses", label: "Courses" },
// //   { id: "discuss", label: "Discuss" },
// //   { id: "leaderboard", label: "Leaderboard" },
// //   { id: "faq", label: "FAQ" },
// // ];

// // const HomePage: React.FC = () => {
// //   const navigate = useNavigate();
// //   const smoothScroll = useSmoothScroll();
// //   const words = ["Climb", "Explore", "Master", "Advance"];
// //   const [wordIndex, setWordIndex] = useState(0);
// //   const [typed, setTyped] = useState("");
// //   const [charIndex, setCharIndex] = useState(0);
// //   const [deleting, setDeleting] = useState(false);
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const [snack, setSnack] = useState({ open: false, msg: "", sev: "info" as "success" | "error" | "info" });

// //   useEffect(() => {
// //     const current = words[wordIndex];
// //     const delay = deleting ? 65 : 120;
// //     const t = setTimeout(() => {
// //       setTyped(current.slice(0, charIndex));
// //       setCharIndex((c) => (deleting ? c - 1 : c + 1));
// //       if (!deleting && charIndex > current.length) setDeleting(true);
// //       if (deleting && charIndex < 0) {
// //         setDeleting(false);
// //         setWordIndex((i) => (i + 1) % words.length);
// //         setCharIndex(0);
// //       }
// //     }, deleting ? delay : delay);
// //     return () => clearTimeout(t);
// //   }, [charIndex, deleting, wordIndex]);

// //   const featuredProblems = useMemo(
// //     () => [
// //       { title: "4-bit Adder", tags: ["Combinational", "Easy"], to: "/coding" },
// //       { title: "Priority Encoder", tags: ["Combinational", "Easy"], to: "/coding" },
// //       { title: "Traffic Light FSM", tags: ["Sequential", "Medium"], to: "/coding" },
// //       { title: "Mini ALU", tags: ["Datapath", "Medium"], to: "/coding" },
// //       { title: "UART TX", tags: ["Protocol", "Hard"], to: "/coding" },
// //     ],
// //     []
// //   );

// //   const topLearners = [
// //     { name: "Aisha", score: 1240 },
// //     { name: "Ravi", score: 1165 },
// //     { name: "Mei", score: 1102 },
// //   ];

// //   const handleNav = (to: string | (() => void)) => () => {
// //     if (typeof to === "string") navigate(to);
// //     else to();
// //     setMobileOpen(false);
// //   };

// //   return (
// //     <Box className="bg-background-default text-text-primary">
// //       <AppBar position="sticky" color="default" elevation={1}>
// //         <Toolbar className="gap-2">
// //           <Typography variant="h6" className="font-extrabold">
// //             <span className="text-lime-500">S</span>ilicon
// //             <span className="text-lime-500">S</span>andbox
// //           </Typography>
// //           <Box sx={{ flexGrow: 1 }} />
// //           <Stack direction="row" spacing={1} className="hidden md:flex">
// //             {navItems.map((n) => (
// //               <Button key={n.id} color="inherit" onClick={() => smoothScroll(n.id)}>
// //                 {n.label}
// //               </Button>
// //             ))}
// //           </Stack>
// //           <Stack direction="row" spacing={1}>
// //             <Button variant="outlined" onClick={() => navigate("/login")} className="hidden md:inline-flex">Sign In</Button>
// //             <Button variant="contained" onClick={() => navigate("/signup")} className="hidden md:inline-flex">Sign Up</Button>
// //             <IconButton edge="end" className="md:hidden" onClick={() => setMobileOpen(true)}>
// //               <MenuIcon />
// //             </IconButton>
// //           </Stack>
// //         </Toolbar>
// //       </AppBar>

// //       <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
// //         <Box className="w-72">
// //           <List>
// //             {navItems.map((n) => (
// //               <ListItem key={n.id} disablePadding>
// //                 <ListItemButton onClick={handleNav(() => smoothScroll(n.id))}>
// //                   <ListItemText primary={n.label} />
// //                 </ListItemButton>
// //               </ListItem>
// //             ))}
// //             <Divider className="my-2" />
// //             <ListItem disablePadding>
// //               <ListItemButton onClick={handleNav("/coding")}>Start Coding</ListItemButton>
// //             </ListItem>
// //             <ListItem disablePadding>
// //               <ListItemButton onClick={handleNav("/courses")}>Browse Courses</ListItemButton>
// //             </ListItem>
// //           </List>
// //         </Box>
// //       </Drawer>

// //       {/* Hero */}
// //       <Box id="hero" className="py-10">
// //         <Container maxWidth="lg">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
// //             <div className="space-y-4">
// //               <Chip label="Learn • Practice • Compete" color="success" variant="outlined" />
// //               <Typography variant="h3" fontWeight={800}>
// //                 Your Verilog <span className="text-green-500">Playground</span>
// //               </Typography>
// //               <Typography variant="h5" className="font-mono text-green-500">
// //                 {typed}<span className="border-r-2 ml-1" /> through levels of logic design
// //               </Typography>
// //               <Typography color="text.secondary">
// //                 Practice HDL problems, simulate waveforms, view RTL schematics, and climb the leaderboard.
// //               </Typography>
// //               <Stack direction="row" spacing={2}>
// //                 <Button variant="contained" size="large" startIcon={<PlayArrowIcon />} onClick={() => navigate("/coding")}>
// //                   Start Coding
// //                 </Button>
// //                 <Button variant="outlined" size="large" onClick={() => navigate("/courses")}>
// //                   Browse Courses
// //                 </Button>
// //               </Stack>
// //             </div>
// //             <div>
// //               <Paper elevation={4} className="p-4 rounded-2xl">
// //                 <AnimatedTable />
// //               </Paper>
// //             </div>
// //           </div>
// //         </Container>
// //       </Box>

// //       {/* Practice Categories using Tailwind */}
// //       <Box id="practice" className="py-16 bg-background-paper">
// //         <Container maxWidth="lg">
// //           <div className="flex justify-between items-center mb-6">
// //             <Typography variant="h4" fontWeight={800}>Practice</Typography>
// //             <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate("/coding")}>See all</Button>
// //           </div>
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
// //             <Paper className="p-4 rounded-2xl cursor-pointer hover:-translate-y-0.5 transition" onClick={() => navigate("/coding?cat=combinational")}>
// //               <div className="flex items-center gap-3 mb-1"><CodeIcon fontSize="small"/><Typography fontWeight={700}>Combinational</Typography></div>
// //               <Typography variant="body2" color="text.secondary">Gates, adders, encoders, muxes</Typography>
// //             </Paper>
// //             <Paper className="p-4 rounded-2xl cursor-pointer hover:-translate-y-0.5 transition" onClick={() => navigate("/coding?cat=sequential")}>
// //               <div className="flex items-center gap-3 mb-1"><EmojiEventsIcon fontSize="small"/><Typography fontWeight={700}>Sequential</Typography></div>
// //               <Typography variant="body2" color="text.secondary">FFs, counters, FSMs</Typography>
// //             </Paper>
// //             <Paper className="p-4 rounded-2xl cursor-pointer hover:-translate-y-0.5 transition" onClick={() => navigate("/coding?cat=datapath")}>
// //               <div className="flex items-center gap-3 mb-1"><SchoolIcon fontSize="small"/><Typography fontWeight={700}>Datapath</Typography></div>
// //               <Typography variant="body2" color="text.secondary">ALUs, pipelines</Typography>
// //             </Paper>
// //             <Paper className="p-4 rounded-2xl cursor-pointer hover:-translate-y-0.5 transition" onClick={() => navigate("/coding?cat=protocols")}>
// //               <div className="flex items-center gap-3 mb-1"><ForumIcon fontSize="small"/><Typography fontWeight={700}>Protocols</Typography></div>
// //               <Typography variant="body2" color="text.secondary">UART, SPI, AXI-lite</Typography>
// //             </Paper>
// //           </div>
// //         </Container>
// //       </Box>

// //       {/* Contests (Tailwind grid) */}
// //       <Box id="contests" className="py-16">
// //         <Container maxWidth="lg">
// //           <div className="flex justify-between items-center mb-6">
// //             <Typography variant="h4" fontWeight={800}>Contests</Typography>
// //             <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate("/contests")}>View contests</Button>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             {[1,2,3].map((i) => (
// //               <Paper key={i} className="p-6 rounded-2xl" elevation={2}>
// //                 <div className="flex items-center gap-2 mb-1">
// //                   <EmojiEventsIcon color="warning" />
// //                   <Typography variant="h6" fontWeight={700}>Silicon Sprint #{i}</Typography>
// //                 </div>
// //                 <Typography variant="body2" color="text.secondary">90-min Verilog challenge. Problems from easy to hard.</Typography>
// //                 <div className="flex gap-2 mt-3">
// //                   <Chip label={i===1?"Live":"Upcoming"} color={i===1?"success":"default"} size="small" />
// //                   <Chip label="Rated" size="small" />
// //                 </div>
// //                 <Button fullWidth variant="outlined" className="mt-3" onClick={() => navigate(`/contests/${i}`)}>Enter</Button>
// //               </Paper>
// //             ))}
// //           </div>
// //         </Container>
// //       </Box>

// //       {/* Courses (Tailwind grid) */}
// //       <Box id="courses" className="py-16 bg-background-paper">
// //         <Container maxWidth="lg">
// //           <div className="flex justify-between items-center mb-6">
// //             <Typography variant="h4" fontWeight={800}>Courses</Typography>
// //             <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate("/courses")}>Browse courses</Button>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             {["Beginner Track","Intermediate FSMs","Advanced Datapaths"].map((t, idx) => (
// //               <Paper key={idx} className="p-6 rounded-2xl h-full" elevation={2}>
// //                 <Typography variant="h6" fontWeight={700}>{t}</Typography>
// //                 <Typography variant="body2" color="text.secondary" className="my-2">Hands-on lessons with auto-graded labs and waveforms.</Typography>
// //                 <div className="flex gap-2">
// //                   <Chip label="Self-paced" size="small" />
// //                   <Chip label="Projects" size="small" />
// //                 </div>
// //                 <Button variant="contained" className="mt-3" onClick={() => navigate("/courses")}>Start</Button>
// //               </Paper>
// //             ))}
// //           </div>
// //         </Container>
// //       </Box>

// //       {/* Featured Problems (horizontal scroll) */}
// //       <Box className="py-16">
// //         <Container maxWidth="lg">
// //           <div className="flex justify-between items-center mb-6">
// //             <Typography variant="h4" fontWeight={800}>Featured Problems</Typography>
// //             <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate("/coding")}>Practice all</Button>
// //           </div>
// //           <div className="flex gap-4 overflow-x-auto pb-2">
// //             {featuredProblems.map((p, i) => (
// //               <Paper key={i} elevation={2} className="p-4 rounded-2xl min-w-[260px]">
// //                 <Typography fontWeight={700}>{p.title}</Typography>
// //                 <div className="flex gap-2 mt-2">
// //                   {p.tags.map((t) => <Chip key={t} label={t} size="small" />)}
// //                 </div>
// //                 <Button size="small" className="mt-2" onClick={() => navigate(p.to)}>Solve</Button>
// //               </Paper>
// //             ))}
// //           </div>
// //         </Container>
// //       </Box>

// //       {/* Leaderboard Preview */}
// //       <Box id="leaderboard" className="py-16 bg-background-paper">
// //         <Container maxWidth="lg">
// //           <div className="flex justify-between items-center mb-6">
// //             <Typography variant="h4" fontWeight={800}>Top Learners</Typography>
// //             <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate("/leaderboard")}>Full leaderboard</Button>
// //           </div>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             {topLearners.map((u) => (
// //               <Paper key={u.name} elevation={2} className="p-6 rounded-2xl">
// //                 <div className="flex items-center gap-3">
// //                   <Avatar>{u.name[0]}</Avatar>
// //                   <div>
// //                     <Typography fontWeight={700}>{u.name}</Typography>
// //                     <Typography variant="body2" color="text.secondary">Score: {u.score}</Typography>
// //                   </div>
// //                 </div>
// //               </Paper>
// //             ))}
// //           </div>
// //         </Container>
// //       </Box>

// //       {/* Discuss / Community */}
// //       <Box id="discuss" className="py-16">
// //         <Container maxWidth="lg">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
// //             <div>
// //               <Typography variant="h4" fontWeight={800} gutterBottom>Discuss & Learn Together</Typography>
// //               <Typography color="text.secondary">Ask questions, share solutions, and learn best practices from peers and mentors.</Typography>
// //               <div className="flex gap-3 mt-3">
// //                 <Button variant="outlined" startIcon={<ForumIcon />} onClick={() => navigate("/discuss")}>Open forums</Button>
// //                 <Button variant="text" onClick={() => navigate("/guides")}>Read guides</Button>
// //               </div>
// //             </div>
// //             <div>
// //               <Paper elevation={0} className="p-4 rounded-2xl border" >
// //                 <Typography variant="subtitle2" color="text.secondary">Live activity</Typography>
// //                 <Divider className="my-2" />
// //                 <Stack spacing={1}>
// //                   <Typography variant="body2">• Priya solved <b>Traffic Light FSM</b></Typography>
// //                   <Typography variant="body2">• Arjun started <b>Mini ALU</b></Typography>
// //                   <Typography variant="body2">• Hao posted in <b>Protocols</b> forum</Typography>
// //                 </Stack>
// //               </Paper>
// //             </div>
// //           </div>
// //         </Container>
// //       </Box>

// //       {/* FAQ */}
// //       <Box id="faq" className="py-16 bg-background-paper">
// //         <Container maxWidth="lg">
// //           <Typography variant="h4" fontWeight={800} gutterBottom>FAQ</Typography>
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //             {[{q:"Do I need to install tools?",a:"No, everything runs in the cloud using Icarus Verilog and Yosys."},{q:"Can I view waveforms?",a:"Yes, VCD is parsed and shown in the Waveform Viewer after each run."},{q:"Is there a leaderboard?",a:"Yes, solve problems and compete in rated contests."}].map((f,i)=> (
// //               <Paper key={i} elevation={1} className="p-6 rounded-2xl h-full">
// //                 <Typography fontWeight={700}>{f.q}</Typography>
// //                 <Typography color="text.secondary" className="mt-1">{f.a}</Typography>
// //               </Paper>
// //             ))}
// //           </div>
// //         </Container>
// //       </Box>

// //       {/* Footer */}
// //       <Box component="footer" className="py-10">
// //         <Container maxWidth="lg">
// //           <Divider className="mb-4" />
// //           <div className="flex flex-col md:flex-row justify-between items-center gap-4">
// //             <Typography variant="body2">© {new Date().getFullYear()} SiliconSandbox</Typography>
// //             <div className="flex gap-4">
// //               <Button size="small" onClick={() => smoothScroll("practice")}>Practice</Button>
// //               <Button size="small" onClick={() => smoothScroll("contests")}>Contests</Button>
// //               <Button size="small" onClick={() => smoothScroll("courses")}>Courses</Button>
// //               <Button size="small" onClick={() => smoothScroll("discuss")}>Discuss</Button>
// //             </div>
// //           </div>
// //         </Container>
// //       </Box>

// //       <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
// //         <Alert severity={snack.sev}>{snack.msg}</Alert>
// //       </Snackbar>
// //     </Box>
// //   );
// // };

// // export default HomePage;

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
            {questions.map((q, idx) => (
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
              WHY SILICON SANDBOX
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
              Join thousands of engineers mastering digital design with SiliconSandbox
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
