import { render, screen, waitFor } from "@testing-library/react";
import HolidaysList from "./HolidaysList";
import { describe, it, expect, vi, Mock } from "vitest";

import { YearProvider } from "@/contexts/YearContext";
import { CountryProvider } from "@/contexts/CountryProvider";
import { getCountryHolidays } from "@/services/getCountryHolidays";

vi.mock("@/services/getCountryHolidays", () => ({
  getCountryHolidays: vi.fn(),
}));

describe("HolidaysList Component", () => {
  const mockHolidays = [
    {
      id: "1",
      startDate: "2025-12-25",
      name: [{ text: "Christmas" }],
    },
    {
      id: "2",
      startDate: "2025-01-01",
      name: [{ text: "New Year's Day" }],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (getCountryHolidays as Mock).mockResolvedValue(mockHolidays);
  });

  const renderWithProviders = () =>
    render(
      <CountryProvider>
        <YearProvider>
          <HolidaysList />
        </YearProvider>
      </CountryProvider>,
    );

  it("renders holiday list correctly", async () => {
    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText("Christmas")).toBeInTheDocument();
      expect(screen.getByText("New Year's Day")).toBeInTheDocument();
    });
  });

  it("renders holiday dates correctly", async () => {
    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText(/25 Dec/i)).toBeInTheDocument();
      expect(screen.getByText(/1 Jan/i)).toBeInTheDocument();
    });
  });

  it("renders holiday day names correctly", async () => {
    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText("Thursday")).toBeInTheDocument(); // Assuming correct formatting
      expect(screen.getByText("Wednesday")).toBeInTheDocument(); // Assuming correct formatting
    });
  });
});
