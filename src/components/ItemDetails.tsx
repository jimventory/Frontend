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

    if (selectedItem === null || copyItem === null) {
        return (
            <div></div>
        );
    }

    function handleInputAboutChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (copyItem === null)
            return;

        const modifiedObject = { ...copyItem };

        modifiedObject.about = event.target.value;
        setCopyItem(modifiedObject);
    };
    
    function setItemPrice(price: number) {
        if (copyItem === null)
            return;

        const modifiedObject = { ...copyItem };
        
        modifiedObject.price = price;
        setCopyItem(modifiedObject);
    };
    
    function setItemQuantity(quantity: number) {
        console.log('setItemQuantity called');
        if (copyItem === null)
            return;

        console.log('not null');

        const modifiedObject = { ...copyItem };
        
        modifiedObject.quantity = quantity;
        setCopyItem(modifiedObject);

        console.log('updated qty');
    };

    return (
      <div id="item-details">
        <h1>Item Details</h1>
        <p>Selected Item: {copyItem.name}</p>
        <div>
          <div>
            <p>About:</p>
            <p>ID: {copyItem.id}</p>
            <input
              type="text"
              value={copyItem.about}
              onChange={handleInputAboutChange}
              placeholder="Enter Item Info"
              className="input-item-about"
            />
          </div>
          <img src="https://via.placeholder.com/150" alt="Item Placeholder" />
        </div>
        <div>
          <h3>Price: {copyItem.price}</h3>
          <h3>Quantity: {copyItem.quantity}</h3>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              value={copyItem.price}
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
              value={copyItem.quantity}
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
