import { useAtom } from "jotai";
import { atom } from "jotai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import formatDate from "./formatDate";

export const currentDateAtom = atom(new Date());

export function DateSwitcher() {
  const [currentDate, setCurrentDate] = useAtom(currentDateAtom);

  const handleNext = () => {
    setCurrentDate((prevDate) => {
      const nextDate = new Date(prevDate);
      nextDate.setMonth(prevDate.getMonth() + 1);
      return nextDate;
    });
  };

  const handlePrev = () => {
    setCurrentDate((prevDate) => {
      const prevDateClone = new Date(prevDate);
      prevDateClone.setMonth(prevDate.getMonth() - 1);
      return prevDateClone;
    });
  };

  const formattedDate = formatDate(currentDate.toString(), "monthYear");

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={handlePrev}
        className="p-2 rounded text-[#787878] hover:text-[#787878] hover:bg-gray-100 transition-all duration-500 ease-in-out active:scale-90"
      >
        <FaArrowLeft />
      </button>
      <div
        className="text-xl font-semibold w-32 text-center text-[#787878]"
        style={{ width: "100px" }}
      >
        {formattedDate}
      </div>
      <button
        onClick={handleNext}
        className="p-2 rounded  hover:text-[#787878] hover:bg-gray-100 transition-all duration-500 ease-in-out active:scale-90"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
