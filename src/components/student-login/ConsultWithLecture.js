import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FaArrowLeft } from 'react-icons/fa';
import './ConsultWithLecture.css';
import SearchP1 from '../assets/images/img24.jpg';
import SearchP2 from '../assets/images/img34.jpg';
import SearchP3 from '../assets/images/img82.jpg';
import QuestionMark from '../assets/images/Question Mark.png';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const ConsultWithLecture = () => {
  const [loading, setLoading] = useState(true);
  const [consultSelected, setConsultSelected] = useState(false);
  const [bookedSlots, setBookedSlots] = useState([false, false, false, false, false, false, false]); // Tracks slot bookings

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    setConsultSelected(false);
  };

  const navigate = useNavigate();

  const handleBackToStuDashB = () => {
    navigate('/student-logged');  // Navigate to the student login page
  };

  const handleSlotSelection = (index) => {
    // If a slot is already selected, deselect it. Otherwise, select the clicked slot.
    const updatedSlots = [...bookedSlots];
    
    if (updatedSlots[index]) {
      updatedSlots[index] = false;  // Deselect the slot if it is already selected
    } else {
      // Deselect all slots first, then select the clicked one
      updatedSlots.fill(false);
      updatedSlots[index] = true;
    }
    
    setBookedSlots(updatedSlots);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="consult-container">
                  <button className="student-login-back-button" onClick={handleBackToStuDashB}>
              <FaArrowLeft size={20} />
            </button>
      <div className="left-panel">
        
        <div className="header">
          <FontAwesomeIcon icon={faUserFriends} className="consult-icon" />
          <h3>CONSULT WITH LECTURE</h3>
        </div>

        <div className="search-container">
          <input className="search-input" type="text" placeholder="Search Lecture..." />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>

        <div className="lecture-list">
          <div className="lecture-card selected">
            <img src={SearchP1} alt="Matiza Tshiamo" className="avatar" />
            <div>
              <span className="title">Lecture</span>
              <p><strong>Matiza</strong> Tshiamo</p>
            </div>
            <button className="consult-button">View Lecture</button>
          </div>
          <div className="lecture-card">
            <img src={SearchP2} alt="Matishiti Ben" className="avatar" />
            <div>
              <span className="title">Lecture</span>
              <p><strong>Matishiti</strong> Ben</p>
            </div>
            <button className="consult-button">View Lecture</button>
          </div>
          <div className="lecture-card">
            <img src={SearchP2} alt="Matishiti Ben" className="avatar" />
            <div>
              <span className="title">Lecture</span>
              <p><strong>Matishiti</strong> Ben</p>
            </div>
            <button className="consult-button">View Lecture</button>
          </div>
          {/* Add more lecture cards here */}
        </div>


         
        <h2 className='sca-movedown'>Schedule Consultation Appointment</h2>
        <div className="schedule-section">
          <h4>Modules:</h4>
          <div className="module-buttons">
            <button>PPA15D</button>
            <button className="active">PPG115D</button>
            <button>AQP215D</button>
            <button>INT316D</button>
          </div>
          <h4>Venue (Building 10):</h4>
          <div className="module-buttons">            
            <button>10-120</button>
            <button>10-G48</button>
            <button className="active">10-LG41</button>
          </div>
          <h4>Date:</h4>
          <div className="date-select">
            <select>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>

            <select>
              {[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ].map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>

            <select>
              {Array.from({ length: 6 }, (_, i) => {
                const year = new Date().getFullYear() + i;
                return <option key={year} value={year}>{year}</option>;
              })}
            </select>
          </div>
          <button className="consult-button" onClick={() => setConsultSelected(true)}>Consult</button>
        </div>
        
      </div>

      <div className={`right-panel ${consultSelected ? 'show' : 'hide'}`}>
        {consultSelected ? (
          <div className="consultation-content fade-in">
            <button className="student-login-back-button" onClick={handleBack}>
              <FaArrowLeft size={20} />
            </button>

            <div className="lecture-info">
              <img src={SearchP3} alt="Matiza Tshiamo" className="profile-pic" />
              <h4>Lecture</h4>
              <h3 className="left-align">Mr Matiza Tshiamo</h3>
              <p className="left-align">
                Matiza Tshiamo is a Computer Science lecturer offering consultations for modules including
                Data Structures, Web Development, Databases, and Programming Fundamentals.
              </p>

            </div>

            <div className="schedule-table">
              <div className="date-header">23 April 2025</div>
              <table>
                <thead>
                  <tr className="table-header-student">
                    <th>Meeting Type</th>
                    <th>Duration</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Make Booking</th>
                  </tr>
                </thead>
                <tbody>
                  {['08:30 - 09:00', '09:00 - 09:30', '11:00 - 11:30', '11:30 - 12:00', '14:30 - 15:00', '15:00 - 15:30', '15:30 - 16:00'].map((slot, index) => (
                    <tr key={index}>
                      <td>Consultation</td>
                      <td>(30 Minutes)</td>
                      <td>{slot.split(' - ')[0]}</td>
                      <td>{slot.split(' - ')[1]}</td>
                      <td>
                        <input
                          type="checkbox"
                          className={`booking-checkbox ${bookedSlots[index] ? 'booked' : 'open'}`}
                          checked={bookedSlots[index]}
                          onChange={() => handleSlotSelection(index)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="keys">
              <p>Keys:</p>
              <p><span className="booked">🟢</span> Slot Booked</p>
              <p><span className="open">⭕</span> Open Slot</p>
            </div>

            <button className="create-booking">Create Booking</button>
          </div>
        ) : (
          <img src={QuestionMark} alt="Question Mark" className="question-image red-border" />
        )}
      </div>
    </div>
  );
};

export default ConsultWithLecture;
