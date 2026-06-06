import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Alert,
  useTheme,
} from "@mui/material";
import { Facebook, Google, LinkedIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../config/env";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const SignupForm: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setErrorMsg(null);
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Signup failed");
      }

      // Signup successful — auto login and go to homepage
      login({
        email: result.user.email,
        username: result.user.username,
        token: result.token,
        role: result.user.role,
        avatar: result.user.avatar,
        xp: result.user.xp,
        coins: result.user.coins,
      });

      navigate("/", { state: { showSuccess: true } });
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong");
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

      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        {...register("username", { required: "Username is required" })}
        error={!!errors.username}
        helperText={errors.username?.message}
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#F5F5F5",
          input: { color: theme.palette.text.primary },
        }}
      />

      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        {...register("email", { required: "Email is required" })}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#F5F5F5",
          input: { color: theme.palette.text.primary },
        }}
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Password must be at least 6 characters" },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#F5F5F5",
          input: { color: theme.palette.text.primary },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={isSubmitting}
        sx={{
          mt: 1,
          backgroundColor: theme.palette.mode === "dark" ? "#444" : "#000",
          color: "#FFF",
          "&:hover": {
            backgroundColor: theme.palette.mode === "dark" ? "#666" : "#333",
          },
        }}
      >
        {isSubmitting ? "Creating account..." : "SIGN UP"}
      </Button>

      <Typography variant="body2" align="center">
        Already have an account?{" "}
        <a
          href="/login"
          style={{ color: theme.palette.primary.main, textDecoration: "underline" }}
        >
          Sign in here
        </a>
      </Typography>
    </Box>
  );
};

export default SignupForm;
