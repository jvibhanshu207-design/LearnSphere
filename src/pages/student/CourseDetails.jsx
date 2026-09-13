import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { initialCourses } from "../../data/courses";
import ProgressBar from "../../components/ProgressBar";
import Button from "../../components/Button";
import { BookOpen, User, CheckCircle2, Circle, FileText, Video, HelpCircle, ArrowLeft, Star, PlayCircle } from "lucide-react";
import "../../styles/pages/Courses.css";

export const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("learnsphere_courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="card catalog-empty">
        <h3>Course not found</h3>
        <Button onClick={() => navigate("/student/courses")} style={{ marginTop: "16px" }}>
          Back to Courses
        </Button>
      </div>
    );
  }

  const isEnrolled = currentUser?.enrolledCourses?.includes(course.id);

  const handleContinueLearning = () => {
    if (!isEnrolled) {
      alert("Please enroll in this course first from the catalog!");
      return;
    }

    // Dynamic progress increase behavior
    const updatedProgress = Math.min(course.progress + 10, 100);
    
    // Toggle next module to completed dynamically if they keep click continue learning
    const updatedModules = [...course.modules];
    const nextIncompleteModule = updatedModules.find(m => !m.completed);
    if (nextIncompleteModule && updatedProgress >= 80) {
      nextIncompleteModule.completed = true;
    }

    const updatedCourses = courses.map((c) => {
      if (c.id === course.id) {
        return { ...c, progress: updatedProgress, modules: updatedModules };
      }
      return c;
    });

    setCourses(updatedCourses);
    localStorage.setItem("learnsphere_courses", JSON.stringify(updatedCourses));
    alert(`Progress updated to ${updatedProgress}%! Keep up the good work.`);
  };

  const getMaterialIcon = (type) => {
    if (type?.toLowerCase().includes("pdf")) return <FileText size={18} color="var(--status-overdue)" />;
    if (type?.toLowerCase().includes("video")) return <Video size={18} color="var(--status-progress)" />;
    return <HelpCircle size={18} color="var(--status-upcoming)" />;
  };

  return (
    <div className="course-details-page">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="back-link-btn"
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {/* Main Course Layout */}
      <div className="course-details-layout">
        
        {/* Left Column: Details & Modules */}
        <div className="course-details-main">
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className="course-header-row">
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span className="badge" style={{ backgroundColor: "#f3e8ff", color: "var(--text-primary)", alignSelf: "start" }}>
                  {course.category}
                </span>
                <h2 style={{ fontSize: "1.75rem", fontWeight: 800 }}>{course.title}</h2>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700 }}>
                <Star size={18} fill="var(--status-upcoming)" stroke="var(--status-upcoming)" />
                <span>{course.rating}</span>
                <span style={{ color: "var(--text-light)", fontWeight: 500 }}>({course.studentsCount} students)</span>
              </div>
            </div>

            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{course.description}</p>

            <div className="course-meta-row">
              <div className="course-meta-item">
                <User size={18} color="var(--text-secondary)" />
                <span>{course.instructor}</span>
              </div>
              <div className="course-meta-item">
                <BookOpen size={18} color="var(--text-secondary)" />
                <span>{course.lessons} lessons</span>
              </div>
            </div>

            {isEnrolled && (
              <div style={{ marginTop: "12px", borderTop: "1px solid var(--border-light)", paddingTop: "20px" }}>
                <ProgressBar progress={course.progress} showText={true} size="md" />
              </div>
            )}
          </div>

          {/* Modules section */}
          <div className="card">
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "20px" }}>Course Modules</h3>
            <div className="course-modules-list">
              {course.modules.map((mod, index) => (
                <div
                  key={mod.id}
                  className="module-item-card"
                  style={{ backgroundColor: mod.completed ? "#f8fafc" : "#ffffff" }}
                >
                  <div className="module-item-left">
                    {mod.completed ? (
                      <CheckCircle2 size={22} color="var(--status-completed)" />
                    ) : (
                      <Circle size={22} color="var(--text-light)" />
                    )}
                    <div className="module-item-info">
                      <span className="module-item-title">
                        Module {index + 1}: {mod.title}
                      </span>
                      <span className="module-item-duration">
                        {mod.completed ? "Completed" : "Locked / Up Next"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Materials & Actions */}
        <div className="course-details-sidebar">
          
          {/* Action Box */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Study Progression</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              {isEnrolled ? "Advance through video lectures, PDF cheatsheets, and interactive practice challenges." : "Enroll to access the lessons and assignment challenges."}
            </p>
            <Button
              onClick={handleContinueLearning}
              variant="primary"
              className="btn-full-width"
              style={{ gap: "8px", padding: "12px" }}
            >
              <PlayCircle size={18} />
              Continue Learning
            </Button>
          </div>

          {/* Study Materials */}
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px" }}>Study Materials</h3>
            <div className="course-materials-list">
              {course.materials.map((mat, idx) => (
                <a
                  key={idx}
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert(`Downloading ${mat.name}...`); }}
                  className="material-item"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {getMaterialIcon(mat.type)}
                    <span style={{ fontWeight: 600 }}>{mat.name}</span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>{mat.size}</span>
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CourseDetails;
