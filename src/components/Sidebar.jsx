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
import "../styles/components/Sidebar.css";

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
          className="sidebar-overlay"
        />
      )}

      <aside className={`app-sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        {/* Logo and Brand */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-logo">
              <div className="sidebar-logo-inner" />
            </div>
            <span className="sidebar-brand-text">LearnSphere</span>
          </div>

          {/* Close button on mobile */}
          {isOpen && (
            <button
              onClick={onClose}
              className="sidebar-close-btn"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Links Navigation */}
        <nav className="sidebar-nav">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={onClose}
                className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
              >
                <Icon size={18} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="sidebar-actions">
          <button
            onClick={() => alert("Settings modal: LearnSphere settings are configured defaults.")}
            className="sidebar-action-btn"
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          <button
            onClick={handleLogout}
            className="sidebar-action-btn sidebar-action-btn--logout"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
