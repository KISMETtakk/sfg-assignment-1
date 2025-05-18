import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LogoSection from "./components/logo-section/LogoSection";
import RoleButtons from "./components/role-button-section/RoleButtons";
import ImageGrid from "./components/image-grid-section/ImageGrid";
import StudentLogin from "./components/student-login/StudentLogin"; 
import LectureLogin from "./components/lecture-login/LectureLogin"; 
import AdminLogin from "./components/admin-login/AdminLogin"; 
import StudentLogged from './components/student-login/StudentLogged';
import LectureLogged from './components/lecture-login/LectureLogged';
import AdminDashboard from "./components/admin-login/AdminDashboard";
import ConsultWithLecture from "./components/student-login/ConsultWithLecture";
import ViewTimetable from "./components/student-login/ViewTimetable";
import MaintainStudent from "./components/student-login/MaintainStudent";
import MaintainLecture from "./components/lecture-login/MaintainLecture";
import LectureConsultation from "./components/lecture-login/LectureConsultation";
import LogoutConfirmation from "./components/lecture-login/LogoutConfirmation";
import ConsultationsPage from './components/admin-login/ConsultationPage';
import MaintenancePage from './components/admin-login/MaintenancePage';
import SettingsPage from './components/admin-login/SettingsPage';
import UsersPage from './components/admin-login/UsersPage';
import "./App.css";
import Timetable from "./components/admin-login/TimetablePage";
import TimetablePage from './components/admin-login/TimetablePage';


function Home() {
    const [loading, setLoading] = useState(true);  

      useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
      }, []);
    
      if (loading) {
        return (
          <div className="loader-container">
            <div className="spinner-l"></div>
            <p>Loading...</p>
          </div>
        );
      }
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
          <Route path="/lecture-logged" element={<LectureLogged />} />
          <Route path = "/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path = "/consult-with-lecture" element={<ConsultWithLecture/>}/>
          <Route path = "/view-timetable" element={<ViewTimetable/>}/>
          <Route path = "/maintain-student" element={<MaintainStudent/>}/>
          <Route path = "/maintain-lecture" element={<MaintainLecture/>}/>
          <Route path = "/lecture-consultation" element={<LectureConsultation/>}/>
          <Route path = "/logout-confirmation" element={<LogoutConfirmation/>}/>
          <Route path = "/users-page" element={<UsersPage/>}/>
          <Route path = "/consultations-page" element={<ConsultationsPage/>}/>
          <Route path = "/maintenance-page" element={<MaintenancePage/>}/>
          <Route path = "/settings-page" element={<SettingsPage/>}/>
          <Route path="/timetable-page" element={<TimetablePage />} />

          
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;