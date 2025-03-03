import {
  createContext,
  useState,
  PropsWithChildren,
  FC,
  useEffect,
} from "react";
import { config } from "@/config/config.ts";
import { Country } from "@/types.ts";
import { getCountries } from "@/services/getCountries.ts";

interface CountryContextType {
  selectedCountry: string;
  countries: Country[];
  setSelectedCountry(country: string): void;
}

export const CountryContext = createContext<CountryContextType | undefined>(
  undefined,
);

export const CountryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(config.defaultCountry);

  const getCountriesInfo = async () => {
    try {
      const countriesInfo = await getCountries();
      setCountries(countriesInfo);
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    void getCountriesInfo();
  }, []);

  return (
    <CountryContext.Provider
      value={{ selectedCountry, setSelectedCountry, countries }}
    >
      {children}
    </CountryContext.Provider>
  );
};
