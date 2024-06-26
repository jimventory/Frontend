import { useContext } from "react";
import { InventoryContext } from "../contexts/InventoryContext";
import AddItemButton from "./AddItemButton";
import ItemUpload from "./ItemUpload";

export default function InventoryList() {
  const { items, setSelectedItem } = useContext(InventoryContext);

  return (
    <div id="inventory-list">
      <h1>Inventory List</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => setSelectedItem(item)} className={item.quantity === 0 ? 'lowStock' : ''}>
            {item.name}
          </li>
        ))}
      </ul>
      <AddItemButton />
      <ItemUpload/>
    </div>
  );
}
