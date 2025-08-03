import { useState ,useMemo} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { AuthProvider } from './context/AuthContext'
import Footer from './components/Footer'

function App() {
 const [isDarkMode, setIsDarkMode] = useState(true);
 const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          background: {
            default: isDarkMode ? "#000000" : "#ffffff",
            paper: isDarkMode ? "#000000" : "#ffffff",
          },
          text: {
            primary: isDarkMode ? "#fff" : "#000",
          },
        },
      }),
    [isDarkMode]
  );
  return (
  <>
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
        <Navbar toggleTheme={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
      <AppRoutes/>
      <Footer/>
    </ThemeProvider>
  </AuthProvider>
  
    
  </>
  )
}

export default App
