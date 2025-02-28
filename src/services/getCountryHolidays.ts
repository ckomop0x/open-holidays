import { Holiday } from "@/types.ts";

export const getPublicHolidays = async (
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
    if (!response.ok)
      throw new Error(`Error fetching holidays: ${response.statusText}`);

    const data: Holiday[] = await response.json();
    return data;
  } catch (e) {
    console.error("Error fetching public holidays:", e);
    return [];
  }
};
