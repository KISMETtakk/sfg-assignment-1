import React, { useState, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ConsultWithLecture.css';
import SearchP1 from '../assets/images/img24.jpg';
import SearchP2 from '../assets/images/img34.jpg';
import SearchP3 from '../assets/images/img82.jpg';
import QuestionMark from '../assets/images/Question Mark.png';
import { useNavigate } from 'react-router-dom';

const ConsultWithLecture = () => {
  const [loading, setLoading] = useState(true);
  const [consultSelected, setConsultSelected] = useState(false);
  const [bookedSlots, setBookedSlots] = useState(Array(7).fill(false));
  const [disabledSlots, setDisabledSlots] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [lecturers, setLecturers] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    day: today.getDate(),
    month: today.toLocaleString('default', { month: 'long' }),
    year: today.getFullYear()
  });
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem('student'));

  const predefinedSlots = [
    "08:30:00", "09:00:00", "11:00:00", "11:30:00",
    "14:30:00", "15:00:00", "15:30:00"
  ];

  useLayoutEffect(() => {
    axios.get('http://localhost:8180/api/lecturer/get-all')
      .then(res => {
        setLecturers(res.data);
        setLoading(false);
        setPageLoaded(true);
      })
      .catch(err => {
        console.error('Failed to fetch lecturers:', err);
        setLoading(false);
      });
  }, []);

  const handleBackToStuDashB = () => navigate('/student-logged');

  const handleBack = () => {
    setConsultSelected(false);
    setModules([]);
    setSelectedLecturer(null);
    setDisabledSlots([]);
  };

  const handleSlotSelection = (index) => {
    if (disabledSlots.includes(index)) return;
    const updatedSlots = Array(7).fill(false);
    updatedSlots[index] = true;
    setBookedSlots(updatedSlots);
    setSelectedSlot(index);
  };

 const fetchModulesForLecturer = async (lecturerId) => {
  try {
    const lecturer = lecturers.find(l => l.lecturerID === lecturerId);
    const response = await axios.get(`http://localhost:8180/api/lecturer/modules/${lecturerId}`);
    const uniqueModules = [];
    const seenModuleIds = new Set();

    for (const mod of response.data) {
      if (!seenModuleIds.has(mod.moduleID)) {
        uniqueModules.push(mod);
        seenModuleIds.add(mod.moduleID);
      }
    }

    setModules(uniqueModules);
    setSelectedLecturer(lecturer);
    setConsultSelected(true);
  } catch (err) {
    console.error('Error fetching modules:', err);
  }
};


  const monthIndex = {
    January: '01', February: '02', March: '03', April: '04', May: '05', June: '06',
    July: '07', August: '08', September: '09', October: '10', November: '11', December: '12'
  };

  const handleConsult = async () => {
    if (!selectedModule) return;
    const { day, month, year } = selectedDate;
    const formattedDate = `${year}-${monthIndex[month]}-${String(day).padStart(2, '0')}`;

    try {
      const response = await axios.get(`http://localhost:8180/api/appointment/by-module-and-date?moduleID=${selectedModule.moduleID}&date=${formattedDate}`);
      const bookedTimes = response.data.map(a => a.startTime);
      const toDisable = predefinedSlots.map((time, idx) => bookedTimes.includes(time) ? idx : null).filter(i => i !== null);
      setDisabledSlots(toDisable);
    } catch (err) {
      console.error("Failed to fetch appointment slots:", err);
    }
  };

  const handleCreateBooking = async () => {
    if (!selectedModule || selectedSlot === null || !selectedLecturer || !student) return;
    const { day, month, year } = selectedDate;
    const formattedDate = `${year}-${monthIndex[month]}-${String(day).padStart(2, '0')}`;

    const startTime = predefinedSlots[selectedSlot];
    const endTime = predefinedSlots[selectedSlot + 1] || "16:00:00";

    const appointment = {
      studentId: student.studentID,
      lecturerId: selectedLecturer.lecturerID,
      moduleId: selectedModule.moduleID,
      date: formattedDate,
      startTime,
      endTime
    };

    try {
      await axios.post('http://localhost:8180/api/appointment/create', appointment);
      toast.success(`${student.fName} has created appointment successfully!`);
      setDisabledSlots(prev => [...prev, selectedSlot]);
      setBookedSlots(Array(7).fill(false));
    } catch (err) {
      console.error("Booking error:", err);
      toast.error('Failed to create appointment.');
    }
  };

  const getCurrentMonthDays = () => {
    const year = selectedDate.year;
    const month = Object.keys(monthIndex).indexOf(selectedDate.month);
    const todayDay = today.getDate();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth - todayDay + 1 }, (_, i) => todayDay + i);
  };

  if (loading) return <div className="loader-container"><div className="spinner"></div><p>Loading...</p></div>;

  return (
    <div className="consult-container">
      <ToastContainer />
      <button className="student-login-back-button" onClick={handleBackToStuDashB}><FaArrowLeft size={20} /></button>

      <div className="left-panel">
        <div className={`header ${pageLoaded ? 'slide-in-left delay-1' : ''}`}>
          <FontAwesomeIcon icon={faUserFriends} className="consult-icon" />
          <h3>CONSULT WITH LECTURE</h3>
        </div>

        <div className={`search-container ${pageLoaded ? 'slide-in-left delay-2' : ''}`}>
          <input className="search-input" type="text" placeholder="Search Lecture..." />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>

        <div className={`lecture-list ${pageLoaded ? 'slide-in-left delay-3' : ''}`}>
          {lecturers.map((lecturer, index) => (
            <div key={lecturer.lecturerID} className="lecture-card">
              <img src={index % 2 === 0 ? SearchP1 : SearchP2} alt={`${lecturer.fname} ${lecturer.lname}`} className="avatar" />
              <div>
                <span className="title">Lecture</span>
                <p><strong>{lecturer.fname}</strong> {lecturer.lname}</p>
              </div>
              <button className="consult-button" onClick={() => fetchModulesForLecturer(lecturer.lecturerID)}>View Lecture</button>
            </div>
          ))}
        </div>

        {consultSelected && (
          <>
            <h2 className={`sca-movedown ${pageLoaded ? 'slide-in-left delay-4' : ''}`}>Schedule Consultation Appointment</h2>
            <div className={`schedule-section ${pageLoaded ? 'slide-in-left delay-5' : ''}`}>
              <h4>Modules:</h4>
              <div className="module-buttons">
                {modules.map((module, index) => (
                  <button key={index} title={module.moduleName} onClick={() => setSelectedModule(module)}>{module.moduleCode}</button>
                ))}
              </div>

              <h4>Date:</h4>
              <div className="date-select">
                <select onChange={e => setSelectedDate({ ...selectedDate, day: parseInt(e.target.value) })}>
                  {getCurrentMonthDays().map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <select onChange={e => setSelectedDate({ ...selectedDate, month: e.target.value })} value={selectedDate.month}>
                  {Object.keys(monthIndex).map((month, i) => (<option key={i} value={month}>{month}</option>))}
                </select>
                <select onChange={e => setSelectedDate({ ...selectedDate, year: parseInt(e.target.value) })} value={selectedDate.year}>
                  {Array.from({ length: 6 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div>
              <button className="consult-button" onClick={handleConsult}>Consult</button>
            </div>
          </>
        )}
      </div>

      <div className={`right-panel ${consultSelected ? 'show' : 'hide'} ${pageLoaded ? 'slide-in-right delay-6' : ''}`}>
        {consultSelected ? (
          <div className="consultation-content fade-in">
            <button className="student-login-back-button" onClick={handleBack}><FaArrowLeft size={20} /></button>
            <div className="lecture-info">
              <img src={SearchP3} alt="Lecturer" className="profile-pic" />
              <h4>Lecture</h4>
              <h3 className="left-align">{selectedLecturer?.fname} {selectedLecturer?.lname}</h3>
              <p className="left-align">{selectedLecturer?.bio || `${selectedLecturer?.fname} is a Computer Science lecturer available for consultations.`}</p>
              <p className="left-align"><strong>Email:</strong> {selectedLecturer?.lecturerEmail}</p>
            </div>

            <div className="schedule-table">
              <div className="date-header">{`${selectedDate.day} ${selectedDate.month} ${selectedDate.year}`}</div>
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
                  {predefinedSlots.map((start, index) => (
                    <tr key={index}>
                      <td>
                        Consultation<br />
                        <span style={{ fontSize: '12px', color: '#888' }}>{selectedModule?.moduleCode}</span>
                      </td>
                      <td>(30 Minutes)</td>
                      <td>{start.slice(0, 5)}</td>
                      <td>{predefinedSlots[index + 1]?.slice(0, 5) || '16:00'}</td>
                      <td>
                        <input
                          type="checkbox"
                          className={`booking-checkbox ${bookedSlots[index] ? 'booked' : 'open'}`}
                          checked={bookedSlots[index]}
                          disabled={disabledSlots.includes(index)}
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

            <button className="create-booking" onClick={handleCreateBooking}>Create Booking</button>
          </div>
        ) : (
          <img src={QuestionMark} alt="Question Mark" className="question-image red-border" />
        )}
      </div>
    </div>
  );
};

export default ConsultWithLecture;
