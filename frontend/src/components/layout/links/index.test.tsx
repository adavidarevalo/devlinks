import React from "react";
import { render } from "@testing-library/react";
import CustomizeLinksLayout from "./index";
import { LinksProvider } from "../../context/link";

describe("CustomizeLinksLayout", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <LinksProvider>
        <CustomizeLinksLayout>
          <div>Test Child</div>
        </CustomizeLinksLayout>
      </LinksProvider>
    );
    expect(getByText("Test Child")).toBeInTheDocument();
  });
});
