import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminLogin.css';
import loginImage from '../../components/assets/images/img82.jpg';

function AdminLogin() {
  const navigate = useNavigate();
  const [adminID, setAdminID] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    navigate('/');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8180/api/admins/login', {
        adminID: parseInt(adminID),
        password: password
      });

      localStorage.setItem('admin', JSON.stringify(response.data));

      toast.success(`Welcome ${response.data.fname} ${response.data.lname}!`, {
        position: 'top-center'
      });

      setTimeout(() => {
        navigate('/admin-Dashboard');
      }, 2000); // Give the toast time to show
    } catch (error) {
      toast.error('Invalid Admin ID or Password!', {
        position: 'top-center'
      });
    }
  };

  return (
    <div className="admin-login-page">
      <ToastContainer />
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

          <label>Admin ID</label>
          <input
            type="number"
            placeholder="Enter Admin ID"
            value={adminID}
            onChange={(e) => setAdminID(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="admin-login-btn" onClick={handleLogin}>LOGIN</button>
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
