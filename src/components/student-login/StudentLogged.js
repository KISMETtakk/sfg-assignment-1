import React, { useState, useEffect } from 'react';
import StudentNavigationBar from './StudentNavigationBar';
import './StudentLogged.css';
import { FaLightbulb } from 'react-icons/fa';
import StuLoggedImg1 from '../assets/images/Welcome to the team/1.png';
import StuLoggedImg2 from '../assets/images/Welcome to the team/2.png';
import StuLoggedImg3 from '../assets/images/Welcome to the team/3.png';
import StuLoggedImg4 from '../assets/images/Welcome to the team/1.png';
import StuLoggedImg5 from '../assets/images/Welcome to the team/2.png';
import StuLoggedImg6 from '../assets/images/Welcome to the team/3.png';

// Updated "Did you know?" facts with structure and emojis
const didYouKnowFacts = [
  {
    fact: "You can consult lecturers online!",
    details: "Lecturers are available online for personalized assistance, whether it's for academic queries or guidance on assignments.",
    emoji: "💻👨‍🏫",
  },
  {
    fact: "Timetables are updated weekly.",
    details: "Stay organized! Your timetable is updated every week, ensuring you have the latest information about your classes and activities.",
    emoji: "📅🔄",
  },
  {
    fact: "You can report faulty equipment in just 2 clicks.",
    details: "Encounter faulty equipment? No problem! Simply report it through the system, and our team will handle the rest.",
    emoji: "⚙️🔧",
  },
  {
    fact: "Notifications keep you updated.",
    details: "Get notified in real-time for important events, deadlines, and announcements. Stay on top of everything effortlessly!",
    emoji: "📲🔔",
  },
  {
    fact: "You can sync your schedule with Google Calendar.",
    details: "No more missed classes! Sync your timetable with Google Calendar to get automatic reminders and sync it with your other devices.",
    emoji: "📅🗓️",
  },
  {
    fact: "You can track maintenance requests live.",
    details: "Transparency at its best! Track the status of your maintenance requests in real-time and stay updated on their progress.",
    emoji: "🏗️📊",
  },
];

const slides = [
  StuLoggedImg1,
  StuLoggedImg2,
  StuLoggedImg3,
  StuLoggedImg4,
  StuLoggedImg5,
  StuLoggedImg6,
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
                <div className="fact-panel">
                  <h3 className="fact-title">{didYouKnowFacts[index].fact}</h3>
                  <p className="fact-details">{didYouKnowFacts[index].details}</p>
                  <span className="fact-emoji">{didYouKnowFacts[index].emoji}</span>
                </div>
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
