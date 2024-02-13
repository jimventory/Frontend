import React from "react";
import "../stylesheets/Landing.css";
import bigLogo from "../images/grayOnBlack.png";

// Google Font link
const link = document.createElement("link");
link.href =
  "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

const Landing = () => {
  return (
    <div className="land">
      <img src={bigLogo} className="big-logo" alt="logo that says streamline" />
      <div className="big-letters">
        <span className="first-letter">Y</span>
        <span> O U R&nbsp;&nbsp;</span>
        <span className="first-letter"> I</span>
        <span> N V E N T O R Y .</span>
      </div>
      <div className="bigger-letters">
        <span className="first-letter">S</span>
        <span> I M P L I F I E D .</span>
      </div>
    </div>
  );
};

export default Landing;
