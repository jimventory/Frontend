import { useContext } from "react";
import { Item } from "../abstractions/Item";
import { InventoryContext } from "../contexts/InventoryContext";

export default function ItemDetails() {
    const { selectedItem, setSelectedItem } = useContext(InventoryContext);

    if (selectedItem === null) {
        return (
            <div></div>
        );
    }

    // Delete -- just to make errors go away while refactoring.
    function handleSaveItem(e: any) { };
    function handleDeleteItem(e: any) { };
    function handleInputAboutChange(e: any) { };
    function setItemPrice(e: any) { };
    function setItemQuantity(e: any) { };

    return (
      <div id="item-details">
        <h1>Item Details</h1>
        <p>Selected Item: {selectedItem.name}</p>
        <div>
          <div>
            <p>About:</p>
            <p>ID: {selectedItem.id}</p>
            <input
              type="text"
              value={selectedItem.about}
              onChange={handleInputAboutChange}
              placeholder="Enter Item Info"
              className="input-item-about"
            />
          </div>
          <img src="https://via.placeholder.com/150" alt="Item Placeholder" />
        </div>
        <div>
          <h3>Price: {selectedItem.price}</h3>
          <h3>Quantity: {selectedItem.quantity}</h3>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              value={selectedItem.price}
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
              value={selectedItem.quantity}
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
      );
}
