import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Bell, Search, Menu, User, Sparkles } from "lucide-react";
import "../styles/components/Navbar.css";

export const Navbar = ({ onMenuClick, searchValue, onSearchValueChange }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "React assignment deadline is approaching", time: "2 hours ago" },
    { id: 2, text: "Dr. Amit Kumar scheduled Java OOP Quiz", time: "1 day ago" },
    { id: 3, text: "Welcome to LearnSphere platform!", time: "3 days ago" }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchValueChange) return; // Managed by on-page state
    
    // Redirect to courses with query parameter if not on courses page
    const coursesPath = currentUser?.role === "teacher" ? "/teacher/courses" : "/student/courses";
    navigate(`${coursesPath}?search=${encodeURIComponent(searchValue || "")}`);
  };

  return (
    <header className="navbar-header">
      {/* Left Area: Hamburger & Welcome */}
      <div className="navbar-left">
        <button
          onClick={onMenuClick}
          className="navbar-mobile-btn"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="navbar-welcome">
          <h2 className="navbar-welcome-title">
            Welcome back, {currentUser?.name || "User"} 👋
          </h2>
          <span className="navbar-welcome-subtitle">
            <Sparkles size={12} color="var(--status-upcoming)" />
            {currentUser?.role === "teacher" ? "Instructor Portal" : "Student Dashboard"}
          </span>
        </div>
      </div>

      {/* Right Area: Search, Notifications, Avatar */}
      <div className="navbar-right">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="navbar-search-form">
          <Search size={16} className="navbar-search-icon" />
          <input
            type="text"
            placeholder="Search courses, instructors, tags..."
            value={searchValue || ""}
            onChange={(e) => onSearchValueChange ? onSearchValueChange(e.target.value) : navigate(currentUser?.role === "teacher" ? `/teacher/courses?search=${e.target.value}` : `/student/courses?search=${e.target.value}`)}
            className="navbar-search-input"
          />
        </form>

        {/* Notifications Icon */}
        <div className="navbar-notif-container">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="navbar-notif-btn"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="navbar-notif-dot" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="navbar-notif-dropdown">
              <div className="navbar-notif-header">
                Notifications
              </div>
              <div className="navbar-notif-list">
                {notifications.map((n) => (
                  <div key={n.id} className="navbar-notif-item">
                    <span className="navbar-notif-text">{n.text}</span>
                    <span className="navbar-notif-time">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar link */}
        <Link
          to={currentUser?.role === "teacher" ? "/teacher" : "/student/profile"}
          className="navbar-avatar"
        >
          {currentUser?.name ? currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : <User size={18} />}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;