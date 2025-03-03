import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Country } from "@/types.ts";
import { config } from "@/config/config.ts";
import { getCountries } from "@/services/getCountries.ts";
import { CountryContext } from "@/contexts/CountryContext.ts";

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
