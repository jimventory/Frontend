import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react";
import AddItemButton from "../AddItemButton"
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react");

describe("Add Item Button Component", () => {
  
  beforeEach(() => {
    useAuth0.mockReturnValue({
      getAccessTokenSilently: jest.fn(),
    });
  });
  
  afterEach(() => {
      jest.clearAllMocks();
  });

  test("Test that the Add Item button renders", () => {
    render(<AddItemButton />);
    const add = screen.getByText(/Add Item/);
    expect(add).toBeInTheDocument();
  });
  
  test("Test that the auth0 access token api is called", async () => {
        
    render(<AddItemButton />);
  
    const itemNameInput = screen.getByPlaceholderText("Enter Item Name");
    fireEvent.change(itemNameInput, { target: { value: "Test Item" } });
    
    const add_button = screen.getByText(/Add Item/);
    fireEvent.click(add_button);
    console.log("click");
    await waitFor(() => {expect(useAuth0().getAccessTokenSilently).toHaveBeenCalled();}); 
  });

});
