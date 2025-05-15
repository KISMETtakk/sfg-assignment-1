import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios'; // ✅ Add this line
import './LectureLogin.css';
import loginImage from '../../components/assets/images/img26.png';

function LecturerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    navigate('/');
  };

 const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:8180/api/lecturer/login', {
      lecturerEmail: email.trim(),
      password: password.trim()
    });

    console.log('Login success:', response.data); // helpful debug
    localStorage.setItem('lecturer', JSON.stringify(response.data));
    navigate('/lecture-logged');
  } catch (error) {
    if (error.response) {
      console.error('Server responded with:', error.response.status, error.response.data);
      alert(error.response.data?.message || 'Incorrect email or password.');
    } else if (error.request) {
      console.error('No response from server:', error.request);
      alert('No response from server. Please check your backend.');
    } else {
      console.error('Error setting up request:', error.message);
      alert('Login failed due to a client error.');
    }
  }
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
          <h2>LOGIN<br /><span>AS A LECTURER</span></h2>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="lecture-login-btn" onClick={handleLogin}>
            LOGIN
          </button>
        </div>
      </motion.div>

      <motion.div
        className="lecture-login-right-panel"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src={loginImage} alt="Lecturer" className="lecture-login-image" />
      </motion.div>
    </div>
  );
}

export default LecturerLogin;
