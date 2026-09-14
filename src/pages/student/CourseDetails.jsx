import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { initialCourses } from "../../data/courses";
import ProgressBar from "../../components/ProgressBar";
import Button from "../../components/Button";
import { BookOpen, User, CheckCircle2, Circle, FileText, Video, HelpCircle, ArrowLeft, Star, PlayCircle } from "lucide-react";

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
      <div className="card" style={{ textAlign: "center", padding: "48px" }}>
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
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "var(--text-secondary)"
          }}
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {/* Main Course Layout */}
      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
        
        {/* Left Column: Details & Modules */}
        <div style={{ flex: "2 1 600px", display: "flex", flexDirection: "column", gap: "28px" }}>
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: "12px" }}>
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

            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <User size={18} color="var(--text-secondary)" />
                <span style={{ fontWeight: 600 }}>{course.instructor}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {course.modules.map((mod, index) => (
                <div
                  key={mod.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    backgroundColor: mod.completed ? "#f8fafc" : "#ffffff",
                    borderRadius: "var(--border-radius-md)",
                    border: "1px solid var(--border-light)"
                  }}
                >
                  {mod.completed ? (
                    <CheckCircle2 size={22} color="var(--status-completed)" />
                  ) : (
                    <Circle size={22} color="var(--text-light)" />
                  )}
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                      Module {index + 1}: {mod.title}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                      {mod.completed ? "Completed" : "Locked / Up Next"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Materials & Actions */}
        <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "28px" }}>
          
          {/* Action Box */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Study Progression</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              {isEnrolled ? "Advance through video lectures, PDF cheatsheets, and interactive practice challenges." : "Enroll to access the lessons and assignment challenges."}
            </p>
            <Button
              onClick={handleContinueLearning}
              variant="primary"
              style={{ width: "100%", gap: "8px", padding: "12px" }}
            >
              <PlayCircle size={18} />
              Continue Learning
            </Button>
          </div>

          {/* Study Materials */}
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px" }}>Study Materials</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {course.materials.map((mat, idx) => (
                <a
                  key={idx}
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert(`Downloading ${mat.name}...`); }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "var(--border-radius-sm)",
                    backgroundColor: "#f8fafc",
                    border: "1px solid var(--border-light)",
                    fontSize: "0.85rem"
                  }}
                  className="material-link"
                >
                  {getMaterialIcon(mat.type)}
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{mat.type}</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}>{mat.name}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Assignments */}
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "16px" }}>Assignments</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {course.assignmentsList && course.assignmentsList.length > 0 ? (
                course.assignmentsList.map((assign) => (
                  <button
                    key={assign.id}
                    onClick={() => navigate(`/student/assignments/${assign.id}`)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px",
                      borderRadius: "var(--border-radius-sm)",
                      backgroundColor: "#f8fafc",
                      border: "1px solid var(--border-light)",
                      fontSize: "0.85rem",
                      textAlign: "left",
                      width: "100%"
                    }}
                    className="material-link"
                  >
                    <FileText size={18} color="var(--status-progress)" />
                    <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{assign.name}</span>
                  </button>
                ))
              ) : (
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  No assignments listed for this course yet.
                </span>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
export default CourseDetails;
// Default export
