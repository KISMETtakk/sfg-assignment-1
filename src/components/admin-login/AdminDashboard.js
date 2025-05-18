"use client"

import { useState, useEffect, useRef } from "react"
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  PieChart,
  Bar,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Users, BookOpen, MessageSquare, PenToolIcon as Tool, Menu, X, Home, Bell, User } from "lucide-react"
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./AdminDashboard.css"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [students, setStudents] = useState([])
  const [lecturers, setLecturers] = useState([])
  const [maintenanceIssues, setMaintenanceIssues] = useState([])
  const [appointments, setAppointments] = useState([])
  const admin = JSON.parse(localStorage.getItem("admin"))
  const navigate = useNavigate();
  const analyticsRef = useRef(null); // Ref for analytics section

  const handleGoHome = () => {
    navigate('/logout-confirmation');
  };

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8180/api/student/get-all").then(res => res.json()),
      fetch("http://localhost:8180/api/lecturer/get-all").then(res => res.json()),
      fetch("http://localhost:8180/api/report-issues/get-all").then(res => res.json()),
      fetch("http://localhost:8180/api/appointment/gellAll-appointments").then(res => res.json()),
    ])
      .then(([studentData, lecturerData, maintenanceData, appointmentData]) => {
        setStudents(studentData || []);
        setLecturers(lecturerData || []);
        setMaintenanceIssues(maintenanceData || []);
        setAppointments(appointmentData || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setIsLoading(false);
      });
  }, []);

  const studentMaintenanceCount = maintenanceIssues.length;

  const consultationPendingCount = appointments.filter(
    appt => appt.status && appt.status.toLowerCase() === "pending"
  ).length;

  const consultationAcceptedCount = appointments.filter(
    appt => appt.status && (appt.status.toLowerCase() === "accept" || appt.status.toLowerCase() === "accepted")
  ).length;

  const registrationData = [
    { name: "Students", value: students.length, color: "#cd102c" },
    { name: "Lecturers", value: lecturers.length, color: "#013786" },
  ]

  const consultationData = [
    { name: "Pending", value: consultationPendingCount, color: "#cd102c" },
    { name: "Accepted", value: consultationAcceptedCount, color: "#013786" },
  ]

  const maintenanceData = [
    { name: "Student Requests", value: studentMaintenanceCount, color: "#cd102c" }
  ]

  const maintenanceStatusData = [
    { name: "Resolved", value: maintenanceIssues.filter(i => i.status.toLowerCase() === "closed").length, color: "#e3b20f" },
    { name: "Pending", value: maintenanceIssues.filter(i => i.status.toLowerCase() !== "closed").length, color: "#8c6b09" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const downloadPDF = () => {
    if (!analyticsRef.current) return;

    html2canvas(analyticsRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollY: -window.scrollY, // To capture viewport correctly
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('admin-analytics.pdf');
    });
  }

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="spinner-a"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`admin-dash-container admin-dash-loaded`}>
      {/* Navigation */}
      <nav className="admin-dash-navbar">
        <div className="admin-dash-logo">
          <h1>Welcome, {admin?.fname} 👋</h1>
        </div>
        <div className="admin-dash-nav-links">
          <a href="/admin-dashboard" className="admin-dash-nav-link admin-dash-active">
            <Home size={20} /> Dashboard
          </a>
          <a href="/consultations-page" className="admin-dash-nav-link">
            <MessageSquare size={20} /> Consultations
          </a>
          <a href="/maintenance-page" className="admin-dash-nav-link">
            <Tool size={20} /> Maintenance
          </a>
          <a href="/timetable-page" className="admin-dash-nav-link">
            <Tool size={20} /> Timetable
          </a>
        </div>
        <div className="admin-dash-nav-actions">
          <button className="admin-dash-icon-button">
            <Bell size={20} />
            <span className="admin-dash-notification-badge">3</span>
          </button>
          <div className="admin-dash-user-profile" onClick={handleGoHome}>
            <div className="admin-dash-avatar">
              <User size={20} />
            </div>
            <span className="admin-dash-username">Logout</span>
          </div>
        </div>
        <button className="admin-dash-menu-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`admin-dash-mobile-menu ${isMobileMenuOpen ? "admin-dash-mobile-menu-open" : ""}`}>
        <a href="/admin-dashboard" className="admin-dash-mobile-link admin-dash-active">
          <Home size={20} /> Dashboard
        </a>
        <a href="/consultations-page" className="admin-dash-mobile-link">
          <MessageSquare size={20} /> Consultations
        </a>
        <a href="/maintenance-page" className="admin-dash-mobile-link">
          <Tool size={20} /> Maintenance
        </a>
      </div>

      {/* Main Content */}
      <main className="admin-dash-main">
        <div className="admin-dash-header">
          <h2>Analytics Overview</h2>
          <p>Welcome back, Admin! Here's what's happening in your system.</p>
        </div>

        {/* Analytics Section to capture */}
        <div ref={analyticsRef} style={{ padding: '10px', backgroundColor: 'white' }}>
          {/* Summary Cards */}
          <div className="admin-dash-summary-cards">
            <div className="admin-dash-card admin-dash-animate-in" style={{ "--delay": "0.1s" }}>
              <div className="admin-dash-card-icon admin-dash-student-color">
                <Users size={24} />
              </div>
              <div className="admin-dash-card-content">
                <h3>Students</h3>
                <p className="admin-dash-card-value">{students.length.toLocaleString()}</p>
                
              </div>
            </div>

            <div className="admin-dash-card admin-dash-animate-in" style={{ "--delay": "0.2s" }}>
              <div className="admin-dash-card-icon admin-dash-lecturer-color">
                <BookOpen size={24} />
              </div>
              <div className="admin-dash-card-content">
                <h3>Lecturers</h3>
                <p className="admin-dash-card-value">{lecturers.length.toLocaleString()}</p>
             
              </div>
            </div>

            <div className="admin-dash-card admin-dash-animate-in" style={{ "--delay": "0.3s" }}>
              <div className="admin-dash-card-icon admin-dash-student-color">
                <MessageSquare size={24} />
              </div>
              <div className="admin-dash-card-content">
                <h3>Consultations</h3>
                <p className="admin-dash-card-value">{consultationPendingCount + consultationAcceptedCount}</p>
                
              </div>
            </div>

            <div className="admin-dash-card admin-dash-animate-in" style={{ "--delay": "0.4s" }}>
              <div className="admin-dash-card-icon admin-dash-primary-color">
                <Tool size={24} />
              </div>
              <div className="admin-dash-card-content">
                <h3>Maintenance</h3>
                <p className="admin-dash-card-value">{studentMaintenanceCount}</p>
             
              </div>
            </div>
            
          </div>
          

          {/* Charts Section */}
          <div className="admin-dash-charts-grid">
            {/* Registration Chart */}
            <div className="admin-dash-chart-container admin-dash-animate-in" style={{ "--delay": "0.5s" }}>
              <div className="admin-dash-chart-header">
                <h3>Registration Overview</h3>
                <p>Total users registered on the system</p>
              </div>
              <div className="admin-dash-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={registrationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="value" name="Number of Registrations">
                      {registrationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Consultation Chart */}
            <div className="admin-dash-chart-container admin-dash-animate-in" style={{ "--delay": "0.6s" }}>
              <div className="admin-dash-chart-header">
                <h3>Consultation Status</h3>
                <p>Pending vs. Accepted consultations</p>
              </div>
              <div className="admin-dash-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={consultationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {consultationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Maintenance Requests Chart */}
            <div className="admin-dash-chart-container admin-dash-animate-in" style={{ "--delay": "0.7s" }}>
              <div className="admin-dash-chart-header">
                <h3>Maintenance Requests</h3>
                <p>Student maintenance requests</p>
              </div>
              <div className="admin-dash-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={maintenanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="value" name="Number of Requests">
                      {maintenanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Maintenance Status Chart */}
            <div className="admin-dash-chart-container admin-dash-animate-in" style={{ "--delay": "0.8s" }}>
              <div className="admin-dash-chart-header">
                <h3>Maintenance Status</h3>
                <p>Resolved vs. Pending maintenance requests</p>
              </div>
              <div className="admin-dash-chart">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={maintenanceStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {maintenanceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Moved download button below analytics for clean PDF */}
        <button
          onClick={downloadPDF}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#cd102c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Download Analytics as PDF
        </button>
      </main>
    </div>
  )
}
