import React, { useState } from "react";
import { Typography, Button, type Theme, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const pageVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "-100%" },
};

const Coding: React.FC = () => {
     const theme: Theme = useTheme();
  const [activePage, setActivePage] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-black transition-colors duration-300"   
    style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}>
      {!activePage && (
        <div className="text-center z-10">
          <Typography variant="h4" gutterBottom>
            Welcome to <span className="text-lime-500">Silicon Sandbox</span>
          </Typography>

          <div className="flex gap-4 justify-center mt-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="contained"
                onClick={() => {
                  setActivePage("coding");
                  setTimeout(() => navigate("/codingplayground"), 600);
                }}
              >
                Coding
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="contained"
                onClick={() => {
                  setActivePage("training");
                  setTimeout(() => navigate("/trainingplayground"), 600);
                }}
              >
                Training
              </Button>
            </motion.div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {activePage && (
          <motion.div
            key={activePage}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-white dark:bg-black flex items-center justify-center z-20"
          >
            <Typography variant="h5">
              Loading{" "}
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)} Page...
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Coding;
