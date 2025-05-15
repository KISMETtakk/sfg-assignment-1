import { useState, useEffect } from "react";
import "./LectureConsultation.css";
import LectureNavigationBar from './LectureNavigationBar';
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LectureConsultation = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showRightPanel, setShowRightPanel] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [consultationSlots, setConsultationSlots] = useState([]);
  const totalPages = 3;
  const [loading, setLoading] = useState(true);

  const lecturer = JSON.parse(localStorage.getItem("lecturer"));

  const handleBack = () => window.history.back();

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const days = Array.from({ length: lastDayOfMonth - currentDay + 1 }, (_, i) => String(currentDay + i));
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = ["2025"];

  useEffect(() => {
    setIsLoaded(true);
    setSelectedDay(String(currentDay));
    setSelectedMonth(months[currentMonth]);

    const fetchModules = async () => {
      try {
        const res = await axios.get(`http://localhost:8180/api/lecturer/modules/${lecturer.lecturerID}`);
        const unique = [];
        const seenCodes = new Set();

        for (const mod of res.data) {
          if (!seenCodes.has(mod.moduleCode)) {
            unique.push(mod);
            seenCodes.add(mod.moduleCode);
          }
        }

        setModules(unique);
        if (unique.length > 0) setSelectedModule(unique[0].moduleCode);
      } catch (err) {
        console.error("Failed to load modules:", err);
      }
    };

    fetchModules();
  }, []);

  const handleModuleClick = (code) => {
    setSelectedModule(code);
  };

  const handleFindClick = async () => {
    try {
      const selectedDate = `${selectedYear}-${String(months.indexOf(selectedMonth) + 1).padStart(2, '0')}-${selectedDay.padStart(2, '0')}`;
      const selected = modules.find((m) => m.moduleCode === selectedModule);

      const res = await axios.get(
        `http://localhost:8180/api/appointment/by-module-and-date?moduleID=${selected.moduleID}&date=${selectedDate}`
      );

      const formattedSlots = res.data.map((appt) => {
        const startTime = new Date(`1970-01-01T${appt.startTime}`);
        const endTime = new Date(`1970-01-01T${appt.endTime}`);
        const duration = (endTime - startTime) / 60000;

        return {
          id: appt.student.studentID,
          appointmentID: appt.appointmentID,
          duration: `(${duration} Minutes)`,
          startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: appt.status
        };
      });

      setConsultationSlots(formattedSlots);
      setShowRightPanel(true);
    } catch (err) {
      console.error("Failed to fetch appointments:", err);
      alert("Unable to fetch appointments.");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8180/api/appointment/update-status/${id}?status=${status}`);
      toast.success(`Status updated to \"${status}\"`);
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

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
      <ToastContainer position="top-center" />
      <div className={`lecture-consultation-container ${isLoaded ? "lecture-consultation-loaded" : ""}`}>
        <div className="lecture-consultation-left-panel">
          <div className="lecture-consultation-header">
            <div className="lecture-consultation-icon-container">
              <svg className="lecture-consultation-icon" viewBox="0 0 24 24" fill="none">
                <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" />
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <div className="lecture-consultation-title">VIEW<br />CONSULTATIONS</div>
          </div>

          <h2 className="lecture-consultation-section-title">Appointments</h2>

          <div className="lecture-consultation-appointments-container">
            <div className="lecture-consultation-modules">
              <p className="lecture-consultation-label">Modules:</p>
              <div className="lecture-consultation-module-buttons">
                {modules.map((mod) => (
                  <button
                    key={mod.moduleCode}
                    className={`lecture-consultation-module-button ${selectedModule === mod.moduleCode ? "lecture-consultation-selected" : ""}`}
                    onClick={() => handleModuleClick(mod.moduleCode)}
                  >
                    {mod.moduleCode}
                  </button>
                ))}
              </div>
            </div>

            <div className="lecture-consultation-date">
              <p className="lecture-consultation-label">Date:</p>
              <div className="lecture-consultation-date-selectors">
                <select className="lecture-consultation-select lecture-consultation-day" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                  {days.map(day => <option key={day} value={day}>{day}</option>)}
                </select>
                <select className="lecture-consultation-select lecture-consultation-month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                  {months.map(month => <option key={month} value={month}>{month}</option>)}
                </select>
                <select className="lecture-consultation-select lecture-consultation-year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                  {years.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
              </div>
            </div>

            <div className="lecture-consultation-find-container">
              <button className="lecture-consultation-find-button" onClick={handleFindClick}>
                Find <span className="lecture-consultation-cursor"></span>
              </button>
            </div>
          </div>
        </div>

        {showRightPanel ? (
          <div className="lecture-consultation-right-panel">
            <div className="lecture-consultation-about">
              <h2 className="lecture-consultation-about-title">About Lecture</h2>
              <p className="lecture-consultation-about-text">
                {lecturer?.fname} {lecturer?.lname} is a Computer Science lecturer offering consultations for the following modules:
                <br />
                <strong>
                  {modules.length > 0
                    ? modules.map((mod) => mod.moduleName).join(", ")
                    : "No modules assigned."}
                </strong>
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
                <span className="lecture-consultation-date-text">{selectedDay} {selectedMonth} {selectedYear}</span>
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
                        <button className="lecture-consultation-accept-button" onClick={() => updateStatus(slot.appointmentID, "Accept")}>Accept</button>
                        <button className="lecture-consultation-decline-button" onClick={() => updateStatus(slot.appointmentID, "Decline")}>Decline</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lecture-consultation-pagination">
                <button className="lecture-consultation-pagination-button lecture-consultation-prev" onClick={handlePrevPage} disabled={currentPage === 1}>
                  &lt;
                </button>
                <div className="lecture-consultation-page-indicator">{currentPage} of {totalPages}</div>
                <button className="lecture-consultation-pagination-button lecture-consultation-next" onClick={handleNextPage} disabled={currentPage === totalPages}>
                  &gt;
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="lecture-consultation-question-mark-container">
            <div className="lecture-consultation-question-mark">
              <p className="lecture-consultation-question-text">Click "Find" to view consultations</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LectureConsultation;
