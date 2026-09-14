import React from "react";

export const StatCard = ({ icon: Icon, value, label, color = "default" }) => {
  const getIconContainerStyle = () => {
    switch (color) {
      case "primary":
        return { backgroundColor: "var(--lime-hover)", color: "var(--navy-dark)" };
      case "success":
        return { backgroundColor: "#d1fae5", color: "var(--status-completed)" };
      case "info":
        return { backgroundColor: "#dbeafe", color: "var(--status-progress)" };
      case "warning":
        return { backgroundColor: "#fef3c7", color: "var(--status-upcoming)" };
      case "danger":
        return { backgroundColor: "#fee2e2", color: "var(--status-overdue)" };
      default:
        return { backgroundColor: "#f1f5f9", color: "var(--text-primary)" };
    }
  };

  return (
    <div
      className="card"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        flex: "1 1 200px"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "48px",
          height: "48px",
          borderRadius: "var(--border-radius-md)",
          ...getIconContainerStyle()
        }}
      >
        {Icon && <Icon size={24} />}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2 }}>
          {value}
        </span>
        <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--text-secondary)" }}>
          {label}
        </span>
      </div>
    </div>
  );
};
export default StatCard;
