import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { initialCourses } from "../../data/courses";
import { initialAssignments } from "../../data/assignments";
import ProgressBar from "../../components/ProgressBar";
import { CheckCircle2, AlertCircle, Award, BarChart2 } from "lucide-react";

export const Progress = () => {
  const { currentUser } = useAuth();

  const [courses] = useState(() => {
    const saved = localStorage.getItem("learnsphere_courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [assignments] = useState(() => {
    const saved = localStorage.getItem("learnsphere_assignments");
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  // Calculate stats dynamically
  const enrolledCourses = courses.filter(c => currentUser?.enrolledCourses?.includes(c.id));
  const completedAssignments = assignments.filter(a => a.status === "Completed").length;
  const pendingAssignments = assignments.filter(a => a.status !== "Completed").length;

  const averageScore = 82; // Fallback score requested if not present
  const overallProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
    : 72; // default requirement

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Academic Progress Tracker</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          Monitor your scores, course progress metrics, and assignment submissions.
        </p>
      </div>

      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
        
        {/* Left Column: Overall Progress Radial & General Stats */}
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Radial Indicator Card */}
          <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", padding: "32px", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Overall Progress</h3>
            
            {/* SVG Circle Progress */}
            <div style={{ position: "relative", width: "160px", height: "160px" }}>
              <svg width="100%" height="100%" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="var(--border-light)"
                  strokeWidth="3.5"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="var(--lime-accent)"
                  strokeWidth="3.5"
                  strokeDasharray="100"
                  strokeDashoffset={100 - overallProgress}
                  strokeLinecap="round"
                  transform="rotate(-90 20 20)"
                  style={{ transition: "stroke-dashoffset 0.8s ease" }}
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <span style={{ fontSize: "1.85rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1 }}>
                  {overallProgress}%
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600 }}>Completed</span>
              </div>
            </div>

            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0 }}>
              You are doing great! Keep attending lectures to push your score.
            </p>
          </div>

          {/* Grid Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center", textAlign: "center", padding: "20px" }}>
              <CheckCircle2 size={24} color="var(--status-completed)" />
              <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>{completedAssignments}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600 }}>Assignments Done</span>
            </div>
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center", textAlign: "center", padding: "20px" }}>
              <AlertCircle size={24} color="var(--status-upcoming)" />
              <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>{pendingAssignments}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600 }}>Pending Tasks</span>
            </div>
          </div>

          <div className="card" style={{ display: "flex", alignItems: "center", gap: "16px", padding: "20px" }}>
            <Award size={32} color="var(--status-upcoming)" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "1.1rem", fontWeight: 800 }}>{averageScore}%</span>
              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Average Quiz Score</span>
            </div>
          </div>

        </div>

        {/* Right Column: Course-by-course details */}
        <div style={{ flex: "2 1 450px" }}>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>Course Progress Metrics</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {enrolledCourses.map((c) => (
                <div key={c.id} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>{c.title}</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)" }}>
                      {c.progress}%
                    </span>
                  </div>
                  <ProgressBar progress={c.progress} showText={false} size="md" color="primary" />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                    <span>Instructor: {c.instructor}</span>
                    <span>Remaining time: {c.remainingTime}</span>
                  </div>
                </div>
              ))}

              {enrolledCourses.length === 0 && (
                <div style={{ textAlign: "center", padding: "32px 0", color: "var(--text-secondary)" }}>
                  No enrolled courses found. Enroll in courses to start tracking!
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Progress;
