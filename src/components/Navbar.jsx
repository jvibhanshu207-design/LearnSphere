import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Bell, Search, Menu, User, Sparkles } from "lucide-react";

export const Navbar = ({ onMenuClick, searchValue, onSearchValueChange }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: "24px",
        borderBottom: "1px solid var(--border-light)",
        marginBottom: "8px",
        gap: "16px",
        flexWrap: "wrap"
      }}
    >
      {/* Left Area: Hamburger & Welcome */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          onClick={onMenuClick}
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px",
            borderRadius: "var(--border-radius-sm)",
            backgroundColor: "#f1f5f9",
            color: "var(--text-primary)"
          }}
          className="mobile-menu-btn"
        >
          <Menu size={20} />
        </button>

        <div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px" }}>
            Welcome back, {currentUser?.name || "User"} 👋
          </h2>
          <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "4px" }}>
            <Sparkles size={12} color="var(--status-upcoming)" />
            {currentUser?.role === "teacher" ? "Instructor Portal" : "Student Dashboard"}
          </span>
        </div>
      </div>

      {/* Right Area: Search, Notifications, Avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        {/* Search */}
        <form onSubmit={handleSearchSubmit} style={{ position: "relative" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-secondary)"
            }}
          />
          <input
            type="text"
            placeholder="Search courses, instructors, tags..."
            value={searchValue || ""}
            onChange={(e) => onSearchValueChange ? onSearchValueChange(e.target.value) : navigate(currentUser?.role === "teacher" ? `/teacher/courses?search=${e.target.value}` : `/student/courses?search=${e.target.value}`)}
            style={{
              padding: "8px 12px 8px 36px",
              borderRadius: "9999px",
              border: "1px solid var(--border-light)",
              fontSize: "0.875rem",
              width: "240px",
              backgroundColor: "#f8fafc",
              transition: "var(--transition-smooth)"
            }}
            className="navbar-search-input"
          />
        </form>

        {/* Notifications Icon */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#f1f5f9",
              color: "var(--text-primary)"
            }}
          >
            <Bell size={18} />
            <span
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "var(--status-overdue)"
              }}
            />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              style={{
                position: "absolute",
                top: "48px",
                right: 0,
                width: "280px",
                backgroundColor: "#ffffff",
                borderRadius: "var(--border-radius-md)",
                boxShadow: "var(--shadow-soft)",
                border: "1px solid var(--border-light)",
                zIndex: 100,
                overflow: "hidden"
              }}
            >
              <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-light)", fontWeight: 700, fontSize: "0.9rem" }}>
                Notifications
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid #f1f5f9",
                      fontSize: "0.8rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px"
                    }}
                  >
                    <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{n.text}</span>
                    <span style={{ color: "var(--text-light)" }}>{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar link */}
        <Link
          to={currentUser?.role === "teacher" ? "/teacher" : "/student/profile"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "var(--lime-accent)",
            color: "var(--navy-dark)",
            fontWeight: 700,
            fontSize: "0.9rem",
            border: "2px solid #ffffff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          {currentUser?.name ? currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : <User size={18} />}
        </Link>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mobile-menu-btn {
            display: flex !important;
          }
        }
        @media (max-width: 580px) {
          .navbar-search-input {
            width: 100% !important;
          }
          form {
            width: 100%;
          }
        }
      `}</style>
    </header>
  );
};
export default Navbar;
