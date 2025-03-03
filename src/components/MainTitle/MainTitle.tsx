import { FC, PropsWithChildren } from "react";

interface MainTitleProps {
  className?: string;
}

const MainTitle: FC<PropsWithChildren<MainTitleProps>> = ({
  children,
  className,
}) => {
  return (
    <h2 className={`bg-[#154273] text-white text-center py-4 ${className}`}>
      {children}
    </h2>
  );
};

export default MainTitle;
