import React, { FC, useEffect, useState } from "react";
import { Holiday } from "@/types";
import { getCountryHolidays } from "@/services/getCountryHolidays";
import { useCountry } from "@/hooks/useCountry";
import { useYear } from "@/contexts/YearContext";
import { getFormattedDayOfWeek, getFormattedHolidayDate } from "@/lib/holidays";
import { config } from "@/config/config";
import { getGroupedHolidays } from "@/lib/holidays/getGroupedHolidays";

const HolidaysList: FC = () => {
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

  if (!holidays.length) return null;

  return (
    <div className="flex flex-col mt-2">
      <div className="max-w-lg mx-auto p-4">
        {Object.entries(getGroupedHolidays(holidays)).map(
          ([month, monthHolidays]) => (
            <div key={month} className="mb-4">
              <h2 className="text-lg font-bold border-b border-b-gray-300 pb-2 mb-2">
                {month}
              </h2>
              <div className="grid grid-cols-4">
                {monthHolidays.map((holiday) => {
                  const formattedDate = getFormattedHolidayDate(
                    holiday.startDate,
                  );
                  const dayOfWeek = getFormattedDayOfWeek(holiday.startDate);
                  const holidayName =
                    holiday.name?.[0]?.text || "Unnamed Holiday";

                  return (
                    <React.Fragment key={holiday.id}>
                      <div className="col-span-1 pr-2">{formattedDate}</div>
                      <div className="col-span-1 pr-2">{dayOfWeek}</div>
                      <div className="col-span-2">{holidayName}</div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default HolidaysList;
