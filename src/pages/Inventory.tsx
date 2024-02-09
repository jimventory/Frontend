import React, { useState } from "react";
import "../stylesheets/Inventory.css";

export default function InventoryManagement() {
  const [items, setItems] = useState<string[]>(["Item 1", "Item 2", "Item 3"]); // Hardcoded test values
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [itemName, setItemName] = useState<string>("");
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [itemQuantity, setItemQuantity] = useState<number>(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
  };

  const handleAddItem = () => {
    if (itemName.trim() !== "") {
      setItems([...items, itemName]);
      setItemName("");
      // Reset price and quantity when adding a new item
      setItemPrice(0);
      setItemQuantity(0);
    }
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const handleSaveItem = () => {
    if (selectedItem) {
      // back end integration to go here to save item
    }
  };

  const handleDeleteItem = () => {
    if (selectedItem) {
      // back end integration to go here to save item
      alert("You sure?")
    }
  };

  return (
    <div className="inventory-container">
      <div className="inventory-list-container">
        <div className="inventory-list">
          <h1>Inventory List</h1>
          <ul>
            {items.map((item, index) => (
              <li key={index} onClick={() => handleItemClick(item)}>
                {item}
              </li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              value={itemName}
              onChange={handleInputChange}
              placeholder="Enter Item Name"
              className="input-item-name"
            />
            <button onClick={handleAddItem} className="btn-add-item">
              Add Item
            </button>
          </div>
        </div>
      </div>
      <div className="item-details">
        <h1>Item Details</h1>
        {selectedItem && <p>Selected Item: {selectedItem}</p>}
        <div>
          <div>
            <p>About?:</p>
            <input
                type="text"
                value={itemName}
                onChange={handleInputChange}
                placeholder="Enter Item Info"
                className="input-item-about"
              />
          </div>
          <img src="https://via.placeholder.com/150" alt="Item Placeholder" />
        </div>
        <div>
          <h3>ID: </h3>
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
        <button onClick={handleSaveItem} className="btn-save-item">
          Save Item
        </button>
        <button onClick={handleDeleteItem} className="btn-save-item">
          Delete Item
        </button>
      </div>
      <div className="sales">
        <h3>Sales?</h3>
      </div>
    </div>
  );
}
