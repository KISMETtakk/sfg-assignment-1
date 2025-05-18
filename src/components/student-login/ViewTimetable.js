import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import "./ViewTimetable.css";
import StudentNavigationBar from './StudentNavigationBar';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';

const ViewTimetable = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("consultation");
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [appointmentPosition, setAppointmentPosition] = useState({ x: 0, y: 0 });
  const [hoveredDate, setHoveredDate] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [timetable, setTimetable] = useState([]);

  const handleBack = () => {
    window.history.back();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowAppointmentDetails(false);
  };

  const handleDateHover = (date, event) => {
    const found = appointments.find(app => new Date(app.date).getDate() === date);
    if (found) {
      setHoveredDate(found);
      const rect = event.target.getBoundingClientRect();
      setAppointmentPosition({ x: rect.right + 10, y: rect.top - 100 });
      setShowAppointmentDetails(true);
    }
  };

  const handleDateLeave = () => {
    setShowAppointmentDetails(false);
  };

  useEffect(() => {
    axios.get('http://localhost:8180/api/appointment/gellAll-appointments')
      .then(res => setAppointments(res.data))
      .catch(err => console.error('Failed to fetch appointments:', err));

    axios.get('http://localhost:8180/api/timetable/view-all')
      .then(res => setTimetable(res.data))
      .catch(err => console.error('Failed to fetch timetable:', err));

    const timer = setTimeout(() => setLoading(false), 1500);
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

  const generateSchoolTimetable = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const times = ["08:00", "09:00", "10:00", "11:00", "12:00"];

    return (
      <div className="student-timetable-school-timetable-content">
        <h2>School Timetable</h2>
        <table className="student-timetable-timetable-table">
          <thead>
            <tr>
              <th>Time</th>
              {days.map(day => <th key={day}>{day}</th>)}
            </tr>
          </thead>
          <tbody>
            {times.map((time, rowIndex) => (
              <tr key={time}>
                <td>{time} - {`${parseInt(time) + 1}:00`}</td>
                {days.map(day => {
                  const entry = timetable.find(t =>
                    t.day === day &&
                    t.startTime?.substring(0, 2) === time.substring(0, 2)
                  );
                  return (
                    <td key={day} className={entry ? "student-timetable-has-class" : ""}>
                      {entry && (
                        <div className="student-timetable-class-info">
                          <div className="student-timetable-subject">{entry.module.moduleCode}</div>
                          <div className="student-timetable-venue">
                            {entry.lecturer.fname} {entry.lecturer.lname}
                          </div>
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

  const generateCalendar = () => {
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    const appointmentDates = appointments
      .filter(app => new Date(app.date).getMonth() === currentMonth)
      .map(app => new Date(app.date).getDate());

    const headerRow = (
      <div className="student-timetable-calendar-row student-timetable-header">
        {daysOfWeek.map(day => <div key={day} className="student-timetable-calendar-cell student-timetable-day-of-week">{day}</div>)}
      </div>
    );

    const days = [headerRow];
    let currentRow = [];

    for (let i = 0; i < firstDay; i++) {
      currentRow.push(<div key={`empty-${i}`} className="student-timetable-calendar-cell"></div>);
    }

    for (let i = 1; i <= lastDate; i++) {
      const hasAppointment = appointmentDates.includes(i);
      currentRow.push(
        <div
          key={i}
          className={`student-timetable-calendar-cell student-timetable-day ${hasAppointment ? "student-timetable-has-appointment" : ""}`}
          onMouseEnter={hasAppointment ? (e) => handleDateHover(i, e) : null}
          onMouseLeave={hasAppointment ? handleDateLeave : null}
        >
          {i}
          {hasAppointment && <div className="student-timetable-appointment-dot"></div>}
        </div>
      );

      if ((i + firstDay) % 7 === 0 || i === lastDate) {
        days.push(<div key={`row-${i}`} className="student-timetable-calendar-row">{currentRow}</div>);
        currentRow = [];
      }
    }

    return days;
  };

  return (
    <>
      <StudentNavigationBar />
      <div className="student-timetable-wrapper">
        <button className="student-login-back-button-tt" onClick={handleBack}><FaArrowLeft size={20} /></button>
        <div className="student-timetable-container">
          <div className="student-timetable-left-panel">
            <div className="student-timetable-view-timetable-header">
              <FontAwesomeIcon icon={faCalendarAlt} className="student-timetable-calendar-icon" />
              <div className="student-timetable-view-timetable-title">VIEW<br />TIMETABLE</div>
            </div>
            <button className={`student-timetable-button ${activeTab === "consultation" ? "active" : ""}`} onClick={() => handleTabChange("consultation")}>Consultation<br />Timetable</button>
            <button className={`student-timetable-button ${activeTab === "class" ? "active" : ""}`} onClick={() => handleTabChange("class")}>Class<br />Timetable</button>
          </div>

          <div className="student-timetable-right-panel">
            {activeTab === "consultation" ? (
              <div className="student-timetable-consultation-content">
                <h2>About Consultation Timetable</h2>
                <p>View your lecture consultation timetable to see all your booked sessions, including dates, times, and lecturer details.</p>
                <div className="student-timetable-calendar-navigation">
                  <button className="student-timetable-nav-button student-timetable-prev">&#8249;</button>
                  <h3>April</h3>
                  <button className="student-timetable-nav-button student-timetable-next">&#8250;</button>
                </div>
                <div className="student-timetable-calendar">{generateCalendar()}</div>
                {showAppointmentDetails && hoveredDate && (
                  <div className="student-timetable-appointment-details" style={{ left: `${appointmentPosition.x}px`, top: `${appointmentPosition.y}px` }}>
                    <h3>Consultation Appointment Details</h3>
                    <div className="student-timetable-appointment-content">
                      <div className="student-timetable-lecturer-image">
                        <img src="https://via.placeholder.com/80" alt="Lecturer" />
                      </div>
                      <div className="student-timetable-appointment-info">
                        <div className="student-timetable-info-row"><span className="student-timetable-label">Date:</span><span className="student-timetable-value">{hoveredDate.date}</span></div>
                        <div className="student-timetable-info-row"><span className="student-timetable-label">Time:</span><span className="student-timetable-value">{hoveredDate.startTime} - {hoveredDate.endTime}</span></div>
                        <div className="student-timetable-info-row"><span className="student-timetable-label">Module:</span><span className="student-timetable-value">{hoveredDate.moduleCode}</span></div>
                        <div className="student-timetable-info-row"><span className="student-timetable-label">Status:</span><span className="student-timetable-value">{hoveredDate.status}</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              generateSchoolTimetable()
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTimetable;
