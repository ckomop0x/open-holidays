import { FC, useEffect, useState } from "react";
import { Holiday } from "@/types.ts";
import { getCountryHolidays } from "@/services/getCountryHolidays.ts";

const LANGUAGE_ISO_CODE = "EN";

interface HolidaysListProps {
  country: string;
}

const HolidaysList: FC<HolidaysListProps> = ({ country }) => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const countryIsoCode = country;
  const validFrom = "2025-01-01";
  const validTo = "2025-12-31";
  const languageIsoCode = LANGUAGE_ISO_CODE;

  useEffect(() => {
    const fetchHolidays = async () => {
      const data = await getCountryHolidays(
        countryIsoCode,
        validFrom,
        validTo,
        languageIsoCode,
      );
      setHolidays(data);
    };

    void fetchHolidays();
  }, [country]);

  return (
    <div className="flex flex-col container w-full mx-auto mt-4">
      <h2 className="text-xl font-bold text-center">
        Public Holidays in {countryIsoCode}
      </h2>
      <ul>
        {holidays.map((holiday) => (
          <li key={holiday.id} className="mb-2 text-center">
            <strong>
              {holiday.name.find((n) => n.language === languageIsoCode)?.text}
            </strong>{" "}
            - {holiday.startDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HolidaysList;
