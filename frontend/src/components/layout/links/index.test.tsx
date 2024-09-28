import * as React from "react";
import { render } from "@testing-library/react";
import CustomizeLinksLayout from ".";

// Mock the Header and PhonePreview components
jest.mock("./header", () => () => <div data-testid="header">Header</div>);
jest.mock("./phonePreview", () => () => <div data-testid="phone-preview">Phone Preview</div>);

describe("CustomizeLinksLayout Component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <CustomizeLinksLayout>
        <div>Child Component</div>
      </CustomizeLinksLayout>
    );

    expect(getByText("Child Component")).toBeInTheDocument();
  });

  it("renders Header and PhonePreview components", () => {
    const { getByTestId } = render(
      <CustomizeLinksLayout>
        <div>Child Component</div>
      </CustomizeLinksLayout>
    );

    expect(getByTestId("header")).toBeInTheDocument();
    expect(getByTestId("phone-preview")).toBeInTheDocument();
  });

  it("applies responsive styles correctly", () => {
    // Mock matchMedia to simulate a mobile viewport
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === "(max-width:890px)",
      media: "",
      onchange: null,
      addListener: jest.fn(), // for older browsers
      removeListener: jest.fn(), // for older browsers
      addEventListener: jest.fn(), // for modern browsers
      removeEventListener: jest.fn(), // for modern browsers
    }));

    const { getByTestId } = render(
      <CustomizeLinksLayout>
        <div>Child Component</div>
      </CustomizeLinksLayout>
    );

    // Check if PhonePreview is hidden on mobile
    expect(getByTestId("phone-preview")).not.toBeVisible();
  });

  it("renders PhonePreview on larger screens", () => {
    // Mock matchMedia to simulate a larger viewport
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === "(max-width:890px)" ? false : true,
      media: "",
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { getByTestId } = render(
      <CustomizeLinksLayout>
        <div>Child Component</div>
      </CustomizeLinksLayout>
    );

    // Check if PhonePreview is visible on larger screens
    expect(getByTestId("phone-preview")).toBeVisible();
  });
});
