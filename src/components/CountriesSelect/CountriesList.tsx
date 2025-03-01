import { FC } from "react";
import { Country } from "@/types.ts";
import { useCountry } from "@/contexts/CountryContext";
import ReactCountryFlag from "react-country-flag";

interface CountriesListProps {
  countries: Country[];
}

const CountriesList: FC<CountriesListProps> = ({ countries }) => {
  const { selectedCountry, setSelectedCountry } = useCountry();
  // console.log("countries ===>", countries);
  // const handleCountryChange = (e: { target: { value: string } }) => {
  //   console.log("e.target.value ===>", e.target.value);
  //   setSelectedCountry(e.target.value);
  // };

  return (
    <>
      {countries.length ? (
        <div className="flex flex-wrap flex-row w-full">
          {countries.map((country: Country) => (
            <button
              value={country.isoCode}
              key={country.isoCode}
              onClick={() => setSelectedCountry(country.isoCode)}
              className="border border-gray-300 rounded-md p-2 m-1"
            >
              <ReactCountryFlag
                countryCode={country.isoCode}
                title={country.isoCode}
                className="text-xl mr-2"
                svg
              />
              {country.name[0].text}
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
