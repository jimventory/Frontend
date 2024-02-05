import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function UserInformation() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>?</div>
    }

    return (
        ((isAuthenticated) && (
            <div>
                <h4>{user?.name}</h4>
                <LogoutButton/>
            </div>
        
        )) || (
            <LoginButton/>
        )
      );
}