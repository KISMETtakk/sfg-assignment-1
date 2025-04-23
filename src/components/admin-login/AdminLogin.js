import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import './AdminLogin.css';
import loginImage from '../../components/assets/images/img82.jpg';

function StudentLogin() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="admin-login-page">
      <motion.div
        className="admin-login-left-panel"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button className="admin-login-back-button" onClick={handleBack}>
          <FaArrowLeft size={20} />
        </button>
        <div className="admin-login-card">
          <h2>LOGIN<br /><span>AS AN Admin</span></h2>
          <label>Username</label>
          <input type="text" placeholder="Enter username" />
          <label>Password</label>
          <input type="password" placeholder="Enter password" />
          <button className="admin-login-btn">LOGIN</button>
        </div>
      </motion.div>

      <motion.div
        className="admin-login-right-panel"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src={loginImage} alt="Students" className="admin-login-image" />
      </motion.div>
    </div>
  );
}

export default StudentLogin;
