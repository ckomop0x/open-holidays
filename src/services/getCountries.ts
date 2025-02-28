import { Country } from "@/types.ts";

export const getCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch("https://openholidaysapi.org/Countries");
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("Error", e);
    return [];
  }
};
