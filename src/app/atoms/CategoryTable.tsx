import React, { useState, useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import { currentDateAtom } from "./DateSwitcher";
import formatDate from "./formatDate";

import { Transaction } from "../types/Types";
import {
  getIncomes,
  getExpenses,
} from "../services/transaction/transactionService";

const formatCurrency = (value: number) => `${value.toFixed(2)}`;

const CategoryTable: React.FC = () => {
  const [currentDate] = useAtom(currentDateAtom);
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError("");

      const incomeResponse = await getIncomes();
      const expenseResponse = await getExpenses();

      if (incomeResponse.status === "success") {
        setIncomes(incomeResponse.data || []);
      } else {
        setError(incomeResponse.message);
      }

      if (expenseResponse.status === "success") {
        setExpenses(expenseResponse.data || []);
      } else {
        setError(expenseResponse.message);
      }

      setLoading(false);
    };

    fetchTransactions();
  }, []);
  const filteredTransactions = useMemo(() => {
    const selectedMonth = currentDate.getMonth();
    const selectedYear = currentDate.getFullYear();

    const filteredIncomes = incomes.filter((item) => {
      const itemDate = new Date(item.startDate);
      return (
        itemDate.getMonth() === selectedMonth &&
        itemDate.getFullYear() === selectedYear
      );
    });

    const filteredExpenses = expenses.filter((item) => {
      const itemDate = new Date(item.startDate);
      return (
        itemDate.getMonth() === selectedMonth &&
        itemDate.getFullYear() === selectedYear
      );
    });

    return {
      incomes: filteredIncomes,
      expenses: filteredExpenses,
    };
  }, [incomes, expenses, currentDate]);

  const renderTableRows = (
    data: Transaction[],
    categoryType: "incomes" | "expenses"
  ) => {
    const grouped = data.reduce(
      (acc: { [key: string]: Transaction[] }, item) => {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
      },
      {}
    );

    return Object.entries(grouped).map(([category, items]) => {
      const total = items.reduce((sum, item) => sum + item.price, 0);
      const percentage =
        (total /
          (categoryType === "incomes"
            ? filteredTransactions.incomes
            : filteredTransactions.expenses
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
            <td
              className={`text-end p-2 font-medium ${categoryType === "incomes" ? "text-green" : "text-red-600"}`}
            >
              R${" "}
              {categoryType === "incomes"
                ? formatCurrency(total)
                : `-${formatCurrency(total)}`}
            </td>
          </tr>
          {expandedCategories.has(category) && (
            <tr>
              <td colSpan={3} className="p-2">
                <table className="w-full border-collapse">
                  <tbody>
                    {items.map((item) => (
                      <tr
                        key={`${item.description}-${item.startDate}-${item.price}`}
                        className="border-b border-gray-100"
                      >
                        <td className="text-green p-2 font-medium">
                          {item.description}
                        </td>
                        <td className="text-grey p-2 font-medium">
                          {formatDate(item.startDate)}
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (
    filteredTransactions.incomes.length === 0 &&
    filteredTransactions.expenses.length === 0
  ) {
    return null;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col gap-10">
        <div>
          <h3 className="text-start text-lg font-medium mb-4">
            Categorias de despesa
          </h3>
          <table className="w-full border-collapse">
            <tbody>
              {renderTableRows(filteredTransactions.expenses, "expenses")}
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="text-start text-lg font-medium mb-4">
            Categorias de receita
          </h3>
          <table className="w-full border-collapse">
            <tbody>
              {renderTableRows(filteredTransactions.incomes, "incomes")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
