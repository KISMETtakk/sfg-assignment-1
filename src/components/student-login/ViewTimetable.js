import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons"
import "./ViewTimetable.css"
import StudentNavigationBar from './StudentNavigationBar';

const ViewTimetable = () => {
  const [activeTab, setActiveTab] = useState("consultation")
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false)
  const [appointmentPosition, setAppointmentPosition] = useState({ x: 0, y: 0 })
  const [hoveredDate, setHoveredDate] = useState(null)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setShowAppointmentDetails(false)
  }

  const handleDateHover = (date, event) => {
    if (date === 14 || date === 23) {
      setHoveredDate(date)
      const rect = event.target.getBoundingClientRect()
      setAppointmentPosition({
        x: rect.right + 10,
        y: rect.top - 100,
      })
      setShowAppointmentDetails(true)
    }
  }

  const handleDateLeave = () => {
    setShowAppointmentDetails(false)
  }

  const generateSchoolTimetable = () => {
    const subjects = ["INT316D", "SFG316D", "MOB316D", "SEF316D"]
    const venues = ["Building 10-120", "Building 10-L41", "Building 10-G48"]
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    const times = ["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00"]

    return (
      <div className="student-timetable-school-timetable-content">
        <h2>School Timetable</h2>
        <table className="student-timetable-timetable-table">
          <thead>
            <tr>
              <th>Time</th>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time}>
                <td>{time}</td>
                {days.map((day) => {
                  const random = Math.random()
                  if (random > 0.6) {
                    const subject = subjects[Math.floor(Math.random() * subjects.length)]
                    const venue = venues[Math.floor(Math.random() * venues.length)]
                    return (
                      <td key={day} className="student-timetable-has-class">
                        <div className="student-timetable-class-info">
                          <div className="student-timetable-subject">{subject}</div>
                          <div className="student-timetable-venue">{venue}</div>
                        </div>
                      </td>
                    )
                  }
                  return <td key={day}></td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const generateCalendar = () => {
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
    const daysInMonth = 30
    const startDay = 1

    const days = []
    const headerRow = (
      <div className="student-timetable-calendar-row student-timetable-header">
        {daysOfWeek.map((day) => (
          <div key={day} className="student-timetable-calendar-cell student-timetable-day-of-week">
            {day}
          </div>
        ))}
      </div>
    )

    days.push(headerRow)
    let currentRow = []

    for (let i = 0; i < startDay; i++) {
      currentRow.push(<div key={`empty-${i}`} className="student-timetable-calendar-cell student-timetable-empty"></div>)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const hasAppointment = i === 14 || i === 23

      currentRow.push(
        <div
          key={i}
          className={`student-timetable-calendar-cell student-timetable-day ${
            hasAppointment ? "student-timetable-has-appointment" : ""
          }`}
          onMouseEnter={hasAppointment ? (e) => handleDateHover(i, e) : null}
          onMouseLeave={hasAppointment ? handleDateLeave : null}
        >
          {i}
          {hasAppointment && <div className="student-timetable-appointment-dot"></div>}
        </div>,
      )

      if ((i + startDay) % 7 === 0 || i === daysInMonth) {
        days.push(
          <div key={`row-${Math.floor((i + startDay) / 7)}`} className="student-timetable-calendar-row">
            {currentRow}
          </div>,
        )
        currentRow = []
      }
    }

    return days
  }

  return (
    <div className="student-timetable-wrapper">
      <div className="student-timetable-container">
        <div className="student-timetable-left-panel">
          <div className="student-timetable-view-timetable-header">
            <FontAwesomeIcon icon={faCalendarAlt} className="student-timetable-calendar-icon" />
            <div className="student-timetable-view-timetable-title">
              VIEW
              <br />
              TIMETABLE
            </div>
          </div>

          <button
            className={`student-timetable-timetable-button ${
              activeTab === "school" ? "student-timetable-active" : ""
            }`}
            onClick={() => handleTabChange("school")}
          >
            School
            <br />
            Timetable
          </button>

          <button
            className={`student-timetable-timetable-button ${
              activeTab === "consultation" ? "student-timetable-active" : ""
            }`}
            onClick={() => handleTabChange("consultation")}
          >
            Consultation
            <br />
            Timetable
          </button>
        </div>

        <div className="student-timetable-right-panel">
          {activeTab === "consultation" ? (
            <div className="student-timetable-consultation-content">
              <h2>About Consultation Timetable</h2>
              <p>
                View your lecture consultation timetable to see all your booked sessions, including dates, times, and
                lecturer details. Stay organized and never miss an appointment.
              </p>

              <div className="student-timetable-calendar-navigation">
                <button className="student-timetable-nav-button student-timetable-prev">&#8249;</button>
                <h3>April</h3>
                <button className="student-timetable-nav-button student-timetable-next">&#8250;</button>
              </div>

              <div className="student-timetable-calendar">{generateCalendar()}</div>

              {showAppointmentDetails && (
                <div
                  className="student-timetable-appointment-details"
                  style={{
                    left: `${appointmentPosition.x}px`,
                    top: `${appointmentPosition.y}px`,
                  }}
                >
                  <h3>Consultation Appointment Details</h3>
                  <div className="student-timetable-appointment-content">
                    <div className="student-timetable-lecturer-image">
                      <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-30%20143937-IlC2O4tA8NfInd9lM3pvOqrE8qe14L.png"
                        alt="Lecturer"
                      />
                    </div>
                    <div className="student-timetable-appointment-info">
                      <div className="student-timetable-info-row">
                        <span className="student-timetable-label">Date:</span>
                        <span className="student-timetable-value">{hoveredDate} April 2025</span>
                      </div>
                      <div className="student-timetable-info-row">
                        <span className="student-timetable-label">Time:</span>
                        <span className="student-timetable-value">09:00 - 9:30</span>
                      </div>
                      <div className="student-timetable-info-row">
                        <span className="student-timetable-label">Office No:</span>
                        <span className="student-timetable-value">12-240</span>
                      </div>
                      <div className="student-timetable-info-row">
                        <span className="student-timetable-label">Module:</span>
                        <span className="student-timetable-value">PYA115D</span>
                      </div>
                      <div className="student-timetable-lecturer-name">Mr. Matiza Tshiamo</div>
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
  )
}

export default ViewTimetable
