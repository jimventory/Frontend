import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";
import { InventoryContext } from "../contexts/InventoryContext";

export default function AddItem() {
  const { getAccessTokenSilently} = useAuth0();
  const { setItems } = useContext(InventoryContext);
  const [itemName, setItemName] = useState<string>("");
  const inventoryApi = "https://localhost:7079/inventory";
  const apiEndpoint = "/add";

  const handleInputNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setItemName(event.target.value);
  };

  async function addItem() {
    try {
        if (itemName === "")
            return;

        const accessToken = await getAccessTokenSilently();
        
        const newItem = { name: itemName };

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        };

        const options = {
          method: "POST",
          headers: headers,
          body: JSON.stringify(newItem),
        };

        const response = await fetch(`${inventoryApi}+${apiEndpoint}`, options);

        if (response.ok === false)
            throw new Error("Response status bad, failed to add item.")

        const returnedItem = await response.json();
        setItems((prevItems) => [...prevItems, returnedItem]);
        setItemName("");
    } catch (e) {
      alert("Something went wrong while trying to add your item.  Your changes were not saved.  We apologize.");
    }
  };

  return (
  <div>
            <input
              type="text"
              value={itemName}
              onChange={handleInputNameChange}
              placeholder="Enter Item Name"
              className="input-item-name"
            />
            <button onClick={addItem} className="btn-add-item">
              Add Item
            </button>
  </div>
  );

};
