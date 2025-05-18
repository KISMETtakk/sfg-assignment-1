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
  AlertTriangle,
  Building,
  Wrench,
} from "lucide-react"
import "./AdminDashboard.css"
import "./MaintenancePage.css"

export default function MaintenancePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [maintenanceData, setMaintenanceData] = useState([])
  const [updatingIds, setUpdatingIds] = useState([]) // track which IDs are updating

  // Fetch maintenance data from API on mount
  useEffect(() => {
    setIsLoading(true)
    fetch("http://localhost:8180/api/report-issues/get-all")
      .then((res) => res.json())
      .then((data) => {
        const mappedData = data.map(issue => ({
          id: issue.issueID,
          title: issue.issueDescription,
          location: issue.reportedBy.studentEmail || "Unknown",
          requestedBy: `${issue.reportedBy.fName || issue.reportedBy.fname} ${issue.reportedBy.lName || issue.reportedBy.lname}`,
          requestType: "Student",
          date: issue.reportDate,
          priority: "Medium",
          status: issue.status,
          description: issue.issueDescription,
          adminInCharge: `${issue.managedBy.fname} ${issue.managedBy.lname}`,
        }))
        setMaintenanceData(mappedData)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch maintenance issues:", err)
        setIsLoading(false)
      })
  }, [])

  // Update issue status API call
  const updateIssueStatus = (id, newStatus) => {
    setUpdatingIds(prev => [...prev, id])
    fetch(`http://localhost:8180/api/report-issues/${id}/status-feedback?newStatus=${newStatus}`, {
      method: "PUT",
      headers: { "Accept": "*/*" },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update status")
        return res.text()
      })
      .then((msg) => {
        alert(msg)
        setMaintenanceData((prev) =>
          prev.map((issue) =>
            issue.id === id ? { ...issue, status: newStatus } : issue
          )
        )
      })
      .catch((err) => alert("Error updating status: " + err.message))
      .finally(() => {
        setUpdatingIds(prev => prev.filter(x => x !== id))
      })
  }

  // Counts for summary cards
  const pendingCount = maintenanceData.filter(m =>
    ["open", "pending"].includes(m.status.toLowerCase())
  ).length
  const inProgressCount = maintenanceData.filter(m =>
    m.status.toLowerCase() === "in progress"
  ).length
  const resolvedCount = maintenanceData.filter(m =>
    ["closed", "resolved"].includes(m.status.toLowerCase())
  ).length
  const studentCount = maintenanceData.filter(m => m.requestType === "Student").length
  const lecturerCount = maintenanceData.filter(m => m.requestType === "Lecturer").length

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

  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value)
    setCurrentPage(1)
  }

  // Filter and paginate
  const filteredData = maintenanceData.filter(
    (request) =>
      (activeTab === "all" ||
        request.status.toLowerCase() === activeTab.toLowerCase() ||
        (activeTab === "student" && request.requestType === "Student") ||
        (activeTab === "lecturer" && request.requestType === "Lecturer")) &&
      (selectedPriority === "all" || request.priority.toLowerCase() === selectedPriority.toLowerCase()) &&
      (request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.requestedBy.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  // Priority class
  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "admin-dash-priority-high"
      case "medium":
        return "admin-dash-priority-medium"
      case "low":
        return "admin-dash-priority-low"
      default:
        return ""
    }
  }

  // Status class
  const getStatusClass = (status) => {
    switch (status.toLowerCase().replace(" ", "-")) {
      case "open":
      case "pending":
        return "admin-dash-status-pending"
      case "in-progress":
        return "admin-dash-status-in-progress"
      case "closed":
      case "resolved":
      case "completed":
        return "admin-dash-status-resolved"
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
          <a href="/consultations-page" className="admin-dash-nav-link">
            <MessageSquare size={20} /> Consultations
          </a>
          <a href="/maintenance-page" className="admin-dash-nav-link admin-dash-active">
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
        <a href="consultations-page" className="admin-dash-mobile-link">
          <MessageSquare size={20} /> Consultations
        </a>
        <a href="maintenance-page" className="admin-dash-mobile-link admin-dash-active">
          <Tool size={20} /> Maintenance
        </a>
      </div>

      {/* Main Content */}
      <main className="admin-dash-main">
        <div className="admin-dash-header admin-dash-animate-in" style={{ "--delay": "0.1s" }}>
          <h2>Maintenance Requests</h2>
          <p>Manage and track maintenance requests across campus</p>
        </div>

        {/* Summary Cards */}
        <div className="admin-dash-summary-cards admin-dash-animate-in" style={{ "--delay": "0.2s" }}>
          <div className="admin-dash-card">
            <div className="admin-dash-card-icon admin-dash-student-color">
              <Users size={24} />
            </div>
            <div className="admin-dash-card-content">
              <h3>Student Requests</h3>
              <p className="admin-dash-card-value">{studentCount}</p>
            </div>
          </div>

         

          <div className="admin-dash-card">
            <div className="admin-dash-card-icon admin-dash-primary-color">
              <CheckCircle size={24} />
            </div>
            <div className="admin-dash-card-content">
              <h3>Resolved</h3>
              <p className="admin-dash-card-value">{resolvedCount}</p>
            </div>
          </div>

          <div className="admin-dash-card">
            <div className="admin-dash-card-icon" style={{ backgroundColor: "#eab308" }}>
              <AlertTriangle size={24} />
            </div>
            <div className="admin-dash-card-content">
              <h3>Pending</h3>
              <p className="admin-dash-card-value">{pendingCount + inProgressCount}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-dash-tabs admin-dash-animate-in" style={{ "--delay": "0.3s" }}>
          <button
            className={`admin-dash-tab ${activeTab === "all" ? "admin-dash-tab-active" : ""}`}
            onClick={() => handleTabChange("all")}
          >
            <Wrench size={18} />
            All Requests
          </button>
          
        
        
          
        </div>

        {/* Search and Filter */}
        <div className="admin-dash-filter-row admin-dash-animate-in" style={{ "--delay": "0.4s" }}>
          <div className="admin-dash-search-container">
            <Search size={18} className="admin-dash-search-icon" />
            <input
              type="text"
              placeholder="Search maintenance requests..."
              className="admin-dash-search-input"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="admin-dash-filter-container">
            <label htmlFor="priority-filter">Priority:</label>
            <select
              id="priority-filter"
              className="admin-dash-select"
              value={selectedPriority}
              onChange={handlePriorityChange}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Maintenance Requests */}
        <div className="admin-dash-maintenance-grid admin-dash-animate-in" style={{ "--delay": "0.5s" }}>
          {paginatedData.length > 0 ? (
            paginatedData.map((request) => (
              <div className="admin-dash-maintenance-card" key={request.id}>
                <div className="admin-dash-maintenance-header">
                  <h3>{request.title}</h3>
                  <span className={`admin-dash-priority ${getPriorityClass(request.priority)}`}>
                    {request.priority}
                  </span>
                </div>
                <div className="admin-dash-maintenance-details">
                  <div className="admin-dash-maintenance-detail">
                    <Building size={16} />
                    <span>{request.location}</span>
                  </div>
                  <div className="admin-dash-maintenance-detail">
                    <Calendar size={16} />
                    <span>{request.date}</span>
                  </div>
                  <div className="admin-dash-maintenance-detail">
                    <User size={16} />
                    <span>
                      {request.requestedBy} ({request.requestType})
                    </span>
                  </div>
                  <div className="admin-dash-maintenance-detail">
                    <Wrench size={16} />
                    <span className={`admin-dash-status ${getStatusClass(request.status)}`}>{request.status}</span>
                  </div>
                </div>
                <div className="admin-dash-maintenance-description">
                  <p>{request.description}</p>
                </div>
                <div className="admin-dash-maintenance-actions">
                  {(request.status.toLowerCase() === "open" || request.status.toLowerCase() === "pending") && (
                    <button
                      disabled={updatingIds.includes(request.id)}
                      className="admin-dash-maintenance-button admin-dash-start-button"
                      onClick={() => updateIssueStatus(request.id, "In Progress")}
                    >
                      {updatingIds.includes(request.id) ? "Updating..." : "Start Work"}
                    </button>
                  )}
                  {request.status.toLowerCase() === "in progress" && (
                    <button
                      disabled={updatingIds.includes(request.id)}
                      className="admin-dash-maintenance-button admin-dash-complete-button"
                      onClick={() => updateIssueStatus(request.id, "Closed")}
                    >
                      {updatingIds.includes(request.id) ? "Updating..." : "Mark as Resolved"}
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="admin-dash-no-results">
              <Wrench size={48} />
              <h3>No maintenance requests found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="admin-dash-pagination admin-dash-animate-in" style={{ "--delay": "0.6s" }}>
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
