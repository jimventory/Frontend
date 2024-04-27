/* Hello! You have found the About Jimventory
page! I hope you like it! */

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../stylesheets/About.css";

export default function About() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="container">
      <div className="rectangle left">
        <p>
          <br /> S A Y &nbsp;&nbsp; G O O D - B Y E &nbsp;&nbsp; T O
          &nbsp;&nbsp; S P R E A D S H E E T S . . . <br /> <br />
        </p>
      </div>
      <div className="rectangle right">
        <p>
          S T R E A M |<strong> L I N E</strong> <br /> <br />
          An innovative new tool to streamline your company's inventory,
          designed for simplicity and affordability
          <br />
          <br />
          Specificially created for small business, StreamLine provides all the
          tools needed to take your company's inventory to the next level
        </p>
      </div>
      <div className="rectangle left">
        <p>
          A C C E S S &nbsp;&nbsp;A N Y W H E R E , &nbsp;&nbsp;A N Y
          &nbsp;&nbsp;T I M E.
          <br />
          <br />
          StreamLine can be accessed on any platform with a web browser <br />
          <br />
          Manage inventory on your computer, on your phone, or let employeess
          update stock with a company tablet
        </p>
      </div>
      <div className="rectangle right">
        <p>
          E A S Y &nbsp;&nbsp; T O &nbsp;&nbsp; U S E.
          <br />
          <br />
          Low effort inventory importing
          <br />
          <br />
          Track product shipping, recieve low stock notifications, see sales
          trends, and more
        </p>
      </div>
      <div className="rectangle left">
        <p>
          A F F O R D A B L E.
          <br />
          <br />
          StreamLine offers only one tier of membership
          <br />
          <br />
          One low monthly subscription fee gives you access to the entire
          StreamLine suite for a fraction of competitor costs
        </p>
      </div>
      <div className="rectangle right">
        <p>
          M A D E &nbsp;&nbsp; F O R &nbsp;&nbsp; Y O U R &nbsp;&nbsp; S M A L L
          &nbsp;&nbsp; B U S I N E S S.
          <br />
          <br />
          Flat rate subscription fee that won't break the bank
          <br />
          <br />
          Simple, fast, intuitive
        </p>
      </div>
      <div className="rectangle left">
        <p>
          W H A T &nbsp;&nbsp; A R E &nbsp;&nbsp; Y O U &nbsp;&nbsp; W A I T I N
          G &nbsp;&nbsp; F O R ?
          <br />
          <br />
          <div className="landing-buttons">
              <button className="button" onClick={() => loginWithRedirect()}>
                G E T&nbsp;&nbsp;S T A R T E D.{" "}
              </button>
          </div>
        </p>
      </div>
    </div>
  );
}
