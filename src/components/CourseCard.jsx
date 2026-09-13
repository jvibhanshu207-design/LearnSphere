import React from "react";
import { Star, BookOpen, Clock, Code, Award, Terminal } from "lucide-react";
import ProgressBar from "./ProgressBar";
import Button from "./Button";
import "../styles/components/CourseCard.css";

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
    <div className="card course-card">
      {/* Top Banner Category */}
      <div className="course-card-top">
        <span className="badge course-card-badge">
          {getCategoryIcon()}
          {category}
        </span>
        <div className="course-card-rating">
          <Star size={16} fill="var(--status-upcoming)" stroke="var(--status-upcoming)" />
          <span>{rating}</span>
        </div>
      </div>

      {/* Title & Instructor */}
      <div className="course-card-info">
        <h4 className="course-card-title">{title}</h4>
        <p className="course-card-instructor">Instructor: {instructor}</p>
      </div>

      {/* Info Stats */}
      <div className="course-card-stats">
        <div className="course-card-stat">
          <BookOpen size={16} />
          <span>{lessons} Lessons</span>
        </div>
        {remainingTime && (
          <div className="course-card-stat">
            <Clock size={16} />
            <span>{remainingTime} left</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {showProgress && progress !== undefined && (
        <div className="course-card-progress">
          <ProgressBar progress={progress} showText={true} size="sm" color="primary" />
        </div>
      )}

      {/* Button */}
      <div className="course-card-action">
        <Button onClick={onView} variant="primary" className="course-card-btn">
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
