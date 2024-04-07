import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { InventoryContext } from "../contexts/InventoryContext";

export default function DeleteItemButton() {
    const { items, setItems, selectedItem, setSelectedItem } = useContext(InventoryContext);
    const { getAccessTokenSilently } = useAuth0();
    const inventoryApi = "https://localhost:7079/api/inventory/";
    
    async function handleDeleteItem() {
        if (selectedItem === null)
            return;

        if (window.confirm(`Are you sure you want to delete item ${selectedItem.name}?`) === false)
            return;

        try {
            const accessToken = await getAccessTokenSilently();

            const headers = {
                Authorization: `Bearer ${accessToken}`,
            };

            const options = {
                method: "DELETE",
                headers: headers,
            };

            const response = await fetch(`${inventoryApi}remove/${selectedItem.id}`, options);

            if (response.ok === false)
                throw new Error("Response status bad, failed to delete item.");

            // If execution reaches here, we successfully deleted the item on the backend.
            // Update our client-side inventory to reflect that.
    
            setItems(items.filter((item) => item.id !== selectedItem.id));
            setSelectedItem(null);

        } catch (e) {
            alert(`Something went wrong trying to delete item ${selectedItem.name}.  We apologize.`);
        }
    };

    return (
        <button onClick={handleDeleteItem} id="btn-delete-item">
          Delete Item
        </button>
    );
};
