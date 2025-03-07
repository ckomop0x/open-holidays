import { Holiday } from "@/types";

export const getGroupedHolidays = (holidays: Holiday[]) =>
  holidays.reduce<Record<string, Holiday[]>>((acc, holiday) => {
    if (!holiday.startDate) return acc; // Ensure there's a date

    const date = new Date(holiday.startDate);

    if (isNaN(date.getTime())) {
      console.warn("Invalid date found:", holiday.startDate);
      return acc;
    }

    const month = date.toLocaleString("en-US", { month: "long" });

    if (!acc[month]) acc[month] = [];

    acc[month].push(holiday);

    return acc;
  }, {});
