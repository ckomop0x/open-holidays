import { FC } from "react";

import HolidaysList from "@/components/HolidaysList/HolidaysList";
import CountriesList from "@/components/CountriesSelect/CountriesList";
import { useCountry } from "@/hooks/useCountry";
import YearSelect from "@/components/YearSelect/YearSelect";
import MainTitle from "@/components/MainTitle/MainTitle";
import Loader from "@/components/Loader/Loader";
import Container from "@/components/ui/Container/Container";
import Footer from "@/components/ui/Footer/Footer";

const MAIN_TITLE = "Public holidays";

const App: FC = () => {
  const { countries } = useCountry();

  return (
    <Container>
      <MainTitle title={MAIN_TITLE} />
      <div className="overflow-auto flex-1 mx-auto max-w-md">
        {countries.length ? (
          <>
            <div className="flex flex-wrap flex-row container justify-between mx-auto pt-2">
              <CountriesList />
              <YearSelect />
            </div>
            <HolidaysList />
          </>
        ) : (
          <Loader />
        )}
      </div>
      <Footer />
    </Container>
  );
};

export default App;
