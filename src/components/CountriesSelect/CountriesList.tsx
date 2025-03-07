import { FC } from "react";
import ReactCountryFlag from "react-country-flag";
import Select, { SingleValue } from "react-select";

import { useCountry } from "@/hooks/useCountry";
import { config } from "@/config/config";
import { OptionType } from "@/types";
import { sortCountries } from "@/lib/countries/sortCountries";

const CountriesList: FC = () => {
  const { setSelectedCountry, countries } = useCountry();

  const options: OptionType[] = sortCountries(countries).map((country) => ({
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
    if (!newValue || typeof newValue.value !== "string") return;

    setSelectedCountry(newValue.value);
  };

  if (!countries?.length) return null;

  const defaultCountry = options.filter(
    (option) => option.value === config.defaultCountry,
  )[0];

  return (
    <Select
      isLoading={!countries?.length}
      defaultValue={defaultCountry}
      onChange={onChange}
      options={options}
      className="w-60"
    />
  );
};

export default CountriesList;
