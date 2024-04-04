import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { Item } from "../abstractions/Item"

interface useInventoryHookProps {
    setState: React.Dispatch<React.SetStateAction<Item[]>>;
}

export default function useInventory( {setState} : useInventoryHookProps) {
    const { getAccessTokenSilently } = useAuth0();
    const api = "https://localhost:7079/api/inventory/getInventory";

    useEffect(() => {
        async function initializeInventory() {
            const accessToken = await getAccessTokenSilently(); 
            
            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };

            const options = {
                method: "GET",
                headers: headers,    
            };

            console.log(options);

            const response = await fetch(api, options);

            console.log("Received response.");

            if (response.ok === false)
                throw new Error("Failed to fetch inventory.")

            console.log("Response was ok.");

            const data = await response.json();
            setState(data);

            console.log("useInventory hook has updated items via setState.");
        };

        initializeInventory();
    }, [getAccessTokenSilently, setState]);
};
