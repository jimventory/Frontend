import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "../stylesheets/LoginLogoutButton.css";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="loginlogout-button" onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
}
