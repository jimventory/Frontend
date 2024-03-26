import { Link } from "react-router-dom";
import "../stylesheets/Navbar.css";
import UserInformation from "./UserInformation";
import logo from "../images/abbvGrayOnDark.png";

export default function Navbar() {
  return (
    <nav id="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="Short Streamline logo" />
      </Link>
      <ul>
        <li>
            <Link to="/authTest">TestAuth</Link>
        </li>
        <li>
          <Link to="/about">A B O U T</Link>
        </li>
        <li>
          <Link to="/register">R E G I S T E R</Link>
        </li>
        <li>
          <Link to="/inventory">I N V E N T O R Y</Link>
        </li>
        <UserInformation />
      </ul>
    </nav>
  );
}
