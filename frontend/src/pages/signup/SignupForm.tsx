import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  useTheme
} from "@mui/material";
import { Facebook, Google, LinkedIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import API_URL from "../../config/api";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignupForm: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Signup failed");

      const result = await response.json();
      console.log("✅ Signup successful:", result);
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
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
        or use your email for registration
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        {...register("name", { required: true })}
        error={!!errors.name}
        helperText={errors.name && "Name is required"}
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#F5F5F5',
          input: { color: theme.palette.text.primary }
        }}
      />

      <TextField
        label="Email"
        type="email"
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
        SIGN UP
      </Button>

      <Typography variant="body2" align="center">
        Already have an account?{' '}
        <a href="/login" style={{ color: theme.palette.primary.main, textDecoration: 'underline' }}>
          Sign in here
        </a>
      </Typography>
    </Box>
  );
};

export default SignupForm;