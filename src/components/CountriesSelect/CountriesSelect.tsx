import { FC } from "react";
import { Country } from "@/types.ts";
import { useCountry } from "@/contexts/CountryContext";

interface CountriesSelectProps {
  countries: Country[];
}

const CountriesSelect: FC<CountriesSelectProps> = ({ countries }) => {
  const { selectedCountry, setSelectedCountry } = useCountry();
  console.log("countries ===>", countries);
  const handleCountryChange = (e: { target: { value: string } }) => {
    console.log("e.target.value ===>", e.target.value);
    setSelectedCountry(e.target.value);
  };

  return (
    <div className="w-40">
      {countries.length ? (
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          onChange={handleCountryChange}
          value={selectedCountry}
        >
          {countries.map((country) => (
            <option value={country.isoCode} key={country.isoCode}>
              {country.name[0].text}
            </option>
          ))}
        </select>
      ) : (
        <div className="block text-sm font-medium text-gray-700 border-1 border-gray-300 rounded-md p-2">
          No countries data available at this moment
        </div>
      )}
    </div>
  );
};

export default CountriesSelect;
