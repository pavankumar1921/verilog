import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useNavigate } from "react-router-dom";

const Coding = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleAgree = () => {
    navigate("/intermediate");
  };

  const handleTraining = () => {
        navigate("/traincode");

  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", pt: "64px" }}>
      {/* === Blur Overlay === */}
      {showDisclaimer && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 2000,
            pointerEvents: "auto",
          }}
        />
      )}

      {/* === Popup Box === */}
      {showDisclaimer && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 2100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 6,
              width: isMobile ? "90%" : "600px",
              borderRadius: 4,
              backdropFilter: "blur(25px)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)",
              border: "1px solid rgba(255,255,255,0.3)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
              textAlign: "center",
              position: "relative",
              pointerEvents: "auto",
            }}
          >
            {/* Top-left Close Button with Go Back */}
            <Button
              onClick={handleBack}
              startIcon={
                <CloseRoundedIcon sx={{ color: "#0c0c0cff", fontSize: "1.5rem" }} />
              }
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
                color: "#0c0c0cff",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Go Back
            </Button>

            {/* Title */}
            <Typography variant="h4" gutterBottom>
              ⚠️ Disclaimer
            </Typography>

            {/* Content */}
            <Typography sx={{ fontSize: "1.15rem", mb: 4 }}>
              This platform is intended for educational use only.
              <br />
              By continuing, you agree to our terms and privacy policy.
            </Typography>

            {/* Buttons */}
            <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
              <Button
                variant="contained"
                onClick={handleAgree}
                sx={{ px: 4, py: 1.5 }}
              >
                Coding
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleTraining}
                sx={{ px: 4, py: 1.5 }}
              >
                Training
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      {/* === Page Content === */}
      {/* <Box
        sx={{
          textAlign: "center",
          mt: 8,
          filter: showDisclaimer ? "blur(0px)" : "none",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to <span style={{ color: "limegreen" }}>Silicon Sandbox</span>
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
          <Button variant="contained" onClick={() => navigate("/intermediate")}>
            Coding
          </Button>
          <Button variant="contained" onClick={() => navigate("/traincode")}>
            Training
          </Button>
        </Box>
      </Box> */}
    </Box>
  );
};

export default Coding;
