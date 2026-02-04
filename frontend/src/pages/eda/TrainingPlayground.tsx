// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Typography,
//   Button,
//   Paper,
//   Stack,
//   Box,
// } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import CodeEditor from "../../components/CodeEditor";
// import PopupDialog from "../../components/PopupDialog";
// import WaveformViewer, { type VCDData } from "../../components/WaveformViewer";
// import { AnimatePresence, motion } from "framer-motion";


// const trainingQuestions = [
//   {
//     id: 1,
//     title: "1-bit Full Adder",
//     note: "Design a full adder using basic gates (AND, OR, XOR).",
//     previewImage: "/waveform-preview.png", 
//   },
//   {
//     id: 2,
//     title: "D Flip-Flop",
//     note: "Create a D flip-flop with asynchronous reset.",
//     previewImage: "/waveform-preview.png",
//   },
//   {
//     id: 3,
//     title: "4-bit Counter",
//     note: "Design a 4-bit synchronous counter.",
//     previewImage: "/waveform-preview.png",
//   },
// ];

// const TrainingPlayground: React.FC = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const question = trainingQuestions[currentIndex];
//   const [started, setStarted] = useState(false);

//   const [designCode, setDesignCode] = useState("module my_module;\nendmodule");
//   const [tbCode, setTbCode] = useState("module tb;\nendmodule");
//   const [waveformData, setWaveformData] = useState<VCDData | null>(null);
//   const [simulationOutput, setSimulationOutput] = useState("");
//   const [simulationSuccess, setSimulationSuccess] = useState(false);
//   const [showWaveformPopup, setShowWaveformPopup] = useState(false);
//   const [showRTLPopup, setShowRTLPopup] = useState(false);

//   const handleRun = async () => {
//     try {
//       setSimulationOutput("Running simulation...\n");
//       setWaveformData(null);

//       const response = await fetch("http://localhost:5000/api/simulate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ designCode, testbenchCode: tbCode }),
//       });

//       const result = await response.json();

//       if (!response.ok || result.error) {
//         setSimulationOutput(prev => prev + `Error: ${result.error}\n${result.details || ""}`);
//       } else {
//         setSimulationOutput(prev =>
//           prev + (result.output || "") +
//           (result.details ? `\n${result.details}` : "") +
//           "\nSimulation completed successfully!\n"
//         );
//         setSimulationSuccess(true);
//         if (result.waveform) {
//           setWaveformData(result.waveform);
//         }
//       }
//     } catch (err) {
//       setSimulationOutput(prev => prev + `Error: ${err}\n`);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen p-6 flex flex-col gap-6 transition-colors duration-300"
//       style={{
//         backgroundColor: theme.palette.background.default,
//         color: theme.palette.text.primary,
//       }}
//     >
//       {/* Top Controls */}
//       <div className="flex justify-between items-center">
//         <Button
//           variant="outlined"
//           size="small"
//           startIcon={<ArrowBackIcon />}
//           onClick={() => navigate("/coding")}
//           sx={{ fontSize: "0.8rem", px: 1.5 }}
//         >
//           Back
//         </Button>

//         <Typography variant="caption" className="text-sm text-gray-500 dark:text-gray-400">
//           Question {currentIndex + 1} of {trainingQuestions.length}
//         </Typography>

//         <div className="flex gap-2">
//           <Button
//             variant="outlined"
//             size="small"
//             disabled={currentIndex === 0}
//             onClick={() => setCurrentIndex(prev => prev - 1)}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => setCurrentIndex(prev => (prev + 1) % trainingQuestions.length)}
//           >
//             Next
//           </Button>
//         </div>
//       </div>

