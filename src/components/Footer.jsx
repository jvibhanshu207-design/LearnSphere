import React from "react";

export const Footer = () => {
  return (
    <footer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 32px",
        borderTop: "1px solid var(--border-light)",
        marginTop: "auto",
        backgroundColor: "#ffffff",
        fontSize: "0.85rem",
        color: "var(--text-secondary)",
        flexWrap: "wrap",
        gap: "12px"
      }}
    >
      <span>&copy; {new Date().getFullYear()} LearnSphere. All rights reserved.</span>
      <div style={{ display: "flex", gap: "16px" }}>
        <a href="#" style={{ hover: "color: var(--text-primary)" }}>Privacy Policy</a>
        <a href="#" style={{ hover: "color: var(--text-primary)" }}>Terms of Service</a>
        <a href="#" style={{ hover: "color: var(--text-primary)" }}>Contact Support</a>
      </div>
    </footer>
  );
};
export default Footer;
