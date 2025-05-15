import React, { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaUser, FaCheckCircle, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StudentNavigationBar.css';

const StudentNavigationBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const notificationsRef = useRef(null);
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem('student'));
  const fullName = student ? `${student.fName} ${student.lName}` : 'Student';
  const studentId = student?.studentID;

  const handleOutsideClick = (e) => {
    if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
      setShowNotifications(false);
      setExpandedIndexes([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    const toggleWelcome = setInterval(() => {
      setShowWelcome((prev) => !prev);
    }, 3000);
    return () => clearInterval(toggleWelcome);
  }, []);

  useEffect(() => {
    if (studentId) {
      axios
        .get(`http://localhost:8180/api/student/${studentId}`)
        .then((res) => {
          setNotifications(res.data || []);
        })
        .catch((err) => {
          console.error('Failed to fetch notifications:', err);
        });
    }
  }, [studentId]);

  const handleGoHome = () => {
    navigate('/logout-confirmation');
  };

  const toggleExpand = (index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const getSenderDisplay = (notif) => {
    if (notif.lecturer) {
      return `Message from ${notif.lecturer.fname} ${notif.lecturer.lname}`;
    }
    return notif.notification.date;
  };

  return (
    <nav className="student-nav modern-nav">
      <div className="notification-wrapper" ref={notificationsRef}>
        <div className="notification-icon" onClick={() => setShowNotifications(!showNotifications)}>
          <FaEnvelope />
          <span className="notification-count">{notifications.length}</span>
        </div>

        {showNotifications && (
          <div className="notification-dropdown">
            <div className="notification-section">
              {notifications.length === 0 && <p>No new messages.</p>}
              {notifications.map((notif, index) => (
                <div key={notif.recipientID}>
                  <div className="message-preview">
                    <FaUser className="msg-icon" />
                    <span>{getSenderDisplay(notif)}</span>
                    <FaChevronDown
                      className="dropdown-arrow"
                      onClick={() => toggleExpand(index)}
                    />
                  </div>
                  {expandedIndexes.includes(index) && (
                    <div className="message-details">
                      <FaCheckCircle className="msg-detail-icon" />
                      <span>{notif.notification.message}</span>
                      <div style={{ fontSize: '11px', color: '#aaa', marginTop: '5px' }}>
                        {notif.notification.date}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="logout-wrapper" onClick={handleGoHome} style={{ cursor: 'pointer' }}>
        {showWelcome ? (
          <span className="welcome-message">Welcome Back {fullName}</span>
        ) : (
          <FaSignOutAlt className="logout-icon" />
        )}
      </div>
    </nav>
  );
};

export default StudentNavigationBar;
