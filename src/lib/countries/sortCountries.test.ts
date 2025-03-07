import { describe, expect, it } from "vitest";
import { sortCountries } from "@/lib/countries/sortCountries";
import { getEnglishName } from "@/lib/countries/getEnglishName";
import { Country } from "@/types";

describe("sortCountries", () => {
  it("should sort countries alphabetically by their English name", () => {
    const countries: Country[] = [
      {
        isoCode: "FR",
        name: [
          { language: "fr", text: "France" },
          { language: "en", text: "France" },
        ],
        officialLanguages: ["fr"],
      },
      {
        isoCode: "DE",
        name: [
          { language: "de", text: "Deutschland" },
          { language: "en", text: "Germany" },
        ],
        officialLanguages: ["de"],
      },
      {
        isoCode: "US",
        name: [
          { language: "en", text: "United States" },
          { language: "es", text: "Estados Unidos" },
        ],
        officialLanguages: ["en"],
      },
    ];

    const sorted = sortCountries(countries);

    expect(sorted.map(getEnglishName)).toEqual([
      "France",
      "Germany",
      "United States",
    ]);
  });

  it("should return an empty array if given an empty array", () => {
    expect(sortCountries([])).toEqual([]);
  });

  it("should handle already sorted input correctly", () => {
    const countries: Country[] = [
      {
        isoCode: "AT",
        name: [{ language: "en", text: "Austria" }],
        officialLanguages: ["de"],
      },
      {
        isoCode: "BE",
        name: [{ language: "en", text: "Belgium" }],
        officialLanguages: ["nl", "fr", "de"],
      },
      {
        isoCode: "DK",
        name: [{ language: "en", text: "Denmark" }],
        officialLanguages: ["da"],
      },
    ];

    const sorted = sortCountries(countries);

    expect(sorted).toEqual(countries);
  });

  it("should handle countries with the same English name", () => {
    const countries: Country[] = [
      {
        isoCode: "CA",
        name: [
          { language: "fr", text: "Canada" },
          { language: "en", text: "Canada" },
        ],
        officialLanguages: ["en", "fr"],
      },
      {
        isoCode: "US",
        name: [{ language: "en", text: "Canada" }],
        officialLanguages: ["en"],
      },
    ];

    const sorted = sortCountries(countries);

    expect(sorted.map(getEnglishName)).toEqual(["Canada", "Canada"]);
  });
});
