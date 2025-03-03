import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { getCountries } from "@/services/getCountries";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const mockCountries = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
];

const server = setupServer(
  http.get("https://openholidaysapi.org/Countries", () => {
    return HttpResponse.json(mockCountries);
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("getCountries", () => {
  it("fetches and returns a list of countries", async () => {
    const countries = await getCountries();
    expect(countries).toEqual(mockCountries);
  });

  it("returns an empty array when fetch fails", async () => {
    server.use(
      http.get("https://openholidaysapi.org/Countries", () => {
        return HttpResponse.json(
          { error: "Internal Server Error" },
          { status: 500 },
        );
      }),
    );

    const countries = await getCountries();
    expect(countries).toEqual([]);
  });
});
