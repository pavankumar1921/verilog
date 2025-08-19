// components/Stopwatch.js
import React, { useEffect, useState } from "react";
import { Typography, IconButton } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime"; // Timer icon

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && interval !== null) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleStopwatch = () => {
    setIsRunning((prev) => !prev);
  };

  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <IconButton onClick={toggleStopwatch} color="inherit">
      <AccessTimeIcon />
      <Typography variant="body2" sx={{ ml: 1 }}>
        {formatTime(elapsedTime)}
      </Typography>
    </IconButton>
  );
}
