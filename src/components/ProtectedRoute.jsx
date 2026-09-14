import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && currentUser.role !== allowedRole) {
    // If authenticated but role mismatch, redirect to their home page
    return <Navigate to={currentUser.role === "teacher" ? "/teacher" : "/student"} replace />;
  }

  return children;
};
export default ProtectedRoute;
