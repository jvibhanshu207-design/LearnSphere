import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import { User, Mail, Shield, BookOpen, Edit, Save, X, Award } from "lucide-react";
import "../../styles/pages/Profile.css";

export const Profile = () => {
  const { currentUser, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [success, setSuccess] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setSuccess("");

    if (!name.trim()) {
      alert("Name cannot be empty.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    updateProfile(name, email);
    setSuccess("Profile details saved successfully!");
    setIsEditing(false);
    
    setTimeout(() => {
      setSuccess("");
    }, 2000);
  };

  const getInitials = () => {
    if (!currentUser?.name) return "JD";
    return currentUser.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <h2 className="profile-title">My Profile</h2>
        <p className="profile-desc">
          Manage your personal details, email configurations, and platform roles.
        </p>
      </div>

      <div className="profile-layout">
        
        {/* Left Column: Avatar & Basic Stats */}
        <div className="profile-col-left">
          <div className="card profile-avatar-card">
            {/* Avatar Circle */}
            <div className="profile-avatar-circle">
              {getInitials()}
            </div>

            <div>
              <h3 className="profile-name">{currentUser?.name}</h3>
              <span className="badge profile-badge">
                {currentUser?.role === "teacher" ? "Instructor" : "Student"}
              </span>
            </div>

            {success && (
              <div className="login-success-alert" style={{ width: "100%", justifyContent: "center" }}>
                {success}
              </div>
            )}

            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline" className="btn-full-width" style={{ gap: "8px" }}>
                <Edit size={16} /> Edit Profile
              </Button>
            )}
          </div>

          {/* Quick Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "20px" }}>
              <BookOpen size={24} color="var(--status-progress)" />
              <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                {currentUser?.enrolledCourses?.length || 5}
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600 }}>Enrolled</span>
            </div>
            <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "20px" }}>
              <Award size={24} color="var(--status-completed)" />
              <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                {currentUser?.completedCourses?.length || 2}
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600 }}>Completed</span>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Form Details */}
        <div className="profile-col-right">
          <div className="card profile-form-card">
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>Personal Information</h3>

            {isEditing ? (
              <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="form-group">
                  <label htmlFor="edit-name" className="form-label">Full Name</label>
                  <input
                    id="edit-name"
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="edit-email" className="form-label">Email Address</label>
                  <input
                    id="edit-email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                  <Button type="button" onClick={() => setIsEditing(false)} variant="outline" style={{ flex: 1, gap: "8px" }}>
                    <X size={16} /> Cancel
                  </Button>
                  <Button type="submit" variant="primary" style={{ flex: 1, gap: "8px" }}>
                    <Save size={16} /> Save Changes
                  </Button>
                </div>
              </form>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    backgroundColor: "#f8fafc",
                    borderRadius: "var(--border-radius-md)"
                  }}
                >
                  <User size={20} color="var(--text-secondary)" />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Full Name</span>
                    <span style={{ fontWeight: 700 }}>{currentUser?.name}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    backgroundColor: "#f8fafc",
                    borderRadius: "var(--border-radius-md)"
                  }}
                >
                  <Mail size={20} color="var(--text-secondary)" />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Email Address</span>
                    <span style={{ fontWeight: 700 }}>{currentUser?.email}</span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    backgroundColor: "#f8fafc",
                    borderRadius: "var(--border-radius-md)"
                  }}
                >
                  <Shield size={20} color="var(--text-secondary)" />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Role / Access Level</span>
                    <span style={{ fontWeight: 700, textTransform: "capitalize" }}>
                      {currentUser?.role} Account
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
