import React from "react";
import { Box, Grid, Paper, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";

const Panel = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #76e50e, #1e1e1e)'
    : 'linear-gradient(135deg, #76e50e, #f0f0f0)',
  color: theme.palette.mode === 'dark' ? 'white' : '#000',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
  height: '100%',
}));

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh" sx={{ backgroundColor: theme.palette.background.default }}>
      <Paper
        elevation={8}
        sx={{ width: '100%', maxWidth: 900, height: { xs: 'auto', md: 500 }, overflow: 'hidden', borderRadius: 4, display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}
      >
        {/* Left Panel */}
        <Box sx={{
          width: isSmallScreen ? '100%' : '50%',
          p: 5,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Create Account
          </Typography>
          <SignupForm />
        </Box>

        {/* Right Panel */}
        <Panel sx={{ width: isSmallScreen ? '100%' : '50%' }}>
          <Typography variant="h4" gutterBottom>Already have an account?</Typography>
          <Typography variant="body1" align="center" mb={3}>
            Sign in now to continue your journey.
          </Typography>
          <Button variant="outlined" color="inherit" onClick={() => navigate("/login")} sx={{ borderColor: 'white', color: 'white' }}>
            SIGN IN
          </Button>
        </Panel>
      </Paper>
    </Grid>
  );
};

export default Signup;