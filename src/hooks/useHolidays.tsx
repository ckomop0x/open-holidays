import { useEffect, useState } from "react";
import { Holiday } from "@/types";
import { useCountry } from "@/hooks/useCountry";
import { useYear } from "@/contexts/YearContext";
import { config } from "@/config/config";
import { getCountryHolidays } from "@/services/getCountryHolidays";

export const useHolidays = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const { selectedCountry } = useCountry();
  const { year } = useYear();
  const validFrom = `${year}-01-01`;
  const validTo = `${year}-12-31`;
  const languageIsoCode = config.languageIsoCode;

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const data = await getCountryHolidays(
          selectedCountry,
          validFrom,
          validTo,
          languageIsoCode,
        );
        setHolidays(data);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    void fetchHolidays();
  }, [selectedCountry, languageIsoCode, validFrom, validTo, year]);

  return { holidays };
};
