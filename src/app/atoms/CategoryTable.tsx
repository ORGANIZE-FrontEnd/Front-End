import React, { useState } from "react";
import { useAtom } from "jotai";
import { transactionsAtom } from "./transactionsAtom";
import formatDate from "./formatDate";

const formatCurrency = (value: number) => `${value.toFixed(2)}`;

const CategoryTable: React.FC = () => {
  const [transactions] = useAtom(transactionsAtom);
  // Use a Set to keep track of expanded categories
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

  const handleClick = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const renderTableRows = (
    data: any[],
    categoryType: "incomes" | "expenses"
  ) => {
    const grouped = data.reduce((acc: { [key: string]: any[] }, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    return Object.entries(grouped).map(([category, items]) => {
      const total = items.reduce((sum, item) => sum + item.price, 0);
      const percentage =
        (total /
          (categoryType === "incomes"
            ? transactions.incomes
            : transactions.expenses
          ).reduce((sum, item) => sum + item.price, 0)) *
        100;

      return (
        <React.Fragment key={category}>
          <tr className="border-b border-gray-100">
            <td className="p-2">
              <button
                onClick={() => handleClick(category)}
                className="text-grey font-medium"
              >
                {category}
              </button>
            </td>
            <td className="text-grey p-2 font-medium">
              {percentage.toFixed(2)}%
            </td>
            <td className="text-end text-red-600 p-2 font-medium">
              R$ -{formatCurrency(total)}
            </td>
          </tr>
          {expandedCategories.has(category) && (
            <tr>
              <td colSpan={3} className="p-2">
                <table className="w-full border-collapse">
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="text-green p-2 font-medium">
                          {item.description}
                        </td>
                        <td className="text-grey p-2 font-medium">
                          {formatDate(item.date)}
                        </td>
                        <td className="text-end text-grey p-2 font-medium">
                          R$ {formatCurrency(item.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          )}
        </React.Fragment>
      );
    });
  };

  if (transactions.incomes.length === 0 && transactions.expenses.length === 0) {
    return (
      <p className="text-center text-gray-500 pt-24">
        Nenhuma movimentação até o momento. Que tal começar a adicionar seus
        gastos agora?
      </p>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col gap-10">
        <div>
          <h3 className="text-start text-lg font-medium mb-4">
            Categorias de despesa
          </h3>
          <table className="w-full border-collapse">
            <tbody>{renderTableRows(transactions.expenses, "expenses")}</tbody>
          </table>
        </div>
        <div>
          <h3 className="text-start text-lg font-medium mb-4">
            Categorias de receita
          </h3>
          <table className="w-full border-collapse">
            <tbody>{renderTableRows(transactions.incomes, "incomes")}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
