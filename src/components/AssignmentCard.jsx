import React from "react";
import { Calendar, FileText } from "lucide-react";
import Button from "./Button";
import "../styles/components/AssignmentCard.css";

export const AssignmentCard = ({ assignment, onView }) => {
  const { title, courseName, dueDate, status, points } = assignment;

  const getStatusBadgeClass = () => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "badge-completed";
      case "in progress":
        return "badge-progress";
      case "upcoming":
        return "badge-upcoming";
      case "overdue":
        return "badge-overdue";
      default:
        return "badge-progress";
    }
  };

  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="card assignment-card">
      <div className="assignment-card-header">
        <div className="assignment-card-info">
          <span className="assignment-card-course">
            {courseName}
          </span>
          <h4 className="assignment-card-title">{title}</h4>
        </div>
        <span className={`badge ${getStatusBadgeClass()}`}>{status}</span>
      </div>

      <div className="assignment-card-meta">
        <div className="assignment-card-meta-item">
          <Calendar size={16} />
          <span>Due: {formatDate(dueDate)}</span>
        </div>
        <div className="assignment-card-meta-item">
          <FileText size={16} />
          <span>{points} Points</span>
        </div>
      </div>

      <div className="assignment-card-action">
        <Button onClick={onView} variant="outline" className="assignment-card-btn">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default AssignmentCard;
