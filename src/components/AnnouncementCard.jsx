import React from "react";
import { Bell, Calendar } from "lucide-react";

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
    <div className="card" style={{ display: "flex", gap: "16px", alignItems: "start" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "#f5f3ff",
          color: "var(--navy-dark)",
          flexShrink: 0
        }}
      >
        <Bell size={18} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", flexGrow: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <h4 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0 }}>{title}</h4>
          <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "4px" }}>
            <Calendar size={12} />
            {formatDate(date)}
          </span>
        </div>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.4" }}>
          {content}
        </p>
      </div>
    </div>
  );
};
export default AnnouncementCard;
