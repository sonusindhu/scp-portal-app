import { render, screen } from "@testing-library/react";
import PageHeading from "./PageHeading";
import "@testing-library/jest-dom";

describe("heading Component Test Cases", () => {
  it("should render the component Heading", () => {
    render(<PageHeading title="Test Heading" />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });
});
