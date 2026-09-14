import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userRole="student"
      />
      <div className="inner-container">
        <div className="main-wrapper">
          <main className="main-content">
            <Navbar
              onMenuClick={() => setSidebarOpen(true)}
            />
            <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
              <Outlet />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
};
export default StudentLayout;
