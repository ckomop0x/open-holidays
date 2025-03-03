import { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import MainTitle from "./MainTitle";
import { CountryProvider } from "@/contexts/CountryProvider";

describe("MainTitle Component", () => {
  const title = "Public holidays";
  const renderWithProvider = (ui: ReactNode) =>
    render(<CountryProvider>{ui}</CountryProvider>);

  it("renders children correctly", () => {
    renderWithProvider(<MainTitle title={title} />);
    expect(screen.getByText(title, { exact: false })).toBeInTheDocument();
  });

  it("applies additional class names", () => {
    const { container } = renderWithProvider(
      <MainTitle className="custom-class" title={title} />,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });
});
