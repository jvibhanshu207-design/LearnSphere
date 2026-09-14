import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { initialCourses } from "../../data/courses";
import Button from "../../components/Button";
import { ArrowLeft, Save, AlertCircle, CheckCircle } from "lucide-react";

export const CreateCourse = () => {
  const navigate = useNavigate();
  const { currentUser, addCreatedCourse } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Programming");
  const [instructor, setInstructor] = useState(currentUser?.name || "Dr. Amit Kumar");
  const [lessons, setLessons] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim() || title.length < 3) {
      setError("Course Name must be at least 3 characters.");
      return;
    }

    if (!description.trim() || description.length < 10) {
      setError("Please write a detailed description of at least 10 characters.");
      return;
    }

    const lessonsNum = parseInt(lessons, 10);
    if (isNaN(lessonsNum) || lessonsNum <= 0) {
      setError("Please enter a valid positive number of lessons.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newCourseId = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      
      const newCourse = {
        id: newCourseId,
        title,
        description,
        category,
        instructor,
        lessons: lessonsNum,
        rating: 5.0,
        progress: 0,
        remainingTime: "0h",
        studentsCount: 0,
        modules: [
          { id: "mod-1", title: "Introduction & Overview", completed: false }
        ],
        materials: [
          { type: "PDF Notes", name: "Syllabus Overview.pdf" }
        ],
        assignmentsList: []
      };

      const savedCourses = localStorage.getItem("learnsphere_courses");
      const currentList = savedCourses ? JSON.parse(savedCourses) : initialCourses;
      
      // Save course to state
      const updatedList = [...currentList, newCourse];
      localStorage.setItem("learnsphere_courses", JSON.stringify(updatedList));

      // Record created course in teacher profile
      addCreatedCourse(newCourseId);

      setLoading(false);
      setSuccess("Course created successfully!");
      
      setTimeout(() => {
        navigate("/teacher/courses");
      }, 1200);
    }, 800);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Back Link */}
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
          <ArrowLeft size={16} /> Back to Courses
        </button>
      </div>

      <div style={{ maxWidth: "600px", margin: "0 auto", width: "100%" }}>
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 700 }}>Create New Course</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Publish new educational syllabus structures for student enrollment.
            </p>
          </div>

          {error && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "var(--border-radius-sm)",
                backgroundColor: "#fef2f2",
                color: "var(--status-overdue)",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "var(--border-radius-sm)",
                backgroundColor: "#ecfdf5",
                color: "var(--status-completed)",
                fontSize: "0.85rem",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <CheckCircle size={16} />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div className="form-group">
              <label htmlFor="course-name" className="form-label">Course Name</label>
              <input
                id="course-name"
                type="text"
                className="form-control"
                placeholder="e.g. Advanced JavaScript Mastery"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="course-desc" className="form-label">Description</label>
              <textarea
                id="course-desc"
                rows="4"
                className="form-control"
                placeholder="Provide a detailed roadmap, prerequisites, and expected outcomes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="course-category" className="form-label">Category</label>
              <select
                id="course-category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ appearance: "auto" }}
              >
                <option value="Programming">Programming</option>
                <option value="Web Development">Web Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="course-inst" className="form-label">Instructor</label>
              <input
                id="course-inst"
                type="text"
                className="form-control"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="course-lessons" className="form-label">Number of Lessons</label>
              <input
                id="course-lessons"
                type="number"
                className="form-control"
                placeholder="e.g. 10"
                value={lessons}
                onChange={(e) => setLessons(e.target.value)}
                required
              />
            </div>

            <Button type="submit" variant="primary" style={{ width: "100%", gap: "8px", marginTop: "12px" }} disabled={loading}>
              <Save size={18} />
              {loading ? "Publishing..." : "Create Course"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateCourse;
