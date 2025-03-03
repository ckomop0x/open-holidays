import { createContext } from "react";

import { Country } from "@/types";

interface CountryContextType {
  selectedCountry: string;
  countries: Country[];
  setSelectedCountry(country: string): void;
}

export const CountryContext = createContext<CountryContextType | undefined>(
  undefined,
);
