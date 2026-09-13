import React from "react";
import ProgressBar from "../../components/ProgressBar";
import "../../styles/pages/Teacher.css";
import "../../styles/pages/Assignments.css";

export const Students = () => {
  const studentsList = [
    { id: "std-1", name: "Jane Doe", email: "student@learnsphere.com", coursesCount: 3, averageProgress: 65, status: "Active" },
    { id: "std-2", name: "Rahul Patel", email: "rahul@learnsphere.com", coursesCount: 2, averageProgress: 75, status: "Active" },
    { id: "std-3", name: "Nisha Sen", email: "nisha@learnsphere.com", coursesCount: 4, averageProgress: 60, status: "On Leave" },
    { id: "std-4", name: "Aman Gupta", email: "aman@learnsphere.com", coursesCount: 1, averageProgress: 30, status: "Active" },
    { id: "std-5", name: "Simran Kaur", email: "simran@learnsphere.com", coursesCount: 5, averageProgress: 88, status: "Active" }
  ];

  return (
    <div className="teacher-page">
      <div>
        <h2 className="teacher-page-title">Enrolled Students</h2>
        <p className="teacher-page-desc">
          Track grades, attendance status, and course progression rates across students.
        </p>
      </div>

      <div className="card data-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Enrolled Courses</th>
              <th>Average Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {studentsList.map((stud) => (
              <tr key={stud.id}>
                <td style={{ fontWeight: 600 }}>{stud.name}</td>
                <td style={{ color: "var(--text-secondary)" }}>{stud.email}</td>
                <td style={{ fontWeight: 600 }}>{stud.coursesCount} Programs</td>
                <td style={{ width: "220px" }}>
                  <div className="students-table-progress-wrap">
                    <div className="students-table-progress-bar">
                      <ProgressBar progress={stud.averageProgress} showText={false} size="sm" />
                    </div>
                    <span className="students-table-progress-pct">{stud.averageProgress}%</span>
                  </div>
                </td>
                <td>
                  <span
                    className={`badge ${
                      stud.status === "Active" ? "badge-completed" : "badge-upcoming"
                    }`}
                    style={{ fontSize: "0.65rem", padding: "2px 8px" }}
                  >
                    {stud.status}
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

export default Students;
