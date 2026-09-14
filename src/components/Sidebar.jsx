import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  HelpCircle,
  BookMarked,
  Bell,
  TrendingUp,
  User,
  Settings,
  LogOut,
  X
} from "lucide-react";

export const Sidebar = ({ isOpen, onClose, userRole }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    if (onClose) onClose();
  };

  const studentLinks = [
    { to: "/student", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/student/courses", label: "My Courses", icon: BookOpen },
    { to: "/student/assignments", label: "Assignments", icon: FileText },
    { to: "/student/quizzes", label: "Quizzes", icon: HelpCircle },
    { to: "/student/notes", label: "Notes", icon: BookMarked },
    { to: "/student/announcements", label: "Announcements", icon: Bell },
    { to: "/student/progress", label: "Progress", icon: TrendingUp },
    { to: "/student/profile", label: "Profile", icon: User }
  ];

  const teacherLinks = [
    { to: "/teacher", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/teacher/courses", label: "My Courses", icon: BookOpen },
    { to: "/teacher/assignments", label: "Assignments", icon: FileText },
    { to: "/teacher/notes", label: "Notes", icon: BookMarked },
    { to: "/teacher/announcements", label: "Announcements", icon: Bell },
    { to: "/teacher/students", label: "Students", icon: User }
  ];

  const links = userRole === "teacher" ? teacherLinks : studentLinks;

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(2px)",
            zIndex: 100,
            transition: "opacity 0.25s ease"
          }}
          className="sidebar-overlay"
        />
      )}

      <aside
        style={{
          width: "var(--sidebar-width)",
          backgroundColor: "var(--navy-sidebar)",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          height: "100%",
          position: isOpen ? "fixed" : "relative",
          top: 0,
          left: isOpen ? 0 : "unset",
          zIndex: 101,
          transform: isOpen ? "translateX(0)" : "translateX(0)",
          transition: "transform 0.3s ease",
          boxShadow: isOpen ? "10px 0 30px rgba(0, 0, 0, 0.25)" : "none"
        }}
        className={`app-sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        {/* Logo and Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "36px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "var(--lime-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  border: "2.5px solid var(--navy-sidebar)"
                }}
              />
            </div>
            <span style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
              LearnSphere
            </span>
          </div>

          {/* Close button on mobile */}
          {isOpen && (
            <button
              onClick={onClose}
              style={{
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "4px"
              }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Links Navigation */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px", flexGrow: 1 }}>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={onClose}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "var(--border-radius-md)",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  transition: "var(--transition-smooth)",
                  backgroundColor: isActive ? "var(--lime-accent)" : "transparent",
                  color: isActive ? "var(--navy-dark)" : "#94a3b8"
                })}
                className="sidebar-link"
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "20px",
            marginTop: "20px"
          }}
        >
          <button
            onClick={() => alert("Settings modal: LearnSphere settings are configured defaults.")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "var(--border-radius-md)",
              color: "#94a3b8",
              fontWeight: 600,
              textAlign: "left",
              width: "100%"
            }}
            className="sidebar-action"
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderRadius: "var(--border-radius-md)",
              color: "#f87171",
              fontWeight: 600,
              textAlign: "left",
              width: "100%"
            }}
            className="sidebar-action"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* CSS adjustments */}
      <style>{`
        @media (max-width: 1024px) {
          .app-sidebar.sidebar-closed {
            position: fixed;
            transform: translateX(-100%);
            left: 0;
            top: 0;
            bottom: 0;
          }
          .app-sidebar.sidebar-open {
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};
export default Sidebar;
