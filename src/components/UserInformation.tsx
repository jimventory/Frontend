import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import "../stylesheets/UserInformation.css";
import LoadingScreen from "./LoadingScreen";

export default function UserInformation() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    (isAuthenticated && (
      <div className="user-info">{user?.name?.split("@")[0]}</div>
    )) || <LoginButton />
  );
}
