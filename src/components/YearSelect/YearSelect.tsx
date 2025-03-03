import Select, { SingleValue } from "react-select";

import { useYear } from "@/contexts/YearContext";
import { OptionType } from "@/types";
import { getYearsOptions } from "@/helpers/years";

const MINIMUM_YEAR = 2019;
const SELECT_PLACEHOLDER = "Select Year";

const YearSelect = () => {
  const { setYear } = useYear();
  const years = getYearsOptions(MINIMUM_YEAR);

  const onChange = (selectedYear: SingleValue<OptionType>) => {
    if (!selectedYear || typeof selectedYear?.value !== "number") return;

    setYear(selectedYear.value);
  };

  return (
    <Select
      onChange={onChange}
      options={years}
      defaultValue={years[0]} // Auto-select current year
      placeholder={SELECT_PLACEHOLDER}
    />
  );
};

export default YearSelect;
