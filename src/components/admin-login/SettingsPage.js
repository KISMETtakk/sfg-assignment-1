"use client"

import { useState, useEffect } from "react"
import {
  Users,
  MessageSquare,
  PenToolIcon as Tool,
  Menu,
  X,
  Home,
  Settings,
  Bell,
  User,
  Save,
  Mail,
  Globe,
  Palette,
  Database,
  Shield,
} from "lucide-react"
import "./AdminDashboard.css"
import "./SettingsPage.css"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [formData, setFormData] = useState({
    siteName: "University Management System",
    siteDescription: "Comprehensive system for managing university resources",
    adminEmail: "admin@university.edu",
    supportEmail: "support@university.edu",
    maintenanceMode: false,
    darkMode: false,
    primaryColor: "#e3b20f",
    studentColor: "#cd102c",
    lecturerColor: "#013786",
    sessionTimeout: "30",
    backupFrequency: "daily",
    notifyMaintenance: true,
    notifyConsultation: true,
    notifySystem: true,
    twoFactorAuth: false,
    passwordExpiry: "90",
    autoLogout: true,
  })

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
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real application, this would save the settings to a database
    alert("Settings saved successfully!")
  }

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
          {/* <a href="users-page" className="admin-dash-nav-link">
            <Users size={20} /> Users
          </a> */}
          <a href="consultations-page" className="admin-dash-nav-link">
            <MessageSquare size={20} /> Consultations
          </a>
          <a href="maintenance-page" className="admin-dash-nav-link">
            <Tool size={20} /> Maintenance
          </a>
          {/* <a href="settings-page" className="admin-dash-nav-link admin-dash-active">
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
        <a href="maintenance-page" className="admin-dash-mobile-link">
          <Tool size={20} /> Maintenance
        </a>
        {/* <a href="settings-page" className="admin-dash-mobile-link admin-dash-active">
          <Settings size={20} /> Settings
        </a> */}
      </div>

      {/* Main Content */}
      <main className="admin-dash-main">
        <div className="admin-dash-header admin-dash-animate-in" style={{ "--delay": "0.1s" }}>
          <h2>System Settings</h2>
          <p>Configure and customize the system settings</p>
        </div>

        <div className="admin-dash-settings-container admin-dash-animate-in" style={{ "--delay": "0.2s" }}>
          {/* Settings Sidebar */}
          <div className="admin-dash-settings-sidebar">
            <button
              className={`admin-dash-settings-tab ${activeTab === "general" ? "admin-dash-settings-tab-active" : ""}`}
              onClick={() => handleTabChange("general")}
            >
              <Globe size={20} />
              General
            </button>
            <button
              className={`admin-dash-settings-tab ${activeTab === "appearance" ? "admin-dash-settings-tab-active" : ""}`}
              onClick={() => handleTabChange("appearance")}
            >
              <Palette size={20} />
              Appearance
            </button>
            <button
              className={`admin-dash-settings-tab ${activeTab === "email" ? "admin-dash-settings-tab-active" : ""}`}
              onClick={() => handleTabChange("email")}
            >
              <Mail size={20} />
              Email
            </button>
            <button
              className={`admin-dash-settings-tab ${activeTab === "security" ? "admin-dash-settings-tab-active" : ""}`}
              onClick={() => handleTabChange("security")}
            >
              <Shield size={20} />
              Security
            </button>
            <button
              className={`admin-dash-settings-tab ${activeTab === "database" ? "admin-dash-settings-tab-active" : ""}`}
              onClick={() => handleTabChange("database")}
            >
              <Database size={20} />
              Database
            </button>
            <button
              className={`admin-dash-settings-tab ${activeTab === "notifications" ? "admin-dash-settings-tab-active" : ""}`}
              onClick={() => handleTabChange("notifications")}
            >
              <Bell size={20} />
              Notifications
            </button>
          </div>

          {/* Settings Content */}
          <div className="admin-dash-settings-content">
            <form onSubmit={handleSubmit}>
              {/* General Settings */}
              <div
                className={`admin-dash-settings-section ${activeTab === "general" ? "admin-dash-settings-section-active" : ""}`}
              >
                <h3 className="admin-dash-settings-title">General Settings</h3>

                <div className="admin-dash-form-group">
                  <label htmlFor="siteName">Site Name</label>
                  <input
                    type="text"
                    id="siteName"
                    name="siteName"
                    className="admin-dash-input"
                    value={formData.siteName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="admin-dash-form-group">
                  <label htmlFor="siteDescription">Site Description</label>
                  <textarea
                    id="siteDescription"
                    name="siteDescription"
                    className="admin-dash-textarea"
                    value={formData.siteDescription}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="admin-dash-form-group">
                  <div className="admin-dash-toggle-container">
                    <label htmlFor="maintenanceMode">Maintenance Mode</label>
                    <div className="admin-dash-toggle">
                      <input
                        type="checkbox"
                        id="maintenanceMode"
                        name="maintenanceMode"
                        checked={formData.maintenanceMode}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="maintenanceMode" className="admin-dash-toggle-label">
                        <span className="admin-dash-toggle-inner"></span>
                        <span className="admin-dash-toggle-switch"></span>
                      </label>
                    </div>
                  </div>
                  <p className="admin-dash-form-help">
                    When enabled, the site will display a maintenance message to all users except administrators.
                  </p>
                </div>

                <div className="admin-dash-form-group">
                  <label htmlFor="sessionTimeout">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    id="sessionTimeout"
                    name="sessionTimeout"
                    className="admin-dash-input"
                    value={formData.sessionTimeout}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Appearance Settings */}
              <div
                className={`admin-dash-settings-section ${activeTab === "appearance" ? "admin-dash-settings-section-active" : ""}`}
              >
                <h3 className="admin-dash-settings-title">Appearance Settings</h3>

                <div className="admin-dash-form-group">
                  <div className="admin-dash-toggle-container">
                    <label htmlFor="darkMode">Dark Mode</label>
                    <div className="admin-dash-toggle">
                      <input
                        type="checkbox"
                        id="darkMode"
                        name="darkMode"
                        checked={formData.darkMode}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="darkMode" className="admin-dash-toggle-label">
                        <span className="admin-dash-toggle-inner"></span>
                        <span className="admin-dash-toggle-switch"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="admin-dash-form-group">
                  <label htmlFor="primaryColor">Primary Color</label>
                  <div className="admin-dash-color-picker">
                    <input
                      type="color"
                      id="primaryColor"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      className="admin-dash-input admin-dash-color-input"
                      value={formData.primaryColor}
                      onChange={handleInputChange}
                      name="primaryColor"
                    />
                  </div>
                </div>

                <div className="admin-dash-form-group">
                  <label htmlFor="studentColor">Student Color</label>
                  <div className="admin-dash-color-picker">
                    <input
                      type="color"
                      id="studentColor"
                      name="studentColor"
                      value={formData.studentColor}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      className="admin-dash-input admin-dash-color-input"
                      value={formData.studentColor}
                      onChange={handleInputChange}
                      name="studentColor"
                    />
                  </div>
                </div>

                <div className="admin-dash-form-group">
                  <label htmlFor="lecturerColor">Lecturer Color</label>
                  <div className="admin-dash-color-picker">
                    <input
                      type="color"
                      id="lecturerColor"
                      name="lecturerColor"
                      value={formData.lecturerColor}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      className="admin-dash-input admin-dash-color-input"
                      value={formData.lecturerColor}
                      onChange={handleInputChange}
                      name="lecturerColor"
                    />
                  </div>
                </div>
              </div>

              {/* Email Settings */}
              <div
                className={`admin-dash-settings-section ${activeTab === "email" ? "admin-dash-settings-section-active" : ""}`}
              >
                <h3 className="admin-dash-settings-title">Email Settings</h3>

                <div className="admin-dash-form-group">
                  <label htmlFor="adminEmail">Admin Email</label>
                  <input
                    type="email"
                    id="adminEmail"
                    name="adminEmail"
                    className="admin-dash-input"
                    value={formData.adminEmail}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="admin-dash-form-group">
                  <label htmlFor="supportEmail">Support Email</label>
                  <input
                    type="email"
                    id="supportEmail"
                    name="supportEmail"
                    className="admin-dash-input"
                    value={formData.supportEmail}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="admin-dash-form-group">
                  <button type="button" className="admin-dash-button admin-dash-secondary-button">
                    Test Email Configuration
                  </button>
                </div>
              </div>

              {/* Security Settings */}
              <div
                className={`admin-dash-settings-section ${activeTab === "security" ? "admin-dash-settings-section-active" : ""}`}
              >
                <h3 className="admin-dash-settings-title">Security Settings</h3>

                <div className="admin-dash-form-group">
                  <div className="admin-dash-toggle-container">
                    <label htmlFor="twoFactorAuth">Two-Factor Authentication</label>
                    <div className="admin-dash-toggle">
                      <input
                        type="checkbox"
                        id="twoFactorAuth"
                        name="twoFactorAuth"
                        checked={formData.twoFactorAuth}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="twoFactorAuth" className="admin-dash-toggle-label">
                        <span className="admin-dash-toggle-inner"></span>
                        <span className="admin-dash-toggle-switch"></span>
                      </label>
                    </div>
                  </div>
                  <p className="admin-dash-form-help">Require two-factor authentication for all admin users.</p>
                </div>

                <div className="admin-dash-form-group">
                  <label htmlFor="passwordExpiry">Password Expiry (days)</label>
                  <input
                    type="number"
                    id="passwordExpiry"
                    name="passwordExpiry"
                    className="admin-dash-input"
                    value={formData.passwordExpiry}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="admin-dash-form-group">
                  <div className="admin-dash-toggle-container">
                    <label htmlFor="autoLogout">Auto Logout on Inactivity</label>
                    <div className="admin-dash-toggle">
                      <input
                        type="checkbox"
                        id="autoLogout"
                        name="autoLogout"
                        checked={formData.autoLogout}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="autoLogout" className="admin-dash-toggle-label">
                        <span className="admin-dash-toggle-inner"></span>
                        <span className="admin-dash-toggle-switch"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Database Settings */}
              <div
                className={`admin-dash-settings-section ${activeTab === "database" ? "admin-dash-settings-section-active" : ""}`}
              >
                <h3 className="admin-dash-settings-title">Database Settings</h3>

                <div className="admin-dash-form-group">
                  <label htmlFor="backupFrequency">Backup Frequency</label>
                  <select
                    id="backupFrequency"
                    name="backupFrequency"
                    className="admin-dash-select"
                    value={formData.backupFrequency}
                    onChange={handleInputChange}
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="admin-dash-form-group">
                  <button type="button" className="admin-dash-button admin-dash-secondary-button">
                    Backup Database Now
                  </button>
                </div>

                <div className="admin-dash-form-group">
                  <button type="button" className="admin-dash-button admin-dash-danger-button">
                    Clear Cache
                  </button>
                </div>
              </div>

              {/* Notification Settings */}
              <div
                className={`admin-dash-settings-section ${activeTab === "notifications" ? "admin-dash-settings-section-active" : ""}`}
              >
                <h3 className="admin-dash-settings-title">Notification Settings</h3>

                <div className="admin-dash-form-group">
                  <div className="admin-dash-toggle-container">
                    <label htmlFor="notifyMaintenance">Maintenance Notifications</label>
                    <div className="admin-dash-toggle">
                      <input
                        type="checkbox"
                        id="notifyMaintenance"
                        name="notifyMaintenance"
                        checked={formData.notifyMaintenance}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="notifyMaintenance" className="admin-dash-toggle-label">
                        <span className="admin-dash-toggle-inner"></span>
                        <span className="admin-dash-toggle-switch"></span>
                      </label>
                    </div>
                  </div>
                  <p className="admin-dash-form-help">Receive notifications for new maintenance requests.</p>
                </div>

                <div className="admin-dash-form-group">
                  <div className="admin-dash-toggle-container">
                    <label htmlFor="notifyConsultation">Consultation Notifications</label>
                    <div className="admin-dash-toggle">
                      <input
                        type="checkbox"
                        id="notifyConsultation"
                        name="notifyConsultation"
                        checked={formData.notifyConsultation}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="notifyConsultation" className="admin-dash-toggle-label">
                        <span className="admin-dash-toggle-inner"></span>
                        <span className="admin-dash-toggle-switch"></span>
                      </label>
                    </div>
                  </div>
                  <p className="admin-dash-form-help">Receive notifications for new consultation requests.</p>
                </div>

                <div className="admin-dash-form-group">
                  <div className="admin-dash-toggle-container">
                    <label htmlFor="notifySystem">System Notifications</label>
                    <div className="admin-dash-toggle">
                      <input
                        type="checkbox"
                        id="notifySystem"
                        name="notifySystem"
                        checked={formData.notifySystem}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="notifySystem" className="admin-dash-toggle-label">
                        <span className="admin-dash-toggle-inner"></span>
                        <span className="admin-dash-toggle-switch"></span>
                      </label>
                    </div>
                  </div>
                  <p className="admin-dash-form-help">Receive notifications for system updates and alerts.</p>
                </div>
              </div>

              {/* Save Button */}
              <div className="admin-dash-settings-actions">
                <button type="submit" className="admin-dash-button admin-dash-primary-button">
                  <Save size={18} />
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
