import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"
export default function TestAuthPage() {
    const { getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        const getToken = async () => { return await getAccessTokenSilently(); };
        getToken()
        .then(accessToken => {
            console.log(accessToken);

            const privateApi = "https://localhost:7079/api/inventory/private";

            fetch(privateApi, {
                method: "GET",
                headers: {
                "Authorization": `Bearer ${accessToken}`
                }
            })
            .then(response => response.text())
            .then(data => {
                alert(data);
            });
        });
    }, [getAccessTokenSilently]);

    return (<div> Test Auth Page </div>);
};
