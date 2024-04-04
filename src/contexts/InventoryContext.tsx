import { Dispatch, SetStateAction, createContext } from "react";
import { Item } from "../abstractions/Item";

const emptyArray: Item[] = [];

const noSetter: Dispatch<SetStateAction<Item[]>> = (value: SetStateAction<Item[]>) => {
    console.log(`No setter has been set.  A setter was called with new value ${value} but it will not be saved.`);
};

export const InventoryContext = createContext({items: emptyArray, setItems: noSetter});
