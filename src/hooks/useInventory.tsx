import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Item } from "../abstractions/Item";
import { getFullPath, API_ROUTES } from "../apis/inventory";

interface useInventoryHookProps {
  setState: React.Dispatch<React.SetStateAction<Item[]>>;
}

export default function useInventory({ setState }: useInventoryHookProps) {
  const { getAccessTokenSilently } = useAuth0();

  // Arrow functions and their consequences have been a disaster for source code legibility.
  useEffect(() => {
    async function initializeInventory() {
      try {
        const accessToken = await getAccessTokenSilently();

        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const options = {
          method: "GET",
          headers: headers,
        };

        const response = await fetch(getFullPath(API_ROUTES.GET), options);

        if (response.ok === false)
          throw new Error("Failed to fetch inventory.");

        const data = await response.json();
        setState(data);
      } catch (e) {
        // Let's just alert the user we weren't able to fetch their existing inventory.
        // Don't update the state or anything.
        alert("Sorry, something went wrong when trying to load the inventory.");
      }
    }

    initializeInventory();
  }, [getAccessTokenSilently, setState]);
}
