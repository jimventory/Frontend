import { Link } from "react-router-dom";
import "../stylesheets/Navbar.css";
import UserInformation from "./UserInformation";
import logo from "../images/darkLogo.png";

export default function Navbar() {
  return (
    <nav id="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="Streamline logo" />
      </Link>
      <ul>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/register">Register Business</Link>
        </li>
        <UserInformation />
      </ul>
    </nav>
  );
}
