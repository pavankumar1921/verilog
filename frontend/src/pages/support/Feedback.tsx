import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Feedback = () => {
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
        Feedback
      </Typography>
      <Typography variant="body1">
        We'd love to hear your feedback! Help us improve the platform by sharing your thoughts.
      </Typography>
    </Box>
  );
};

export default Feedback;
