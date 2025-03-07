import { Country } from "@/types";

export const getEnglishName = (country: Country) => {
  const englishNameObj = country.name.find(
    (n) => n.language.toLowerCase() === "en",
  );
  return englishNameObj ? englishNameObj.text : "";
};
