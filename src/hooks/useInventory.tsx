import { useState, useEffect } from 'react';
import { Item } from "../abstractions/Item"
import useAccessToken from './useAccessToken';
import useBusinessId from './useBusinessId';

export default function useInventory() {
    const [items, setItems] = useState<Item[]>([]);
    const businessId = useBusinessId();
    const accessToken = useAccessToken();
    const api = "https://localhost:7079/api/inventory/getInventory";

    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        const options = {
            method: "GET",
            headers: headers,    
        };

        fetch(api, options)
        .then((response) => response.json())
        .then((data) => {
            if (data === null)
                return;

            setItems(data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [businessId, accessToken]);

    return items;
};
