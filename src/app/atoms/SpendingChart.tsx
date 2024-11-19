import { useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";

type SpendingChartProps = {
  categories: string[];
  limits: { [category: string]: { limitValue: number; id?: string } };
  expenses: { [category: string]: number };
  onEditLimit: (id?: string, category?: string) => void;
};

const SpendingChart: React.FC<SpendingChartProps> = ({
  categories,
  limits,
  expenses,
  onEditLimit,
}) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const calculatePercentage = (category: string) => {
    const limit = limits[category]?.limitValue || 0;
    const expense = expenses[category] || 0;

    if (limit === 0) return 0;
    return Math.min((expense / limit) * 100, 100);
  };

  const totalLimit = categories.reduce(
    (sum, category) => sum + (limits[category]?.limitValue || 0),
    0
  );
  const totalExpense = categories.reduce(
    (sum, category) => sum + (expenses[category] || 0),
    0
  );

  const totalPercentage =
    totalLimit > 0 ? (totalExpense / totalLimit) * 100 : 0;

  return (
    <div className="w-full mt-4 px-4">
      <div className="mt-8">
        <div className="flex flex-col justify-center items-center mb-1">
          <span className="text-red-600 font-semibold">Despesas</span>
          <span className="text-gray-500">{`${totalExpense.toFixed(
            2
          )} de ${totalLimit.toFixed(2)}`}</span>
        </div>
        <div
          className="relative bg-gray-300 rounded-md h-20 overflow-hidden"
          style={{ width: "92%" }}
        >
          <div
            className={`h-full transition-all duration-1000 ease-in-out`}
            style={{
              width: animated ? `${totalPercentage}%` : "0%",
              backgroundColor: totalExpense > totalLimit ? "red" : "green",
            }}
          />
        </div>
      </div>

      {categories.map((category) => {
        const limitData = limits[category] || { limitValue: 0 };
        const percentage = calculatePercentage(category);
        const expense = expenses[category] || 0;

        return (
          <div key={category} className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-700 font-semibold">{category}</span>

              <div className="flex justify-center items-center">
                <span>
                  {expense} de {limitData.limitValue}
                </span>
                {limitData.limitValue > 0 ? (
                  <button
                    className="p-2 items-center flex cursor-pointer"
                    onClick={() => onEditLimit(limitData.id, category)}
                    aria-label="Edit limit"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        onEditLimit(limitData.id, category);
                      }
                    }}
                  >
                    <FaEdit size={18} color="gray" />
                  </button>
                ) : (
                  <button
                    className="p-2 items-center flex cursor-pointer"
                    onClick={() => onEditLimit(undefined, category)}
                    aria-label="Add limit"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        onEditLimit(undefined, category);
                      }
                    }}
                  >
                    <FaPlus size={18} color="gray" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <div
                className="relative bg-gray-300 rounded-md h-16 overflow-hidden"
                style={{ width: "92%" }}
              >
                <div
                  className={`h-full transition-all duration-1000 ease-in-out`}
                  style={{
                    width: animated ? `${percentage}%` : "0%",
                    backgroundColor:
                      expense > limitData.limitValue ? "red" : "green",
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SpendingChart;
