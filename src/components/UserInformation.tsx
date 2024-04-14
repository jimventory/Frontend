import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import "../stylesheets/UserInformation.css";
import LoadingScreen from "./LoadingScreen";
import DropDown from "./DropDown";

export default function UserInformation() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    (isAuthenticated && (
      <DropDown userName={user?.name?.split("@")[0] as string } />
    )) || <LoginButton />
  );
}
