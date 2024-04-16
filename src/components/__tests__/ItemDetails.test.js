import { render, screen, cleanup } from "@testing-library/react";
import ItemDetails from "../ItemDetails";
import { InventoryContext } from "../../contexts/InventoryContext";
afterEach(() => {
  cleanup();
});

describe("Item Details", () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Display item, Sams Club Pretzel, correctly", () => {
    const mockItem = {
      id: 1, 
      name: "Sams club Pretzel",
      about: "cinnamon pretzel",
      price: 1.99,
      quantity: 100,
    };

    const contextValue = {selectedItem: mockItem, setSelectedItem: () => {}};

    const { getByText } = render(
      <InventoryContext.Provider value={contextValue}>
        <ItemDetails />
      </InventoryContext.Provider>
     );

    expect(screen.getByText(/ID: 1/)).toBeInTheDocument();
    expect(screen.getByText(/Sams club Pretzel/)).toBeInTheDocument();
    expect(screen.getByDisplayValue("cinnamon pretzel")).toBeInTheDocument();
    expect(screen.getByDisplayValue(1.99)).toBeInTheDocument();
    expect(screen.getByDisplayValue(100)).toBeInTheDocument();

  });
  
});
