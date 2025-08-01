// src/pages/signin/SigninForm.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Box, TextField, Button, Typography, IconButton } from "@mui/material";
import { Facebook, Google, LinkedIn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Login failed");

      const result = await response.json();
      console.log("successful",result)
      localStorage.setItem("authToken", result.token);
      localStorage.setItem("userData", JSON.stringify(result.user));
      navigate("/homepage");
    } catch (err) {
      console.error("Login error:", err);
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
        or use your email for sign in
      </Typography>
      <TextField
        label="Email"
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
      <Typography variant="caption" alignSelf="flex-end" sx={{ color: '#000', cursor: 'pointer' }}>
        Forget Your Password?
      </Typography>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 1, backgroundColor: '#000', color: '#FFF', '&:hover': { backgroundColor: '#333' } }}
      >
        SIGN IN
      </Button>
    </Box>
  );
};

export default SigninForm;
