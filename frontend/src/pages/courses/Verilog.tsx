// import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CourseCard from "../../components/CourseCard";

const VerilogCourse = () => {
  const theme = useTheme();

  const courses = [
    {
      title: "Verilog Basics",
      image: "/verilog-1.jpg",
    },
    {
      title: "Advanced Verilog",
      image: "/verilog-2.jpg",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "90vh",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        p: 4,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Verilog Courses
      </Typography>

      <Grid container spacing={3}>
        {courses.map((course, idx) => (
          <div key={idx}>
            <CourseCard {...course} />
          </div>
        ))}
      </Grid>
    </Box>
  );
};

export default VerilogCourse;
