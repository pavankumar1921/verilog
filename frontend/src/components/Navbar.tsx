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
  Divider,
} from "@mui/material";
import { Snackbar,Alert } from "@mui/material"
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

type HoverDropdownProps = {
  label: string;
  menuItems: { label: string; to: string }[];
};

function HoverDropdown({ label, menuItems }: HoverDropdownProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

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

type NavbarProps = {
  toggleTheme: () => void;
  isDarkMode: boolean;
};

export default function Navbar({ toggleTheme, isDarkMode }: NavbarProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [snackbarOpen , setSnackbarOpen] = useState(false)

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: "background.paper", color: "text.primary" }}
    >
     <Snackbar
  open={snackbarOpen}
  autoHideDuration={2000}
  onClose={() => setSnackbarOpen(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
  sx={{ mt: 2 }}
>
  <Alert
    severity="success"
    sx={{
      width: "100%",
      fontSize: "1rem",
      py: 1.5,
      px: 4,
      borderRadius: 2,
    }}
  >
     You have been logged out.
  </Alert>
</Snackbar>


      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{ fontWeight: "bold", textDecoration: "none", color: "inherit" }}
          >
            <span style={{ color: "limegreen" }}>S</span>ilicon
            <span style={{ color: "limegreen" }}>S</span>andbox
          </Typography>

          <HoverDropdown label="Coding" menuItems={[{ label: "Coding", to: "/coding" }]} />

          <HoverDropdown
            label="Courses"
            menuItems={[
              { label: "Digital", to: "/courses/digital" },
              { label: "Verilog", to: "/courses/verilog" },
              { label: "SystemVerilog", to: "/courses/systemVerilog" },
              { label: "UVM", to: "/courses/uvm" },
            ]}
          />

          <HoverDropdown
            label="Projects"
            menuItems={[
              { label: "Design", to: "/projects/design" },
              { label: "Verification", to: "/projects/verification" },
            ]}
          />

          <HoverDropdown
            label="Interview"
            menuItems={[
              { label: "Question sets", to: "/interview/questionSets" },
              { label: "Sample Resumes", to: "/interview/mock" },
            ]}
          />

          <HoverDropdown
            label="Support"
            menuItems={[
              { label: "Help Center", to: "/support/help" },
              { label: "Contact Us", to: "/support/contact" },
              { label: "Feedback", to: "/support/feedback" },
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
          <Tooltip title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          {user ? (
            <>
              <Tooltip title="Account">
                <IconButton color="inherit" onClick={handleProfileClick}>
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              <Popper open={open} anchorEl={anchorEl} placement="bottom-end" transition disablePortal>
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
                    <Paper sx={{ mt: 1, minWidth: 180 }}>
                      <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                        <MenuList autoFocusItem={open}>
                          <MenuItem component={Link} to="/profile" onClick={() => setAnchorEl(null)}>
                            Profile
                          </MenuItem>
                          <MenuItem onClick={() => { logout(); setAnchorEl(null); setSnackbarOpen(true); setTimeout(()=>navigate("/"),1500);}}>Logout</MenuItem>
                          <Divider />
                          <MenuItem disabled>Settings</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          ) : (
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          )}

          
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
