import React, { useEffect } from "react";
import { X } from "lucide-react";
import Button from "./Button";

export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(15, 23, 42, 0.4)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "16px"
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "var(--border-radius-lg)",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "var(--shadow-premium)",
          border: "1px solid var(--border-light)",
          overflow: "hidden",
          animation: "modalFadeIn 0.2s ease-out"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "between",
            padding: "20px 24px",
            borderBottom: "1px solid var(--border-light)"
          }}
        >
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0, flexGrow: 1 }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4px",
              borderRadius: "50%",
              backgroundColor: "#f1f5f9"
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "24px" }}>
          {children}
        </div>
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};
export default Modal;
