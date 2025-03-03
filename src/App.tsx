import { FC, useEffect, useState } from "react";

import { getCountries } from "./services/getCountries.ts";
import { useCountry } from "@/contexts/CountryContext.tsx";
import HolidaysList from "@/components/HolidaysList/HolidaysList.tsx";
import CountriesList from "@/components/CountriesSelect/CountriesList.tsx";
import { Country } from "@/types.ts";
import { config } from "@/config/config.ts";
import MainTitle from "@/components/MainTitle/MainTitle.tsx";

const App: FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const { selectedCountry } = useCountry();

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
    <div>
      <MainTitle>{config.appTitle}</MainTitle>
      <CountriesList countries={countries} />
      <HolidaysList country={selectedCountry} />
    </div>
  );
};

export default App;
