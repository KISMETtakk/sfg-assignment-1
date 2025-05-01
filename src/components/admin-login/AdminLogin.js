import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import './AdminLogin.css';
import loginImage from '../../components/assets/images/img82.jpg';

function AdminLogin() {  
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    navigate('/');
  };

  const handleLogin = () => {
    
    if (username === 'admin' && password === 'admin123') {
      navigate('/admin-Dashboard');
    } else {
      alert('Invalid Credentials! Please try again.');
    }
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
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="admin-login-btn" onClick={handleLogin}>LOGIN</button> {}
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

export default AdminLogin; 
