import { FC } from "react";

import { useCountry } from "@/hooks/useCountry";

interface MainTitleProps {
  title: string;
  className?: string;
}

const MainTitle: FC<MainTitleProps> = ({ className, title }) => {
  const { countries, selectedCountry } = useCountry();
  const countryData = countries?.find((c) => c.isoCode === selectedCountry);
  const countryTitle = countryData?.name?.[0]?.text || "Unknown Country";

  return (
    <h2
      className={`bg-[#154273] text-white text-center ${className} h-18 flex justify-center items-center`}
    >
      {title} in {countryTitle}
    </h2>
  );
};

export default MainTitle;
