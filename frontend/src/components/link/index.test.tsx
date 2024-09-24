import { render, screen, fireEvent } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import LinkForm from "./index";
import { FormValues } from ".";
import { LinksProvider } from "../context/link";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      links: [],
    },
  });
  return (
    <LinksProvider>
      <FormProvider {...methods}>{children}</FormProvider>
    </LinksProvider>
  );
};

describe("LinkForm Component", () => {
  it("renders the add new link button", () => {
    render(
      <Wrapper>
        <LinkForm />
      </Wrapper>
    );
    const addButton = screen.getByRole("button", { name: /\+ add new link/i });
    expect(addButton).toBeInTheDocument();
  });

  it("adds a new link card when the add button is clicked", () => {
    render(
      <Wrapper>
        <LinkForm />
      </Wrapper>
    );
    const addButton = screen.getByRole("button", { name: /\+ add new link/i });
    fireEvent.click(addButton);
    const linkNumber = screen.getByText(/link #1/i);
    expect(linkNumber).toBeInTheDocument();
  });
});
