import { useState } from "react";
import "../stylesheets/Inventory.css";
import useInventory from "../hooks/useInventory";
import { InventoryContext } from "../contexts/InventoryContext";
import InventoryList from "../components/InventoryList";
import ItemDetails from "../components/ItemDetails";
import { Item } from "../abstractions/Item";

export default function InventoryManagement() {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useInventory({ setState: setItems });

  return (
    <InventoryContext.Provider
      value={{ items, setItems, selectedItem, setSelectedItem }}
    >
      <div id="inventory-container">
        <InventoryList />
        <ItemDetails />
        <div id="sales">
          <h3>Sales?</h3>
        </div>
      </div>
    </InventoryContext.Provider>
  );
}
