import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { initialCourses } from "../../data/courses";
import CourseCard from "../../components/CourseCard";
import Button from "../../components/Button";
import { Plus } from "lucide-react";
import "../../styles/pages/Teacher.css";

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
    <div className="teacher-page">
      <div className="teacher-page-header">
        <div>
          <h2 className="teacher-page-title">Manage My Courses</h2>
          <p className="teacher-page-desc">
            View stats, publish new syllabus courses, or update syllabus content.
          </p>
        </div>
        <Button onClick={() => navigate("/teacher/courses/create")} variant="primary" style={{ gap: "6px" }}>
          <Plus size={18} /> Create Course
        </Button>
      </div>

      <div className="teacher-courses-grid">
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
          <div className="card catalog-empty">
            You haven't created any courses yet. Click "Create Course" to publish your first one!
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
