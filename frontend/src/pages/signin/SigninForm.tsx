import { useForm, type SubmitHandler } from "react-hook-form";
import { Box, TextField, Button, Typography, IconButton, useTheme, Alert } from "@mui/material";
import { Facebook, Google, LinkedIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../config/env";

type Inputs = {
  email: string;
  password: string;
};

const SigninForm: React.FC = () => {
  const { login } = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setErrorMsg(null);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      // Fetch full user profile using the token
      const profileRes = await fetch(`${API_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${result.token}` },
      });
      const profile = await profileRes.json();

      login({
        email: profile.email,
        username: profile.username,
        token: result.token,
        role: profile.role,
        avatar: profile.avatar,
        xp: profile.xp,
        coins: profile.coins,
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
        or use your email to sign in
      </Typography>

      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <TextField
        label="Email"
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
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#F5F5F5",
          input: { color: theme.palette.text.primary },
        }}
      />

      <Typography
        variant="caption"
        alignSelf="flex-end"
        sx={{ color: theme.palette.text.primary, cursor: "pointer" }}
      >
        Forgot Your Password?
      </Typography>

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
        {isSubmitting ? "Signing in..." : "SIGN IN"}
      </Button>
    </Box>
  );
};

export default SigninForm;
