import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react";
import DeleteItemButton from "../DeleteItemButton";
import { useAuth0 } from "@auth0/auth0-react";
import { InventoryContext } from '../../contexts/InventoryContext';

jest.mock("@auth0/auth0-react");

describe("Delete Button Component", () => {
  
  beforeEach(() => {
    useAuth0.mockReturnValue({
      getAccessTokenSilently: jest.fn(),
    });
  });
  
  afterEach(() => {
      jest.clearAllMocks();
  });

  test("Test that the Delete Item button renders", () => {
    render(<DeleteItemButton />);
    const _delete = screen.getByText(/Delete Item/);
    expect(_delete).toBeInTheDocument();
  });
  
  test("Test that the auth0 access token api is called and fetch is called when the button is clicked", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });
    global.alert = jest.fn(); 
    
    const mockItem = {id: 1, name: "test", quantity: 100, about: "test item"};
    const setItemsMock = jest.fn();
    const setSelectedItemMock = jest.fn();

    const { getByText } = render(
      <InventoryContext.Provider
        value={{
          items: [mockItem],
          setItems: setItemsMock,
          selectedItem: mockItem,
          setSelectedItem: setSelectedItemMock,
        }}>
      <DeleteItemButton item={mockItem} />
      </InventoryContext.Provider>
    ); 
    
    window.confirm = jest.fn().mockReturnValue(true);
    
    const delete_button = screen.getByText(/Delete Item/);
    
    fireEvent.click(delete_button);

    await waitFor(() => {
      expect(useAuth0().getAccessTokenSilently).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledTimes(1); 
    }); 
  });
  
  test("Test that delete item returns if the item is null", async () => {
    const mockItem = null;
    const setItemsMock = jest.fn(); 
    const setSelectedItemMock = jest.fn(); 
    
    const { getByText } = render(
      <InventoryContext.Provider
        value={{
          items: [mockItem],
          setItems: setItemsMock,
          selectedItem: mockItem,
          setSelectedItem: setSelectedItemMock, 
        }}>
      <DeleteItemButton item={mockItem} />
      </InventoryContext.Provider>
    ); 
    
    const delete_button = screen.getByText(/Delete Item/);
    fireEvent.click(delete_button);

    await waitFor(() => {
      expect(useAuth0().getAccessTokenSilently).toHaveBeenCalledTimes(0); 
    });

  });
});
