import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Stack,
  useTheme,
  type Theme,
} from "@mui/material";
import AnimatedTable from "../../components/AnimatedTable";

const Homepage: React.FC = () => {
  const theme: Theme = useTheme();
  const words: string[] = ["Climb", "Explore", "Master", "Advance"];
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [typed, setTyped] = useState<string>("");
  const [charIndex, setCharIndex] = useState<number>(0);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex <= currentWord.length) {
      timeout = setTimeout(() => {
        setTyped(currentWord.substring(0, charIndex));
        setCharIndex(charIndex + 1);
      }, 150);
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setTyped(currentWord.substring(0, charIndex));
        setCharIndex(charIndex - 1);
      }, 75);
    } else if (!deleting && charIndex > currentWord.length) {
      timeout = setTimeout(() => setDeleting(true), 1000);
    } else if (deleting && charIndex < 0) {
      setDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return (
    <div
      className="min-h-[90vh] flex items-center justify-center px-6 md:px-16"
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl gap-24">
        
        <div className="w-full md:w-1/2 space-y-6">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome to <span style={{ color: "limegreen" }}>S</span>ilicon
            <span style={{ color: "limegreen" }}>S</span>andbox
          </Typography>

          <Typography variant="h4" fontWeight="medium" gutterBottom>
            <span
              style={{
                borderRight: "20px solid",
                paddingRight: 4,
                color: "limegreen",
                fontFamily: "monospace",
              }}
            >
              {typed}
            </span>{" "}
            through levels of logic design
          </Typography>

          <Typography variant="body1" paragraph>
            We provide top-quality courses and interview support to help you
            achieve your career goals.
            <br />
            Explore our resources and start learning today with expert mentorship
            and real-world projects.
          </Typography>

          <Stack direction="row" spacing={2} mt={2}>
            <Button variant="contained" color="primary" size="large">
              Browse Courses
            </Button>
            <Button variant="outlined" color="primary" size="large">
              Start Practicing
            </Button>
          </Stack>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <AnimatedTable />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
