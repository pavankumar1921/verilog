import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Grid, Paper, Typography, Button, Stack } from "@mui/material";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";

export default function CodeS() {
  const [designCode, setDesignCode] = useState("module design;\nendmodule");
  const [tbCode, setTbCode] = useState("module tb;\nendmodule");
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.6 }}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          p: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {/* Back Button */}
        <Button
          variant="outlined"
          onClick={() => {
            const from = location.state?.from;
            if (from) {
              navigate(from);
            } else {
              navigate("/traincode");
            }
          }}
          sx={{ alignSelf: "flex-start", ml: 2, mt: 1 }}
        >
          ← Back
        </Button>

        {/* Code Editor Panels */}
        <Grid container spacing={1} sx={{ flexGrow: 1, mt:7 }}>
          {/* Design Block */}
          <Grid item xs={5}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                marginLeft: "90px",
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Design Block
              </Typography>
              <Editor
                height="260px"
                width="40vw"
                defaultLanguage="verilog"
                value={designCode}
                onChange={(value) => setDesignCode(value)}
                theme="vs-dark"
              />
              <Button variant="contained" sx={{ mt: 2 }} color="primary">
                Compile
              </Button>
            </Paper>
          </Grid>

          {/* Testbench Block */}
          <Grid item xs={6}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Testbench
              </Typography>
              <Editor
                height="260px"
                width="40vw"
                defaultLanguage="verilog"
                value={tbCode}
                onChange={(value) => setTbCode(value)}
                theme="vs-dark"
              />
              <Button variant="contained" sx={{ mt: 2 }} color="primary">
                Compile
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Stack
          direction="row"
          justifyContent="center"
          spacing={1}
          sx={{ my: 1 }}
        >
          <Button variant="outlined">RUN</Button>
          <Button variant="outlined" onClick={() => navigate("/waveform")}>
            WAVEFORM
          </Button>
          <Button variant="outlined" onClick={() => navigate("/rtl")}>
            RTL
          </Button>
        </Stack>

        {/* Terminal */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            backgroundColor: "#000",
            color: "#0f0",
            fontFamily: "monospace",
            overflow: "auto",
            minHeight: "150px",
          }}
        >
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            THIS IS TERMINAL FOR PRINTING AN OUTPUT
            <br />
            ALSO HELPS TO GIVE INPUT LIKE VS CODE TERMINAL
          </Typography>
        </Paper>
      </Box>
    </motion.div>
  );
}
