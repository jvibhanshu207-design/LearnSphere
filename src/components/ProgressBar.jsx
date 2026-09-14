import React from "react";

export const ProgressBar = ({ progress, showText = true, size = "md", color = "primary" }) => {
  const roundedProgress = Math.min(Math.max(Math.round(progress), 0), 100);

  const getSizeStyle = () => {
    switch (size) {
      case "sm": return { height: "6px" };
      case "md": return { height: "10px" };
      case "lg": return { height: "16px" };
      default: return { height: "10px" };
    }
  };

  const getProgressColor = () => {
    if (color === "primary") return "var(--lime-accent)";
    if (color === "status") {
      if (roundedProgress >= 80) return "var(--status-completed)";
      if (roundedProgress >= 40) return "var(--status-progress)";
      return "var(--status-upcoming)";
    }
    return color;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%" }}>
      {showText && (
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 600 }}>
          <span style={{ color: "var(--text-secondary)" }}>Progress</span>
          <span style={{ color: "var(--text-primary)" }}>{roundedProgress}%</span>
        </div>
      )}
      <div
        style={{
          width: "100%",
          backgroundColor: "var(--border-light)",
          borderRadius: "9999px",
          overflow: "hidden",
          ...getSizeStyle()
        }}
      >
        <div
          style={{
            width: `${roundedProgress}%`,
            height: "100%",
            backgroundColor: getProgressColor(),
            borderRadius: "9999px",
            transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        />
      </div>
    </div>
  );
};
export default ProgressBar;
