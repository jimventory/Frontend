import { useAuth0 } from "@auth0/auth0-react";

export default function useBusinessId() {
  const { user } = useAuth0();
  try { 
  if (user === null) throw new Error("User object is null");

  if (user?.sub === undefined) throw new Error("user.sub is undefined");

  if (user?.sub === null) throw new Error("user.sub is null");

  const userIdString = user.sub.split("|");
  const userNumString = userIdString[1].substring(userIdString[1].length - 8);
  const userIdNum = parseInt(userNumString, 16);

  return userIdNum;
  } catch (e) {
    console.log("Failed to get business Id.");
    return null;
  }
}
