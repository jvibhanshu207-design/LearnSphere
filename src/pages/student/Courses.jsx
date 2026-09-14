import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { initialCourses } from "../../data/courses";
import CourseCard from "../../components/CourseCard";
import SearchBar from "../../components/SearchBar";

export const Courses = () => {
  const { currentUser, enrollInCourse } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("learnsphere_courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [searchVal, setSearchVal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  // Read search URL param if present (e.g. from navbar redirects)
  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchVal(query);
    }
  }, [searchParams]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(courses.map(c => c.category));
    return ["all", ...Array.from(cats)];
  }, [courses]);

  // useMemo for filtered/sorted course list (useMemo requirement check)
  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        const matchesSearch =
          course.title.toLowerCase().includes(searchVal.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchVal.toLowerCase()) ||
          course.category.toLowerCase().includes(searchVal.toLowerCase());
        
        const matchesCategory =
          selectedCategory === "all" || course.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "lessons") return b.lessons - a.lessons;
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [courses, searchVal, selectedCategory, sortBy]);

  const handleEnroll = (courseId) => {
    enrollInCourse(courseId);
    // Reload local storage sync
    const updatedCourses = courses.map(c => {
      if (c.id === courseId) {
        return { ...c, progress: 0 };
      }
      return c;
    });
    setCourses(updatedCourses);
    localStorage.setItem("learnsphere_courses", JSON.stringify(updatedCourses));
    alert("Enrolled successfully! You can track this course in your dashboard.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Top Header Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>My Course Catalog</h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            Explore available modules, join new programs, or continue your active courses.
          </p>
        </div>
      </div>

      {/* Filters Area */}
      <div
        className="card"
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          padding: "16px 24px"
        }}
      >
        <SearchBar
          value={searchVal}
          onChange={setSearchVal}
          placeholder="Search by course, teacher, or category..."
        />

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", width: "100%", maxWidth: "480px", justifyContent: "flex-end" }}>
          {/* Category Filter */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flexGrow: 1 }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-control"
              style={{ padding: "8px 12px", height: "42px" }}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flexGrow: 1 }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-control"
              style={{ padding: "8px 12px", height: "42px" }}
            >
              <option value="rating">Sort by: Top Rating</option>
              <option value="lessons">Sort by: Lessons count</option>
              <option value="title">Sort by: Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
        {filteredCourses.map((course) => {
          const isEnrolled = currentUser?.enrolledCourses?.includes(course.id);
          return (
            <CourseCard
              key={course.id}
              course={course}
              showProgress={isEnrolled}
              buttonText={isEnrolled ? "Continue Learning" : "Enroll Now"}
              onView={() => {
                if (isEnrolled) {
                  navigate(`/student/courses/${course.id}`);
                } else {
                  handleEnroll(course.id);
                }
              }}
            />
          );
        })}

        {filteredCourses.length === 0 && (
          <div
            className="card"
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "48px",
              color: "var(--text-secondary)"
            }}
          >
            No courses found matching your criteria. Try adjusting your search filters.
          </div>
        )}
      </div>
    </div>
  );
};
export default Courses;
