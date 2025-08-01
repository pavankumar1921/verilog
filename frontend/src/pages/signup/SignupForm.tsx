// src/pages/signup/SignupForm.tsx
import React from "react";
import { useForm,type SubmitHandler } from "react-hook-form";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { Facebook, Google, LinkedIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
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
    <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2}>
      <Box display="flex" gap={2}>
        <IconButton><Google sx={{ color: '#000' }} /></IconButton>
        <IconButton><Facebook sx={{ color: '#000' }} /></IconButton>
        <IconButton><LinkedIn sx={{ color: '#000' }} /></IconButton>
      </Box>
      <Typography color="#555" fontSize="0.875rem">
        or use your email for registration
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        {...register("name", { required: true })}
        error={!!errors.name}
        helperText={errors.name && "Name is required"}
        sx={{ backgroundColor: '#F5F5F5' }}
      />
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        fullWidth
        {...register("email", { required: true })}
        error={!!errors.email}
        helperText={errors.email && "Email is required"}
        sx={{ backgroundColor: '#F5F5F5' }}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        {...register("password", { required: true })}
        error={!!errors.password}
        helperText={errors.password && "Password is required"}
        sx={{ backgroundColor: '#F5F5F5' }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 1, backgroundColor: '#000', color: '#FFF', '&:hover': { backgroundColor: '#333' } }}
      >
        SIGN UP
      </Button>
      <Typography variant="body2" align="center">
        Already have an account? <a href="/login" className="text-blue-500 hover:underline">Sign in here</a>
      </Typography>
    </Box>
  );
};

export default SignupForm;
