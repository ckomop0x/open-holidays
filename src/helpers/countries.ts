import { Country } from "@/types.ts";

export const getEnglishName = (country: Country) => {
  const englishNameObj = country.name.find((n) => n.language === "EN");
  return englishNameObj ? englishNameObj.text : "";
};

export const sortCountries = (countries: Country[]) => {
  return [...countries].sort((a, b) =>
    getEnglishName(a).localeCompare(getEnglishName(b)),
  );
};
