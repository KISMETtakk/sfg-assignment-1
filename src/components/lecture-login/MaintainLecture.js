import React, { useState, useEffect } from 'react';
import './MaintainLecture.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import StudentNavigationBar from '../lecture-login/LectureNavigationBar';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';

const MaintainLecture = () => {
  const [loading, setLoading] = useState(true);
  const [timetable, setTimetable] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleBack = () => {
    window.history.back();
  };

  useEffect(() => {
    setIsLoaded(true);
    axios.get('http://localhost:8180/api/timetable/view-all')
      .then(res => setTimetable(res.data))
      .catch(err => console.error('Failed to fetch timetable:', err));

    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner-l"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const generateSchoolTimetable = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const times = ["08:00", "09:00", "10:00", "11:00", "12:00"];

    return (
      <div className="lecture-timetable-content">
        <h2 className="timetable-title">School Timetable</h2>
        <table className="lecture-timetable-table">
          <thead>
            <tr>
              <th className="lecture-timetable-th">Time</th>
              {days.map(day => <th className="lecture-timetable-th" key={day}>{day}</th>)}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time}>
                <td className="lecture-timetable-td" style={{ border: '1px solid white', padding: '12px' }}>{time} - {`${parseInt(time) + 1}:00`}</td>
                {days.map(day => {
                  const entry = timetable.find(t =>
                    t.day === day &&
                    t.startTime?.substring(0, 2) === time.substring(0, 2)
                  );
                  return (
                    <td
                      className={`lecture-timetable-td ${entry ? "lecture-has-class" : ""}`}
                      key={day}
                      style={{ border: '1px solid white', padding: '12px' }}
                    >
                      {entry && (
                        <div className="lecture-class-info">
                          <div className="lecture-subject">{entry.module.moduleCode}</div>
                          <div className="lecture-venue">{entry.lecturer.fname} {entry.lecturer.lname}</div>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <StudentNavigationBar />
      <div className={`lecture-main-maintenance-container ${isLoaded ? 'lecture-main-maintenance-loaded' : ''}`}>
        <button className="student-login-back-button-ttt" onClick={handleBack}>
          <FaArrowLeft size={20} />
        </button>

        <div className="lecture-main-right-section">
          <h1 className="lecture-main-heading">School Timetable</h1>
          <h3 className="lecture-main-subheading">Monday to Friday</h3>
          {generateSchoolTimetable()}
        </div>
      </div>
    </>
  );
};

export default MaintainLecture;
