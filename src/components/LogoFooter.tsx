import logo from "../images/grayOnBlack.png";
import "../stylesheets/LogoFooter.css";

export default function LogoFooter() {
  return (
    <footer className="logo-footer">
      <div>
        <img src={logo} className="footer-pic" alt="Shortened logo, S L"/>
      </div>
      <div>
        <p>&copy; 2024</p>
      </div>
    </footer>
  );
}