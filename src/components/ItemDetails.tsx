import { useContext, useEffect, useState } from "react";
import { Item } from "../abstractions/Item";
import { InventoryContext } from "../contexts/InventoryContext";
import DeleteItemButton from "./DeleteItemButton";
import SaveItemChangesButton from "./SaveItemChangesButton";

export default function ItemDetails() {
    const { selectedItem } = useContext(InventoryContext);
    const [ copyItem, setCopyItem ] = useState<Item | null>(null);

    useEffect(() => {
        if (selectedItem === null)
            return;

        const copiedItem: Item = { ...selectedItem };
        setCopyItem(copiedItem);
    }, [selectedItem]);

    if (selectedItem === null) {
        return (
            <div></div>
        );
    }

    function handleInputAboutChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (copyItem === null)
            return;

        copyItem.about = event.target.value;
        setCopyItem(copyItem);
    };
    
    function setItemPrice(price: number) {
        if (copyItem === null)
            return;

        copyItem.price = price;
        setCopyItem(copyItem);
    };
    
    function setItemQuantity(quantity: number) {
        if (copyItem === null)
            return;

        copyItem.quantity = quantity;
        setCopyItem(copyItem);
    };

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
       <SaveItemChangesButton item={copyItem}/>
       <DeleteItemButton/>
      </div>
      );
}
