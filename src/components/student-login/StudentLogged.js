import React from 'react';
import StudentNavigationBar from './StudentNavigationBar';
import './StudentLogged.css';
import { Link } from 'react-router-dom';
import { FaChalkboardTeacher, FaCalendarAlt, FaTools } from 'react-icons/fa';

const StudentLogged = () => {
  return (
    <div className="student-logged-wrapper">
      <StudentNavigationBar />
      <div className="student-card-section">
        <div className="card-container">

          <Link to="/consult-with-lecture" className="flip-card-link">
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <FaChalkboardTeacher className="card-icon" />
                  <h3>CONSULT WITH LECTURE</h3>
                </div>
                <div className="flip-card-back">
                  <p>Book a session with your lecturer for academic guidance.</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/view-timetable" className="flip-card-link">
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <FaCalendarAlt className="card-icon" />
                  <h3>VIEW TIMETABLE</h3>
                </div>
                <div className="flip-card-back">
                  <p>Access your latest class and exam schedules.</p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/report-for-maintenance" className="flip-card-link">
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <FaTools className="card-icon" />
                  <h3>REPORT FOR MAINTENANCE</h3>
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
