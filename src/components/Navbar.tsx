import { Link } from 'react-router-dom';
import '../stylesheets/Navbar.css';

export default function Navbar() {
    return (
        <nav id="navbar">
            <Link to="/"><h1>Streamline</h1></Link>
            <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/register">Register Business</Link></li>
                <li><Link to="manageUsers">User Management</Link></li>
            </ul>
        </nav>
    );
}