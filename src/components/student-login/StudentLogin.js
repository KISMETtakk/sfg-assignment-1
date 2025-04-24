import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import './StudentLogin.css';
import loginImage from '../../components/assets/images/img34.jpg'; // Replace with actual path

function StudentLogin() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="student-login-page">
      <motion.div
        className="student-login-left-panel"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button className="student-login-back-button" onClick={handleBack}>
          <FaArrowLeft size={20} />
        </button>
        <div className="student-login-login-card">
          <h2>LOGIN<br /><span>AS A STUDENT</span></h2>
          <label>Student Number</label>
          <input type="text" placeholder="Enter student number" />
          <label>Password</label>
          <input type="password" placeholder="Enter password" />
          <button
            className="student-login-login-btn"
            onClick={() => navigate('/student-logged')}
          >
            LOGIN
          </button>

        </div>
      </motion.div>

      <motion.div
        className="student-login-right-panel"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src={loginImage} alt="Students" className="student-login-login-image" />
      </motion.div>
    </div>
  );
}

export default StudentLogin;
