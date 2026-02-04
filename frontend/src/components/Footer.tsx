
import { Box, Typography, Stack, Link as MuiLink } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Footer = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderTop: `1px solid ${isDark ? "#333" : "#ccc"}`,
        py: 4,
        px: 2,
        mt: "auto",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        className="max-w-7xl mx-auto w-full"
      >
        {/* Left Section */}
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Silicon Sandbox. All rights reserved.
        </Typography>

        <Stack direction="row" spacing={4}>
          <MuiLink component={Link} to="/support/contact" underline="hover" color="inherit">
            Contact
          </MuiLink>
          <MuiLink component={Link} to="/about/mission" underline="hover" color="inherit">
            About
          </MuiLink>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
