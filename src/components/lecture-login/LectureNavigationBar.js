import React, { useState, useEffect } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './LectureNavigationBar.css';

const StudentNavigationBar = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();
  const lecturer = JSON.parse(localStorage.getItem("lecturer"));

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
    <nav className="lecture-student-nav lecture-modern-nav">
      <div className="lecture-logout-wrapper" onClick={handleGoHome} style={{ cursor: 'pointer' }}>
        {showWelcome ? (
          <span className="lecture-welcome-message">
            Welcome Back {lecturer?.fname}
          </span>
        ) : (
          <FaSignOutAlt className="lecture-logout-icon" />
        )}
      </div>
    </nav>
  );
};

export default StudentNavigationBar;
