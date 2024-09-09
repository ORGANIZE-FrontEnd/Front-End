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
        style={{ color: "#787878" }}
      >
        <FaArrowLeft />
      </button>
      <div
        className="text-xl font-semibold w-32 text-center text-[#787878]"
        style={{ color: "#787878", width: "100px" }}
      >
        {words[currentIndex]}
      </div>
      <button
        onClick={handleNext}
        className="p-2 rounded  hover:text-[#787878] hover:bg-gray-100 transition-all duration-500 ease-in-out active:scale-90"
        style={{ color: "#787878" }}
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
