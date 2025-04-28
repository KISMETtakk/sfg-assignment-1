import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

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
            <li onClick={() => setActiveSection("notifications")}>Notifications</li>
            <li onClick={handleLogout} className="logout">Logout</li>
          </ul>
        </nav>
      </header>

      <main className="main-content">
        {activeSection === "dashboard" && (
          <section className="cards">
            <div className="card">
              <h3>Total Maintenance Reports</h3>
              <p>58</p>
            </div>
            <div className="card">
              <h3>Issues In Progress</h3>
              <p>15</p>
            </div>
            <div className="card">
              <h3>Issues Resolved</h3>
              <p>43</p>
            </div>
          </section>
        )}

        {activeSection === "maintenance" && (
          <section className="maintenance-section">
            <h2>Maintenance Issues</h2>
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
                <tr>
                  <td>Projector not working in Room 101</td>
                  <td>Open</td>
                  <td>Student: Tshiamo</td>
                  <td>
                    <button>Mark In Progress</button>
                    <button>Mark as Resolved</button>
                  </td>
                </tr>
                <tr>
                  <td>AC not cooling - Building A</td>
                  <td>In Progress</td>
                  <td>Lecturer: Mr Matiza</td>
                  <td>
                    <button>Mark as Resolved</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        )}

        {activeSection === "notifications" && (
          <section className="notifications-section">
            <h2>Notifications</h2>
            <ul className="notification-list">
              <li>Maintenance Report: Projector Room 101 submitted.</li>
              <li>Issue "AC not cooling" marked as In Progress.</li>
              <li>Issue "Water leak in Room 302" has been resolved.</li>
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;



