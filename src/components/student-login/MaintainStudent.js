import React, { useState, useEffect } from 'react';
import './MaintainStudent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import StudentNavigationBar from './StudentNavigationBar';
import { FaArrowLeft } from "react-icons/fa";
import ReportImg from "../assets/images/Report.PNG";


const MaintainStudent = () => {
  const [loading, setLoading] = useState(true);  
  const [report, setReport] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const handleBack = () => {
    window.history.back(); // or navigate to a specific route using react-router
  };
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleReportChange = (e) => {
    if (e.target.value.length <= 400) {
      setReport(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Report submitted:', report);
    alert('Report submitted successfully!');
    setReport('');
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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
            This section helps students to quickly report any maintenance issues, for
            example, such as broken lights, leaking or damaged facilities. Simply fill in the
            details, and our maintenance team will attend to it promptly to ensure a safe
            and functional environment for all.
          </p>
            <div
            className="student-maintenance-illustration"
            style={{ backgroundImage: `url(${ReportImg})` }}
            ></div>

        </div>
      </div>
    </div>
    </>
  );
};

export default MaintainStudent;
