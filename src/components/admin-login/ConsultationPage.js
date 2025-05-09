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
  Settings,
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

  // Sample data for consultations
  const consultationsData = [
    {
      id: 1,
      student: "Tshiamo Dudu",
      lecturer: "Dr. Annah Paulos",
      subject: "Project Guidance",
      date: "2025-05-12",
      time: "10:00 AM",
      status: "Pending",
      department: "Computer Science",
      description: "Need guidance on my final year project about AI algorithms.",
    },
    {
      id: 2,
      student: "Sipho Mazibuko",
      lecturer: "Dr. Zenzi Matiza",
      subject: "Exam Preparation",
      date: "2025-05-14",
      time: "2:30 PM",
      status: "Accepted",
      department: "Business",
      description: "Would like to discuss preparation strategies for the upcoming finance exam.",
    },
    {
      id: 3,
      student: "Gugu Makhawula",
      lecturer: "Mr. Thabo Cele",
      subject: "Research Discussion",
      date: "2025-05-15",
      time: "11:15 AM",
      status: "Completed",
      department: "Engineering",
      description: "Need to discuss the results of my recent research experiment.",
    },
    {
      id: 4,
      student: "Vusimuzi Ngomazi",
      lecturer: "Dr. Njabulo Zungu",
      subject: "Career Advice",
      date: "2025-05-16",
      time: "3:00 PM",
      status: "Rejected",
      department: "Medicine",
      description: "Seeking advice on specialization options after graduation.",
    },
    {
      id: 5,
      student: "David Mathiza",
      lecturer: "Mrs. Zenzo Matiza",
      subject: "Assignment Help",
      date: "2025-05-18",
      time: "9:30 AM",
      status: "Pending",
      department: "Arts",
      description: "Need clarification on the requirements for the upcoming assignment.",
    },
    {
      id: 6,
      student: "Themba Xaba",
      lecturer: "Dr. Elizabeth Jele",
      subject: "Lab Results",
      date: "2025-05-19",
      time: "1:45 PM",
      status: "Accepted",
      department: "Science",
      description: "Would like to discuss the results of the recent lab experiment.",
    },
    {
      id: 7,
      student: "Zipho Kubheka",
      lecturer: "Dr. Van Eden Hall",
      subject: "Thesis Review",
      date: "2025-05-20",
      time: "10:30 AM",
      status: "Pending",
      department: "Law",
      description: "Need feedback on my thesis draft before final submission.",
    },
    {
      id: 8,
      student: "Hlengiwe Mlambo",
      lecturer: "Mr. Maini Van Vyk",
      subject: "Study Plan",
      date: "2025-05-21",
      time: "2:00 PM",
      status: "Accepted",
      department: "Psychology",
      description: "Would like to discuss my study plan for the upcoming semester.",
    },
    {
      id: 9,
      student: "Jack Johns",
      lecturer: "Mr. Robert Kunene",
      subject: "Project Extension",
      date: "2025-05-22",
      time: "11:00 AM",
      status: "Rejected",
      department: "Computer Science",
      description: "Need to discuss the possibility of extending my project deadline.",
    },
    {
      id: 10,
      student: "Sophia Blom",
      lecturer: "Dr. Lisa Madonsela",
      subject: "Internship Advice",
      date: "2025-05-23",
      time: "3:30 PM",
      status: "Completed",
      department: "Business",
      description: "Seeking advice on internship opportunities in the finance sector.",
    },
    {
      id: 11,
      student: "Thato Moriri",
      lecturer: "Dr. Mark Peterson",
      subject: "Research Proposal",
      date: "2025-05-24",
      time: "9:45 AM",
      status: "Pending",
      department: "Engineering",
      description: "Need feedback on my research proposal before submission.",
    },
    {
      id: 12,
      student: "Thabo Hlatwayo",
      lecturer: "Dr. Bengemin Nthambo",
      subject: "Course Selection",
      date: "2025-05-25",
      time: "1:15 PM",
      status: "Accepted",
      department: "Medicine",
      description: "Would like guidance on selecting courses for the next academic year.",
    },
  ]

  // Count consultations by status
  const pendingCount = consultationsData.filter((c) => c.status === "Pending").length
  const acceptedCount = consultationsData.filter((c) => c.status === "Accepted").length
  const completedCount = consultationsData.filter((c) => c.status === "Completed").length
  const rejectedCount = consultationsData.filter((c) => c.status === "Rejected").length

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

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

  // Filter and paginate data
  const filteredData = consultationsData.filter(
    (consultation) =>
      (activeTab === "all" || consultation.status.toLowerCase() === activeTab) &&
      (consultation.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultation.lecturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultation.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        consultation.department.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  // Get status class
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "admin-dash-status-pending"
      case "accepted":
        return "admin-dash-status-accepted"
      case "completed":
        return "admin-dash-status-completed"
      case "rejected":
        return "admin-dash-status-rejected"
      default:
        return ""
    }
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
          <a href="/admin-dashboard" className="admin-dash-nav-link">
            <Home size={20} /> Dashboard
          </a>
          {/* <a href="/users-page" className="admin-dash-nav-link">
            <Users size={20} /> Users
          </a> */}
          <a href="/consultations-page" className="admin-dash-nav-link admin-dash-active">
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
          <div className="admin-dash-user-profile">
            <div className="admin-dash-avatar">
              <User size={20} />
            </div>
            <span className="admin-dash-username">Admin</span>
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
        {/* <a href="users-page" className="admin-dash-mobile-link">
          <Users size={20} /> Users
        </a> */}
        <a href="consultations-page" className="admin-dash-mobile-link admin-dash-active">
          <MessageSquare size={20} /> Consultations
        </a>
        <a href="maintenance-page" className="admin-dash-mobile-link">
          <Tool size={20} /> Maintenance
        </a>
        {/* <a href="settings-page" className="admin-dash-mobile-link">
          <Settings size={20} /> Settings
        </a> */}
      </div>

      {/* Main Content */}
      <main className="admin-dash-main">
        <div className="admin-dash-header admin-dash-animate-in" style={{ "--delay": "0.1s" }}>
          <h2>Consultation Management</h2>
          <p>Manage student consultation requests and appointments</p>
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
            className={`admin-dash-stat-card ${activeTab === "completed" ? "admin-dash-stat-card-active" : ""}`}
            onClick={() => handleTabChange("completed")}
          >
            <div className="admin-dash-stat-icon admin-dash-primary-color">
              <CheckCircle size={24} />
            </div>
            <div className="admin-dash-stat-content">
              <h3>Completed</h3>
              <p className="admin-dash-stat-value">{completedCount}</p>
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
              <p className="admin-dash-stat-value">{consultationsData.length}</p>
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

        {/* Consultations Grid */}
        <div className="admin-dash-consultations-grid admin-dash-animate-in" style={{ "--delay": "0.4s" }}>
          {paginatedData.length > 0 ? (
            paginatedData.map((consultation) => (
              <div className="admin-dash-consultation-card" key={consultation.id}>
                <div className="admin-dash-consultation-header">
                  <h3>{consultation.subject}</h3>
                  <span className={`admin-dash-status ${getStatusClass(consultation.status)}`}>
                    {consultation.status}
                  </span>
                </div>
                <div className="admin-dash-consultation-details">
                  <div className="admin-dash-consultation-detail">
                    <Users size={16} />
                    <span>
                      <strong>Student:</strong> {consultation.student}
                    </span>
                  </div>
                  <div className="admin-dash-consultation-detail">
                    <BookOpen size={16} />
                    <span>
                      <strong>Lecturer:</strong> {consultation.lecturer}
                    </span>
                  </div>
                  <div className="admin-dash-consultation-detail">
                    <Calendar size={16} />
                    <span>
                      <strong>Date:</strong> {consultation.date}
                    </span>
                  </div>
                  <div className="admin-dash-consultation-detail">
                    <Clock size={16} />
                    <span>
                      <strong>Time:</strong> {consultation.time}
                    </span>
                  </div>
                </div>
                <div className="admin-dash-consultation-description">
                  <p>{consultation.description}</p>
                </div>
                <div className="admin-dash-consultation-actions">
                  {consultation.status === "Pending" && (
                    <>
                      <button className="admin-dash-consultation-button admin-dash-accept-button">Accept</button>
                      <button className="admin-dash-consultation-button admin-dash-reject-button">Reject</button>
                    </>
                  )}
                  {consultation.status === "Accepted" && (
                    <button className="admin-dash-consultation-button admin-dash-complete-button">
                      Mark as Completed
                    </button>
                  )}
                  {/* <button className="admin-dash-consultation-button admin-dash-details-button">View Details</button> */}
                </div>
              </div>
            ))
          ) : (
            <div className="admin-dash-no-results">
              <MessageSquare size={48} />
              <h3>No consultations found</h3>
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
