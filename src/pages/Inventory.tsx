import React, { useState, useEffect } from "react";
import "../stylesheets/Inventory.css";
import { useAuth0 } from "@auth0/auth0-react";

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
  const hardCodedBusinessId = 10;
  const { user, getAccessTokenSilently } = useAuth0();

  const getToken = async () => {
    return await getAccessTokenSilently();
  };

  const getBusinessId = () => {
    if (user === null) return;

    if (user?.sub === undefined) return;

    const idString = user?.sub.split("|");
    const idNumString = idString[1].substring(idString[1].length - 8);

    const idNumUint = parseInt(idNumString, 16);
    return idNumUint;
  };

  useEffect(() => {
    getToken().then((accessToken) => {
      fetch(`${inventoryApi}getInventory`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data === null) return;
          setItems(data);
          console.log(items);
          console.log(typeof items);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);

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

  const handleAddItem = async () => {
    if (itemName.trim() !== "") {
      try {
        const newItem = {
          name: itemName,
          id: generateRandomId(),
          about: itemAbout,
          price: itemPrice,
          quantity: itemQuantity,
          businessId: getBusinessId(), // Set BusinessId to 10, just something random I picked till we get that part set up more
        };

        getToken().then(async (accessToken) => {
          const response = await fetch(`${inventoryApi}add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(newItem),
          });

          if (response.ok) {
            const createdItem = await response.json();
            setItems((prevItems) => [...prevItems, createdItem]);
            setItemName("");
            setItemAbout("");
            setItemPrice(0);
            setItemQuantity(0);
          } else {
            console.error("Failed to add item:", response.statusText);
          }
        });
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setItemId(item.id);
    setItemName(item.name);
    setItemAbout(item.about);
    setItemPrice(item.price);
    setItemQuantity(item.quantity);
  };

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

  return (
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
          <div>
            <input
              type="text"
              value={itemName}
              onChange={handleInputNameChange}
              placeholder="Enter Item Name"
              className="input-item-name"
            />
            <button onClick={handleAddItem} className="btn-add-item">
              Add Item
            </button>
          </div>
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
  );
}

interface Item {
  id: number;
  name: string;
  about: string;
  price: number;
  quantity: number;
}
