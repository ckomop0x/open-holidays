import { FC, useEffect, useState } from "react";

import { getCountries } from "./services/getCountries.ts";
import { useCountry } from "@/contexts/CountryContext.tsx";
import HolidaysList from "@/components/HolidaysList/HolidaysList.tsx";
import CountriesList from "@/components/CountriesSelect/CountriesList.tsx";

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
    <div>
      <h2 className="bg-[#154273] text-white text-center py-4">
        Which days are official public holidays in the your country?
      </h2>
      {/*<div>Selected Country: {selectedCountry}</div>*/}
      <CountriesList countries={countries} />
      <HolidaysList country={selectedCountry} />
    </div>
  );
};

export default App;
