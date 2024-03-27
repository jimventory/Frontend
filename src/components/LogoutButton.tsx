import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import '../stylesheets/LoginLogoutButton.css';

export default function LogoutButton() {
    const { logout } = useAuth0();

    return <button className="loginlogout-button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>;
}
