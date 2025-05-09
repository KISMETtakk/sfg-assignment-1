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
  AlertTriangle,
  Building,
  Wrench,
  Plus,
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

  // Sample data for maintenance requests
  const maintenanceData = [
    {
      id: 1,
      title: "Broken Projector",
      location: "Building 10-120",
      requestedBy: "Tshiamo Matiza",
      requestType: "Student",
      date: "2025-05-10",
      priority: "High",
      status: "Pending",
      description: "The projector in Room 101 is not working. It powers on but doesn't display any image.",
    },
    {
      id: 2,
      title: "Air Conditioning Issue",
      location: "Building 12-221",
      requestedBy: "Dr. Zenzo Van Duke",
      requestType: "Lecturer",
      date: "2025-05-11",
      priority: "Medium",
      status: "In Progress",
      description: "The air conditioning in Room 205 is making loud noises and not cooling properly.",
    },
    {
      id: 3,
      title: "Leaking Ceiling",
      location: "Building 10-G48",
      requestedBy: "Sipho Zulu",
      requestType: "Student",
      date: "2025-05-12",
      priority: "High",
      status: "In Progress",
      description: "There's a water leak from the ceiling in the main hallway of Building C.",
    },
    {
      id: 4,
      title: "Broken Chair",
      location: "Building 12-122",
      requestedBy: "Dr. Mark Thompson",
      requestType: "Lecturer",
      date: "2025-05-13",
      priority: "Low",
      status: "Resolved",
      description: "One of the chairs in Room 302 has a broken leg and needs to be replaced.",
    },
    {
      id: 5,
      title: "Flickering Lights",
      location: "Building 10-246",
      requestedBy: "Michael Gucci",
      requestType: "Student",
      date: "2025-05-14",
      priority: "Medium",
      status: "Pending",
      description: "The lights in Room 150 are flickering continuously and need to be fixed.",
    },
    {
      id: 6,
      title: "Broken Window",
      location: "Building 14-120",
      requestedBy: "Dr. Jennifer Lee",
      requestType: "Lecturer",
      date: "2025-05-15",
      priority: "High",
      status: "Pending",
      description: "A window in Room 210 is cracked and poses a safety hazard.",
    },
    {
      id: 7,
      title: "Wi-Fi Connectivity Issues",
      location: "Building 10-G06",
      requestedBy: "Sibusiso Kubheka",
      requestType: "Student",
      date: "2025-05-16",
      priority: "High",
      status: "In Progress",
      description: "The Wi-Fi in the library is very slow and keeps disconnecting.",
    },
    {
      id: 8,
      title: "Faulty Electrical Outlet",
      location: "Building 18-107",
      requestedBy: "Dr. Annah Paulos",
      requestType: "Lecturer",
      date: "2025-05-17",
      priority: "Medium",
      status: "Resolved",
      description: "The electrical outlet in Room 405 is not working and needs to be repaired.",
    },
    {
      id: 9,
      title: "Clogged Sink",
      location: "Building 18-225",
      requestedBy: "David Masumula",
      requestType: "Student",
      date: "2025-05-18",
      priority: "Medium",
      status: "Resolved",
      description: "The sink in the first-floor restroom of Building A is clogged.",
    },
    {
      id: 10,
      title: "Damaged Whiteboard",
      location: "Building 18-228",
      requestedBy: "Dr. Joseph Matiza",
      requestType: "Lecturer",
      date: "2025-05-19",
      priority: "Low",
      status: "Pending",
      description: "The whiteboard in Room 120 is damaged and difficult to write on.",
    },
    {
      id: 11,
      title: "Heating System Not Working",
      location: "Building 10-149",
      requestedBy: "Jessica Xoki",
      requestType: "Student",
      date: "2025-05-20",
      priority: "High",
      status: "In Progress",
      description: "The heating system in Room 301 is not working, and the room is very cold.",
    },
    {
      id: 12,
      title: "Broken Door Handle",
      location: "Building 10-LG48",
      requestedBy: "Musa Lebusa",
      requestType: "Student",
      date: "2025-05-21",
      priority: "Medium",
      status: "Resolved",
      description: "The door handle in Room 215 is broken and needs to be replaced.",
    },
    {
      id: 13,
      title: "Water Fountain Leaking",
      location: "Building 10-LG88",
      requestedBy: "Wezi Phiri",
      requestType: "Student",
      date: "2025-05-22",
      priority: "Low",
      status: "Pending",
      description: "The water fountain in the hallway of Building E is leaking water onto the floor.",
    },
    {
      id: 14,
      title: "Projector Screen Stuck",
      location: "Building 20-118",
      requestedBy: "Ms. Patricia Dube",
      requestType: "Lecturer",
      date: "2025-05-23",
      priority: "Medium",
      status: "In Progress",
      description: "The projector screen in Room 110 is stuck and won't retract.",
    },
  ]

  // Count maintenance requests by status and type
  const pendingCount = maintenanceData.filter((m) => m.status === "Pending").length
  const inProgressCount = maintenanceData.filter((m) => m.status === "In Progress").length
  const resolvedCount = maintenanceData.filter((m) => m.status === "Resolved").length
  const studentCount = maintenanceData.filter((m) => m.requestType === "Student").length
  const lecturerCount = maintenanceData.filter((m) => m.requestType === "Lecturer").length

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

  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value)
    setCurrentPage(1)
  }

  // Filter and paginate data
  const filteredData = maintenanceData.filter(
    (request) =>
      (activeTab === "all" ||
        request.status.toLowerCase() === activeTab.toLowerCase() ||
        (activeTab === "student" && request.requestType === "Student") ||
        (activeTab === "lecturer" && request.requestType === "Lecturer")) &&
      (selectedPriority === "all" || request.priority.toLowerCase() === selectedPriority.toLowerCase()) &&
      (request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.requestedBy.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const itemsPerPage = 6
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  // Get priority class
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

  // Get status class
  const getStatusClass = (status) => {
    switch (status.toLowerCase().replace(" ", "-")) {
      case "pending":
        return "admin-dash-status-pending"
      case "in-progress":
        return "admin-dash-status-in-progress"
      case "resolved":
        return "admin-dash-status-resolved"
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
          {/* <a href="users-page" className="admin-dash-nav-link">
            <Users size={20} /> Users
          </a> */}
          <a href="consultations-page" className="admin-dash-nav-link">
            <MessageSquare size={20} /> Consultations
          </a>
          <a href="maintenance-page" className="admin-dash-nav-link admin-dash-active">
            <Tool size={20} /> Maintenance
          </a>
          {/* <a href="settings-page" className="admin-dash-nav-link">
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
        {/* <a href="users-page" className="admin-dash-mobile-link">
          <Users size={20} /> Users
        </a> */}
        <a href="consultations-page" className="admin-dash-mobile-link">
          <MessageSquare size={20} /> Consultations
        </a>
        <a href="maintenance-page" className="admin-dash-mobile-link admin-dash-active">
          <Tool size={20} /> Maintenance
        </a>
        {/* <a href="settings-page" className="admin-dash-mobile-link">
          <Settings size={20} /> Settings
        </a> */}
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
            <div className="admin-dash-card-icon admin-dash-lecturer-color">
              <BookOpen size={24} />
            </div>
            <div className="admin-dash-card-content">
              <h3>Lecturer Requests</h3>
              <p className="admin-dash-card-value">{lecturerCount}</p>
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
          <button
            className={`admin-dash-tab ${activeTab === "pending" ? "admin-dash-tab-active" : ""}`}
            onClick={() => handleTabChange("pending")}
          >
            <Clock size={18} />
            Pending
          </button>
          <button
            className={`admin-dash-tab ${activeTab === "in progress" ? "admin-dash-tab-active" : ""}`}
            onClick={() => handleTabChange("in progress")}
          >
            <Tool size={18} />
            In Progress
          </button>
          <button
            className={`admin-dash-tab ${activeTab === "resolved" ? "admin-dash-tab-active" : ""}`}
            onClick={() => handleTabChange("resolved")}
          >
            <CheckCircle size={18} />
            Resolved
          </button>
          <button
            className={`admin-dash-tab ${activeTab === "student" ? "admin-dash-tab-active" : ""}`}
            onClick={() => handleTabChange("student")}
          >
            <Users size={18} />
            Student
          </button>
          <button
            className={`admin-dash-tab ${activeTab === "lecturer" ? "admin-dash-tab-active" : ""}`}
            onClick={() => handleTabChange("lecturer")}
          >
            <BookOpen size={18} />
            Lecturer
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
                  {request.status === "Pending" && (
                    <button className="admin-dash-maintenance-button admin-dash-start-button">Start Work</button>
                  )}
                  {request.status === "In Progress" && (
                    <button className="admin-dash-maintenance-button admin-dash-complete-button">
                      Mark as Resolved
                    </button>
                  )}
                  {/* <button className="admin-dash-maintenance-button admin-dash-details-button">View Details</button> */}
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
