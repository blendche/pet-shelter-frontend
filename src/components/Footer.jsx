
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>🐾 Pet Shelter</h2>

        <p className="footer-description">
          Give every pet a chance to find a loving home.
        </p>

        <div className="footer-divider"></div>

        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Blend Derguti.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
