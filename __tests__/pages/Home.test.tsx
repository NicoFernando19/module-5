import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from '@/pages';

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });

  it("renders default text heading", () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: /Welcome to ShopMart/i })).toBeInTheDocument();
  })
});