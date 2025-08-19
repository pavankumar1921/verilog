import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  useTheme,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stopwatch from "../Livetimer";

const navTabs = [
  { label: "codedes", path: "/traincode/codedes" },
  { label: "samplecode", path: "/traincode/samplecode" },
  { label: "startcoding", path: "/traincode/startcoding" },
  { label: "public-submissions", path: "/traincode/public-submissions" },
];

const drawerItems = [
  "All Products",
  "High Price of Products",
  "Average Salary",
  "Locate People",
  "Distinct Companies",
  "Fiction Collection Size",
  "List of Movies with Ratings",
  "Handling NULL Values",
  "Salary of Employees",
  "Department of Each Employee",
];

export default function TrainCodeTabs() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentTabIndex = navTabs.findIndex((tab) =>
    location.pathname.includes(tab.path)
  );

  const handleChange = (event, newValue) => {
    const newPath = navTabs[newValue].path;
    navigate(newPath, {
      state: { from: location.pathname },
      relative: "path",
    });
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  //   const goHome = () => {
  //   if (window.history.length > 2) {
  //     navigate(-1);
  //   } else {
  //     navigate("/traincode"); // fallback route if no history
  //   }
  // };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* App Bar */}
      <AppBar
        position="static"
        sx={{ bgcolor: theme.palette.background.paper, boxShadow: "none" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="inherit"
              onClick={() => {
                const from = location.state?.from;
                if (from) {
                  navigate(from);
                } else {
                  navigate("/traincode");
                }
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            <Typography variant="h6">Train & Code</Typography>
          </Box>

          {/* Timer + Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Stopwatch />
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Navigation Tabs */}
        <Tabs
          value={currentTabIndex === -1 ? 0 : currentTabIndex}
          onChange={handleChange}
          textColor="inherit"
          TabIndicatorProps={{
            style: { backgroundColor: theme.palette.primary.main, height: 3 },
          }}
          sx={{
            px: 3,
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              color: theme.palette.text.secondary,
              minWidth: 100,
            },
            "& .Mui-selected": {
              color: theme.palette.text.primary,
              fontWeight: "bold",
            },
          }}
        >
          {navTabs.map((tab) => (
            <Tab key={tab.label} label={tab.label} />
          ))}
        </Tabs>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ p: 3, flexGrow: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Right Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 300,
            mt: 8,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
      >
        <Box sx={{ p: 2, position: "relative" }}>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              color: theme.palette.text.primary,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" gutterBottom sx={{ pr: 4, mt: 4 }}>
            Practice Basic Commands
          </Typography>
          <Divider sx={{ bgcolor: theme.palette.divider, my: 1 }} />
          <List>
            {drawerItems.map((item, index) => (
              <ListItem button key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
