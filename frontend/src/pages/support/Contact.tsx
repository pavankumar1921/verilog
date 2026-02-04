// import React from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Contact = () => {
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
        Contact Us
      </Typography>
      <Typography variant="body1">
        Reach out to us with your questions, feedback, or collaboration inquiries.
      </Typography>
    </Box>
  );
};

export default Contact;
