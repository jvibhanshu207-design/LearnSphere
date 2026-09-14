import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button";
import { User, Mail, Shield, BookOpen, CheckSquare, Edit, Save, X, Award } from "lucide-react";

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
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>My Profile</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          Manage your personal details, email configurations, and platform roles.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
        
        {/* Left Column: Avatar & Basic Stats */}
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            className="card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              padding: "40px 24px",
              textAlign: "center"
            }}
          >
            {/* Avatar Circle */}
            <div
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                backgroundColor: "var(--lime-accent)",
                color: "var(--navy-dark)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.25rem",
                fontWeight: 800,
                border: "4px solid #ffffff",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
              }}
            >
              {getInitials()}
            </div>

            <div>
              <h3 style={{ fontSize: "1.35rem", fontWeight: 800 }}>{currentUser?.name}</h3>
              <span
                className="badge"
                style={{
                  backgroundColor: "#f3e8ff",
                  color: "var(--text-primary)",
                  marginTop: "6px"
                }}
              >
                {currentUser?.role === "teacher" ? "Instructor" : "Student"}
              </span>
            </div>

            {success && (
              <div
                style={{
                  backgroundColor: "#ecfdf5",
                  color: "var(--status-completed)",
                  padding: "8px 16px",
                  borderRadius: "var(--border-radius-sm)",
                  fontSize: "0.85rem",
                  fontWeight: 600
                }}
              >
                {success}
              </div>
            )}

            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline" style={{ gap: "8px", width: "100%" }}>
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
        <div style={{ flex: "2 1 400px" }}>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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
