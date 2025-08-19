import React from "react";
import { useNavigate , useLocation } from "react-router-dom";
import { Box, Button, Typography, useTheme, Stack } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

export default function StartCoding() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  
  const handleStart = () => {
  navigate("/codeS", { state: { from: "/traincode/startcoding" } });
};



  const handleBack = () => {
  const from = location.state?.from;
  if (from) {
    navigate(from);
  } else {
    navigate("/traincode");
  }
};


  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        px: 3,
      }}
    >
      <Stack spacing={3} alignItems="center" textAlign="center" maxWidth="600px">
        <CodeIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />
        <Typography variant="h4" fontWeight="bold">
          Ready to Start Coding?
        </Typography>
        <Typography variant="body1">
          Build your logic, test your skills, and practice writing real code in a hands-on environment.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleStart}
          sx={{
            px: 5,
            py: 1.5,
            borderRadius: 2,
            fontWeight: "bold",
          }}
        >
          Start Coding
        </Button>
      </Stack>
    </Box>
  );
}
