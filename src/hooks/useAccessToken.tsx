import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export default function useAccessToken() {
    const { getAccessTokenSilently } = useAuth0();
    const [ token, setToken] = useState<string>();

    useEffect(() => {
       getAccessTokenSilently()
       .then((accessToken) => {
           setToken(accessToken);
       });
    }, [getAccessTokenSilently]);

    return token;
};
