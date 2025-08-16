import React from "react";
import { useTheme } from "@mui/material/styles";
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
import { Facebook, Instagram, LinkedIn, X } from "@mui/icons-material";


export default function Footer() {
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary, pt: 8, pb: 2 ,  }}>
        {/* Top Footer Content */}
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ px: { xs: 3, md: 10 }, maxWidth: "1400px", mx: "auto" }}
        >
          {/* Column 1 - Address */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
             <span style={{ color: "limegreen" }}>S</span>ilicon
            <span style={{ color: "limegreen" }}>S</span>andbox
            </Typography>
            <Typography>A108 Adam Street</Typography>
            <Typography>New York, NY 535022</Typography>
            <Typography sx={{ mt: 1 }}>
              <strong>Phone:</strong> +1 5589 55488 55
            </Typography>
            <Typography>
              <strong>Email:</strong> info@example.com
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[<X />, <Facebook />, <Instagram />, <LinkedIn />].map(
                (icon, i) => (
                  <IconButton
                    key={i}
                    sx={{
                      border: "1px solid #ccc",
                      mx: 0.5,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                    }}
                  >
                    {icon}
                  </IconButton>
                )
              )}
            </Box>
          </Grid>

          {/* Column 2 - Useful Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Useful Links
            </Typography>
            {[
              "Home",
              "About us",
              "Services",
              "Terms of service",
              "Privacy policy",
            ].map((link, i) => (
              <Typography key={i}>
                <Link href="#" underline="hover" color="inherit">
                  {link}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Column 3 - Our Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Our Services
            </Typography>
            {[
              "Web Design",
              "Web Development",
              "Product Management",
              "Marketing",
              "Graphic Design",
            ].map((service, i) => (
              <Typography key={i}>
                <Link href="#" underline="hover" color="inherit">
                  {service}
                </Link>
              </Typography>
            ))}
          </Grid>

          {/* Column 4 - Newsletter */}
<Grid item xs={12} md={3}>
  <Typography variant="h6" fontWeight="bold" gutterBottom>
    Our Newsletter
  </Typography>
  <Typography sx={{ mb: 2 }}>
    Subscribe to our newsletter and receive the latest news about our
    products and services!
  </Typography>

  {/* ↓↓↓ Add this Box to control width */}
  <Box sx={{ maxWidth: 350 }}> {/* You can adjust 250 to your need */}
    <TextField
      fullWidth
      placeholder="Your Email"
      variant="outlined"
      size="small"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                backgroundColor: "#4cd964",
                textTransform: "none",
                px: 2,
                mr: -1,
                "&:hover": { backgroundColor: "#43c45b" },
              }}
            >
              Subscribe
            </Button>
          </InputAdornment>
        ),
        sx: { borderRadius: "20px" },
      }}
    />
  </Box>
</Grid>

        </Grid>

        {/* Bottom Strip */}
        <Box
          sx={{
            mt: 6,
            backgroundColor: "#f1f1f1",
            py: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            © Copyright <strong><span style={{ color: "limegreen" }}>S</span>ilicon
            <span style={{ color: "limegreen" }}>S</span>andbox</strong>. All Rights Reserved
          </Typography>
          {/* <Typography variant="body2" color="textSecondary">
            Designed by{" "}
            <Link href="#" sx={{ color: "#4cd964" }}>
              BootstrapMade
            </Link>{" "}
            Distributed by{" "}
            <Link href="#" sx={{ color: "#4cd964" }}>
              ThemeWagon
            </Link>
          </Typography> */}
        </Box>
      </Box>
  );
}
