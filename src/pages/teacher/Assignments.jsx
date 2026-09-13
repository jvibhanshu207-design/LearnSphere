import React, { useState } from "react";
import { initialAssignments } from "../../data/assignments";
import { Plus } from "lucide-react";
import Button from "../../components/Button";
import "../../styles/pages/Assignments.css";

export const Assignments = () => {
  const [assignments] = useState(() => {
    const saved = localStorage.getItem("learnsphere_assignments");
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  return (
    <div className="assignments-page">
      <div className="assignments-header">
        <div>
          <h2 className="assignments-title">Instructor Assignments Hub</h2>
          <p className="assignments-desc">
            Review, publish, and check students' assignment progress logs.
          </p>
        </div>
        <Button onClick={() => alert("Simulated: Add assignment popup form.")} variant="primary" style={{ gap: "6px" }}>
          <Plus size={18} /> Create Assignment
        </Button>
      </div>

      <div className="card data-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Due Date</th>
              <th>Points</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 600 }}>{item.title}</td>
                <td style={{ color: "var(--text-secondary)" }}>{item.courseName}</td>
                <td style={{ color: "var(--text-secondary)" }}>
                  {new Date(item.dueDate).toLocaleDateString()}
                </td>
                <td style={{ fontWeight: 600 }}>{item.points} pts</td>
                <td>
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
  );
};

export default Assignments;
