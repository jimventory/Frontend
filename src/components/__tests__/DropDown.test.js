import { render, screen, cleanup } from "@testing-library/react";
import DropDown from "../DropDown"

afterEach(() => {
  cleanup();
});

describe("Drop Down Menu Component", () => {
  test('render drop down menu with the username as Test and the Logout button', () => {
    render(<DropDown userName={"Test"}/>);
    const user = screen.getByText(/Test/);
    expect(user).toBeInTheDocument();

    const logoutButton = screen.getByText(/Log Out/);
    expect(logoutButton).toBeInTheDocument();
  });
  
  test('render drop down menu with the username as Test_1234! and the Logout button', () => {
    render(<DropDown userName={"Test_1234!"}/>);
    const user = screen.getByText(/Test_1234!/);
    expect(user).toBeInTheDocument();

    const logoutButton = screen.getByText(/Log Out/);
    expect(logoutButton).toBeInTheDocument();
  });

});
