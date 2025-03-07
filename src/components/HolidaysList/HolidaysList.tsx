import React, { FC, useEffect, useState } from "react";

import { Holiday } from "@/types";
import { getCountryHolidays } from "@/services/getCountryHolidays";
import { useCountry } from "@/hooks/useCountry";
import { useYear } from "@/contexts/YearContext";
import { getFormattedDayOfWeek, getFormattedHolidayDate } from "@/lib/holidays";
import { config } from "@/config/config";

const HolidaysList: FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const { selectedCountry } = useCountry();
  const { year } = useYear();
  const validFrom = `${year}-01-01`;
  const validTo = `${year}-12-31`;
  const languageIsoCode = config.languageIsoCode;

  useEffect(() => {
    const fetchHolidays = async () => {
      const data = await getCountryHolidays(
        selectedCountry,
        validFrom,
        validTo,
        languageIsoCode,
      );
      setHolidays(data);
    };

    void fetchHolidays();
  }, [selectedCountry, languageIsoCode, validFrom, validTo, year]);

  return (
    <div className="flex flex-col mt-2">
      <div className="grid grid-cols-4 gap-4 p-4 max-w-lg mx-auto">
        <div className="col-span-4 grid grid-cols-4 border-b-1 border-b-gray-300 pb-2 mb-2">
          <div className="col-span-1 font-bold">DATE</div>
          <div className="col-span-1 font-bold">DAY</div>
          <div className="col-span-2 font-bold">HOLIDAY</div>
        </div>
        <div className="col-span-4 grid grid-cols-4 max-h-[calc(100vh-250px)] overflow-y-auto">
          {holidays.map((holiday) => {
            const formattedDate = getFormattedHolidayDate(holiday.startDate);
            const dayOfWeek = getFormattedDayOfWeek(holiday.startDate);
            const holidayName = holiday.name[0].text;

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
    </div>
  );
};

export default HolidaysList;
