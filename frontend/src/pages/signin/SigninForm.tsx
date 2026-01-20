// src/pages/signin/SigninForm.tsx
// import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Box, TextField, Button, Typography, IconButton, useTheme } from "@mui/material";
import { Facebook, Google, LinkedIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";
// import { Snackbar, Alert } from "@mui/material"

type Inputs = {
  email: string;
  password: string;
};

const SigninForm: React.FC = () => {
  const  {login } = useAuth()
  const theme = useTheme();
  const navigate = useNavigate();
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Login failed");

      const result = await response.json();
      console.log("successful", result);
      login({email:data.email, token:result.token})
      // setSnackbarOpen(true)
      localStorage.setItem("authToken", result.token);
      localStorage.setItem("userData", JSON.stringify(result.user));
      // setTimeout(()=> navigate("/"),2000);
      navigate("/",{
        state: {showSuccess: true}
      })
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Box display="flex" gap={2} justifyContent="center">
        <IconButton><Google sx={{ color: theme.palette.text.primary }} /></IconButton>
        <IconButton><Facebook sx={{ color: theme.palette.text.primary }} /></IconButton>
        <IconButton><LinkedIn sx={{ color: theme.palette.text.primary }} /></IconButton>
      </Box>

      <Typography color={theme.palette.text.secondary} fontSize="0.875rem">
        or use your email for sign in
      </Typography>

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        {...register("email", { required: true })}
        error={!!errors.email}
        helperText={errors.email && "Email is required"}
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#F5F5F5',
          input: { color: theme.palette.text.primary }
        }}
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        {...register("password", { required: true })}
        error={!!errors.password}
        helperText={errors.password && "Password is required"}
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#F5F5F5',
          input: { color: theme.palette.text.primary }
        }}
      />

      <Typography
        variant="caption"
        alignSelf="flex-end"
        sx={{
          color: theme.palette.text.primary,
          cursor: "pointer",
        }}
      >
        Forget Your Password?
      </Typography>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#444' : '#000',
          color: '#FFF',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#666' : '#333',
          },
        }}
      >
        SIGN IN
      </Button>
      {/* <Snackbar
  open={snackbarOpen}
  autoHideDuration={3000}
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
     Signed in successfully.
  </Alert>
</Snackbar> */}

    </Box>

  );
};

export default SigninForm;
