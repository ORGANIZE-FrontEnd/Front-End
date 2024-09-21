import { useState } from "react";
import { DateSwitcher } from "../atoms/DateSwitcher";
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";

type SpendingLimitDisplayProps = {
  title: string;
  displayType: "investimentos" | "limiteDeGastos" | "relatorios";
};

export default function SpendingLimitDisplay({
  title,
  displayType,
}: SpendingLimitDisplayProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      style={{ padding: "0rem 0rem 0" }}
      className="bg-white rounded-lg py-4"
    >
      <div className="grid grid-cols-3 border-b-2 items-center p-5">
        {(displayType === "limiteDeGastos" || displayType === "relatorios") && (
          <div className="justify-self-start">
            <p className="font-semibold text-xl" style={{ color: "#787878" }}>
              {title}
            </p>
          </div>
        )}

        {displayType === "investimentos" && <div></div>}
        <div className="justify-self-center">
          <DateSwitcher />
        </div>

        {displayType === "limiteDeGastos" && (
          <div className="flex items-center gap-2 justify-self-end">
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
        )}
      </div>
    </div>
  );
}
