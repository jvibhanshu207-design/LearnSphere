import React, { useState } from "react";
import { initialAssignments } from "../../data/assignments";
import { Plus } from "lucide-react";
import Button from "../../components/Button";

export const Assignments = () => {
  const [assignments] = useState(() => {
    const saved = localStorage.getItem("learnsphere_assignments");
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Instructor Assignments Hub</h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            Review, publish, and check students' assignment progress logs.
          </p>
        </div>
        <Button onClick={() => alert("Simulated: Add assignment popup form.")} variant="primary" style={{ gap: "6px" }}>
          <Plus size={18} /> Create Assignment
        </Button>
      </div>

      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-light)" }}>
                <th style={{ padding: "16px", fontWeight: 700 }}>Title</th>
                <th style={{ padding: "16px", fontWeight: 700 }}>Course</th>
                <th style={{ padding: "16px", fontWeight: 700 }}>Due Date</th>
                <th style={{ padding: "16px", fontWeight: 700 }}>Points</th>
                <th style={{ padding: "16px", fontWeight: 700 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid var(--border-light)", fontSize: "0.9rem" }}>
                  <td style={{ padding: "16px", fontWeight: 600 }}>{item.title}</td>
                  <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{item.courseName}</td>
                  <td style={{ padding: "16px", color: "var(--text-secondary)" }}>
                    {new Date(item.dueDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "16px", fontWeight: 600 }}>{item.points} pts</td>
                  <td style={{ padding: "16px" }}>
                    <span
                      className={`badge ${
                        item.status === "Completed"
                          ? "badge-completed"
                          : item.status === "In Progress"
                          ? "badge-progress"
                          : "badge-upcoming"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Assignments;
