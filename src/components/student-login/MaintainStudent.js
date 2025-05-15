import React, { useState, useEffect } from 'react';
import './MaintainStudent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import StudentNavigationBar from './StudentNavigationBar';
import { FaArrowLeft } from "react-icons/fa";
import ReportImg from "../assets/images/Report.PNG";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MaintainStudent = () => {
  const [loading, setLoading] = useState(true);  
  const [report, setReport] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const student = JSON.parse(localStorage.getItem('student'));

  const handleBack = () => {
    window.history.back();
  };

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleReportChange = (e) => {
    if (e.target.value.length <= 400) {
      setReport(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!student?.studentID) {
      toast.error("Student not logged in.");
      return;
    }

    const payload = {
      reportedByStudentId: student.studentID,
      issueDescription: report.trim()
    };

    try {
      await axios.post("http://localhost:8180/api/report-issues", payload);
      toast.success("Report submitted successfully!");
      setReport('');
    } catch (error) {
      console.error("Failed to submit report:", error);
      toast.error("Failed to submit report. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <StudentNavigationBar />
      <ToastContainer />
      <div className={`student-maintenance-container ${isLoaded ? 'student-maintenance-loaded' : ''}`}>    
        <button className="student-login-back-button-tt" onClick={handleBack}>
          <FaArrowLeft size={20} />
        </button>        
        <div className="student-maintenance-card">
          <div className="student-maintenance-left-section">
            <div className="student-maintenance-icon-container">
              <FontAwesomeIcon icon={faWrench} className="student-maintenance-icon" />
              <div className="student-maintenance-icon-text">REPORT FOR<br />MAINTENANCE</div>
            </div>
            
            <h2 className="student-maintenance-title">Write us a report below</h2>
            <div className="student-maintenance-counter">{report.length}/400</div>
            
            <form onSubmit={handleSubmit}>
              <textarea 
                className="student-maintenance-textarea"
                placeholder="Write us here..."
                value={report}
                onChange={handleReportChange}
              />
              <button 
                type="submit" 
                className="student-maintenance-submit-btn"
                disabled={report.trim().length === 0}
              >
                Submit Report
              </button>
            </form>
          </div>
          
          <div className="student-maintenance-right-section">
            <h1 className="student-maintenance-heading">About Consultation Timetable</h1>
            <h3 className="student-maintenance-subheading">Maintenance Report Section</h3>
            <p className="student-maintenance-description">
              This section helps students to quickly report any maintenance issues, such as broken lights, leaking or damaged facilities.
              Simply fill in the details, and our maintenance team will attend to it promptly.
            </p>
            <div className="student-maintenance-illustration" style={{ backgroundImage: `url(${ReportImg})` }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaintainStudent;
