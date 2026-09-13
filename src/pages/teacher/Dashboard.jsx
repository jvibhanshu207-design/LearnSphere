import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { initialCourses } from "../../data/courses";
import StatCard from "../../components/StatCard";
import Button from "../../components/Button";
import {
  Users,
  BookOpenCheck,
  FileCheck,
  Plus,
  Eye,
  Award
} from "lucide-react";
import "../../styles/pages/Dashboard.css";

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [courses] = useState(() => {
    const saved = localStorage.getItem("learnsphere_courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const teacherCourses = courses.filter(
    (c) => c.instructor === currentUser?.name || c.instructor?.includes("Amit")
  );

  const totalStudents = teacherCourses.reduce((sum, c) => sum + (c.studentsCount || 0), 0);
  const avgRating = (teacherCourses.reduce((sum, c) => sum + c.rating, 0) / (teacherCourses.length || 1)).toFixed(1);

  const mockRecentStudents = [
    { name: "Jane Doe", course: "Advanced React", grade: "A" },
    { name: "Rahul Patel", course: "Data Structures", grade: "B+" },
    { name: "Nisha Sen", course: "Advanced React", grade: "A-" },
    { name: "Aman Gupta", course: "Python Masterclass", grade: "B" }
  ];

  return (
    <div className="dashboard-container">
      {/* Metrics Row */}
      <section className="dash-stats-row">
        <StatCard icon={BookOpenCheck} value={teacherCourses.length} label="Active Courses" color="primary" />
        <StatCard icon={Users} value={totalStudents || 45} label="Total Students" color="info" />
        <StatCard icon={Award} value={avgRating} label="Average Rating" color="warning" />
        <StatCard icon={FileCheck} value="18" label="Submissions Pending" color="success" />
      </section>

      {/* Grid splits */}
      <div className="teacher-dash-grid">
        
        {/* Left Column: My Courses */}
        <div className="teacher-dash-left">
          <div className="card">
            <div className="dash-section-header" style={{ marginBottom: "20px" }}>
              <h3 className="dash-section-title">My Courses</h3>
              <Button onClick={() => navigate("/teacher/courses/create")} variant="primary" style={{ gap: "6px", padding: "8px 16px" }}>
                <Plus size={16} /> Create Course
              </Button>
            </div>

            <div className="teacher-courses-list">
              {teacherCourses.map((c) => (
                <div key={c.id} className="teacher-course-item">
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <div className="teacher-course-icon">
                      <BookOpenCheck size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700 }}>{c.title}</h4>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                        {c.category} &bull; {c.lessons} Lessons
                      </span>
                    </div>
                  </div>

                  <div className="teacher-course-stats">
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
        <div className="teacher-dash-right">
          <div className="card teacher-submissions-card">
            <h3 className="dash-section-title">Student Submissions</h3>
            <div className="teacher-submissions-list">
              {mockRecentStudents.map((stud, idx) => (
                <div key={idx} className="submission-item">
                  <div className="submission-info">
                    <span className="submission-name">{stud.name}</span>
                    <span className="submission-course">{stud.course}</span>
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
    </div>
  );
};

export default Dashboard;
