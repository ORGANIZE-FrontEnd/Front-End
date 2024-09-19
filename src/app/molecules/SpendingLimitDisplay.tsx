import { useState } from "react";
import { WordSwitcher } from "../atoms/WordSwitcher";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

type SpendingLimitDisplayProps = {
  title: string;
};

export default function SpendingLimitDisplay(props: SpendingLimitDisplayProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="pt-8 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-64">
      <div
        style={{ padding: "0rem 0rem 0" }}
        className="bg-white rounded-lg py-4"
      >
        <div className="flex justify-center border-b-2 items-end p-5 sm:gap-10 md:gap-20 lg:gap-40 xl:gap-80">
          <div className="p-5">
            <p className="font-semibold text-xl" style={{ color: "#787878" }}>
              {props.title}
            </p>
          </div>

          <div className="p-5">
            <WordSwitcher />
          </div>

          <div className="flex items-center gap-2 p-5">
            <div className="cursor-pointer" onClick={handleToggle}>
              {isVisible ? (
                <IoEyeSharp
                  className="text-base"
                  style={{ color: "#16C64F" }}
                />
              ) : (
                <IoEyeOffSharp
                  className="text-base"
                  style={{ color: "#16C64F" }}
                />
              )}
            </div>
            <button
              className="font-semibold cursor-pointer hover:text-[#093134]"
              style={{ color: "#16C64F" }}
              onClick={handleToggle}
            >
              Mostrar previsão no gráfico
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
