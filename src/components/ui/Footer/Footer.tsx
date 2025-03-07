import { FC } from "react";
import { getAppVersion } from "@/lib/getAppVersion";

const Footer: FC = () => {
  return (
    <footer className="bg-[#154273] text-white text-center h-18 flex justify-center items-center">
      <div className="flex flex-col">
        <p>
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
        <p className="text-xs">v. {getAppVersion()}</p>
      </div>
    </footer>
  );
};

export default Footer;
