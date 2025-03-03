import { Holiday } from "@/types.ts";

export const getCountryHolidays = async (
  countryIsoCode: string,
  validFrom: string,
  validTo: string,
  languageIsoCode: string,
  subdivisionCode?: string,
): Promise<Holiday[]> => {
  try {
    const url = `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${countryIsoCode}&validFrom=${validFrom}&validTo=${validTo}&languageIsoCode=${languageIsoCode}${
      subdivisionCode ? `&subdivisionCode=${subdivisionCode}` : ""
    }`;
    const response = await fetch(url);

    if (!response.ok) {
      console.log(`Error fetching holidays: ${response.statusText}`);
      return [];
    }

    return await response.json();
  } catch (e) {
    console.error("Error fetching holidays:", e);
    return [];
  }
};
