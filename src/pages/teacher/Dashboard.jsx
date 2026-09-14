import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { initialCourses } from "../../data/courses";
import { initialAssignments } from "../../data/assignments";
import StatCard from "../../components/StatCard";
import Button from "../../components/Button";
import { BookOpen, Users, FileText, TrendingUp, Plus, Eye, BookOpenCheck } from "lucide-react";

export const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [courses] = useState(() => {
    const saved = localStorage.getItem("learnsphere_courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [assignments] = useState(() => {
    const saved = localStorage.getItem("learnsphere_assignments");
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  // Filter courses created/managed by this teacher
  const teacherCourses = courses.filter((c) =>
    currentUser?.createdCourses?.includes(c.id) || c.instructor === currentUser?.name
  );

  const totalStudents = teacherCourses.reduce((acc, curr) => acc + curr.studentsCount, 0) || 3520;
  const averageStudentProgress = Math.round(
    teacherCourses.reduce((acc, curr) => acc + curr.progress, 0) / (teacherCourses.length || 1)
  ) || 68;

  const mockRecentStudents = [
    { name: "Jane Doe", email: "student@learnsphere.com", course: "React Development", progress: 55, grade: "A" },
    { name: "Rahul Patel", email: "rahul@learnsphere.com", course: "Java Programming", progress: 75, grade: "A+" },
    { name: "Nisha Sen", email: "nisha@learnsphere.com", course: "Python Fundamentals", progress: 65, grade: "B+" },
    { name: "Aman Gupta", email: "aman@learnsphere.com", course: "Web Development Bootcamp", progress: 30, grade: "B" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Top Banner Stats */}
      <section style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <StatCard icon={BookOpen} value={teacherCourses.length} label="Total Courses" color="info" />
        <StatCard icon={Users} value={totalStudents.toLocaleString()} label="Total Students" color="success" />
        <StatCard icon={FileText} value={assignments.length} label="Recent Assignments" color="warning" />
        <StatCard icon={TrendingUp} value={`${averageStudentProgress}%`} label="Average Student Progress" color="primary" />
      </section>

      {/* Grid splits */}
      <div className="teacher-dash-grid">
        
        {/* Left Column: My Courses */}
        <div style={{ flex: "2 1 500px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>My Courses</h3>
              <Button onClick={() => navigate("/teacher/courses/create")} variant="primary" style={{ gap: "6px", padding: "8px 16px" }}>
                <Plus size={16} /> Create Course
              </Button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {teacherCourses.map((c) => (
                <div
                  key={c.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    backgroundColor: "#f8fafc",
                    borderRadius: "var(--border-radius-md)",
                    border: "1px solid var(--border-light)",
                    flexWrap: "wrap",
                    gap: "12px"
                  }}
                >
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        backgroundColor: "#ede9fe",
                        color: "var(--navy-dark)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <BookOpenCheck size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700 }}>{c.title}</h4>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                        {c.category} &bull; {c.lessons} Lessons
                      </span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
                      <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>{c.studentsCount}</span>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>Students</span>
                    </div>
                    <Button onClick={() => navigate(`/student/courses/${c.id}`)} variant="outline" style={{ padding: "6px 12px", gap: "4px", fontSize: "0.8rem" }}>
                      <Eye size={14} /> Preview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Student Progress */}
        <div style={{ flex: "1 1 350px" }}>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>Student Submissions</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {mockRecentStudents.map((stud, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: idx !== mockRecentStudents.length - 1 ? "1px solid #f1f5f9" : "none",
                    paddingBottom: "12px"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{stud.name}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{stud.course}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="badge badge-completed" style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
                      Grade: {stud.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .teacher-dash-grid {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
        }
        @media (max-width: 1024px) {
          .teacher-dash-grid {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};
export default Dashboard;
