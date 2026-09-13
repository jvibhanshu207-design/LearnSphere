import React from "react";
import "../styles/components/Footer.css";

export const Footer = () => {
  return (
    <footer className="app-footer">
      <span className="footer-copy">&copy; {new Date().getFullYear()} LearnSphere. All rights reserved.</span>
      <div className="footer-links">
        <a href="#" className="footer-link">Privacy Policy</a>
        <a href="#" className="footer-link">Terms of Service</a>
        <a href="#" className="footer-link">Contact Support</a>
      </div>
    </footer>
  );
};

export default Footer;
