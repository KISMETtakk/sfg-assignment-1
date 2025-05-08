import React, { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaUser, FaCheckCircle, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Added useNavigate
import './StudentNavigationBar.css';

const StudentNavigationBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [expandMessage1, setExpandMessage1] = useState(false);
  const [expandMessage2, setExpandMessage2] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const notificationsRef = useRef(null);
  const navigate = useNavigate(); // Initialize navigate

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

  const handleGoHome = () => {
    navigate('/logout-confirmation');
  };

  return (
    <nav className="student-nav modern-nav">
      <div className="notification-wrapper" ref={notificationsRef}>
        <div
          className="notification-icon"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <FaEnvelope />
          <span className="notification-count">2</span>
        </div>
        {showNotifications && (
          <div className="notification-dropdown">
            <div className="notification-section">
              <div className="message-preview">
                <FaUser className="msg-icon" />
                <span>Message from <strong>Mr Matiza</strong></span>
                <FaChevronDown className="dropdown-arrow" onClick={() => setExpandMessage1(!expandMessage1)} />
              </div>
              {expandMessage1 && (
                <div className="message-details">
                  <FaCheckCircle className="msg-detail-icon" />
                  <span><strong>Mr Matiza</strong> has accepted your consultation request scheduled on <strong>23/04/2025</strong> from <strong>13:00 - 13:30</strong> (30 minutes)</span>
                </div>
              )}

              <div className="message-preview">
                <FaUser className="msg-icon" />
                <span>Message from <strong>Admin Office</strong></span>
                <FaChevronDown className="dropdown-arrow" onClick={() => setExpandMessage2(!expandMessage2)} />
              </div>
              {expandMessage2 && (
                <div className="message-details">
                  <FaCheckCircle className="msg-detail-icon" />
                  <span>Your maintenance report has been <strong>successfully logged</strong>. A technician will be assigned soon.</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="logout-wrapper" onClick={handleGoHome} style={{ cursor: 'pointer' }}>
        {showWelcome ? (
          <span className="welcome-message">Welcome Back Tshiamo</span>
        ) : (
          <FaSignOutAlt className="logout-icon" />
        )}
      </div>
    </nav>
  );
};

export default StudentNavigationBar;
