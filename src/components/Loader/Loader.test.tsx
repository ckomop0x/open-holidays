import { render, screen } from "@testing-library/react";
import Loader from "./Loader";
import { describe, it, expect } from "vitest";

describe("Loader Component", () => {
  it("renders the loader component correctly", () => {
    render(<Loader />);
    expect(screen.getByLabelText("Loader")).toBeInTheDocument();
  });

  it("displays the loading message", () => {
    render(<Loader />);
    expect(
      screen.getByText(
        "We are preparing the agenda to showcase the long-awaited holidays.",
      ),
    ).toBeInTheDocument();
  });
});
