import React, { FC } from "react";
import { getFormattedDayOfWeek, getFormattedHolidayDate } from "@/lib/holidays";
import { getGroupedHolidays } from "@/lib/holidays/getGroupedHolidays";
import { useHolidays } from "@/hooks/useHolidays";

const HolidaysList: FC = () => {
  const { holidays } = useHolidays();

  return (
    <div className="flex flex-col mt-2">
      <div className="mx-auto py-4 w-full">
        {Object.entries(getGroupedHolidays(holidays)).map(
          ([month, monthHolidays]) => (
            <div key={month} className="mb-4">
              <h2 className="text-lg font-bold border-b border-b-gray-300 pb-2 mb-2">
                {month}
              </h2>
              <div className="grid grid-cols-4 gap-x-4">
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
