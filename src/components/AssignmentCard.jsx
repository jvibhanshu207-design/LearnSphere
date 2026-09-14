import React from "react";
import { Calendar, FileText } from "lucide-react";
import Button from "./Button";

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
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "16px", height: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flexGrow: 1 }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 600 }}>
            {courseName}
          </span>
          <h4 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{title}</h4>
        </div>
        <span className={`badge ${getStatusBadgeClass()}`}>{status}</span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Calendar size={16} />
          <span>Due: {formatDate(dueDate)}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <FileText size={16} />
          <span>{points} Points</span>
        </div>
      </div>

      <div style={{ marginTop: "auto", pt: "8px" }}>
        <Button onClick={onView} variant="outline" style={{ width: "100%" }}>
          View Details
        </Button>
      </div>
    </div>
  );
};
export default AssignmentCard;
