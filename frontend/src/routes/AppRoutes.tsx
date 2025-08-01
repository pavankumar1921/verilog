import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import Homepage from '../pages/homepage';
import CodingPlayground from '../pages/eda/CodingPlayground';
import Coding from '../pages/Coding';
import TrainingPlayground from '../pages/eda/TrainingPlayground';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Signin />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/codingplayground" element={<CodingPlayground />} />
      <Route path="/trainingplayground" element={<TrainingPlayground />} />
      <Route path="/coding" element={<Coding/>} />
    </Routes>
  );
};

export default AppRoutes;
