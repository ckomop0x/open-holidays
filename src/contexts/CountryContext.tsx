import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  FC,
} from "react";
import { config } from "@/config.ts";

interface CountryContextType {
  selectedCountry: string;
  setSelectedCountry(country: string): void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState(config.defaultCountry);

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);

  if (!context)
    throw new Error("useCountry must be used within a CountryProvider");

  return context;
};
