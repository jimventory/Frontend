import { Dispatch, SetStateAction, createContext } from "react";
import { Item } from "../abstractions/Item";

const emptyArray: Item[] = [];
let nullItem: any;

const noItemArraySetter: Dispatch<SetStateAction<Item[]>> = (
  value: SetStateAction<Item[]>,
) => {
  console.log(
    `No setter has been set.  A setter was called with new value ${value} but it will not be saved.`,
  );
};

const noItemSetter: Dispatch<SetStateAction<Item | null>> = (
  value: SetStateAction<Item | null>,
) => {
  console.log(
    `No setter has been set.  A setter was called with new value ${value} but it will not be saved.`,
  );
};

export const InventoryContext = createContext({
  items: emptyArray,
  setItems: noItemArraySetter,
  selectedItem: nullItem,
  setSelectedItem: noItemSetter,
});
