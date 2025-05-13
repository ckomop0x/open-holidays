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
    <div
      className={`bg-[#154273] text-white h-18 flex justify-center items-center
       ${className}`}
    >
      <div className="w-md flex items-center justify-start h-full px-4">
        <img src={logo} alt="logo" className="w-12 h-12 mr-2" />
        <h1 className="text-[22px] mb-0">
          {title} in {countryTitle}
        </h1>
      </div>
    </div>
  );
};

export default MainTitle;
