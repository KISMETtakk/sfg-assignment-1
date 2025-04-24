import React, { useState, useEffect } from 'react';
import StudentNavigationBar from './StudentNavigationBar';
import './StudentLogged.css';
import { FaLightbulb } from 'react-icons/fa';

const slides = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
  '/images/slide4.jpg',
  '/images/slide5.jpg',
  '/images/slide6.jpg',
];

const didYouKnowFacts = [
  'Did you know? You can consult lecturers online!',
  'Did you know? Timetables are updated weekly.',
  'Did you know? You can report faulty equipment in 2 clicks.',
  'Did you know? Notifications keep you updated.',
  'Did you know? You can sync your schedule with Google Calendar.',
  'Did you know? You can track maintenance requests live.',
];

const StudentLogged = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideTimer);
  }, []);

  return (
    <div className="student-logged-wrapper">
      <StudentNavigationBar />

      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide})` }}
          >
            {index === currentSlide && (
              <div className="slide-caption">
                <FaLightbulb className="lightbulb-icon" />
                <span>{didYouKnowFacts[index]}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add other content below later */}
    </div>
  );
};

export default StudentLogged;