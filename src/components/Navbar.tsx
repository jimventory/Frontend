import { Link } from "react-router-dom";
import "../stylesheets/Navbar.css";
import UserInformation from "./UserInformation";
import logo from "../images/abbvGrayOnDark.png";
import { useAuth0 } from "@auth0/auth0-react";



export default function Navbar() {
  const { user, isAuthenticated, isLoading } = useAuth0();


  return (
    <nav id="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="Short Streamline logo" />
      </Link>
      <ul>
        <li>
          <Link to="/about">A B O U T</Link>
        </li>
        {isAuthenticated && (
          <>
          <li>
            <Link to="/register">R E G I S T E R</Link>
          </li>
          <li>
            <Link to="/inventory">I N V E N T O R Y</Link>
          </li>
          </>
        )}
        <UserInformation />
      </ul>
    </nav>
  );
}
