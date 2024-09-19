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
    <div
      style={{ padding: "0rem 0rem 0" }}
      className="bg-white rounded-lg py-4"
    >
      <div className="flex justify-between border-b-2 items-end p-5">
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
              <IoEyeSharp className="text-base" style={{ color: "#16C64F" }} />
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
  );
}
