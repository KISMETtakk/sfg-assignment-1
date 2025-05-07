import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTimetablePopup, setShowTimetablePopup] = useState(false);
  const [showLecturerList, setShowLecturerList] = useState(false);
  const [showStudentCourseSelection, setShowStudentCourseSelection] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [timetableData, setTimetableData] = useState(null);
  const [timetableForStudent, setTimetableForStudent] = useState(false); 

  const [issues, setIssues] = useState([
    { issue: "Projector not working in Room 101", status: "Pending", reportedBy: "Student: Tshiamo" },
    { issue: "AC not cooling - Building A", status: "In Progress", reportedBy: "Lecturer: Mr Matiza" },
    { issue: "Water leak in Room 302", status: "Resolved", reportedBy: "Admin: Jane" },
  ]);

  const lecturers = [
    { name: "Mr. Matiza", modules: ["INT", "MOB"] },
    { name: "Ms. Mokoena", modules: ["SFG", "Networks"] },
  ];

  const courses = ["Computer Science", "Information Technology", "Business Management"];
  const years = ["First Year", "Second Year", "Third Year", "Last Year"];

  const filteredIssues =
    statusFilter === "All"
      ? issues
      : issues.filter((issue) => issue.status === statusFilter);

  const updateStatus = (index, newStatus) => {
    const updated = [...issues];
    updated[index].status = newStatus;
    setIssues(updated);
  };

  const generateTimetable = (modules, user, isStudent = false) => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const dummyTimetable = days.map((day, i) => ({
      day,
      session: modules[i % modules.length],
      time: "10:00 AM - 12:00 PM",
    }));
    setTimetableForStudent(isStudent); 
    setSelectedLecturer(user);
    setTimetableData(dummyTimetable);
    setShowLecturerList(false);
    setShowStudentCourseSelection(false);
    setShowTimetablePopup(false);
  };

  const handleUpload = () => {
    if (timetableForStudent) {
      alert("Uploading timetable to Student...");
      
    } else {
      alert("Uploading timetable to Lecturer...");
      
    }
  };

  const handleLogout = () => {
    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard-container">
      
      <header className="top-navbar">
        <h1>Admin Portal</h1>
        <nav>
          <ul>
            <li onClick={() => { setActiveSection("dashboard"); setTimetableData(null); }}>Dashboard Analytics</li>
            <li onClick={() => { setActiveSection("maintenance"); setTimetableData(null); }}>Maintenance Reports</li>
            <li onClick={() => { setShowTimetablePopup(true); }}>Generate Timetable</li>
            <li onClick={() => setShowNotifications(!showNotifications)} title="Notifications">
              <FaBell size={18} />
            </li>
            <li onClick={handleLogout} className="logout">Logout</li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        
        {timetableData ? (
          <div className="timetable">
            <h3>Timetable for {selectedLecturer?.name || `${selectedCourse} - ${selectedYear}`}</h3>
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Module</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {timetableData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.day}</td>
                    <td>{entry.session}</td>
                    <td>{entry.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleUpload} className="btn-upload">
              {timetableForStudent ? "Upload to Student" : "Upload to Lecturer"}
            </button>
          </div>
        ) : (
          <>
            {activeSection === "dashboard" && (
              <>
                <section className="cards">
                  <div className="card"><h3>Total Maintenance Reports</h3><p>58</p></div>
                  <div className="card"><h3>Issues In Progress</h3><p>15</p></div>
                  <div className="card"><h3>Issues Resolved</h3><p>43</p></div>
                </section>
                <button className="btn-report">Generate PDF Report</button>
              </>
            )}

            {activeSection === "maintenance" && (
              <section className="maintenance-section">
                <h2>Maintenance Issues</h2>
                <label>
                  Filter by Status:
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option>All</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </label>

                <table>
                  <thead>
                    <tr>
                      <th>Reported Issue</th>
                      <th>Status</th>
                      <th>Reported By</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIssues.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.issue}</td>
                        <td>{item.status}</td>
                        <td>{item.reportedBy}</td>
                        <td>
                          <button onClick={() => updateStatus(idx, "Resolved")}>Resolved</button>
                          <button onClick={() => updateStatus(idx, "In Progress")}>In Progress</button>
                          <button onClick={() => updateStatus(idx, "Pending")}>Pending</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {showNotifications && (
              <div className="notification-popup">
                <h4>Notifications</h4>
                <div className="notification-toast">
                  <div className="toast-card info">
                    <strong>New Report</strong>
                    <p>Projector not working in Room 101 was submitted.</p>
                  </div>
                  <div className="toast-card warning">
                    <strong>Status Update</strong>
                    <p>Issue "AC not cooling" marked as In Progress.</p>
                  </div>
                  <div className="toast-card success">
                    <strong>Resolved</strong>
                    <p>Issue "Water leak in Room 302" has been resolved.</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

       
        {showTimetablePopup && (
          <div className="popup-overlay">
            <div className="popup-modal">
              <h2>Generate Timetable</h2>
              <p>Select the user type:</p>
              <div className="popup-buttons">
                <button onClick={() => setShowLecturerList(true)}>Lecturer</button>
                <button onClick={() => setShowStudentCourseSelection(true)}>Student</button>
                <button className="close-btn" onClick={() => setShowTimetablePopup(false)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {showLecturerList && (
          <div className="popup-overlay">
            <div className="popup-modal">
              <h3>Select Lecturer</h3>
              <ul>
                {lecturers.map((lec, idx) => (
                  <li key={idx}>
                    <button onClick={() => generateTimetable(lec.modules, lec)}>
                      {lec.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {showStudentCourseSelection && (
          <div className="popup-overlay">
            <div className="popup-modal">
              <h3>Select Course and Year</h3>

              <label>
                Course:
                <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                  <option value="">-- Select Course --</option>
                  {courses.map((course, idx) => (
                    <option key={idx} value={course}>{course}</option>
                  ))}
                </select>
              </label>

              <label>
                Year:
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                  <option value="">-- Select Year --</option>
                  {years.map((year, idx) => (
                    <option key={idx} value={year}>{year}</option>
                  ))}
                </select>
              </label>

              <button
                disabled={!selectedCourse || !selectedYear}
                onClick={() => {
                  const modules = ["Module A", "Module B", "Module C"]; 
                  generateTimetable(modules, `${selectedCourse} - ${selectedYear}`, true); // Set isStudent to true
                  setShowStudentCourseSelection(false);
                }}
                style={{ marginTop: "1rem", backgroundColor: "#28a745", color: "white", padding: "0.6rem" }}
              >
                Generate Timetable
              </button>

              <button
                className="close-btn"
                onClick={() => setShowStudentCourseSelection(false)}
                style={{ marginTop: "1rem" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;








