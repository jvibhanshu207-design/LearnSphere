import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { initialCourses } from "../../data/courses";
import CourseCard from "../../components/CourseCard";
import Button from "../../components/Button";
import { Plus } from "lucide-react";

export const Courses = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [courses] = useState(() => {
    const saved = localStorage.getItem("learnsphere_courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const teacherCourses = courses.filter((c) =>
    currentUser?.createdCourses?.includes(c.id) || c.instructor === currentUser?.name
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Manage My Courses</h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            View stats, publish new syllabus courses, or update syllabus content.
          </p>
        </div>
        <Button onClick={() => navigate("/teacher/courses/create")} variant="primary" style={{ gap: "6px" }}>
          <Plus size={18} /> Create Course
        </Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
        {teacherCourses.map((c) => (
          <CourseCard
            key={c.id}
            course={c}
            showProgress={false}
            buttonText="Preview Syllabus"
            onView={() => navigate(`/student/courses/${c.id}`)}
          />
        ))}

        {teacherCourses.length === 0 && (
          <div className="card" style={{ gridColumn: "1/-1", textAlign: "center", padding: "48px", color: "var(--text-secondary)" }}>
            You haven't created any courses yet. Click "Create Course" to publish your first one!
          </div>
        )}
      </div>
    </div>
  );
};
export default Courses;
