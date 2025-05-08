import { useState, useEffect } from "react"
import "./LectureConsultation.css"
import LectureNavigationBar from './LectureNavigationBar';
import { FaArrowLeft } from "react-icons/fa";

const LectureConsultation = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedModule, setSelectedModule] = useState("PPG1150")
  const [currentPage, setCurrentPage] = useState(1)
  const [showRightPanel, setShowRightPanel] = useState(false)
  const [selectedDay, setSelectedDay] = useState("23")
  const [selectedMonth, setSelectedMonth] = useState("April")
  const [selectedYear, setSelectedYear] = useState("2025")
  const totalPages = 6
  const [loading, setLoading] = useState(true);  

  const handleBack = () => {
    window.history.back(); // or use navigate() if preferred
  };

  // Generate arrays for date selection
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1))
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const years = ["2023", "2024", "2025", "2026", "2027"]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleModuleClick = (module) => {
    setSelectedModule(module)
  }

  const handleFindClick = () => {
    setShowRightPanel(true)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const consultationSlots = [
    { id: "221306520", duration: "(30 Minutes)", startTime: "08:30", endTime: "09:00" },
    { id: "222306520", duration: "(30 Minutes)", startTime: "09:00", endTime: "09:30" },
    { id: "221676520", duration: "(30 Minutes)", startTime: "11:00", endTime: "11:30" },
    { id: "221309820", duration: "(30 Minutes)", startTime: "11:30", endTime: "12:00" },
    { id: "225309020", duration: "(30 Minutes)", startTime: "14:30", endTime: "15:00" },
    { id: "224302620", duration: "(30 Minutes)", startTime: "15:00", endTime: "15:30" },
    { id: "223396570", duration: "(30 Minutes)", startTime: "15:30", endTime: "16:00" },
  ]

  useEffect(() => {
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

  return (
    <div className="lecture-student-logged-wrapper">
       <LectureNavigationBar />
       <button className="student-login-back-button-ttt" onClick={handleBack}>
                <FaArrowLeft size={20} />
              </button> 
    <div className={`lecture-consultation-container ${isLoaded ? "lecture-consultation-loaded" : ""}`}>
 
      {/* Left Panel */}
      <div className="lecture-consultation-left-panel">
        <div className="lecture-consultation-header">
          <div className="lecture-consultation-icon-container">
            <svg
              className="lecture-consultation-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="lecture-consultation-chat-bubble"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="lecture-consultation-title">
            VIEW
            <br />
            CONSULTATIONS
          </div>
        </div>

        <h2 className="lecture-consultation-section-title">Appointments</h2>

        <div className="lecture-consultation-appointments-container">
          <div className="lecture-consultation-modules">
            <p className="lecture-consultation-label">Modules:</p>
            <div className="lecture-consultation-module-buttons">
              <button
                className={`lecture-consultation-module-button lecture-consultation-ppa ${selectedModule === "PPA1150" ? "lecture-consultation-selected" : ""}`}
                onClick={() => handleModuleClick("PPA1150")}
              >
                PPAF05D
              </button>
              <button
                className={`lecture-consultation-module-button lecture-consultation-ppg ${selectedModule === "PPG1150" ? "lecture-consultation-selected" : ""}`}
                onClick={() => handleModuleClick("PPG1150")}
              >
                PPG115D                
              </button>
              <button
                className={`lecture-consultation-module-button lecture-consultation-aop ${selectedModule === "AOP2150" ? "lecture-consultation-selected" : ""}`}
                onClick={() => handleModuleClick("AOP2150")}
              >
                AOP215D
              </button>
              <button
                className={`lecture-consultation-module-button lecture-consultation-int ${selectedModule === "INT2150" ? "lecture-consultation-selected" : ""}`}
                onClick={() => handleModuleClick("INT2150")}
              >
                INT316D
              </button>
            </div>
          </div>

          <div className="lecture-consultation-date">
            <p className="lecture-consultation-label">Date:</p>
            <div className="lecture-consultation-date-selectors">
              <select
                className="lecture-consultation-select lecture-consultation-day"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <select
                className="lecture-consultation-select lecture-consultation-month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                className="lecture-consultation-select lecture-consultation-year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="lecture-consultation-find-container">
            <button className="lecture-consultation-find-button" onClick={handleFindClick}>
              Find
              <span className="lecture-consultation-cursor"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      {showRightPanel ? (
        <div className="lecture-consultation-right-panel">
          <div className="lecture-consultation-about">
            <h2 className="lecture-consultation-about-title">About Lecture</h2>
            <p className="lecture-consultation-about-text">
              Matiza Tshiamo is a Computer Science lecturer offering consultations for modules including Data
              Structures, Web Development, Databases, and Programming Fundamentals.
            </p>
          </div>

          <div className="lecture-consultation-keys">
            <h3 className="lecture-consultation-keys-title">Keys</h3>
            <div className="lecture-consultation-key-item">
              <span className="lecture-consultation-key-indicator lecture-consultation-booked"></span>
              <span className="lecture-consultation-key-text">Slot Booked</span>
            </div>
            <div className="lecture-consultation-key-item">
              <span className="lecture-consultation-key-indicator lecture-consultation-open"></span>
              <span className="lecture-consultation-key-text">Open Booked</span>
            </div>
          </div>

          <div className="lecture-consultation-schedule">
            <div className="lecture-consultation-date-display">
              <svg
                className="lecture-consultation-calendar-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="lecture-consultation-date-text">
                {selectedDay} {selectedMonth} {selectedYear}
              </span>
            </div>

            <div className="lecture-consultation-table">
              <div className="lecture-consultation-table-header">
                <div className="lecture-consultation-header-cell">Student No.</div>
                <div className="lecture-consultation-header-cell">Duration</div>
                <div className="lecture-consultation-header-cell">Start Time</div>
                <div className="lecture-consultation-header-cell">End Time</div>
                <div className="lecture-consultation-header-cell">Verdict</div>
              </div>
              <div className="lecture-consultation-table-body">
                {consultationSlots.map((slot, index) => (
                  <div key={index} className="lecture-consultation-table-row">
                    <div className="lecture-consultation-cell">{slot.id}</div>
                    <div className="lecture-consultation-cell">{slot.duration}</div>
                    <div className="lecture-consultation-cell">{slot.startTime}</div>
                    <div className="lecture-consultation-cell">{slot.endTime}</div>
                    <div className="lecture-consultation-cell lecture-consultation-verdict">
                      <button className="lecture-consultation-accept-button">Accept</button>
                      <button className="lecture-consultation-decline-button">Decline</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lecture-consultation-pagination">
              <button
                className="lecture-consultation-pagination-button lecture-consultation-prev"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="lecture-consultation-page-indicator">
                {currentPage} of {totalPages}
              </div>
              <button
                className="lecture-consultation-pagination-button lecture-consultation-next"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="lecture-consultation-question-mark-container">
          <div className="lecture-consultation-question-mark">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path
                d="M9 10C9 8.89543 9.89543 8 11 8H12C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12H12V14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="17" r="1" fill="currentColor" />
            </svg>
            <p className="lecture-consultation-question-text">Click "Find" to view consultations</p>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default LectureConsultation
