import { useContext, useEffect, useState } from "react";
import { Item } from "../abstractions/Item";
import { InventoryContext } from "../contexts/InventoryContext";
import DeleteItemButton from "./DeleteItemButton";
import ItemImage from "./ItemImage";
import SaveItemChangesButton from "./SaveItemChangesButton";

export default function ItemDetails() {
  const { selectedItem } = useContext(InventoryContext);
  const [tempItem, setTempItem] = useState<Item | null>(null);

  useEffect(() => {
    if (selectedItem === null) return;

    const copiedItem: Item = { ...selectedItem };
    setTempItem(copiedItem);
  }, [selectedItem]);

  if (selectedItem === null || tempItem === null) {
    return <div></div>;
  }

  function handleInputAboutChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (tempItem === null) return;

    const modifiedObject = { ...tempItem };

    modifiedObject.about = event.target.value;
    setTempItem(modifiedObject);
  }

  function setItemPrice(price: number) {
    if (tempItem === null) return;

    const modifiedObject = { ...tempItem };

    modifiedObject.price = price;
    setTempItem(modifiedObject);
  }

  function setItemQuantity(quantity: number) {
    console.log("setItemQuantity called");
    if (tempItem === null) return;

    console.log("not null");

    const modifiedObject = { ...tempItem };

    modifiedObject.quantity = quantity;
    setTempItem(modifiedObject);

    console.log("updated qty");
  }

  return (
    <div id="item-details">
      <h1>Item Details</h1>
      <p>Selected Item: {tempItem.name}</p>
      <div>
        <div>
          <p>About:</p>
          <p>ID: {tempItem.id}</p>
          <input
            type="text"
            value={tempItem.about}
            onChange={handleInputAboutChange}
            placeholder="Enter Item Info"
            className="input-item-about"
          />
        </div>
        <ItemImage tempItem={tempItem} setTempItem={setTempItem}/>
      </div>
      <div>
        <h3>Price: {tempItem.price}</h3>
        <h3>Quantity: {tempItem.quantity}</h3>
      </div>
      <div>
        <label>
          Price:
          <input
            type="number"
            value={tempItem.price}
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
            value={tempItem.quantity}
            onChange={(e) => setItemQuantity(parseInt(e.target.value))}
            className="input-item-quantity"
          />
        </label>
      </div>
      <SaveItemChangesButton item={tempItem} />
      <DeleteItemButton />
    </div>
  );
}
