import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Paper,
  Stack,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CodeEditor from "../../components/CodeEditor";
import PopupDialog from "../../components/PopupDialog";
import WaveformViewer, { type VCDData } from "../../components/WaveformViewer";
import { AnimatePresence, motion } from "framer-motion";


const trainingQuestions = [
  {
    id: 1,
    title: "1-bit Full Adder",
    note: "Design a full adder using basic gates (AND, OR, XOR).",
    previewImage: "/waveform-preview.png", 
  },
  {
    id: 2,
    title: "D Flip-Flop",
    note: "Create a D flip-flop with asynchronous reset.",
    previewImage: "/waveform-preview.png",
  },
  {
    id: 3,
    title: "4-bit Counter",
    note: "Design a 4-bit synchronous counter.",
    previewImage: "/waveform-preview.png",
  },
];

const TrainingPlayground: React.FC = () => {
  const theme = useTheme();
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

  const handleRun = async () => {
    try {
      setSimulationOutput("Running simulation...\n");
      setWaveformData(null);

      const response = await fetch("http://localhost:5000/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ designCode, testbenchCode: tbCode }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        setSimulationOutput(prev => prev + `Error: ${result.error}\n${result.details || ""}`);
      } else {
        setSimulationOutput(prev =>
          prev + (result.output || "") +
          (result.details ? `\n${result.details}` : "") +
          "\nSimulation completed successfully!\n"
        );
        setSimulationSuccess(true);
        if (result.waveform) {
          setWaveformData(result.waveform);
        }
      }
    } catch (err) {
      setSimulationOutput(prev => prev + `Error: ${err}\n`);
    }
  };

  return (
    <div
      className="min-h-screen p-6 flex flex-col gap-6 transition-colors duration-300"
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {/* Top Controls */}
      <div className="flex justify-between items-center">
        <Button
          variant="outlined"
          size="small"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/coding")}
          sx={{ fontSize: "0.8rem", px: 1.5 }}
        >
          Back
        </Button>

        <Typography variant="caption" className="text-sm text-gray-500 dark:text-gray-400">
          Question {currentIndex + 1} of {trainingQuestions.length}
        </Typography>

        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="small"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(prev => prev - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setCurrentIndex(prev => (prev + 1) % trainingQuestions.length)}
          >
            Next
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
      {/* Question & Prompt Section */}
       {!started && (
        <motion.div
      key="preview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
           <Paper elevation={3} className="p-4">
            <Typography variant="h6" fontWeight="bold">{question.title}</Typography>
            <Typography variant="body2" className="mb-2">{question.note}</Typography>

        
       
          
            <Box
              sx={{
                width: "100%",
                maxWidth: 600,
                mx: "auto",
                my: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <img
                src={question.previewImage}
                alt="Waveform Preview"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
            <Stack direction="row" justifyContent="center" mt={2}>
              <Button variant="contained" size="large" onClick={() => setStarted(true)}>
                Start Coding
              </Button>
            </Stack>
          </Paper>
          </motion.div>
        )}
      

      {/* Editor & Terminal Section */}
      {started && (
        <>
          <motion.div
      key="editors"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4 }}
    >
          {/* Code Editors */}
          <div className="flex flex-col md:flex-row gap-4">
            <CodeEditor title="Design Block" value={designCode} onChange={setDesignCode} />
            <CodeEditor title="Testbench" value={tbCode} onChange={setTbCode} />
          </div>

          {/* Action Buttons */}
          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button variant="contained" onClick={handleRun}>
              Submit
            </Button>
            <Button
              variant="outlined"
              disabled={!simulationSuccess || !waveformData}
              onClick={() => setShowWaveformPopup(true)}
            >
              Waveform
            </Button>
            <Button
              variant="outlined"
              disabled={!simulationSuccess}
              onClick={() => setShowRTLPopup(true)}
            >
              RTL
            </Button>
          </Stack>

          {/* Terminal Output */}
          <Paper
            elevation={3}
            sx={{
              p: 2,
              backgroundColor: "#000",
              color: "#0f0",
              fontFamily: "monospace",
              overflow: "auto",
              minHeight: "150px",
              maxHeight: "400px",
              whiteSpace: "pre-wrap",
            }}
          >
            <Typography variant="body2">
              {simulationOutput || "Ready to run simulation..."}
            </Typography>
          </Paper>
          </motion.div>
        </>
      )}
      </AnimatePresence>

      {/* Popups */}
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
          data="http://localhost:5000/simulations/temp/schematic.svg"
          style={{ width: "100%", height: "80vh" }}
        >
          Your browser does not support SVG.
        </object>
      </PopupDialog>
    </div>
  );
};

export default TrainingPlayground;
