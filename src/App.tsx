import { FC } from "react";

import HolidaysList from "@/components/HolidaysList/HolidaysList";
import CountriesList from "@/components/CountriesSelect/CountriesList";
import { useCountry } from "@/hooks/useCountry";
import YearSelect from "@/components/YearSelect/YearSelect";
import MainTitle from "@/components/MainTitle/MainTitle";
import Loader from "@/components/Loader/Loader";

const MAIN_TITLE = "Public holidays";

const App: FC = () => {
  const { countries } = useCountry();

  return (
    <div className="flex flex-col h-screen">
      {countries.length ? (
        <div className="flex flex-col mx-auto w-full justify-center">
          <MainTitle title={MAIN_TITLE} />
          <div className="flex flex-wrap flex-row container justify-between mx-auto pt-2 max-w-sm">
            <CountriesList />
            <YearSelect />
          </div>
          <HolidaysList />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default App;
