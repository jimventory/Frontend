import React, { useState, useEffect } from "react";
import "../stylesheets/Inventory.css";
import useInventory from "../hooks/useInventory";
import { InventoryContext } from "../contexts/InventoryContext";
import AddItemButton from "../components/AddItemButton";

// used for temp unique item ids
const generateRandomId = () => {
  return Math.floor(Math.random() * 1000000);
};

export default function InventoryManagement() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [itemName, setItemName] = useState<string>("");
  const [itemAbout, setItemAbout] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<number>(0.0);
  const [itemQuantity, setItemQuantity] = useState<number>(0);
  const [itemId, setItemId] = useState<number | null>(null);
  const inventoryApi = "https://localhost:7079/api/inventory/";

  useInventory({setState : setItems});

  const handleInputNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setItemName(event.target.value);
  };

  const handleInputAboutChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setItemAbout(event.target.value);
  };
 
 const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setItemId(item.id);
    setItemName(item.name);
    setItemAbout(item.about);
    setItemPrice(item.price);
    setItemQuantity(item.quantity);
  };

  const handleAddItem = async () => {};
  const handleDeleteItem = async () => {};
  const handleSaveItem = async () => {};
/*
  const handleSaveItem = async () => {
    if (selectedItem) {
      try {
        const updatedItem = selectedItem;
        updatedItem.price = itemPrice;
        updatedItem.quantity = itemQuantity;

        getToken().then(async (accessToken) => {
          const response = await fetch(`${inventoryApi}update/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(updatedItem),
          });

          if (response.ok) {
            // Update item in the local state
            setItems(
              items.map((item) =>
                item.id === selectedItem.id
                  ? { ...item, price: itemPrice, quantity: itemQuantity }
                  : item,
              ),
            );
            alert("Item saved successfully!");
          } else {
            console.error("Failed to save item:", response.statusText);
          }
        });
      } catch (error) {
        console.error("Error saving item:", error);
      }
    }
  };

  const handleDeleteItem = async () => {
    if (selectedItem) {
      if (window.confirm("Are you sure you want to delete this item?")) {
        try {
          getToken().then(async (accessToken) => {
            const response = await fetch(`${inventoryApi}remove/${itemId}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            if (response.ok) {
              setItems(items.filter((item) => item.id !== itemId));
              setSelectedItem(null);
              setItemId(null); // Reset itemId
            } else {
              console.error("Failed to delete item:", response.statusText);
            }
          });
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      }
    }
  };
*/
  return (
  <InventoryContext.Provider value={{items, setItems}}>
    <div id="inventory-container">
      <div id="inventory-list-container">
        <div id="inventory-list">
          <h1>Inventory List</h1>
          <ul>
            {items.map((item, index) => (
              <li key={index} onClick={() => handleItemClick(item)}>
                {item.name}
              </li>
            ))}
          </ul>
          <AddItemButton/>
        </div>
      </div>
      <div id="item-details">
        <h1>Item Details</h1>
        {selectedItem && <p>Selected Item: {selectedItem.name}</p>}
        <div>
          <div>
            <p>About:</p>
            <p>ID: {itemId}</p>
            <input
              type="text"
              value={itemAbout}
              onChange={handleInputAboutChange}
              placeholder="Enter Item Info"
              className="input-item-about"
            />
          </div>
          <img src="https://via.placeholder.com/150" alt="Item Placeholder" />
        </div>
        <div>
          <h3>Price: {itemPrice}</h3>
          <h3>Quantity: {itemQuantity}</h3>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              value={itemPrice}
              onChange={(e) => setItemPrice(parseFloat(e.target.value))}
              className="input-item-price"
            />
          </label>
        </div>
        <div>
          <label>
            Quantity:
            <input
              type="number"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(parseInt(e.target.value))}
              className="input-item-quantity"
            />
          </label>
        </div>
        <button onClick={handleSaveItem} id="btn-save-item">
          Save Item
        </button>
        <button onClick={handleDeleteItem} id="btn-delete-item">
          Delete Item
        </button>
      </div>
      <div id="sales">
        <h3>Sales?</h3>
      </div>
    </div>
    </InventoryContext.Provider>
  );
}

interface Item {
  id: number;
  name: string;
  about: string;
  price: number;
  quantity: number;
}
