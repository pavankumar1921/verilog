import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Paper,
  Popper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Grow,
  IconButton,
  Tooltip,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTheme } from "@mui/material/styles";

// Styles for the hover effect in menu items
const hoverStyles = {
  textTransform: "none",
  position: "relative",
  transition: "all 0.3s ease",
  transformOrigin: "center",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "0%",
    height: "3px",
    left: 0,
    bottom: -4,
    backgroundColor: "limegreen",
    transition: "width 0.3s ease",
  },
  "&:hover": {
    backgroundColor: "transparent",
    color: "limegreen",
    transform: "scale(1.3)",
    "&::after": {
      width: "100%",
    },
  },
};

// Dropdown menu component
function HoverDropdown({ label, menuItems = [] }) {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);

  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Button ref={anchorRef} sx={hoverStyles} color="inherit">
        {label}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              sx={{ mt: 1 }}
            >
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList autoFocusItem={open}>
                  {menuItems.map((item, index) => (
                    <MenuItem
                      key={index}
                      component={Link}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      sx={{
                        transition: "all 0.2s ease",
                        "&:hover": {
                          color: "limegreen",
                          transform: "scale(1.3)",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

// Navbar component
export default function Navbar({ toggleTheme, isDarkMode }) {
  const theme = useTheme(); // Use theme hook inside the component

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: 2000,
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(0, 0, 0, 0)" // Dark mode transparent background
            : "rgba(255, 255, 255, 0.2)", // Light mode transparent background
        backdropFilter: "blur(10px)", // Glassmorphism effect
        WebkitBackdropFilter: "blur(10px)", // Safari support
        color: "text.primary",
        boxShadow: "none", // Remove box shadow for a clean look
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              fontWeight: "bold",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <span style={{ color: "limegreen" }}>S</span>ilicon
            <span style={{ color: "limegreen" }}>S</span>andbox
          </Typography>

          <HoverDropdown
            label="Codelab"
            menuItems={[{ label: "Learn & Code", to: "/skilltrack" }]}
          />
          <HoverDropdown
            label="Interview"
            menuItems={[
              { label: "Question sets", to: "/interview/Question sets" },
              { label: "Sample Resumes", to: "/interview/mock" },
            ]}
          />
          <HoverDropdown
            label="Support"
            menuItems={[
              { label: "Contact Us", to: "/contact" },
              { label: "Feedback", to: "/Feedback" },
            ]}
          />
          <HoverDropdown
            label="About Us"
            menuItems={[
              { label: "Our Team", to: "/about/team" },
              { label: "Mission", to: "/about/mission" },
              { label: "Careers", to: "/about/careers" },
            ]}
          />
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <Tooltip title="Profile">
            <IconButton component={Link} to="/profile" color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
          <Button component={Link} to="/verilog" color="inherit">
            Verilog
          </Button>
          <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
