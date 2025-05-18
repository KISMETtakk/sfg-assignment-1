"use client"

import { useState, useEffect } from "react"
import {
  Users,
  BookOpen,
  MessageSquare,
  PenToolIcon as Tool,
  Menu,
  X,
  Home,
  Bell,
  User,
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import "./AdminDashboard.css"
import "./ConsultationPage.css"

export default function ConsultationsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("pending")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [moduleID, setModuleID] = useState(1) // default moduleID
  const [date, setDate] = useState("2025-05-16") // default date, you can default to today

  // Store fetched appointments data
  const [appointmentsData, setAppointmentsData] = useState([])

  // Fetch appointments whenever moduleID or date changes
  useEffect(() => {
    setIsLoading(true)
    fetch(`http://localhost:8180/api/appointment/by-module-and-date?moduleID=${moduleID}&date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        // Map API data to our UI format
        const formattedData = data.map((appt) => ({
          id: appt.appointmentID,
          student: `${appt.student.fName} ${appt.student.lName}`,
          studentEmail: appt.student.studentEmail,
          lecturer: `${appt.lecturer.fname} ${appt.lecturer.lname}`,
          lecturerEmail: appt.lecturer.lecturerEmail,
          subject: appt.module.moduleCode,
          moduleName: appt.module.moduleName,
          moduleCode: appt.module.moduleCode,
          date: appt.date,
          startTime: appt.startTime ? appt.startTime.slice(0, 5) : "TBD",
          endTime: appt.endTime ? appt.endTime.slice(0, 5) : "TBD",
          status: appt.status.toLowerCase(),
          description: `Appointment for module ${appt.module.moduleCode} with lecturer ${appt.lecturer.fname} ${appt.lecturer.lname}`,
        }))
        setAppointmentsData(formattedData)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch appointments:", err)
        setIsLoading(false)
      })
  }, [moduleID, date])

  // Count appointments by status
  const pendingCount = appointmentsData.filter((c) => c.status === "pending").length
  const acceptedCount = appointmentsData.filter((c) => c.status === "accept" || c.status === "accepted").length
  const completedCount = appointmentsData.filter((c) => c.status === "completed").length
  const rejectedCount = appointmentsData.filter((c) => c.status === "rejected").length

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  // Filter and paginate appointments
  const filteredData = appointmentsData.filter(
    (appt) =>
      (activeTab === "all" || appt.status === activeTab) &&
      (
        appt.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.lecturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.moduleName.toLowerCase().includes(searchQuery.toLowerCase())
      )
  )

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "admin-dash-status-pending"
      case "accept":
      case "accepted":
        return "admin-dash-status-accepted"
      case "completed":
        return "admin-dash-status-completed"
      case "rejected":
      case "cancelled":
        return "admin-dash-status-rejected"
      default:
        return ""
    }
  }

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="spinner-a"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className={`admin-dash-container admin-dash-loaded`}>
      {/* Navigation */}
      <nav className="admin-dash-navbar">
        <div className="admin-dash-logo">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="admin-dash-nav-links">
          <a href="/admin-dashboard" className="admin-dash-nav-link">
            <Home size={20} /> Dashboard
          </a>
          <a href="/consultations-page" className="admin-dash-nav-link admin-dash-active">
            <MessageSquare size={20} /> Consultations
          </a>
          <a href="/maintenance-page" className="admin-dash-nav-link">
            <Tool size={20} /> Maintenance
          </a>
        </div>
        <div className="admin-dash-nav-actions">
          <button className="admin-dash-icon-button">
            <Bell size={20} />
            <span className="admin-dash-notification-badge">3</span>
          </button>
          <div className="admin-dash-user-profile">
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
        <a href="admin-dashboard" className="admin-dash-mobile-link">
          <Home size={20} /> Dashboard
        </a>
        <a href="consultations-page" className="admin-dash-mobile-link admin-dash-active">
          <MessageSquare size={20} /> Consultations
        </a>
        <a href="maintenance-page" className="admin-dash-mobile-link">
          <Tool size={20} /> Maintenance
        </a>
      </div>

      {/* Main Content */}
      <main className="admin-dash-main">
        <div className="admin-dash-header admin-dash-animate-in" style={{ "--delay": "0.1s" }}>
          <h2>Consultation Management</h2>
          <p>Manage student consultation requests and appointments</p>

          {/* Module & Date selectors */}
          <div style={{ marginTop: "10px", marginBottom: "20px" }}>
            <label>
              Module ID:{" "}
              <input
                type="number"
                value={moduleID}
                min={1}
                onChange={(e) => setModuleID(Number(e.target.value))}
                style={{ marginRight: "20px", width: "70px" }}
              />
            </label>
            <label>
              Date:{" "}
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="admin-dash-stats-cards admin-dash-animate-in" style={{ "--delay": "0.2s" }}>
          <div
            className={`admin-dash-stat-card ${activeTab === "pending" ? "admin-dash-stat-card-active" : ""}`}
            onClick={() => handleTabChange("pending")}
          >
            <div className="admin-dash-stat-icon admin-dash-student-color">
              <Clock size={24} />
            </div>
            <div className="admin-dash-stat-content">
              <h3>Pending</h3>
              <p className="admin-dash-stat-value">{pendingCount}</p>
            </div>
          </div>

          <div
            className={`admin-dash-stat-card ${activeTab === "accepted" ? "admin-dash-stat-card-active" : ""}`}
            onClick={() => handleTabChange("accepted")}
          >
            <div className="admin-dash-stat-icon admin-dash-lecturer-color">
              <CheckCircle size={24} />
            </div>
            <div className="admin-dash-stat-content">
              <h3>Accepted</h3>
              <p className="admin-dash-stat-value">{acceptedCount}</p>
            </div>
          </div>

          <div
            className={`admin-dash-stat-card ${activeTab === "rejected" ? "admin-dash-stat-card-active" : ""}`}
            onClick={() => handleTabChange("rejected")}
          >
            <div className="admin-dash-stat-icon" style={{ backgroundColor: "#ef4444" }}>
              <XCircle size={24} />
            </div>
            <div className="admin-dash-stat-content">
              <h3>Rejected</h3>
              <p className="admin-dash-stat-value">{rejectedCount}</p>
            </div>
          </div>

          <div
            className={`admin-dash-stat-card ${activeTab === "all" ? "admin-dash-stat-card-active" : ""}`}
            onClick={() => handleTabChange("all")}
          >
            <div className="admin-dash-stat-icon" style={{ backgroundColor: "#6b7280" }}>
              <MessageSquare size={24} />
            </div>
            <div className="admin-dash-stat-content">
              <h3>All</h3>
              <p className="admin-dash-stat-value">{appointmentsData.length}</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="admin-dash-search-container admin-dash-animate-in" style={{ "--delay": "0.3s" }}>
          <Search size={18} className="admin-dash-search-icon" />
          <input
            type="text"
            placeholder="Search consultations..."
            className="admin-dash-search-input"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Appointments Grid */}
        <div className="admin-dash-consultations-grid admin-dash-animate-in" style={{ "--delay": "0.4s" }}>
          {paginatedData.length > 0 ? (
            paginatedData.map((appointment) => (
              <div className="admin-dash-consultation-card" key={appointment.id}>
                <div className="admin-dash-consultation-header">
                  <h3>{appointment.subject} ({appointment.moduleName})</h3>
                  <span className={`admin-dash-status ${getStatusClass(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </div>
                <div className="admin-dash-consultation-details">
                  <div className="admin-dash-consultation-detail">
                    <Users size={16} />
                    <span>
                      <strong>Student:</strong> {appointment.student} ({appointment.studentEmail})
                    </span>
                  </div>
                  <div className="admin-dash-consultation-detail">
                    <BookOpen size={16} />
                    <span>
                      <strong>Lecturer:</strong> {appointment.lecturer} ({appointment.lecturerEmail})
                    </span>
                  </div>
                  <div className="admin-dash-consultation-detail">
                    <Calendar size={16} />
                    <span>
                      <strong>Date:</strong> {appointment.date}
                    </span>
                  </div>
                  <div className="admin-dash-consultation-detail">
                    <Clock size={16} />
                    <span>
                      <strong>Start Time:</strong> {appointment.startTime || "TBD"}
                    </span>
                  </div>
                  <div className="admin-dash-consultation-detail">
                    <Clock size={16} />
                    <span>
                      <strong>End Time:</strong> {appointment.endTime || "TBD"}
                    </span>
                  </div>
                </div>
                <div className="admin-dash-consultation-description">
                  <p>{appointment.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="admin-dash-no-results">
              <MessageSquare size={48} />
              <h3>No appointments found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="admin-dash-pagination admin-dash-animate-in" style={{ "--delay": "0.5s" }}>
            <button
              className="admin-dash-pagination-button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft size={18} />
            </button>
            <div className="admin-dash-pagination-info">
              Page {currentPage} of {totalPages}
            </div>
            <button
              className="admin-dash-pagination-button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
