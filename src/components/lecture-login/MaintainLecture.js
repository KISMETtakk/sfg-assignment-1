import React, { useState, useEffect } from 'react';
import './MaintainLecture.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import StudentNavigationBar from '../lecture-login/LectureNavigationBar';
import { FaArrowLeft } from "react-icons/fa";
import ReportImg from "../assets/images/Report2.PNG";

const MaintainLecture = () => {
  const [loading, setLoading] = useState(true);  
  const [report, setReport] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const handleBack = () => {
    window.history.back(); // or use navigate() if preferred
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
        <div className="spinner-l"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <StudentNavigationBar />
      <div className={`lecture-main-maintenance-container ${isLoaded ? 'lecture-main-maintenance-loaded' : ''}`}>    
        <button className="student-login-back-button-ttt" onClick={handleBack}>
          <FaArrowLeft size={20} />
        </button>        

        <div className="lecture-main-maintenance-card">
          <div className="lecture-main-left-section">
            <div className="lecture-main-icon-container">
              <FontAwesomeIcon icon={faWrench} className="lecture-main-icon" />
              <div className="lecture-main-icon-text">REPORT FOR<br />MAINTENANCE</div>
            </div>
            
            <h2 className="lecture-main-title">Write us a report below</h2>
            <div className="lecture-main-counter">{report.length}/400</div>

            <form onSubmit={handleSubmit}>
              <textarea 
                className="lecture-main-textarea"
                placeholder="Write us here..."
                value={report}
                onChange={handleReportChange}
              />
              
              <button 
                type="submit" 
                className="lecture-main-submit-btn"
                disabled={report.trim().length === 0}
              >
                Submit Report
              </button>
            </form>
          </div>
          
          <div className="lecture-main-right-section">
            <h1 className="lecture-main-heading">About Consultation Timetable</h1>
            <h3 className="lecture-main-subheading">Maintenance Report Section</h3>
            <p className="lecture-main-description">
              This section helps students to quickly report any maintenance issues, for
              example, such as broken lights, leaking or damaged facilities. Simply fill in the
              details, and our maintenance team will attend to it promptly to ensure a safe
              and functional environment for all.
            </p>
            <div
              className="lecture-main-illustration"
              style={{ backgroundImage: `url(${ReportImg})` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaintainLecture;
