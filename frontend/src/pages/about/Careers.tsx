// import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Careers = () => {
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
        Careers
      </Typography>
      <Typography variant="body1">
        Interested in joining our team? Check back here for job openings and collaboration opportunities.
      </Typography>
    </Box>
  );
};

export default Careers;
