import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/layouts/Layout.css";

export const TeacherLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userRole="teacher"
      />
      <div className="inner-container">
        <div className="main-wrapper">
          <main className="main-content">
            <Navbar
              onMenuClick={() => setSidebarOpen(true)}
            />
            <div className="layout-content-area">
              <Outlet />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};

export default TeacherLayout;
