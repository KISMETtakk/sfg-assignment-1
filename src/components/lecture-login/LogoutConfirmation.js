"use client"

import { useState, useEffect } from "react"
import "./LogoutConfirmation.css"

const LogoutConfirmation = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Add Font Awesome script
    const script = document.createElement("script")
    script.src = "https://kit.fontawesome.com/a076d05399.js"
    script.crossOrigin = "anonymous"
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      window.history.back()
    }, 800)
  }

  const handleLogout = () => {
    setIsClosing(true)
    setTimeout(() => {
      window.location.href = "/"
    }, 800)
  }

  return (
    <div
      className={`lecture-consultation-logout-container ${isLoaded ? "lecture-consultation-loaded" : ""} ${isClosing ? "lecture-consultation-closing" : ""}`}
    >
      {/* Background Elements */}
      <div className="lecture-consultation-stars"></div>
      <div className="lecture-consultation-stars2"></div>
      <div className="lecture-consultation-stars3"></div>
      <div className="lecture-consultation-planets">
        <div className="lecture-consultation-planet planet-1"></div>
        <div className="lecture-consultation-planet planet-2"></div>
        <div className="lecture-consultation-planet planet-3"></div>
      </div>

      {/* Animated Elements */}
      <div className="lecture-consultation-meteor"></div>
      <div className="lecture-consultation-meteor meteor-2"></div>
      <div className="lecture-consultation-satellite">
        <div className="lecture-consultation-satellite-body">
          <div className="lecture-consultation-satellite-panel left"></div>
          <div className="lecture-consultation-satellite-panel right"></div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="lecture-consultation-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="lecture-consultation-particle"></div>
        ))}
      </div>

      {/* Astronaut Dog */}
      <div className="lecture-consultation-astronaut-dog">
        <div className="lecture-consultation-tether"></div>
        <div className="lecture-consultation-dog-head">
          <div className="lecture-consultation-helmet">
            <div className="lecture-consultation-helmet-glass"></div>
            <div className="lecture-consultation-helmet-shine"></div>
          </div>
          <div className="lecture-consultation-dog-ears">
            <div className="lecture-consultation-ear"></div>
            <div className="lecture-consultation-ear"></div>
          </div>
          <div className="lecture-consultation-dog-face">
            <div className="lecture-consultation-dog-eyes">
              <div className="lecture-consultation-eye"></div>
              <div className="lecture-consultation-eye"></div>
            </div>
            <div className="lecture-consultation-dog-nose"></div>
            <div className="lecture-consultation-dog-mouth"></div>
          </div>
        </div>
        <div className="lecture-consultation-dog-body">
          <div className="lecture-consultation-space-suit">
            <div className="lecture-consultation-suit-detail"></div>
            <div className="lecture-consultation-suit-detail"></div>
            <div className="lecture-consultation-oxygen-tank"></div>
          </div>
          <div className="lecture-consultation-dog-legs">
            <div className="lecture-consultation-leg"></div>
            <div className="lecture-consultation-leg"></div>
          </div>
          <div className="lecture-consultation-dog-tail"></div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="lecture-consultation-logout-card">
        <div className="lecture-consultation-logout-content">
          <h2 className="lecture-consultation-logout-title">Are you sure you want to logout?</h2>
          <p className="lecture-consultation-logout-text">
            Your space journey will be paused. Our astronaut dog is waiting for your return!
          </p>

          <div className="lecture-consultation-logout-buttons">
            <button className="lecture-consultation-button lecture-consultation-close-button" onClick={handleClose}>
              <i className="fas fa-times-circle"></i> Close
            </button>
            <button className="lecture-consultation-button lecture-consultation-logout-button" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoutConfirmation
