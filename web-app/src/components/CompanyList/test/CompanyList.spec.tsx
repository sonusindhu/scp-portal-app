import { render, screen } from "@testing-library/react";
import CompanyList from "../CompanyList";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

describe("Company List Test Cases", () => {
  it("should render the component Company List", () => {
    render(
      <BrowserRouter>
        <CompanyList />
      </BrowserRouter>
    );

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });
});