//       <AnimatePresence mode="wait">
//       {/* Question & Prompt Section */}
//        {!started && (
//         <motion.div
//       key="preview"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.4 }}
//     >
//            <Paper elevation={3} className="p-4">
//             <Typography variant="h6" fontWeight="bold">{question.title}</Typography>
//             <Typography variant="body2" className="mb-2">{question.note}</Typography>

        
       
          
//             <Box
//               sx={{
//                 width: "100%",
//                 maxWidth: 600,
//                 mx: "auto",
//                 my: 2,
//                 border: "1px solid #ccc",
//                 borderRadius: 2,
//                 overflow: "hidden",
//               }}
//             >
//               <img
//                 src={question.previewImage}
//                 alt="Waveform Preview"
//                 style={{ width: "100%", height: "auto" }}
//               />
//             </Box>
//             <Stack direction="row" justifyContent="center" mt={2}>
//               <Button variant="contained" size="large" onClick={() => setStarted(true)}>
//                 Start Coding
//               </Button>
//             </Stack>
//           </Paper>
//           </motion.div>
//         )}
      

//       {/* Editor & Terminal Section */}
//       {started && (
//         <>
//           <motion.div
//       key="editors"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -30 }}
//       transition={{ duration: 0.4 }}
//     >
//           {/* Code Editors */}
//           <div className="flex flex-col md:flex-row gap-4">
//             <CodeEditor title="Design Block" value={designCode} onChange={setDesignCode} />
//             <CodeEditor title="Testbench" value={tbCode} onChange={setTbCode} />
//           </div>

//           {/* Action Buttons */}
//           <Stack direction="row" justifyContent="center" spacing={2}>
//             <Button variant="contained" onClick={handleRun}>
//               Submit
//             </Button>
//             <Button
//               variant="outlined"
//               disabled={!simulationSuccess || !waveformData}
//               onClick={() => setShowWaveformPopup(true)}
//             >
//               Waveform
//             </Button>
//             <Button
//               variant="outlined"
//               disabled={!simulationSuccess}
//               onClick={() => setShowRTLPopup(true)}
//             >
//               RTL
//             </Button>
//           </Stack>

//           {/* Terminal Output */}
//           <Paper
//             elevation={3}
//             sx={{
//               p: 2,
//               backgroundColor: "#000",
//               color: "#0f0",
//               fontFamily: "monospace",
//               overflow: "auto",
//               minHeight: "150px",
//               maxHeight: "400px",
//               whiteSpace: "pre-wrap",
//             }}
//           >
//             <Typography variant="body2">
//               {simulationOutput || "Ready to run simulation..."}
//             </Typography>
//           </Paper>
//           </motion.div>
//         </>
//       )}
//       </AnimatePresence>

//       {/* Popups */}
//       <PopupDialog
//         open={showWaveformPopup}
//         onClose={() => setShowWaveformPopup(false)}
//         title="Waveform Viewer"
//       >
//         <WaveformViewer vcdData={waveformData} />
//       </PopupDialog>

//       <PopupDialog
//         open={showRTLPopup}
//         onClose={() => setShowRTLPopup(false)}
//         title="RTL Schematic"
//       >
//         <object
//           type="image/svg+xml"
//           data="http://localhost:5000/simulations/temp/schematic.svg"
//           style={{ width: "100%", height: "80vh" }}
//         >
//           Your browser does not support SVG.
//         </object>
//       </PopupDialog>
//     </div>
//   );
// };

// export default TrainingPlayground;

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CodeEditor from "../../components/CodeEditor";
import PopupDialog from "../../components/PopupDialog";
import WaveformViewer, { type VCDData } from "../../components/WaveformViewer";
import { AnimatePresence, motion } from "framer-motion";
import { API_URL } from "../../config/env";


