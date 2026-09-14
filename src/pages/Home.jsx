import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Home = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      if (currentUser.role === "teacher") {
        navigate("/teacher", { replace: true });
      } else {
        navigate("/student", { replace: true });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, currentUser, navigate]);

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ fontSize: "1.2rem", fontWeight: 600 }}>Loading LearnSphere...</div>
    </div>
  );
};
export default Home;
