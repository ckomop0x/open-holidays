import { FC } from "react";
import { Country } from "@/types.ts";
import { useCountry } from "@/contexts/CountryContext";
import ReactCountryFlag from "react-country-flag";

interface CountriesListProps {
  countries: Country[];
}

const CountriesList: FC<CountriesListProps> = ({ countries }) => {
  const { selectedCountry, setSelectedCountry } = useCountry();

  const buttonClass =
    "border border-gray-300 rounded-md p-2 m-1 cursor-pointer hover:bg-gray-200";
  const selectedButtonClass =
    "border border-gray-300 rounded-md p-2 m-1 bg-gray-200 cursor-pointer";
  const isCountrySelected = (isoCode: string) => selectedCountry === isoCode;

  return (
    <>
      {countries.length ? (
        <div className="flex flex-wrap flex-row container justify-center mx-auto">
          {countries.map((country: Country) => (
            <button
              value={country.isoCode}
              key={country.isoCode}
              onClick={() => setSelectedCountry(country.isoCode)}
              className={
                isCountrySelected(country.isoCode)
                  ? selectedButtonClass
                  : buttonClass
              }
            >
              <ReactCountryFlag
                countryCode={country.isoCode}
                title={country.name[0].text}
                className="text-2xl leading-[2em]"
                svg
              />
            </button>
          ))}
        </div>
      ) : (
        <div className="block text-sm font-medium text-gray-700 border-1 border-gray-300 rounded-md p-2">
          No countries data available at this moment
        </div>
      )}
    </>
  );
};

export default CountriesList;
