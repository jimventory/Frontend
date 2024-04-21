/* Hello! You have found the landing page!
I am not quite done, I want to make it ~10%
cuter. and maybe less dramatic. */

import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/Landing.css";
import bigLogo from "../images/grayOnBlack.png";

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
      <div style={{ height: "20px" }}></div>{" "}
      {/* Insert an empty div to create space */}
      <div className="bigger-letters">
        <span className="first-letter">S</span>
        <span> I M P L I F I E D .</span>
      </div>
      <div className="landing-buttons">
        <Link to="/register">
          <button className="button">G E T&nbsp;&nbsp;S T A R T E D. </button>
        </Link>
        <Link to="/about">
          <button className="button">L E A R N &nbsp;&nbsp;M O R E.</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
