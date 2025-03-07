import { Country } from "@/types";
import { getEnglishName } from "@/lib/countries/getEnglishName";

export const sortCountries = (countries: Country[]) => {
  return [...countries].sort((a, b) =>
    getEnglishName(a).localeCompare(getEnglishName(b)),
  );
};
