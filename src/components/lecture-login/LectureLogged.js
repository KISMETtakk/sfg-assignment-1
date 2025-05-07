import React, { useLayoutEffect, useState } from 'react';
import './LectureLogged.css'; // Make sure this path is correct
import { Link } from 'react-router-dom';
import { FaChalkboardTeacher, FaCalendarAlt } from 'react-icons/fa';
import LectureNavigationBar from './LectureNavigationBar';

const StudentLogged = () => {
  const [pageReady, setPageReady] = useState(false);

  useLayoutEffect(() => {
    const timer = setTimeout(() => setPageReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="lecture-student-logged-wrapper">
      <LectureNavigationBar />
      <div className="lecture-student-card-section">
        <div className="lecture-card-container">

          <Link to="/consult-with-lecture" className="lecture-flip-card-link">
            <div className={`lecture-flip-card ${pageReady ? 'lecture-fade-slide-up lecture-delay-1' : ''}`}>
              <div className="lecture-flip-card-inner">
                <div className="lecture-flip-card-front">
                  <FaChalkboardTeacher className="lecture-card-icon" />
                  <h3>VIEW CONSULTATIONS</h3>
                </div>
                <div className="lecture-flip-card-back">
                  <p>View all the consultations from students</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/view-timetable" className="lecture-flip-card-link">
            <div className={`lecture-flip-card ${pageReady ? 'lecture-fade-slide-up lecture-delay-2' : ''}`}>
              <div className="lecture-flip-card-inner">
                <div className="lecture-flip-card-front">
                  <FaCalendarAlt className="lecture-card-icon" />
                  <h3>REPORT MAINTENANCE</h3>
                </div>
                <div className="lecture-flip-card-back">
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
