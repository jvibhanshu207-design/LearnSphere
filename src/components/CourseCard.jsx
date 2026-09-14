import React from "react";
import { Star, BookOpen, Clock, Code, Award, Terminal } from "lucide-react";
import ProgressBar from "./ProgressBar";
import Button from "./Button";

export const CourseCard = ({ course, onView, showProgress = true, buttonText = "View Course" }) => {
  const { title, instructor, category, lessons, rating, progress, remainingTime } = course;

  const getCategoryIcon = () => {
    switch (category?.toLowerCase()) {
      case "programming":
        return <Terminal size={20} />;
      case "web development":
        return <Code size={20} />;
      case "data science":
        return <Award size={20} />;
      default:
        return <BookOpen size={20} />;
    }
  };

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%" }}>
      {/* Top Banner Category */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          className="badge"
          style={{
            backgroundColor: "rgba(163, 230, 53, 0.15)",
            color: "var(--navy-dark)",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          {getCategoryIcon()}
          {category}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.875rem", fontWeight: 600 }}>
          <Star size={16} fill="var(--status-upcoming)" stroke="var(--status-upcoming)" />
          <span>{rating}</span>
        </div>
      </div>

      {/* Title & Instructor */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <h4 style={{ fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.3 }}>{title}</h4>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Instructor: {instructor}</p>
      </div>

      {/* Info Stats */}
      <div style={{ display: "flex", gap: "16px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <BookOpen size={16} />
          <span>{lessons} Lessons</span>
        </div>
        {remainingTime && (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Clock size={16} />
            <span>{remainingTime} left</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {showProgress && progress !== undefined && (
        <div style={{ marginTop: "4px" }}>
          <ProgressBar progress={progress} showText={true} size="sm" color="primary" />
        </div>
      )}

      {/* Button */}
      <div style={{ marginTop: "auto", pt: "8px" }}>
        <Button onClick={onView} variant="primary" style={{ width: "100%" }}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
export default CourseCard;
