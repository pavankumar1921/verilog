import React from 'react';
import { Routes, Route,Navigate  } from 'react-router-dom';
import Signin from '../pages/signin';
import Signup from '../pages/signup';
import Home from '../pages/homepage';
import CodingPlayground from '../pages/eda/CodingPlayground';
import Coding from '../pages/Coding';
import TrainingPlayground from '../pages/eda/TrainingPlayground';
import ProtectedRoute from './ProtectedRoute';
import DigitalCourse from '../pages/courses/Digital';
import VerilogCourse from '../pages/courses/Verilog';
import SystemVerilogCourse from '../pages/courses/SystemVerilog';
import UVMCourse from '../pages/courses/UVM';
import DesignProjects from '../pages/projects/Design';
import VerificationProjects from '../pages/projects/Verification';
import QuestionSets from '../pages/interview/QuestionSets';
import MockResumes from '../pages/interview/MockResumes';
import HelpCenter from '../pages/support/HelpCenter';
import Contact from '../pages/support/Contact';
import Feedback from '../pages/support/Feedback';
import Team from '../pages/about/Team';
import Mission from '../pages/about/Mission';
import Careers from '../pages/about/Careers';
// import Training from "./components/training";
import TrainCodeTabs from "../pages/traincode/TrainCodeTabs";
import Codedes from "../pages/traincode/codedes";
import StartCoding from "../pages/traincode/startcodeing";
import SampleCode from "../pages/traincode/samplecode";
import PubSub from "../pages/traincode/pubsub";
import CodeS from "../pages/codeS";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Signin />} />
      <Route path="/" element={<Home />} />
      <Route path="/codingplayground" element={<CodingPlayground />} />
      <Route path="/trainingplayground" element={ <ProtectedRoute> <TrainingPlayground /></ProtectedRoute>} />
      <Route path="/skilltrack" element={<Coding/>} />
      <Route path="/codeS" element={<CodeS />} />

      <Route path="/traincode" element={<TrainCodeTabs />}>
          <Route path="/traincode/codedes" element={<Codedes />} />
          <Route path="/traincode/samplecode" element={<SampleCode />} />
          <Route path="/traincode/startcoding" element={<StartCoding />} />
          <Route path="/traincode/public-submissions" element={<PubSub />} />
          <Route index element={<Navigate to="/traincode/codedes" />} />
      </Route> 
      
      {/* courses*/}
      <Route path="/courses/digital" element={<DigitalCourse />} />
      <Route path="/courses/verilog" element={<VerilogCourse />} />
      <Route path="/courses/systemVerilog" element={<SystemVerilogCourse />} />
      <Route path="/courses/uvm" element={<UVMCourse />} />

        {/* Projects */}
      <Route path="/projects/design" element={<DesignProjects />} />
      <Route path="/projects/verification" element={<VerificationProjects />} />

      {/* Interview */}
      <Route path="/interview/questionSets" element={<QuestionSets />} />
      <Route path="/interview/mock" element={<MockResumes />} />

      {/* Support */}
      <Route path="/support/help" element={<HelpCenter />} />
      <Route path="/support/contact" element={<Contact />} />
      <Route path="/support/feedback" element={<Feedback />} />

      {/* About Us */}
      <Route path="/about/team" element={<Team />} />
      <Route path="/about/mission" element={<Mission />} />
      <Route path="/about/careers" element={<Careers />} />
    </Routes>
  );
};

export default AppRoutes;
