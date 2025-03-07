import { FC } from "react";
import { Blocks } from "react-loader-spinner";

const Loader: FC = () => {
  return (
    <div className="flex justify-center items-center h-full flex-col">
      <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="Loader"
        wrapperClass="blocks-wrapper"
        visible={true}
      />
      <p className="text-cyan-950">
        We are preparing the agenda to showcase the long-awaited holidays.
      </p>
    </div>
  );
};

export default Loader;
