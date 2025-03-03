import { FC } from "react";

import HolidaysList from "@/components/HolidaysList/HolidaysList.tsx";
import CountriesList from "@/components/CountriesSelect/CountriesList.tsx";
import { useCountry } from "@/hooks/useCountry.tsx";

const App: FC = () => {
  const { selectedCountry, countries } = useCountry();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col mx-auto w-full justify-center">
        <CountriesList countries={countries} />
        <HolidaysList country={selectedCountry} />
      </div>
    </div>
  );
};

export default App;
