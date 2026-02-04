// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Typography,
//   Button,
//   Paper,
//   Stack,
// } from "@mui/material";
// import PopupDialog from "../../components/PopupDialog";
// import CodeEditor from "../../components/CodeEditor";
// import WaveformViewer, { type VCDData } from "../../components/WaveformViewer";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// const CodingPlayground: React.FC = () => {
//   const navigate = useNavigate();

//   const [designCode, setDesignCode] = useState(`module my_module;\nendmodule`);
//   const [tbCode, setTbCode] = useState(`module tb;\nendmodule`);
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
//           prev + (result.output || "") + (result.details ? `\n${result.details}` : "") +
//           "\nSimulation completed successfully!\n"
//         );
//         setSimulationSuccess(true);
//         if (result.waveform) setWaveformData(result.waveform);
//       }
//     } catch (err) {
//       setSimulationOutput(prev => prev + `Error: ${err}\n`);
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 flex flex-col gap-6 bg-gray-100 dark:bg-black transition-colors duration-300">
      
//       <Button
//   variant="outlined"
//   size="small"
//   startIcon={<ArrowBackIcon />}
//   onClick={() => navigate("/coding")}
//   sx={{ width: "fit-content", fontSize: "0.8rem", px: 1.5 }}
// >
//   Back
// </Button>

//       <div className="flex flex-col md:flex-row gap-4">
//         <CodeEditor title="Design Block" value={designCode} onChange={setDesignCode} />
//         <CodeEditor title="Testbench" value={tbCode} onChange={setTbCode} />
//       </div>
//       <Stack direction="row" justifyContent="center" spacing={2}>
//         <Button variant="contained" onClick={handleRun}>Run</Button>
//         <Button
//           variant="outlined"
//           disabled={!simulationSuccess || !waveformData}
//           onClick={() => setShowWaveformPopup(true)}
//         >
//           Waveform
//         </Button>
//         <Button
//           variant="outlined"
//           disabled={!simulationSuccess}
//           onClick={() => setShowRTLPopup(true)}
//         >
//           RTL
//         </Button>
//       </Stack>

//       <Paper
//         elevation={3}
//         sx={{
//           p: 2,
//           backgroundColor: "#000",
//           color: "#0f0",
//           fontFamily: "monospace",
//           overflow: "auto",
//           minHeight: "150px",
//           maxHeight: "400px",
//           whiteSpace: "pre-wrap",
//         }}
//       >
//         <Typography variant="body2">
//           {simulationOutput || "Ready to run simulation..."}
//         </Typography>
//       </Paper>

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

// export default CodingPlayground;

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Cpu,
  Trophy,
  Play,
  Waves,
  Layers,
  RotateCcw,
  Terminal,
  CheckCircle,
  ArrowLeft,
  Zap,
} from "lucide-react";
import PopupDialog from "../../components/PopupDialog";
import CodeEditor from "../../components/CodeEditor";
import WaveformViewer, { type VCDData } from "../../components/WaveformViewer";
import API_URL from "../../config/api";

