import { FC } from "react";
import { getAppVersion } from "@/lib/getAppVersion";

const Footer: FC = () => (
  <footer className="bg-[#154273] text-white h-18 flex flex-col w-full items-center justify-center">
    <p className="w-full max-w-md px-6 text-center">
      &copy; 2025 Pavel Klochkov,&nbsp;
      <a
        href="https://github.com/ckomop0x/open-holidays-2025"
        target="_blank"
        className="underline"
      >
        GitHub
      </a>
      ,&nbsp;
      <a
        href="https://www.openholidaysapi.org/en/"
        rel="noopener noreferrer"
        target="_blank"
        className="underline"
      >
        OpenHolidays API
      </a>
    </p>
    <p className="text-xs text-center">v{getAppVersion()}</p>
  </footer>
);

export default Footer;
