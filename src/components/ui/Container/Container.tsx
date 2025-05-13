import { FC, PropsWithChildren } from "react";

const Container: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col relative w-full h-dvh">{children}</div>
);

export default Container;
