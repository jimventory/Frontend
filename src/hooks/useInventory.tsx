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

        console.log(options);

        const response = await fetch(getFullPath(API_ROUTES.GET), options);

        console.log("Received response.");

        if (response.ok === false)
          throw new Error("Failed to fetch inventory.");

        console.log("Response was ok.");

        const data = await response.json();
        setState(data);

        console.log("useInventory hook has updated items via setState.");
      } catch (e) {
        // Let's just alert the user we weren't able to fetch their existing inventory.
        // Don't update the state or anything.
        alert("Sorry, something went wrong when trying to load the inventory.");
      }
    }

    initializeInventory();
  }, [getAccessTokenSilently, setState]);
}
