import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"
export default function TestAuthPage() {
    const { getAccessTokenSilently} = useAuth0();

    useEffect(() => {
        const getToken = async () => { return await getAccessTokenSilently(); };
//        const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRQczFiMS12NVdibU5MZzhPa0lkLSJ9.eyJpc3MiOiJodHRwczovL2Rldi04NXBlb25mZXc4c3l2M2l0LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJGMHhyWXd2RjduNTlMNlhJeWVTVFg0WkZESDQ2QmJ0YkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzA3OS9hcGkiLCJpYXQiOjE3MTE0ODE4ODQsImV4cCI6MTcxMTU2ODI4NCwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXpwIjoiRjB4cll3dkY3bjU5TDZYSXllU1RYNFpGREg0NkJidGIifQ.kxoScvaYs0rjYSzQeQCfnFAOCIvIpZsAkZJSjcngOWOecRBRTcrRR_h_kNLd3mJpE2481OgRqvESMd7S4apZGebCWLLTVQkY2zGZBNx-Wfj8P_7VmpGuzILB5zK-9a_SgIGkw-Psl2YqG_Uad0JAefn8TrpCJD9624JceZeKtDbhKZ932hIBW3JgjEe5LCcEBFprS7snGdkbYe3DYQclXYHk4ZQpnwMRbwmuwLOTNZ6Fr67MZHuFZTfMuPmEVRz0d_e42fFiFp9mPQEJWiIhCH9HYP1JPHKjFxIuBeO0ecTvf6mbR-addZ14bO_YmLHfB5t6kciy4ldPhgPuBb92ow";
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
