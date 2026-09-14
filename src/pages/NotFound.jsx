import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AlertTriangle, Home } from "lucide-react";
import Button from "../components/Button";

export const NotFound = () => {
  const { currentUser } = useAuth();
  const homePath = currentUser?.role === "teacher" ? "/teacher" : "/student";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "24px",
        textAlign: "center",
        backgroundColor: "var(--bg-lavender)"
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: "500px",
          width: "100%",
          padding: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#fef2f2",
            color: "var(--status-overdue)"
          }}
        >
          <AlertTriangle size={40} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h1 style={{ fontSize: "4rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>404</h1>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Page Not Found</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
          </p>
        </div>

        <Link to={homePath} style={{ width: "100%" }}>
          <Button variant="primary" style={{ width: "100%", gap: "8px" }}>
            <Home size={18} />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
