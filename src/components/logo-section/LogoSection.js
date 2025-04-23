import React from 'react';
import { motion } from 'framer-motion';
import './LogoSection.css';
import Image1 from '../assets/images/img30.jpeg';

function LogoSection() {
  return (
    <motion.div
      className="logo-section"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
    >
      <img src= {Image1} alt="Smart Campus Logo" className="logo" />
      <h1>Smart Campus Services Portal</h1>
    </motion.div>
  );
}

export default LogoSection;
