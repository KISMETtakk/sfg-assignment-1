"use client"

import { useState, useEffect } from "react"
import { FaSignOutAlt} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Added useNavigate
import {
  BarChart,
  PieChart,
  LineChart,
  Bar,
  Pie,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Users, BookOpen, MessageSquare, PenToolIcon as Tool, Menu, X, Home, Settings, Bell, User } from "lucide-react"
import "./AdminDashboard.css"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate(); // Initialize navigate
  const handleGoHome = () => {
    navigate('/logout-confirmation');
  };
    const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Sample data for the charts
  const registrationData = [
    { name: "Students", value: 1250, color: "#cd102c" },
    { name: "Lecturers", value: 85, color: "#013786" },
  ]

  const consultationData = [
    { name: "Requested", value: 320, color: "#cd102c" },
    { name: "Accepted", value: 275, color: "#013786" },
  ]

  const maintenanceData = [
    { name: "Student Requests", value: 145, color: "#cd102c" },
    { name: "Lecturer Requests", value: 78, color: "#013786" },
  ]

  const maintenanceStatusData = [
    { name: "Resolved", value: 156, color: "#e3b20f" },
    { name: "Pending", value: 67, color: "#8c6b09" },
  ]

  const monthlyData = [
    { name: "Jan", students: 850, lecturers: 65, consultations: 180 },
    { name: "Feb", students: 940, lecturers: 68, consultations: 220 },
    { name: "Mar", students: 1020, lecturers: 72, consultations: 250 },
    { name: "Apr", students: 1080, lecturers: 75, consultations: 270 },
    { name: "May", students: 1150, lecturers: 78, consultations: 290 },
    { name: "Jun", students: 1250, lecturers: 85, consultations: 320 },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
    const [isLoaded, setIsLoaded] = useState(false)
    const [loading, setLoading] = useState(true);  

    useEffect(() => {
      setIsLoaded(true)
    }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner-a"></div>
        <p>Loading...</p>
      </div>
    );
  }


  return (
    <div className={`admin-dash-container ${isLoading ? "" : "admin-dash-loaded"}`}>
      {/* Navigation */}
      <nav className="admin-dash-navbar">
        <div className="admin-dash-logo">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="admin-dash-nav-links">
          <a href="/admin-dashboard" className="admin-dash-nav-link admin-dash-active">
            <Home size={20} /> Dashboard
          </a>
          {/* <a href="/users-page" className="admin-dash-nav-link">
            <Users size={20} /> Users
          </a> */}
          <a href="/consultations-page" className="admin-dash-nav-link">
            <MessageSquare size={20} /> Consultations
          </a>
          <a href="/maintenance-page" className="admin-dash-nav-link">
            <Tool size={20} /> Maintenance
          </a>
          {/* <a href="/settings-page" className="admin-dash-nav-link">
            <Settings size={20} /> Settings
          </a> */}
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
        {/* <a href="/users-page" className="admin-dash-mobile-link">
          <Users size={20} /> Users
        </a> */}
        <a href="/consultations-page" className="admin-dash-mobile-link">
          <MessageSquare size={20} /> Consultations
        </a>
        <a href="/maintenance-page" className="admin-dash-mobile-link">
          <Tool size={20} /> Maintenance
        </a>
        {/* <a href="/settings-page" className="admin-dash-mobile-link">
          <Settings size={20} /> Settings
        </a> */}
      </div>

      {/* Main Content */}
      <main className="admin-dash-main">
        <div className="admin-dash-header">
          <h2>Analytics Overview</h2>
          <p>Welcome back, Admin! Here's what's happening in your system.</p>
        </div>

        {/* Summary Cards */}
        <div className="admin-dash-summary-cards">
          <div className="admin-dash-card admin-dash-animate-in" style={{ "--delay": "0.1s" }}>
            <div className="admin-dash-card-icon admin-dash-student-color">
              <Users size={24} />
            </div>
            <div className="admin-dash-card-content">
              <h3>Students</h3>
              <p className="admin-dash-card-value">1,250</p>
              <p className="admin-dash-card-change admin-dash-positive">+12% from last month</p>
            </div>
          </div>

          <div className="admin-dash-card admin-dash-animate-in" style={{ "--delay": "0.2s" }}>
            <div className="admin-dash-card-icon admin-dash-lecturer-color">
              <BookOpen size={24} />
            </div>
            <div className="admin-dash-card-content">
              <h3>Lecturers</h3>
              <p className="admin-dash-card-value">85</p>
              <p className="admin-dash-card-change admin-dash-positive">+5% from last month</p>
            </div>
          </div>

          <div className="admin-dash-card admin-dash-animate-in" style={{ "--delay": "0.3s" }}>
            <div className="admin-dash-card-icon admin-dash-student-color">
              <MessageSquare size={24} />
            </div>
            <div className="admin-dash-card-content">
              <h3>Consultations</h3>
              <p className="admin-dash-card-value">320</p>
              <p className="admin-dash-card-change admin-dash-positive">+8% from last month</p>
            </div>
          </div>

          <div className="admin-dash-card admin-dash-animate-in" style={{ "--delay": "0.4s" }}>
            <div className="admin-dash-card-icon admin-dash-primary-color">
              <Tool size={24} />
            </div>
            <div className="admin-dash-card-content">
              <h3>Maintenance</h3>
              <p className="admin-dash-card-value">223</p>
              <p className="admin-dash-card-change admin-dash-negative">-3% from last month</p>
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
              <p>Requested vs. Accepted consultations</p>
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
              <p>Student vs. Lecturer maintenance requests</p>
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

          {/* Monthly Trends Chart */}
          <div
            className="admin-dash-chart-container admin-dash-wide admin-dash-animate-in"
            style={{ "--delay": "0.9s" }}
          >
            <div className="admin-dash-chart-header">
              <h3>Monthly Trends</h3>
              <p>Registration and consultation trends over time</p>
            </div>
            <div className="admin-dash-chart">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
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
                  <Line type="monotone" dataKey="students" stroke="#cd102c" name="Students" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="lecturers" stroke="#013786" name="Lecturers" />
                  <Line type="monotone" dataKey="consultations" stroke="#e3b20f" name="Consultations" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
