import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import './StudentLogin.css';
import loginImage from '../../components/assets/images/img34.jpg';

function StudentLogin() {
  const navigate = useNavigate();
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    navigate('/');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8180/api/student/login', {
        studentID: parseInt(studentID.trim()),
        password: password.trim()
      });

      localStorage.setItem('student', JSON.stringify(response.data));
      navigate('/student-logged');
    } catch (error) {
      if (error.response) {
        console.error('Backend error:', error.response.status, error.response.data);
        alert(error.response.data?.message || 'Invalid student number or password.');
      } else {
        console.error('Login error:', error.message);
        alert('Failed to connect to server.');
      }
    }
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
          <input
            type="text"
            placeholder="Enter student number"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="student-login-login-btn" onClick={handleLogin}>
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
