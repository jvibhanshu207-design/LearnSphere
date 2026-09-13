import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AlertTriangle, Home } from "lucide-react";
import Button from "../components/Button";
import "../styles/pages/NotFound.css";

export const NotFound = () => {
  const { currentUser } = useAuth();
  const homePath = currentUser?.role === "teacher" ? "/teacher" : "/student";

  return (
    <div className="not-found-page">
      <div className="card not-found-card">
        <div className="not-found-icon-circle">
          <AlertTriangle size={40} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-desc">
            Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
          </p>
        </div>

        <Link to={homePath} style={{ width: "100%" }}>
          <Button variant="primary" className="btn-full-width" style={{ gap: "8px" }}>
            <Home size={18} />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
