import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { Item } from "../abstractions/Item";
import { InventoryContext } from "../contexts/InventoryContext";

interface SaveItemChangesButtonProps {
  item: Item | null;
}

export default function SaveItemChangesButton({
  item,
}: SaveItemChangesButtonProps) {
  const { items, setItems, selectedItem, setSelectedItem } =
    useContext(InventoryContext);
  const { getAccessTokenSilently } = useAuth0();
  const inventoryApi = "https://localhost:7079/api/inventory/";

  async function handleSaveItemChanges() {
    if (item === null) return;

    if (item.id !== selectedItem.id) return;

    try {
      const accessToken = await getAccessTokenSilently();

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const options = {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(item),
      };

      const response = await fetch(`${inventoryApi}update`, options);

      if (response.ok === false) throw new Error("Failed to update item.");

      // If execution reaches this point, we successfully updated the item on the backend.
      // Update our client side inventory to reflect the update.

      setItems(items.map((it) => (it.id === selectedItem.id ? item : it)));
    } catch (e) {
      alert(
        `Something went wrong trying to update item ${selectedItem.name}.  We apologize`,
      );
    }
  }

  return (
    <button onClick={handleSaveItemChanges} id="btn-save-item">
      Save Item
    </button>
  );
}
