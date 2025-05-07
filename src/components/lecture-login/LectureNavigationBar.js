import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaCalendarAlt, FaTools, FaEnvelope, FaUser, FaCheckCircle, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './LectureNavigationBar.css';

const StudentNavigationBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [expandMessage1, setExpandMessage1] = useState(false);
  const [expandMessage2, setExpandMessage2] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const notificationsRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
      setShowNotifications(false);
      setExpandMessage1(false);
      setExpandMessage2(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const toggleWelcome = setInterval(() => {
      setShowWelcome((prev) => !prev);
    }, 3000);
    return () => clearInterval(toggleWelcome);
  }, []);

  return (
    <nav className="lecture-student-nav lecture-modern-nav">
      <div className="lecture-notification-wrapper" ref={notificationsRef}>
        <div
          className="lecture-notification-icon"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <FaEnvelope />
          <span className="lecture-notification-count">2</span>
        </div>
        {showNotifications && (
          <div className="lecture-notification-dropdown">
            <div className="lecture-notification-section">
              <div className="lecture-message-preview">
                <FaUser className="lecture-msg-icon" />
                <span>Message from <strong>V Mathiza</strong></span>
                <FaChevronDown className="lecture-dropdown-arrow" onClick={() => setExpandMessage1(!expandMessage1)} />
              </div>
              {expandMessage1 && (
                <div className="lecture-message-details">
                  <FaCheckCircle className="lecture-msg-detail-icon" />
                  <span><strong>V Mathiza</strong> has requested for a consultation scheduled on <strong>23/04/2025</strong> from <strong>13:00 - 13:30</strong> (30 minutes)</span>
                </div>
              )}

              <div className="lecture-message-preview">
                <FaUser className="lecture-msg-icon" />
                <span>Message from <strong>Admin Office</strong></span>
                <FaChevronDown className="lecture-dropdown-arrow" onClick={() => setExpandMessage2(!expandMessage2)} />
              </div>
              {expandMessage2 && (
                <div className="lecture-message-details">
                  <FaCheckCircle className="lecture-msg-detail-icon" />
                  <span>Your maintenance report has been <strong>successfully logged</strong>. A technician will be assigned soon.</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="lecture-logout-wrapper">
        {showWelcome ? (
          <span className="lecture-welcome-message">Welcome Back Tshiamo</span>
        ) : (
          <FaSignOutAlt className="lecture-logout-icon" />
        )}
      </div>
    </nav>
  );
};

export default StudentNavigationBar;
