import React, { useState, ChangeEvent    } from 'react';


export default function InventoryManagement() {
    const [items, setItems] = useState<string[]>(['Item 1', 'Item 2', 'Item 3']); // Hardcoded test values
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [itemName, setItemName] = useState<string>('');
  const [itemPrice, setItemPrice] = useState<number>(0); // Added state for item price
  const [itemQuantity, setItemQuantity] = useState<number>(0); // Added state for item quantity

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(event.target.value);
  };

  const handleAddItem = () => {
    if (itemName.trim() !== '') {
      setItems([...items, itemName]);
      setItemName('');
      // Reset price and quantity when adding a new item
      setItemPrice(0);
      setItemQuantity(0);
    }
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '50%' }}>
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
          />
          <button onClick={handleAddItem}>Add Item</button>
        </div>
      </div>
      <div style={{ width: '50%' }}>
        <h1>Item Details</h1>
        {selectedItem && <p>Selected Item: {selectedItem}</p>}
        {/* Display additional item details here */}
        <div>
          <h2>Item Picture</h2>
          {/* Placeholder for item picture */}
          <img src="https://via.placeholder.com/150" alt="Item Placeholder" />
        </div>
        <div>
          <h3>ID: </h3>
          <h3>Price: {itemPrice}</h3> {/* Display item price */}
          <h3>Quantity: {itemQuantity}</h3> {/* Display item quantity */}
        </div>
        {/* Input fields for price and quantity */}
        <div>
          <label>
            Price:
            <input
              type="number"
              value={itemPrice}
              onChange={(e) => setItemPrice(parseInt(e.target.value))}
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
            />
          </label>
        </div>
      </div>
    </div>
  );
  }