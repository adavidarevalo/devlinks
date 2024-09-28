import { render, screen, fireEvent } from "@testing-library/react";
import { useMediaQuery } from "@mui/material";
import { useLinks } from "../../../context/link";
import NavButton from "./nav_button";

// Mocking the context and useMediaQuery
jest.mock("../../../context/link", () => ({
  useLinks: jest.fn(),
}));

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useMediaQuery: jest.fn(),
}));

describe("NavButton Component", () => {
  const mockSetView = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    (useLinks as jest.Mock).mockReturnValue({
      view: "links", // Initial view
      setView: mockSetView, // Mock implementation
    });
  });

  it("renders correctly in mobile view", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true); // Simulate mobile view
    render(<NavButton icon={<span>🔗</span>} name="links" label="Links" />);

    // Check if IconButton is rendered
    const iconButton = screen.getByRole("button"); // Get the IconButton
    expect(iconButton).toBeInTheDocument();
    expect(iconButton).toHaveStyle("color: #8338EC"); // Active view style

    // Click the button and check if setView is called
    fireEvent.click(iconButton);
    expect(mockSetView).toHaveBeenCalledWith("links");
  });

  it("renders correctly in desktop view", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false); // Simulate desktop view
    render(<NavButton icon={<span>🔗</span>} name="links" label="Links" />);

    // Check if Button is rendered
    const button = screen.getByRole("button", { name: /Links/i }); // Use regex to match the name
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle("color: #8338EC"); // Active view style

    // Click the button and check if setView is called
    fireEvent.click(button);
    expect(mockSetView).toHaveBeenCalledWith("links");
  });

  it("renders correctly with different views", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false); // Simulate desktop view
    (useLinks as jest.Mock).mockReturnValue({
      view: "profile", // Set a different initial view
      setView: mockSetView,
    });

    render(<NavButton icon={<span>🔗</span>} name="links" label="Links" />);

    // Button should have different styles since view is different
    const button = screen.getByRole("button", { name: /Links/i }); // Use regex to match the name
    expect(button).toHaveStyle("color: rgb(131, 56, 236)"); // Inactive view style

    // Click the button and check if setView is called
    fireEvent.click(button);
    expect(mockSetView).toHaveBeenCalledWith("links");
  });
});
