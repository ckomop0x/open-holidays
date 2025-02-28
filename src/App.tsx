import { FC, useEffect, useState } from "react";

import { getCountries } from "./services/getCountries.ts";
import CountriesSelect from "@/components/CountriesSelect/CountriesSelect.tsx";
import { useCountry } from "@/contexts/CountryContext.tsx";
import HolidaysList from "@/components/HolidaysList/HolidaysList.tsx";

const App: FC = () => {
  const [countries, setCountries] = useState<never[]>([]);
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
    <div className="flex items-center justify-center h-screen flex-col">
      <div>Selected Country: {selectedCountry}</div>
      <CountriesSelect countries={countries} />
      <HolidaysList country={selectedCountry} />
    </div>
  );
};

export default App;
