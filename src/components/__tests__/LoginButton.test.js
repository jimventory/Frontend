import { render, screen, cleanup, waitFor } from "@testing-library/react";
import LoginButton from "../LoginButton"
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react");

describe("Login Button Component", () => {
  
  beforeEach(() =>{
    useAuth0.mockReturnValue({
      loginWithRedirect: jest.fn(),
    });
  });
  
  
  afterEach(() => {
      jest.clearAllMocks();
  });


  test("Test that the login button renders", () => {
    render(<LoginButton />);
    const login_button = screen.getByText(/Log In/);
    expect(login_button).toBeInTheDocument();
  });
  
  test("Test that the login button redirects to auth0 sign in page when clicked", async () => {
    const { loginWithRedirect } = useAuth0();

    render(<LoginButton />);
    
    const login_button = screen.getByText(/Log In/);
    login_button.click();
    
    await waitFor(() => expect(loginWithRedirect).toHaveBeenCalledTimes(1));

  });

});
