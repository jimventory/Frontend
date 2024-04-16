import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react";
import SaveItemChangesButton from "../SaveItemChangesButton";
import { useAuth0 } from "@auth0/auth0-react";
import { InventoryContext } from '../../contexts/InventoryContext';
jest.mock("@auth0/auth0-react");

describe("Save Item Changes Button Component", () => {
  
  beforeEach(() => {
    useAuth0.mockReturnValue({
      getAccessTokenSilently: jest.fn(),
    });
  });
  
  afterEach(() => {
      jest.clearAllMocks();
  });

  test("Test that the Save Item Changes button renders", () => {
    render(<SaveItemChangesButton />);
    const save = screen.getByText(/Save Item/);
    expect(save).toBeInTheDocument();
  });
  
  test("Test that the auth0 access token api is called and fetch is called when the button is clicked", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });
    global.alert = jest.fn(); 
    
    const mockItem = {id: 1, name: "test", quantity: 100, about: "test item"};
    const setItemsMock = jest.fn();

    const { getByText } = render(
      <InventoryContext.Provider
        value={{
          items: [mockItem],
          setItems: setItemsMock,
          selectedItem: mockItem,
        }}>
      <SaveItemChangesButton item={mockItem} />
      </InventoryContext.Provider>
    ); 
    
    const save_button = screen.getByText(/Save Item/);
    fireEvent.click(save_button);

    await waitFor(() => {
      expect(useAuth0().getAccessTokenSilently).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledTimes(1); 
    }); 
  });
  
  test("Test that add item returns if the item is null", async () => {
    const mockItem = null;
    const setItemsMock = jest.fn(); 
    const { getByText } = render(
      <InventoryContext.Provider
        value={{
          items: [mockItem],
          setItems: setItemsMock,
          selectedItem: mockItem,
        }}>
      <SaveItemChangesButton item={mockItem} />
      </InventoryContext.Provider>
    ); 
    
    const save_button = screen.getByText(/Save Item/);
    fireEvent.click(save_button);

    await waitFor(() => {
      expect(useAuth0().getAccessTokenSilently).toHaveBeenCalledTimes(0); 
    });

  });
});
