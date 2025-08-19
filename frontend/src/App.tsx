import { useState, useMemo } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Box, Typography, IconButton } from "@mui/material";
import Stopwatch from "./pages/Livetimer";
import { useLocation } from "react-router-dom";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          background: {
            default: isDarkMode ? "#0d1117" : "#f5f5f5",
            paper: isDarkMode ? "#161b22" : "#ffffff",
          },
          text: {
            primary: isDarkMode ? "#e6edf3" : "#1a1a1a",
            secondary: isDarkMode ? "#8b949e" : "#555",
          },
          primary: {
            main: isDarkMode ? "#d9dfe7ff" : "#d1ccdcff",
          },
          secondary: {
            main: isDarkMode ? "#c778dd" : "#d8d2e1ff",
          },
        },
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                "& label": {
                  color: isDarkMode ? "#fff" : undefined,
                },
                "& label.Mui-focused": {
                  color: isDarkMode ? "#edeae2ff" : "#161617ff",
                },
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                color: isDarkMode ? "#fff" : undefined,
                backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? "#888" : "rgba(0, 0, 0, 0.23)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? "#bbb" : "#000",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? "#dbdeeeff" : "#121213ff",
                },
              },
            },
          },
        },
      }),
    [isDarkMode]
  );

  const hideNavbarRoutes = ["/traincode", "/codeS"];
  const isTrainCodePage = hideNavbarRoutes.some((path) =>
    location.pathname.startsWith(path) 
  );

  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {!isTrainCodePage ? (
            <Navbar
              toggleTheme={() => setIsDarkMode(!isDarkMode)}
              isDarkMode={isDarkMode}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: 2,
                py: 1,
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1300,
                backgroundColor: isDarkMode ? "#0d1117" : "#fff",
                borderBottom: "1px solid",
                borderColor: isDarkMode ? "#333" : "#ccc",
                width: "100%",
              }}
            >
              <IconButton
                color="inherit"
                onClick={() => (window.location.href = "/")}
                sx={{ mr: 1 }}
              >
                ←
              </IconButton>

              {/* Theme toggle */}
              <IconButton
                color="inherit"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>

              {/* Timer */}
              <Stopwatch />
            </Box>
          )}
          <AppRoutes />
          <Footer />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
