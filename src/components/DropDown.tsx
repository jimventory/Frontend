import React from "react";
import "../stylesheets/DropDown.css";
import LogoutButton from "./LogoutButton"
export default function DropDown( { userName } : { userName: string }) {
  return (

    <div className="dropdown-menu"> 
      <button className="menu"> {userName} &#x25BC; </button>
      <div className="dropdown-options">
        <LogoutButton />
      </div>
    </div>

  );
}
