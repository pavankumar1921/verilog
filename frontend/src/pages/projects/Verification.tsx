// import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const VerificationProjects = () => {
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
        Verification Projects
      </Typography>
    </Box>
  );
};

export default VerificationProjects;
