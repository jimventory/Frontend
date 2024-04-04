import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
// import { Item } from "../abstractions/Item"

interface Item {
  id: number;
  name: string;
  about: string;
  price: number;
  quantity: number;
}

export default function useInventory() {
    const { getAccessTokenSilently } = useAuth0();
    const [items, setItems] = useState<Item[]>([]);
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

            console.log(response);

            const data = await response.json();
            setItems(data);

            console.log(`Set items to be ${data}`);
            console.log(items);
        };

        initializeInventory();
    }, [getAccessTokenSilently]);

    return items;
};
