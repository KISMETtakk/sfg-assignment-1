import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import './LectureLogin.css';
import loginImage from '../../components/assets/images/img26.png'; // Replace with actual path

function StudentLogin() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="lecture-login-page">
      <motion.div
        className="lecture-login-left-panel"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button className="lecture-login-back-button" onClick={handleBack}>
          <FaArrowLeft size={20} />
        </button>
        <div className="lecture-login-card">
          <h2>LOGIN<br /><span>AS A LECTURE</span></h2>
          <label>Staff Number</label>
          <input type="text" placeholder="Enter staff number" />
          <label>Password</label>
          <input type="password" placeholder="Enter password" />
          <button className="lecture-login-btn" 
           onClick={() => navigate('/lecture-logged')}>
            LOGIN</button>
  
        </div>
      </motion.div>

      <motion.div
        className="lecture-login-right-panel"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src={loginImage} alt="Students" className="lecture-login-image" />
      </motion.div>
    </div>
  );
}

export default StudentLogin;
