// import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Mission = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "90vh",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        p: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Our Mission
      </Typography>
      <Typography variant="body1">
        Learn more about the mission and vision of Silicon Sandbox — empowering learners and engineers in digital design.
      </Typography>
    </Box>
  );
};

export default Mission;
