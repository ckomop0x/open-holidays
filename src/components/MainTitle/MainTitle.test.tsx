import { render, screen } from "@testing-library/react";
import MainTitle from "./MainTitle";
import { describe, it, expect } from "vitest";

describe("MainTitle Component", () => {
  it("renders children correctly", () => {
    render(<MainTitle>Test Title</MainTitle>);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("applies additional class names", () => {
    const { container } = render(
      <MainTitle className="custom-class">Title</MainTitle>,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("has correct default styles", () => {
    const { container } = render(<MainTitle>Title</MainTitle>);
    expect(container.firstChild).toHaveClass(
      "bg-[#154273] text-white text-center py-4",
    );
  });
});
