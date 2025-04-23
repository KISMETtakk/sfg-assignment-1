import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './RoleButtons.css';

function RoleButtons() {
  const navigate = useNavigate();

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6 },
    }),
  };

  const handleClick = (label) => {
    if (label === "Student") navigate("/student-login");
    if (label === "Lecture") navigate("/lecture-login");    
    if (label === "Admin") navigate("/admin-login");
    // Add logic for other roles if needed
  };

  return (
    <div className="button-group">
      {['Student', 'Lecture', 'Admin'].map((label, index) => (
        <motion.button
          key={label}
          className={`role-button ${label.toLowerCase()}`}
          custom={index}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleClick(label)}
        >
          {label}
        </motion.button>
      ))}
    </div>
  );
}

export default RoleButtons;
