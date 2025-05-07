import React, { useLayoutEffect, useState } from 'react';
import '../student-login/StudentLogin.css'; // Adjust the path as necessary
import { Link } from 'react-router-dom';
import { FaChalkboardTeacher, FaCalendarAlt, FaTools } from 'react-icons/fa';

const StudentLogged = () => {
  const [pageReady, setPageReady] = useState(false);

  useLayoutEffect(() => {
    const timer = setTimeout(() => setPageReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="student-logged-wrapper">
      
      <div className="student-card-section">
        <div className="card-container">

          <Link to="/consult-with-lecture" className="flip-card-link">
            <div className={`flip-card ${pageReady ? 'fade-slide-up delay-1' : ''}`}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <FaChalkboardTeacher className="card-icon" />
                  <h3>VIEW CONSULTATIONS</h3>
                </div>
                <div className="flip-card-back">
                    <p>View all the consultations from students</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/view-timetable" className="flip-card-link">
            <div className={`flip-card ${pageReady ? 'fade-slide-up delay-2' : ''}`}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <FaCalendarAlt className="card-icon" />
                  <h3>REPORT MAINTENANCE</h3>
                </div>
                <div className="flip-card-back">
                <p>Submit issues related to campus facilities and equipment.</p>
                </div>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default StudentLogged;
