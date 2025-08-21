import React from "react";
import { useTheme } from "@mui/material";
import Footer from "../footer/foot";

import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  TextField,
  Button,
  MenuItem,
  Paper,
  InputAdornment,
} from "@mui/material";
import { IconButton } from "@mui/material";

import image from "../../assets/contactus.jpg";

export default function Contact() {
  const theme = useTheme();

  return (
    <>
      {/* -------- Top Banner -------- */}
      <Box
        sx={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          color: "#fff",
          textAlign: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 1 }}>
            Contact Us
          </Typography>
          <Breadcrumbs
            separator=" / "
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "#fff",
              fontSize: "1.1rem",
            }}
          >
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography sx={{ color: "#f1c40f" }}>Contact</Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      
      {/* -------- Contact Form Grid -------- */}
      <Box
        sx={{
          py: 10,
          px: 2,
          backgroundColor: "#6b6674ff", // Violet background stays
        }}
      >
        {/* Padding wrapper to give white box spacing from all sides */}
        <Box
          sx={{
            maxWidth: "1100px",
            margin: "0 auto",
            p: { xs: 2, md: 4 }, // space from all 4 sides inside violet box
            backgroundColor: "#fff", // white box background
            borderRadius: 3,
            boxShadow: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* Left Side */}
            <Box
              sx={{
                flex: 1,
                backgroundColor: "#4b2e83",
                color: "#fff",
                p: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body1" gutterBottom>
                Not sure what you need? The team at Square Events will be happy
                to listen to you and suggest event ideas you hadn't considered.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  📧 info@squareevents.com
                </Typography>
                <Typography variant="body2">📞 (+21) 123 456 586</Typography>
              </Box>
            </Box>

            {/* Right Side Form */}
            <Box sx={{ flex: 1, p: 3, color: "#000" }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                We'd love to hear from you! Let's get in touch
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Full Name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Company" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email" type="email" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Phone Number" />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Address" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#4b2e83",
                      color: "#fff",
                      "&:hover": { backgroundColor: "#3a2266" },
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
       <Footer />
      
    </>
  );
}
