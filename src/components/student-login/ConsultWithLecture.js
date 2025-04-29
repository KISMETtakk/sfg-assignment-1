import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './ConsultWithLecture.css';
import SearchP1 from '../assets/images/img24.jpg';
import SearchP2 from '../assets/images/img34.jpg';
import SearchP3 from '../assets/images/img82.jpg';

const ConsultWithLecture = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // simulate loading
    return () => clearTimeout(timer);
  }, []);

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
      <div className="left-panel">
        <div className="header">
          <span role="img" aria-label="consult">👥</span>
          <h3>CONSULT WITH LECTURE</h3>
        </div>

        {/* Search Bar with FontAwesome Icon */}
        <div className="search-container">
          <input className="search-input" type="text" placeholder="Search Lecture..." />
          <FontAwesomeIcon icon={faSearch} />
        </div>

        <div className="lecture-list">
          <div className="lecture-card selected">
            <img src={SearchP1} alt="Matiza Tshiamo" className="avatar" />
            <div>
              <span className="title">Lecture</span>
              <p><strong>Matiza</strong> Tshiamo</p>
            </div>
            <button className="consult-button">Consult</button>
          </div>
          <div className="lecture-card">
            <img src={SearchP2} alt="Matishiti Ben" className="avatar" />
            <div>
              <span className="title">Lecture</span>
              <p><strong>Matishiti</strong> Ben</p>
            </div>
            <button className="consult-button">Consult</button>
          </div>
        </div>

        <div className="schedule-section">
          <h4>Schedule Consultation Appointment</h4>
          <div className="module-buttons">
            <button>PPA15D</button>
            <button className="active">PPG115D</button>
            <button>AQP215D</button>
            <button>INT316D</button>
          </div>
          <div className="date-select">
            <select><option>23</option></select>
            <select><option>April</option></select>
            <select><option>2025</option></select>
          </div>
          <button className="consult-button">Consult</button>
        </div>
      </div>

      <div className="right-panel">
        <div className="lecture-info">
          <img src={SearchP3} alt="Matiza Tshiamo" className="profile-pic" />
          <h4>Lecture</h4>
          <h3>Mr Matiza Tshiamo</h3>
          <p>Matiza Tshiamo is a Computer Science lecturer offering consultations for modules including Data Structures, Web Development, Databases, and Programming Fundamentals.</p>
        </div>

        <div className="schedule-table">
          <div className="date-header">23 April 2025</div>
          <table>
            <thead>
              <tr>
                <th>Meeting Type</th>
                <th>Duration</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Make Booking</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Consultation</td><td>(30 Minutes)</td><td>08:30</td><td>09:00</td><td>✔️</td></tr>
              <tr><td>Consultation</td><td>(30 Minutes)</td><td>09:00</td><td>09:30</td><td>⭕</td></tr>
              <tr><td>Consultation</td><td>(30 Minutes)</td><td>11:00</td><td>11:30</td><td>✔️</td></tr>
              <tr><td>Consultation</td><td>(30 Minutes)</td><td>11:30</td><td>12:00</td><td>⭕</td></tr>
              <tr><td>Consultation</td><td>(30 Minutes)</td><td>14:30</td><td>15:00</td><td>⭕</td></tr>
              <tr><td>Consultation</td><td>(30 Minutes)</td><td>15:00</td><td>15:30</td><td>✔️</td></tr>
              <tr><td>Consultation</td><td>(30 Minutes)</td><td>15:30</td><td>16:00</td><td>⭕</td></tr>
            </tbody>
          </table>
        </div>

        <div className="keys">
          <p><span className="booked">✔️</span> Slot Booked</p>
          <p><span className="open">⭕</span> Open Booked</p>
        </div>

        <button className="create-booking">Create Booking</button>
      </div>
    </div>
  );
};

export default ConsultWithLecture;
