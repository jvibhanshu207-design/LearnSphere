import React from "react";
import ProgressBar from "../../components/ProgressBar";

export const Students = () => {
  const studentsList = [
    { id: "std-1", name: "Jane Doe", email: "student@learnsphere.com", coursesCount: 3, averageProgress: 65, status: "Active" },
    { id: "std-2", name: "Rahul Patel", email: "rahul@learnsphere.com", coursesCount: 2, averageProgress: 75, status: "Active" },
    { id: "std-3", name: "Nisha Sen", email: "nisha@learnsphere.com", coursesCount: 4, averageProgress: 60, status: "On Leave" },
    { id: "std-4", name: "Aman Gupta", email: "aman@learnsphere.com", coursesCount: 1, averageProgress: 30, status: "Active" },
    { id: "std-5", name: "Simran Kaur", email: "simran@learnsphere.com", coursesCount: 5, averageProgress: 88, status: "Active" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Enrolled Students</h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          Track grades, attendance status, and course progression rates across students.
        </p>
      </div>

      <div className="card">
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border-light)" }}>
                <th style={{ padding: "16px", fontWeight: 700 }}>Student</th>
                <th style={{ padding: "16px", fontWeight: 700 }}>Email</th>
                <th style={{ padding: "16px", fontWeight: 700 }}>Enrolled Courses</th>
                <th style={{ padding: "16px", fontWeight: 700 }}>Average Progress</th>
                <th style={{ padding: "16px", fontWeight: 700 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {studentsList.map((stud) => (
                <tr key={stud.id} style={{ borderBottom: "1px solid var(--border-light)", fontSize: "0.9rem" }}>
                  <td style={{ padding: "16px", fontWeight: 600 }}>{stud.name}</td>
                  <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{stud.email}</td>
                  <td style={{ padding: "16px", fontWeight: 600 }}>{stud.coursesCount} Programs</td>
                  <td style={{ padding: "16px", width: "220px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ flexGrow: 1 }}>
                        <ProgressBar progress={stud.averageProgress} showText={false} size="sm" />
                      </div>
                      <span style={{ fontWeight: 700, fontSize: "0.85rem", width: "32px" }}>{stud.averageProgress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>
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
    </div>
  );
};
export default Students;