const trainingQuestions = [
  {
    id: 1,
    title: "1-bit Full Adder",
    note: "Design a full adder using basic gates (AND, OR, XOR).",
    previewImage: "/waveform-preview.png",
    difficulty: "Easy",
    points: 100,
    timeLimit: "15 min",
    hints: ["Use XOR for sum", "Carry involves AND/OR"],
    testCases: 8,
  },
  {
    id: 2,
    title: "D Flip-Flop",
    note: "Create a D flip-flop with asynchronous reset.",
    previewImage: "/waveform-preview.png",
    difficulty: "Medium",
    points: 200,
    timeLimit: "20 min",
    hints: ["Use posedge clock", "Async reset in sensitivity list"],
    testCases: 10,
  },
  {
    id: 3,
    title: "4-bit Counter",
    note: "Design a 4-bit synchronous counter.",
    previewImage: "/waveform-preview.png",
    difficulty: "Hard",
    points: 300,
    timeLimit: "30 min",
    hints: ["Use always block", "Reset to 0"],
    testCases: 16,
  },
];

type TerminalLine = { type: "info" | "success" | "error"; text: string; time?: string };

const TrainingPlayground: React.FC = () => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const question = trainingQuestions[currentIndex];
  const [started, setStarted] = useState(false);

  const [designCode, setDesignCode] = useState("module my_module;\nendmodule");
  const [tbCode, setTbCode] = useState("module tb;\nendmodule");
  const [waveformData, setWaveformData] = useState<VCDData | null>(null);
  const [simulationOutput, setSimulationOutput] = useState("");
  const [simulationSuccess, setSimulationSuccess] = useState(false);
  const [showWaveformPopup, setShowWaveformPopup] = useState(false);
  const [showRTLPopup, setShowRTLPopup] = useState(false);

  // UI-only state (does not change your simulation behavior)
  const [darkMode, setDarkMode] = useState(true);
  const [showQuestion, setShowQuestion] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);

  const getDifficultyColor = (diff: string) => {
    if (diff === "Easy") return "text-green-400 bg-green-400/10";
    if (diff === "Medium") return "text-yellow-400 bg-yellow-400/10";
    return "text-red-400 bg-red-400/10";
  };

  const bg = darkMode ? "bg-gray-900" : "bg-gray-50";
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";
  const border = darkMode ? "border-gray-700" : "border-gray-200";
  const codeBg = darkMode ? "bg-gray-950" : "bg-gray-900";

  const handleRun = async () => {
    try {
      // keep your original behavior
      setIsRunning(true);
      setSimulationOutput("Running simulation...\n");
      setWaveformData(null);

      // UI-only terminal lines (derived from existing output state)
      setTerminalLines([{ type: "info", text: "▶ Starting simulation...", time: "0ms" }]);

      // UI-only terminal lines (derived from existing output state)
      setTerminalLines([{ type: "info", text: "▶ Starting simulation...", time: "0ms" }]);

      const response = await fetch(`${API_URL}/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designCode, testbenchCode: tbCode }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        setSimulationOutput((prev) => prev + `Error: ${result.error}\n${result.details || ""}`);
        setTerminalLines((prev) => [
          ...prev,
          { type: "error", text: `✗ Error: ${result.error}`, time: "—" },
        ]);
        setSimulationSuccess(false);
      } else {
        setSimulationOutput((prev) => {
          const detailsPart = result.details ? `\n${result.details}` : "";
          return prev + (result.output || "") + detailsPart + "\nSimulation completed successfully!\n";
        });

        setSimulationSuccess(true);
        if (result.waveform) setWaveformData(result.waveform);

        setTerminalLines((prev) => [
          ...prev,
          { type: "success", text: "✓ Simulation completed successfully!", time: "—" },
        ]);
      }
    } catch (err) {
      setSimulationOutput((prev) => prev + `Error: ${err}\n`);
      setTerminalLines((prev) => [
        ...prev,
        { type: "error", text: `✗ Error: ${String(err)}`, time: "—" },
      ]);
      setSimulationSuccess(false);
    } finally {
      setIsRunning(false);
    }
  };

  // keep terminal in sync with simulationOutput (UI-only)
  useEffect(() => {
    if (!simulationOutput) return;
    // append raw output as an info block line
    setTerminalLines((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.text === simulationOutput) return prev;
      return [...prev, { type: "info", text: simulationOutput, time: "" }];
    });
  }, [simulationOutput]);

  // When switching question, keep existing functionality and reset "started" preview flow
  useEffect(() => {
    setStarted(false);
    setSimulationOutput("");
    setSimulationSuccess(false);
    setWaveformData(null);
    setTerminalLines([]);
    setIsRunning(false);
  }, [currentIndex]);

  const progressText = useMemo(
    () => `Question ${currentIndex + 1} of ${trainingQuestions.length}`,
    [currentIndex]
  );

  return (
    <div className={`min-h-screen ${bg} ${textPrimary} transition-colors duration-300`}>
      {/* Header */}
      <header className={`${cardBg} border-b ${border} px-4 py-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MemoryIcon className="text-emerald-400" fontSize="small" />
              <span className="font-bold text-lg">
                <span className="text-emerald-400">Silicon</span>
                <span>Sandbox</span>
              </span>
            </div>

            <nav className="hidden md:flex gap-1">
              {["Training", "Courses", "Projects", "Interview"].map((item) => (
                <button
                  key={item}
                  className={`px-3 py-1.5 rounded-lg text-sm ${textSecondary} hover:text-emerald-400 transition-colors`}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-400/10 text-emerald-400">
              <EmojiEventsIcon fontSize="small" />
              <span className="text-sm font-medium">1,250 pts</span>
            </div>

            <button
              onClick={() => setDarkMode((d) => !d)}
              className={`p-2 rounded-lg ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
              type="button"
              aria-label="Toggle theme"
            >
              {darkMode ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
            </button>

            <Button
              variant="outlined"
              size="small"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/traincode")}
              sx={{ fontSize: "0.8rem", px: 1.5 }}
            >
              Back
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-57px)]">
        {/* Left Panel - Questions */}
        {showQuestion && (
          <div className={`w-80 ${cardBg} border-r ${border} flex flex-col`}>
            <div className={`p-4 border-b ${border}`}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold flex items-center gap-2">
                  <CheckCircleIcon className="text-emerald-400" fontSize="small" />
                  Training
                </h2>
                <button
                  onClick={() => setShowQuestion(false)}
                  className={`p-1 rounded ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}
                  type="button"
                >
                  <ChevronLeftIcon fontSize="small" />
                </button>
              </div>

              <div className="flex gap-2">
                {trainingQuestions.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(i)}
                    className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
                      currentIndex === i
                        ? "bg-emerald-500 text-white"
                        : `${darkMode ? "bg-gray-700" : "bg-gray-100"} ${textSecondary}`
                    }`}
                    type="button"
                  >
                    Q{q.id}
                  </button>
                ))}
              </div>

              <div className="mt-3">
                <Typography variant="caption" className={textSecondary}>
                  {progressText}
                </Typography>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(
                        question.difficulty
                      )}`}
                    >
                      {question.difficulty}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        darkMode ? "bg-gray-700" : "bg-gray-100"
                      } ${textSecondary}`}
                    >
                      <AccessTimeIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: "middle" }} />
                      {question.timeLimit}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{question.title}</h3>
                  <p className={`text-sm ${textSecondary} leading-relaxed`}>{question.note}</p>
                </div>

                <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-100"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <EmojiEventsIcon sx={{ fontSize: 18 }} className="text-yellow-400" />
                    <span className="text-sm font-medium">Rewards</span>
                  </div>
                  <p className={`text-sm ${textSecondary}`}>{question.points} points on completion</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <LightbulbIcon sx={{ fontSize: 18 }} className="text-yellow-400" />
                    <span className="text-sm font-medium">Hints</span>
                  </div>
                  <div className="space-y-2">
                    {question.hints.map((hint, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded-lg text-sm ${
                          darkMode ? "bg-yellow-400/10" : "bg-yellow-50"
                        } text-yellow-600`}
                      >
                        💡 {hint}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-3 rounded-lg ${darkMode ? "bg-blue-400/10" : "bg-blue-50"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircleIcon sx={{ fontSize: 18 }} className="text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Test Cases</span>
                  </div>
                  <p className={`text-sm ${textSecondary}`}>{question.testCases} test cases to pass</p>
                </div>

                {!started && (
                  <div className="pt-2">
                    <button
                      onClick={() => setStarted(true)}
                      className="w-full px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
                      type="button"
                    >
                      Start Coding
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative">
          {!showQuestion && (
            <button
              onClick={() => setShowQuestion(true)}
              className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 ${cardBg} border ${border} rounded-r-lg z-10`}
              type="button"
            >
              <ChevronRightIcon fontSize="small" />
            </button>
          )}

          <AnimatePresence mode="wait">
            {!started ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="flex-1 p-6"
              >
                <div className={`${cardBg} border ${border} rounded-2xl p-6`}>
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h2 className="text-xl font-semibold">{question.title}</h2>
                      <p className={`${textSecondary} mt-1`}>{question.note}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2 text-emerald-400">
                        <EmojiEventsIcon fontSize="small" />
                        <span className="font-semibold">{question.points}</span>
                        <span className={textSecondary}>pts</span>
                      </div>
                      <div className={`text-sm ${textSecondary}`}>{progressText}</div>
                    </div>
                  </div>

                  <div
                    className={`mt-5 rounded-xl overflow-hidden border ${border}`}
                    style={{ maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}
                  >
                    <img
                      src={question.previewImage}
                      alt="Waveform Preview"
                      style={{ width: "100%", height: "auto", display: "block" }}
                    />
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => setStarted(true)}
                      className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors"
                      type="button"
                    >
                      Start Coding
                    </button>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <Button
                      variant="outlined"
                      size="small"
                      disabled={currentIndex === 0}
                      onClick={() => setCurrentIndex((prev) => prev - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setCurrentIndex((prev) => (prev + 1) % trainingQuestions.length)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="editors"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35 }}
                className="flex-1 flex flex-col"
              >
                {/* Editors */}
                <div className="flex-1 flex flex-col md:flex-row">
                  <div className={`flex-1 flex flex-col border-r ${border}`}>
                    <div className={`px-4 py-2 border-b ${border} ${cardBg} flex items-center justify-between`}>
                      <div className="flex items-center gap-2">
                        <MemoryIcon className="text-emerald-400" fontSize="small" />
                        <span className="font-medium text-sm">Design Module</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            darkMode ? "bg-gray-700" : "bg-gray-100"
                          } ${textSecondary}`}
                        >
                          design.v
                        </span>
                      </div>
                    </div>
                    <div className={`flex-1 ${codeBg} p-3`}>
                      <CodeEditor title="" value={designCode} onChange={setDesignCode} />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className={`px-4 py-2 border-b ${border} ${cardBg} flex items-center justify-between`}>
                      <div className="flex items-center gap-2">
                        <ShowChartIcon className="text-purple-300" fontSize="small" />
                        <span className="font-medium text-sm">Testbench</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded ${
                            darkMode ? "bg-gray-700" : "bg-gray-100"
                          } ${textSecondary}`}
                        >
                          tb.v
                        </span>
                      </div>
                    </div>
                    <div className={`flex-1 ${codeBg} p-3`}>
                      <CodeEditor title="" value={tbCode} onChange={setTbCode} />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={`px-4 py-3 border-t ${border} ${cardBg}`}>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleRun}
                      disabled={isRunning}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
                        isRunning
                          ? "bg-emerald-600 cursor-not-allowed"
                          : "bg-emerald-500 hover:bg-emerald-600 hover:scale-[1.02]"
                      } text-white shadow-lg shadow-emerald-500/25`}
                      type="button"
                    >
                      <PlayArrowIcon sx={{ fontSize: 18 }} />
                      {isRunning ? "Running..." : "Submit"}
                    </button>

                    <button
                      onClick={() => setShowWaveformPopup(true)}
                      disabled={!simulationSuccess || !waveformData}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium border ${border} transition-all ${
                        !simulationSuccess || !waveformData
                          ? "opacity-50 cursor-not-allowed"
                          : darkMode
                          ? "hover:bg-gray-700 hover:scale-[1.02]"
                          : "hover:bg-gray-100 hover:scale-[1.02]"
                      }`}
                      type="button"
                    >
                      <ShowChartIcon sx={{ fontSize: 18 }} className="text-blue-400" />
                      Waveform
                    </button>

                    <button
                      onClick={() => setShowRTLPopup(true)}
                      disabled={!simulationSuccess}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium border ${border} transition-all ${
                        !simulationSuccess
                          ? "opacity-50 cursor-not-allowed"
                          : darkMode
                          ? "hover:bg-gray-700 hover:scale-[1.02]"
                          : "hover:bg-gray-100 hover:scale-[1.02]"
                      }`}
                      type="button"
                    >
                      <LayersIcon sx={{ fontSize: 18 }} className="text-orange-400" />
                      RTL
                    </button>

                    <button
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium border ${border} ${
                        darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                      } transition-all hover:scale-[1.02]`}
                      type="button"
                      onClick={() => {
                        // UI-only: show left panel if hidden (hint lives there)
                        if (!showQuestion) setShowQuestion(true);
                      }}
                    >
                      <LightbulbIcon sx={{ fontSize: 18 }} className="text-yellow-400" />
                      Hint
                    </button>
                  </div>
                </div>

                {/* Terminal */}
                <div className={`h-56 ${codeBg} border-t ${border}`}>
                  <div className={`px-4 py-2 border-b ${border} flex items-center gap-2 ${cardBg}`}>
                    <TerminalIcon className="text-emerald-400" fontSize="small" />
                    <span className="text-sm font-medium">Output Terminal</span>
                    <div className="flex-1" />
                    {simulationSuccess && (
                      <span className="text-xs px-2 py-1 rounded bg-emerald-500/10 text-emerald-400">
                        Success
                      </span>
                    )}
                  </div>

                  <div className="p-4 font-mono text-sm overflow-auto h-[calc(14rem-40px)] space-y-1 whitespace-pre-wrap">
                    {terminalLines.length === 0 ? (
                      <span className="text-gray-500">Ready to run simulation...</span>
                    ) : (
                      terminalLines.map((line, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-gray-600 text-xs w-12 shrink-0">
                            {line.time || ""}
                          </span>
                          <span
                            className={
                              line.type === "success"
                                ? "text-emerald-400"
                                : line.type === "error"
                                ? "text-red-400"
                                : "text-gray-300"
                            }
                          >
                            {line.text}
                          </span>
                        </div>
                      ))
                    )}

                    {isRunning && (
                      <div className="flex items-center gap-2 text-emerald-400">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        Processing...
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Popups (unchanged functionality) */}
      <PopupDialog
        open={showWaveformPopup}
        onClose={() => setShowWaveformPopup(false)}
        title="Waveform Viewer"
      >
        <WaveformViewer vcdData={waveformData} />
      </PopupDialog>

      <PopupDialog
        open={showRTLPopup}
        onClose={() => setShowRTLPopup(false)}
        title="RTL Schematic"
      >
        <object
          type="image/svg+xml"
            //  data={`${API_URL.replace("/api", "")}${svgPath}`}
          data={`${API_URL.replace("/api", "")}`}
          style={{ width: "100%", height: "80vh" }}
        >
          Your browser does not support SVG.
        </object>
      </PopupDialog>
    </div>
  );
};

export default TrainingPlayground;
