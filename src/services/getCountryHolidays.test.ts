import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { getCountryHolidays } from "@/services/getCountryHolidays";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const mockHolidays = [
  { id: 1, name: "New Year's Day", date: "2025-01-01", country: "US" },
  { id: 2, name: "Independence Day", date: "2025-07-04", country: "US" },
];

const server = setupServer(
  http.get("https://openholidaysapi.org/PublicHolidays", ({ request }) => {
    const url = new URL(request.url);
    if (url.searchParams.get("countryIsoCode") === "US") {
      return HttpResponse.json(mockHolidays);
    }
    return new HttpResponse(null, { status: 404 });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("getPublicHolidays", () => {
  it("fetches and returns public holidays for a given country", async () => {
    const holidays = await getCountryHolidays(
      "US",
      "2025-01-01",
      "2025-12-31",
      "en",
    );
    expect(holidays).toEqual(mockHolidays);
  });

  it("returns an empty array when the API request fails", async () => {
    server.use(
      http.get("https://openholidaysapi.org/PublicHolidays", () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const holidays = await getCountryHolidays(
      "US",
      "2025-01-01",
      "2025-12-31",
      "en",
    );
    expect(holidays).toEqual([]);
  });
});
