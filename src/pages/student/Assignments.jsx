import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialAssignments } from "../../data/assignments";
import AssignmentCard from "../../components/AssignmentCard";

export const Assignments = () => {
  const navigate = useNavigate();
  const [assignments] = useState(() => {
    const saved = localStorage.getItem("learnsphere_assignments");
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  const [activeTab, setActiveTab] = useState("all");

  const filteredAssignments = assignments.filter((item) => {
    if (activeTab === "all") return true;
    return item.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Assignments</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          Track and submit assignments for your enrolled courses.
        </p>
      </div>

      {/* Tabs Filter */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid var(--border-light)",
          gap: "24px",
          overflowX: "auto",
          paddingBottom: "2px"
        }}
      >
        {["all", "in progress", "completed", "upcoming", "overdue"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "10px 4px",
              fontWeight: 600,
              fontSize: "0.9rem",
              color: activeTab === tab ? "var(--text-primary)" : "var(--text-light)",
              borderBottom: activeTab === tab ? "3px solid var(--lime-accent)" : "3px solid transparent",
              textTransform: "capitalize",
              transition: "var(--transition-smooth)"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
        {filteredAssignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            onView={() => navigate(`/student/assignments/${assignment.id}`)}
          />
        ))}

        {filteredAssignments.length === 0 && (
          <div
            className="card"
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "48px",
              color: "var(--text-secondary)"
            }}
          >
            No assignments found in this section.
          </div>
        )}
      </div>
    </div>
  );
};
export default Assignments;
