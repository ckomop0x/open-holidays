import { FC, useEffect, useState } from "react";
import { Holiday } from "@/types.ts";
import { getPublicHolidays } from "@/services/getCountryHolidays.ts";

interface HolidaysListProps {
  country: string;
}

const HolidaysList: FC<HolidaysListProps> = ({ country }) => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const countryIsoCode = country;
  const validFrom = "2025-01-01";
  const validTo = "2025-12-31";
  const languageIsoCode = "EN";

  useEffect(() => {
    const fetchHolidays = async () => {
      const data = await getPublicHolidays(
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
    <div>
      <h2 className="text-xl font-bold">Public Holidays in {countryIsoCode}</h2>
      <ul>
        {holidays.map((holiday) => (
          <li key={holiday.id} className="mb-2">
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
