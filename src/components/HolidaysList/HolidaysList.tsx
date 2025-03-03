import React, { FC, useEffect, useState } from "react";
import { Holiday } from "@/types.ts";
import { getCountryHolidays } from "@/services/getCountryHolidays.ts";
import { config } from "@/config/config.ts";
import MainTitle from "@/components/MainTitle/MainTitle.tsx";
import { useCountry } from "@/hooks/useCountry.tsx";

const LANGUAGE_ISO_CODE = "EN";

interface HolidaysListProps {
  country: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

const HolidaysList: FC<HolidaysListProps> = ({ country }) => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const { countries } = useCountry();
  const countryIsoCode = country;
  const validFrom = "2025-01-01";
  const validTo = "2025-12-31";
  const languageIsoCode = LANGUAGE_ISO_CODE;
  const countryData = countries?.find((c) => c.isoCode === countryIsoCode);
  const countryTitle = countryData?.name?.[0]?.text || "Unknown Country";

  useEffect(() => {
    const fetchHolidays = async () => {
      const data = await getCountryHolidays(
        countryIsoCode,
        validFrom,
        validTo,
        languageIsoCode,
      );
      setHolidays(data);

      console.log("data", data);
    };

    void fetchHolidays();
  }, [country, countryIsoCode, languageIsoCode]);

  return (
    <div className="flex flex-col mt-4">
      <MainTitle>
        {config.appTitle} in {countryTitle}
      </MainTitle>
      <div className="grid grid-cols-4 gap-4 p-4 max-w-xl mx-auto">
        <div className="col-span-4 grid grid-cols-4 border-b-1 border-b-gray-300 pb-2 mb-2">
          <div className="col-span-1 font-bold">DATE</div>
          <div className="col-span-1 font-bold">DAY</div>
          <div className="col-span-2 font-bold">HOLIDAY</div>
        </div>

        {holidays.map((holiday) => {
          console.log(holiday);

          const holidayName = holiday.name[0].text;
          const formattedDate = formatDate(holiday.startDate);
          const dayOfWeek = new Date(holiday.startDate).toLocaleDateString(
            "en-GB",
            { weekday: "long" },
          );

          return (
            <React.Fragment key={holiday.id}>
              <div className="col-span-1">{formattedDate}</div>
              <div className="col-span-1">{dayOfWeek}</div>
              <div className="col-span-2">{holidayName}</div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default HolidaysList;
