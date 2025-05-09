"use client"

import { useState, useEffect, useCallback } from "react"
import { X, LogOut } from "lucide-react"
import "./LogoutConfirmation.css"

const LogoutConfirmation = () => {
  const [animationState, setAnimationState] = useState({
    isLoaded: false,
    isClosing: false,
  })

  useEffect(() => {
    // Set loaded state after component mounts
    const timer = setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, isLoaded: true }))
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = useCallback(() => {
    setAnimationState((prev) => ({ ...prev, isClosing: true }))
    setTimeout(() => {
      window.history.back()
    }, 800)
  }, [])

  const handleLogout = useCallback(() => {
    setAnimationState((prev) => ({ ...prev, isClosing: true }))
    setTimeout(() => {
      window.location.href = "/"
    }, 800)
  }, [])

  // Generate particles dynamically
  const renderParticles = useCallback(() => {
    return Array.from({ length: 20 }).map((_, i) => (
      <div
        key={`particle-${i}`}
        className="lecture-consultation-particle"
        style={{
          "--delay": `${Math.random() * 5}s`,
          "--size": `${Math.random() * 3 + 1}px`,
          "--top": `${Math.random() * 100}%`,
          "--left": `${Math.random() * 100}%`,
        }}
      />
    ))
  }, [])

  const { isLoaded, isClosing } = animationState

  return (
    <div
      className={`lecture-consultation-logout-container ${
        isLoaded ? "lecture-consultation-loaded" : ""
      } ${isClosing ? "lecture-consultation-closing" : ""}`}
    >
      {/* Background Elements */}
      <div className="lecture-consultation-stars" />
      <div className="lecture-consultation-stars2" />
      <div className="lecture-consultation-stars3" />

      <div className="lecture-consultation-planets">
        <div className="lecture-consultation-planet planet-1" />
        <div className="lecture-consultation-planet planet-2" />
        <div className="lecture-consultation-planet planet-3" />
      </div>

      {/* Animated Elements */}
      <div className="lecture-consultation-meteor" />
      <div className="lecture-consultation-meteor meteor-2" />

      <div className="lecture-consultation-satellite">
        <div className="lecture-consultation-satellite-body">
          <div className="lecture-consultation-satellite-panel left" />
          <div className="lecture-consultation-satellite-panel right" />
        </div>
      </div>

      {/* Floating Particles */}
      <div className="lecture-consultation-particles">{renderParticles()}</div>

      {/* Astronaut Dog */}
      <div className="lecture-consultation-astronaut-dog">
        <div className="lecture-consultation-tether" />
        <div className="lecture-consultation-dog-head">
          <div className="lecture-consultation-helmet">
            <div className="lecture-consultation-helmet-glass" />
            <div className="lecture-consultation-helmet-shine" />
          </div>
          <div className="lecture-consultation-dog-ears">
            <div className="lecture-consultation-ear" />
            <div className="lecture-consultation-ear" />
          </div>
          <div className="lecture-consultation-dog-face">
            <div className="lecture-consultation-dog-eyes">
              <div className="lecture-consultation-eye" />
              <div className="lecture-consultation-eye" />
            </div>
            <div className="lecture-consultation-dog-nose" />
            <div className="lecture-consultation-dog-mouth" />
          </div>
        </div>
        <div className="lecture-consultation-dog-body">
          <div className="lecture-consultation-space-suit">
            <div className="lecture-consultation-suit-detail" />
            <div className="lecture-consultation-suit-detail" />
            <div className="lecture-consultation-oxygen-tank" />
          </div>
          <div className="lecture-consultation-dog-legs">
            <div className="lecture-consultation-leg" />
            <div className="lecture-consultation-leg" />
          </div>
          <div className="lecture-consultation-dog-tail" />
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
            <button
              className="lecture-consultation-button lecture-consultation-close-button"
              onClick={handleClose}
              aria-label="Close"
            >
              <X size={18} /> Close
            </button>
            <button
              className="lecture-consultation-button lecture-consultation-logout-button"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoutConfirmation
