import { render } from "@testing-library/react";
import PreviewLayout from ".";

describe("PreviewLayout Component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <PreviewLayout>
        <div>Test</div>
      </PreviewLayout>
    );

    expect(getByText("Test")).toBeInTheDocument();
  });

  it("renders with the correct styles", () => {
    const { getByTestId } = render(
      <PreviewLayout>
        <div>Test</div>
      </PreviewLayout>
    );

    // Select the background box using data-testid
    const backgroundBox = getByTestId("background-box");
    expect(backgroundBox).toBeInTheDocument();

    // Assert for the expected styles using toHaveStyle
    expect(backgroundBox).toHaveStyle({
      minHeight: "50vh",
      borderBottomRightRadius: "25px",
      borderBottomLeftRadius: "25px",
      position: "absolute",
      top: "0",
      width: "100vw",
      left: "0",
    });

    // Select the content box using data-testid
    const contentBox = getByTestId("content-box");
    expect(contentBox).toBeInTheDocument();
    expect(contentBox).toHaveStyle({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      width: "100vw",
    });
  });
});
