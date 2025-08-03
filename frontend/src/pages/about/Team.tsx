import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Team = () => {
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
        Our Team
      </Typography>
      <Typography variant="body1">
        Meet the minds behind Silicon Sandbox. This page will highlight our developers, educators, and contributors.
      </Typography>
    </Box>
  );
};

export default Team;
