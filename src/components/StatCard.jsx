import React from "react";
import "../styles/components/StatCard.css";

export const StatCard = ({ icon: Icon, value, label, color = "default" }) => {
  return (
    <div className="card stat-card">
      <div className={`stat-card-icon stat-card-icon--${color}`}>
        {Icon && <Icon size={24} />}
      </div>
      <div className="stat-card-content">
        <span className="stat-card-value">
          {value}
        </span>
        <span className="stat-card-label">
          {label}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
