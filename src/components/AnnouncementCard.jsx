import React from "react";
import { Bell, Calendar } from "lucide-react";
import "../styles/components/AnnouncementCard.css";

export const AnnouncementCard = ({ announcement }) => {
  const { title, content, date } = announcement;

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="card announcement-card">
      <div className="announcement-card-icon">
        <Bell size={18} />
      </div>
      <div className="announcement-card-content">
        <div className="announcement-card-header">
          <h4 className="announcement-card-title">{title}</h4>
          <span className="announcement-card-date">
            <Calendar size={12} />
            {formatDate(date)}
          </span>
        </div>
        <p className="announcement-card-desc">
          {content}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementCard;
