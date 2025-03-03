import { createContext, useContext, useState, ReactNode } from "react";

interface YearContextType {
  year: number;
  setYear(year: number): void;
}

const YearContext = createContext<YearContextType | undefined>(undefined);

export const YearProvider = ({ children }: { children: ReactNode }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  return (
    <YearContext.Provider value={{ year, setYear }}>
      {children}
    </YearContext.Provider>
  );
};

export const useYear = () => {
  const context = useContext(YearContext);

  if (!context) {
    throw new Error("useYear must be used within a YearProvider");
  }

  return context;
};
