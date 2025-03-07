import { FC } from "react";
import { useCountry } from "@/hooks/useCountry";
import logo from "@/assets/logo.svg";

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
      <img src={logo} alt="logo" className="w-12 h-12 mr-2" />
      {title} in {countryTitle}
    </h2>
  );
};

export default MainTitle;
