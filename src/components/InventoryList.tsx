import { useContext } from "react";
import { InventoryContext } from "../contexts/InventoryContext";
import AddItemButton from "./AddItemButton";
import SearchBar from "./SearchBar";

export default function InventoryList() {
  const { items, setSelectedItem } = useContext(InventoryContext);

  return (
    <div id="inventory-list">
      <h1>Inventory List</h1>
      <SearchBar/>
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => setSelectedItem(item)}>
            {item.name}
          </li>
        ))}
      </ul>
      <AddItemButton />
    </div>
  );
}
