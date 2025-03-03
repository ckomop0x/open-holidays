import { FC, JSX } from "react";
import { Country } from "@/types.ts";
import ReactCountryFlag from "react-country-flag";
import Select, { SingleValue } from "react-select";
import { useCountry } from "@/hooks/useCountry.tsx";
import { config } from "@/config/config.ts";

interface CountriesListProps {
  countries: Country[];
}

type OptionType = {
  value: string;
  label: JSX.Element;
};

const CountriesList: FC<CountriesListProps> = ({ countries }) => {
  const { setSelectedCountry } = useCountry();

  console.log(countries);

  const options: OptionType[] = countries.map((country) => ({
    value: country.isoCode,
    label: (
      <div className="flex items-center">
        <ReactCountryFlag
          countryCode={country.isoCode}
          className="w-6 h-4 mr-2"
          svg
        />
        {country.name[0].text}
      </div>
    ),
  }));

  const onChange = (newValue: SingleValue<OptionType>) => {
    if (!newValue) return;

    setSelectedCountry(newValue.value);
  };

  return (
    <>
      {countries.length ? (
        <div className="flex flex-wrap flex-row container justify-center mx-auto">
          <Select
            isLoading={!countries?.length}
            defaultValue={
              options.filter(
                (option) => option.value === config.defaultCountry,
              )[0]
            }
            onChange={onChange}
            options={options}
            className="w-60"
          />
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
