import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export default function useAccessToken() {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    getAccessTokenSilently().then((accessToken) => {
      console.log(`Set token to be ${accessToken}`);
      setToken(accessToken);
    });
  }, [getAccessTokenSilently]);

  return token;
}
