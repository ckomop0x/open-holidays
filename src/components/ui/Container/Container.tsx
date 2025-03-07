import { FC, PropsWithChildren } from "react";

const Container: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col relative w-full h-full">{children}</div>
);

export default Container;
