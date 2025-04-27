// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LogoSection from "./components/logo-section/LogoSection";
import RoleButtons from "./components/role-button-section/RoleButtons";
import ImageGrid from "./components/image-grid-section/ImageGrid";
import StudentLogin from "./components/student-login/StudentLogin"; // Import your login page
import LectureLogin from "./components/lecture-login/LectureLogin"; // Import your login page
import AdminLogin from "./components/admin-login/AdminLogin"; // Import your login page
import StudentLogged from './components/student-login/StudentLogged';
import AdminDashboard from "./components/admin-login/AdminDashboard";
 // Import your login page
import "./App.css";

function Home() {
  return (
    <div className="app-container">
      <div className="left-section">
        <LogoSection />
        <RoleButtons />
      </div>
      <div className="right-section">
        <ImageGrid />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/lecture-login" element={<LectureLogin />} />          
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/student-logged" element={<StudentLogged />} />
          <Route path = "/admin-Dashboard" element={<AdminDashboard/>}/>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
