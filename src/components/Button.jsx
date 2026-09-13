import React from "react";
import "../styles/components/Button.css";

export const Button = ({ children, onClick, type = "button", variant = "primary", className = "", disabled = false, ...props }) => {
  const getVariantClass = () => {
    switch (variant) {
      case "primary": return "btn-primary";
      case "secondary": return "btn-secondary";
      case "outline": return "btn-outline";
      default: return "btn-primary";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${getVariantClass()} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;