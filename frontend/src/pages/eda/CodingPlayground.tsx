import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import PopupDialog from "../../components/PopupDialog";
import CodeEditor from "../../components/CodeEditor";
import WaveformViewer, { type VCDData } from "../../components/WaveformViewer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CodingPlayground: React.FC = () => {
  const navigate = useNavigate();

  const [designCode, setDesignCode] = useState(`module my_module;\nendmodule`);
  const [tbCode, setTbCode] = useState(`module tb;\nendmodule`);
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
          prev + (result.output || "") + (result.details ? `\n${result.details}` : "") +
          "\nSimulation completed successfully!\n"
        );
        setSimulationSuccess(true);
        if (result.waveform) setWaveformData(result.waveform);
      }
    } catch (err) {
      setSimulationOutput(prev => prev + `Error: ${err}\n`);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col gap-6 bg-gray-100 dark:bg-black transition-colors duration-300">
      
      <Button
  variant="outlined"
  size="small"
  startIcon={<ArrowBackIcon />}
  onClick={() => navigate("/coding")}
  sx={{ width: "fit-content", fontSize: "0.8rem", px: 1.5 }}
>
  Back
</Button>

      <div className="flex flex-col md:flex-row gap-4">
        <CodeEditor title="Design Block" value={designCode} onChange={setDesignCode} />
        <CodeEditor title="Testbench" value={tbCode} onChange={setTbCode} />
      </div>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button variant="contained" onClick={handleRun}>Run</Button>
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

export default CodingPlayground;