const CodingPlayground: React.FC = () => {
  const navigate = useNavigate();

  const [designCode, setDesignCode] = useState(`module my_module;\nendmodule`);
  const [tbCode, setTbCode] = useState(`module tb;\nendmodule`);
  const [waveformData, setWaveformData] = useState<VCDData | null>(null);
  const [simulationOutput, setSimulationOutput] = useState("");
  const [simulationSuccess, setSimulationSuccess] = useState(false);
  const [showWaveformPopup, setShowWaveformPopup] = useState(false);
  const [showRTLPopup, setShowRTLPopup] = useState(false);

  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    try {
      setIsRunning(true);
      setSimulationSuccess(false);
      setSimulationOutput("Running simulation...\n");
      setWaveformData(null);

      const response = await fetch(`${API_URL}/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designCode, testbenchCode: tbCode }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        setSimulationOutput((prev) => prev + `Error: ${result.error}\n${result.details || ""}`);
        setSimulationSuccess(false);
      } else {
        setSimulationOutput((prev) => {
          const detailsPart = result.details ? `\n${result.details}` : "";
          return (
            prev +
            (result.output || "") +
            detailsPart +
            "\nSimulation completed successfully!\n"
          );
        });
        setSimulationSuccess(true);
        if (result.waveform) setWaveformData(result.waveform);
      }
    } catch (err) {
      setSimulationOutput((prev) => prev + `Error: ${err}\n`);
      setSimulationSuccess(false);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setDesignCode(`module my_module;\nendmodule`);
    setTbCode(`module tb;\nendmodule`);
    setWaveformData(null);
    setSimulationOutput("");
    setSimulationSuccess(false);
    setShowWaveformPopup(false);
    setShowRTLPopup(false);
  };

  const consoleHeader = useMemo(() => {
    // purely UI; does not affect actions
    return [
      "═══════════════════════════════════════",
      "  SiliconSandbox Coding Playground",
      "═══════════════════════════════════════",
      "",
    ].join("\n");
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 px-6 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/coding")}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-slate-300" />
              <span className="text-sm font-medium text-slate-200">Back</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-xl tracking-tight">SiliconSandbox</div>
                <div className="text-xs text-slate-400 -mt-0.5">Coding Playground</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-yellow-400">1,250</span>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold">
              U
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto p-4 flex flex-col gap-4">
        {/* Editors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Design Block</h3>
                  <span className="text-xs text-slate-500">design.v</span>
                </div>
              </div>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
            </div>

            <div className="p-3">
              {/* Keep your existing editor component + behavior */}
              <CodeEditor title="" value={designCode} onChange={setDesignCode} />
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Testbench</h3>
                  <span className="text-xs text-slate-500">tb.v</span>
                </div>
              </div>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
            </div>

            <div className="p-3">
              {/* Keep your existing editor component + behavior */}
              <CodeEditor title="" value={tbCode} onChange={setTbCode} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${
              isRunning
                ? "bg-emerald-600 cursor-wait"
                : "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25"
            }`}
          >
            <Play className={`w-5 h-5 ${isRunning ? "animate-spin" : ""}`} />
            {isRunning ? "Running..." : "Run Simulation"}
          </button>

          <button
            onClick={() => setShowWaveformPopup(true)}
            disabled={!simulationSuccess || !waveformData}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              !simulationSuccess || !waveformData
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-slate-800 hover:bg-slate-700 hover:scale-[1.02]"
            }`}
          >
            <Waves className="w-5 h-5 text-blue-400" />
            Waveform
          </button>

          <button
            onClick={() => setShowRTLPopup(true)}
            disabled={!simulationSuccess}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              !simulationSuccess
                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                : "bg-slate-800 hover:bg-slate-700 hover:scale-[1.02]"
            }`}
          >
            <Layers className="w-5 h-5 text-orange-400" />
            RTL View
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-medium transition-all hover:scale-[1.02]"
          >
            <RotateCcw className="w-5 h-5 text-slate-400" />
            Reset
          </button>
        </div>

        {/* Console */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                <Terminal className="w-4 h-4 text-emerald-400" />
              </div>
              <h3 className="font-semibold">Output Console</h3>
            </div>

            {simulationSuccess && (
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Simulation Success</span>
              </div>
            )}
          </div>

          <div className="bg-slate-950 p-4 h-56 overflow-auto font-mono text-sm whitespace-pre-wrap">
            {!simulationOutput ? (
              <span className="text-slate-600">
                Click &quot;Run Simulation&quot; to compile and test your design...
              </span>
            ) : (
              <span className="text-emerald-400">
                {consoleHeader}
                <span className="text-slate-200">{simulationOutput}</span>
              </span>
            )}

            {isRunning && (
              <div className="flex items-center gap-2 text-emerald-400 mt-2">
                <Zap className="w-4 h-4 animate-pulse" />
                <span>Processing...</span>
              </div>
            )}
          </div>
        </div>

        {/* Popups (unchanged behavior) */}
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
            // data={`${API_URL.replace("/api", "")}${svgPath}`}
             data={`${API_URL.replace("/api", "")}`}
            style={{ width: "100%", height: "80vh" }}
          >
            Your browser does not support SVG.
          </object>
        </PopupDialog>
      </div>
    </div>
  );
};

export default CodingPlayground;
