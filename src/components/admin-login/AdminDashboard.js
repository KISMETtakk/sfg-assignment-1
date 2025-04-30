import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showNotifications, setShowNotifications] = useState(false);

  const [issues, setIssues] = useState([
    { issue: "Projector not working in Room 101", status: "Pending", reportedBy: "Student: Tshiamo" },
    { issue: "AC not cooling - Building A", status: "In Progress", reportedBy: "Lecturer: Mr Matiza" },
    { issue: "Water leak in Room 302", status: "Resolved", reportedBy: "Admin: Jane" },
  ]);

  const filteredIssues = statusFilter === "All"
    ? issues
    : issues.filter(issue => issue.status === statusFilter);

  const updateStatus = (index, newStatus) => {
    const updated = [...issues];
    updated[index].status = newStatus;
    setIssues(updated);
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
            <li onClick={() => setActiveSection("dashboard")}>Dashboard Analytics</li>
            <li onClick={() => setActiveSection("maintenance")}>Maintenance Reports</li>
            <li onClick={() => setActiveSection("logs")}>User Activity Logs</li>
            <li onClick={() => setShowNotifications(!showNotifications)} title="Notifications">
              <FaBell size={18} />
            </li>
            <li onClick={handleLogout} className="logout">Logout</li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
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

        {activeSection === "logs" && (
        <section className="activity-logs-section">
        <h2>User Activity Logs</h2>
        <div className="log-cards">
          <div className="log-card">
            <strong>Student Tshiamo</strong>
            <p>Logged in at 09:02</p>
          </div>
          <div className="log-card">
            <strong>Lecturer Mr Matiza</strong>
            <p>Updated maintenance report at 10:15</p>
          </div>
          <div className="log-card">
            <strong>Admin Jane</strong>
            <p>Generated system report at 11:00</p>
          </div>
        </div>
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
      </main>
    </div>
  );
}

export default AdminDashboard;



