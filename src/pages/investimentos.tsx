import Header from "@/app/components/Header";

import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
 

export default function Investimentos() {
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Header />
      <div style={{ padding: "2rem 28rem 0" }}>
        <div
          style={{ padding: "0rem 0rem 0" }}
          className="bg-white rounded-lg py-4 h-screen shadow-black shadow-lg"
        >
          <div className="flex justify-between border-b-2 items-end p-5">
            <div className="p-5">
              <p className="font-semibold text-xl" style={{ color: "#787878" }}>
                Limite de gastos
              </p>
            </div>

            <div className="p-5">
              <WordSwitcher />
            </div>
            
            <div className="flex items-center gap-2 p-5">
              <div
                className="cursor-pointer"
                onClick={handleToggle}
              >
                {isVisible ? (
                  <IoEyeSharp className="text-base" style={{ color: "#16C64F" }} />
                ) : (
                  <IoEyeOffSharp className="text-base" style={{ color: "#16C64F" }} />
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
    </>
  );
}

import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function WordSwitcher() {
  const words = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + words.length) % words.length
    );
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={handlePrev}
        className="p-2 rounded text-[#787878] hover:text-[#787878] hover:bg-gray-100 transition-all duration-500 ease-in-out active:scale-90"
        style={{color: "#787878"}}
      >
        <FaArrowLeft />
      </button>
      <div className="text-xl font-semibold w-32 text-center text-[#787878]"
            style={{color: "#787878",
               width: '100px',
            }}
      >
        {words[currentIndex]}
      </div>
      <button
        onClick={handleNext}
        className="p-2 rounded  hover:text-[#787878] hover:bg-gray-100 transition-all duration-500 ease-in-out active:scale-90"
        style={{color: "#787878"}}
      >
        <FaArrowRight />
      </button>
    </div>
  );
}