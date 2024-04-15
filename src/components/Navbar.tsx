import { Link } from "react-router-dom";
import "../stylesheets/Navbar.css";
import UserInformation from "./UserInformation";
import logo from "../images/abbvGrayOnDark.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { getFullPath, API_ROUTES } from "../apis/business";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isBusinessRegistered, setIsBusinessRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function businessCheck() {
      try {
        const accessToken = await getAccessTokenSilently();
    
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
    
        const options = {
          method: "GET",
          headers: headers,
        };
    
        const response = await fetch(getFullPath(API_ROUTES.IS_REGISTERED), options);
    
        if (response.ok) {
          console.log("Business is registered");
          return true;
        } else {
          console.log("Business is not registered");
          return false;
        }
      } catch (error) {
        console.error("Error occurred while checking business registration:", error);
        return false;
      }
    }

    async function businessSetAndNavigate() {
      try {
        if(isAuthenticated) {
          const isRegistered = await businessCheck();
          setIsBusinessRegistered(isRegistered);
          console.log(isRegistered);
          if (isRegistered) {
            navigate("/inventory");
          } else {
            navigate("/register");
          }
        }
      } catch (error) {
        console.error("Error occurred while redirecting based on business:", error);
      }
    }

    businessSetAndNavigate();
  }, [isAuthenticated, getAccessTokenSilently, navigate]);

  return (
    <nav id="navbar">
      <div className="left-side">
        <Link to="/" className="logo">
          <img src={logo} alt="Short Streamline logo" />
        </Link>
      </div>
      <div className="right-side">
        <ul>
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/about">A B O U T</Link>
              </li>

            </>
          )}

          {isAuthenticated && (
            <>
              {!isBusinessRegistered && (
                <li>
                  <Link to="/register">R E G I S T E R</Link>
                </li>
              )}
              {isBusinessRegistered && (
                <li>
                  <Link to="/inventory">I N V E N T O R Y</Link>
                </li>
              )}
            </>
          )}

          <li>
            <UserInformation />
          </li>
        </ul>
      </div>
    </nav>
  );
}
