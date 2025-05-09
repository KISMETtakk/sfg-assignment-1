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
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  UserPlus,
} from "lucide-react"
import "./AdminDashboard.css"
import "./UsersPage.css"

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("students")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUsers, setSelectedUsers] = useState([])

  // Sample data for students and lecturers
  const studentsData = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@university.edu",
      department: "Computer Science",
      year: "3rd Year",
      status: "Active",
    },
    {
      id: 2,
      name: "Emily Johnson",
      email: "emily.j@university.edu",
      department: "Business",
      year: "2nd Year",
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "m.brown@university.edu",
      department: "Engineering",
      year: "4th Year",
      status: "Active",
    },
    {
      id: 4,
      name: "Sarah Davis",
      email: "sarah.d@university.edu",
      department: "Medicine",
      year: "1st Year",
      status: "Inactive",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "d.wilson@university.edu",
      department: "Arts",
      year: "3rd Year",
      status: "Active",
    },
    {
      id: 6,
      name: "Jessica Taylor",
      email: "j.taylor@university.edu",
      department: "Science",
      year: "2nd Year",
      status: "Active",
    },
    {
      id: 7,
      name: "Daniel Martinez",
      email: "d.martinez@university.edu",
      department: "Law",
      year: "4th Year",
      status: "Inactive",
    },
    {
      id: 8,
      name: "Olivia Anderson",
      email: "o.anderson@university.edu",
      department: "Psychology",
      year: "3rd Year",
      status: "Active",
    },
    {
      id: 9,
      name: "James Thomas",
      email: "j.thomas@university.edu",
      department: "Economics",
      year: "1st Year",
      status: "Active",
    },
    {
      id: 10,
      name: "Sophia Garcia",
      email: "s.garcia@university.edu",
      department: "Mathematics",
      year: "2nd Year",
      status: "Active",
    },
    {
      id: 11,
      name: "Benjamin Moore",
      email: "b.moore@university.edu",
      department: "Physics",
      year: "4th Year",
      status: "Active",
    },
    {
      id: 12,
      name: "Ava Jackson",
      email: "a.jackson@university.edu",
      department: "Chemistry",
      year: "3rd Year",
      status: "Inactive",
    },
  ]

  const lecturersData = [
    {
      id: 1,
      name: "Dr. Robert Johnson",
      email: "r.johnson@university.edu",
      department: "Computer Science",
      position: "Professor",
      status: "Active",
    },
    {
      id: 2,
      name: "Dr. Lisa Williams",
      email: "l.williams@university.edu",
      department: "Business",
      position: "Associate Professor",
      status: "Active",
    },
    {
      id: 3,
      name: "Dr. Mark Thompson",
      email: "m.thompson@university.edu",
      department: "Engineering",
      position: "Assistant Professor",
      status: "Active",
    },
    {
      id: 4,
      name: "Dr. Jennifer Lee",
      email: "j.lee@university.edu",
      department: "Medicine",
      position: "Professor",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Dr. Christopher Clark",
      email: "c.clark@university.edu",
      department: "Arts",
      position: "Associate Professor",
      status: "Active",
    },
    {
      id: 6,
      name: "Dr. Elizabeth Walker",
      email: "e.walker@university.edu",
      department: "Science",
      position: "Professor",
      status: "Active",
    },
    {
      id: 7,
      name: "Dr. Richard Hall",
      email: "r.hall@university.edu",
      department: "Law",
      position: "Assistant Professor",
      status: "Active",
    },
    {
      id: 8,
      name: "Dr. Patricia Young",
      email: "p.young@university.edu",
      department: "Psychology",
      position: "Professor",
      status: "Inactive",
    },
  ]

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
    setSelectedUsers([])
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleCheckboxChange = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id))
    } else {
      setSelectedUsers([...selectedUsers, id])
    }
  }

  const handleSelectAll = () => {
    const currentData = activeTab === "students" ? studentsData : lecturersData
    if (selectedUsers.length === currentData.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(currentData.map((user) => user.id))
    }
  }

  // Filter and paginate data
  const filteredData =
    activeTab === "students"
      ? studentsData.filter(
          (student) =>
            student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.department.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : lecturersData.filter(
          (lecturer) =>
            lecturer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lecturer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lecturer.department.toLowerCase().includes(searchQuery.toLowerCase()),
        )

  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className={`admin-dash-container ${isLoading ? "" : "admin-dash-loaded"}`}>
      {/* Navigation */}
      <nav className="admin-dash-navbar">
        <div className="admin-dash-logo">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="admin-dash-nav-links">
          <a href="admin-dashboard" className="admin-dash-nav-link">
            <Home size={20} /> Dashboard
          </a>
          {/* <a href="users-page" className="admin-dash-nav-link admin-dash-active">
            <Users size={20} /> Users
          </a> */}
          <a href="consultations-page" className="admin-dash-nav-link">
            <MessageSquare size={20} /> Consultations
          </a>
          <a href="maintenance-page" className="admin-dash-nav-link">
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
        {/* <a href="users-page" className="admin-dash-mobile-link admin-dash-active">
          <Users size={20} /> Users
        </a> */}
        <a href="consultations-page" className="admin-dash-mobile-link">
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
          <h2>User Management</h2>
          <p>Manage students and lecturers in the system</p>
        </div>

        {/* Tabs */}
        <div className="admin-dash-tabs admin-dash-animate-in" style={{ "--delay": "0.2s" }}>
          <button
            className={`admin-dash-tab ${activeTab === "students" ? "admin-dash-tab-active" : ""}`}
            onClick={() => handleTabChange("students")}
          >
            <Users size={18} />
            Students
            <span className="admin-dash-tab-count admin-dash-student-color">{studentsData.length}</span>
          </button>
          <button
            className={`admin-dash-tab ${activeTab === "lecturers" ? "admin-dash-tab-active" : ""}`}
            onClick={() => handleTabChange("lecturers")}
          >
            <BookOpen size={18} />
            Lecturers
            <span className="admin-dash-tab-count admin-dash-lecturer-color">{lecturersData.length}</span>
          </button>
        </div>

        {/* Search and Actions */}
        <div className="admin-dash-table-actions admin-dash-animate-in" style={{ "--delay": "0.3s" }}>
          <div className="admin-dash-search-container">
            <Search size={18} className="admin-dash-search-icon" />
            <input
              type="text"
              placeholder="Search users..."
              className="admin-dash-search-input"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="admin-dash-action-buttons">
            <button className="admin-dash-action-button">
              <Filter size={18} />
              Filter
            </button>
            <button className="admin-dash-action-button admin-dash-primary-button">
              <UserPlus size={18} />
              Add {activeTab === "students" ? "Student" : "Lecturer"}
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="admin-dash-table-container admin-dash-animate-in" style={{ "--delay": "0.4s" }}>
          <table className="admin-dash-table">
            <thead>
              <tr>
                <th>
                  <div className="admin-dash-checkbox-container">
                    <input
                      type="checkbox"
                      id="select-all"
                      checked={
                        selectedUsers.length === (activeTab === "students" ? studentsData.length : lecturersData.length)
                      }
                      onChange={handleSelectAll}
                    />
                    <label htmlFor="select-all"></label>
                  </div>
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>{activeTab === "students" ? "Year" : "Position"}</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className="admin-dash-checkbox-container">
                      <input
                        type="checkbox"
                        id={`user-${user.id}`}
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleCheckboxChange(user.id)}
                      />
                      <label htmlFor={`user-${user.id}`}></label>
                    </div>
                  </td>
                  <td>
                    <div className="admin-dash-user-cell">
                      <div className="admin-dash-user-avatar">{user.name.charAt(0)}</div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
                  <td>{activeTab === "students" ? user.year : user.position}</td>
                  <td>
                    <span
                      className={`admin-dash-status ${user.status === "Active" ? "admin-dash-status-active" : "admin-dash-status-inactive"}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button className="admin-dash-action-icon">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
