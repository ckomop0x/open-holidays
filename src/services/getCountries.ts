import { Country } from "@/types.ts";

export const getCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch("https://openholidaysapi.org/Countries");

    if (!response.ok) {
      console.log(`Error fetching countries: ${response.statusText}`);
      return [];
    }

    return await response.json();
  } catch (e) {
    console.log("Error", e);
    return [];
  }
};
