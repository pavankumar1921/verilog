import React from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import SigninForm from "./SigninForm";

const TransitionContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSignUp',
})(({ isSignUp }: { isSignUp: boolean }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  position: 'relative',
  transition: 'transform 0.6s ease-in-out',
  transform: isSignUp ? 'translateX(0%)' : 'translateX(-50%)',
}));

type PanelProps = {
  panelSide: 'left' | 'right';
  isSignUp: boolean;
};


const Panel = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'panelSide' && prop !== 'isSignUp',
})<PanelProps>(({ panelSide, isSignUp, theme }: any) => ({
  position: 'absolute',
  width: '50%',
  height: '100%',
  top: 0,
  left: panelSide === 'left' ? 0 : '40%',
  background: panelSide === 'left'
    ? 'linear-gradient(to bottom right,rgb(118, 229, 14), #333333)'
    : 'linear-gradient(to bottom right, rgb(118, 229, 14), #424242)',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
  zIndex: 1,
  transition: 'transform 0.6s ease-in-out',
  transform:
    panelSide === 'left'
      ? (isSignUp ? 'translateX(0%)' : 'translateX(100%)')
      : (isSignUp ? 'translateX(-100%)' : 'translateX(0%)'),
}));


const Signin: React.FC = () => {
  const [isSignUp, setIsSignUp] = React.useState(false);
  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper
        elevation={6}
        sx={{ width: 800, height: 500, overflow: 'hidden', position: 'relative', borderRadius: 5, backgroundColor: '#FFFFFF' }}
      >
        <TransitionContainer isSignUp={isSignUp}>
          <Box sx={{ width: '50%', p: 5, zIndex: 2, backgroundColor: '#FFFFFF' }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#000000' }}>
              Sign In
            </Typography>
            <SigninForm />
          </Box>

          <Panel panelSide="left" isSignUp={isSignUp}>
            <Typography variant="h4" gutterBottom>
              {isSignUp ? 'Welcome Back!' : 'Hello, Friend!'}
            </Typography>
            <Typography variant="body2" align="center" mb={3}>
              {isSignUp
                ? 'Enter your personal details to use all of site features'
                : 'Register with your personal details to use all of site features'}
            </Typography>
            <Button variant="outlined" color="inherit" onClick={toggleForm} sx={{ borderColor: 'white', color: 'white' }}>
              {isSignUp ? 'SIGN IN' : 'SIGN UP'}
            </Button>
          </Panel>
        </TransitionContainer>
      </Paper>
    </Grid>
  );
};

export default Signin;
