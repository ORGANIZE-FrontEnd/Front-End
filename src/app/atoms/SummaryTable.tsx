import React, { useMemo } from "react";
import { useAtom } from "jotai";
import { transactionsAtom } from "./transactionsAtom";
import { currentDateAtom } from "./DateSwitcher";
import formatDate from "@/app/atoms/formatDate";
const formatCurrency = (value: number) => `R$ ${value.toFixed(2)}`;

type FilterType = "day" | "week" | "month";

type SummaryTableProps = {
  filterType: FilterType;
};

const SummaryTable: React.FC<SummaryTableProps> = ({ filterType }) => {
  const [transactions] = useAtom(transactionsAtom);
  const [currentDate] = useAtom(currentDateAtom);

  console.log("Current filter at Sumarytable:", filterType);

  const filteredTransactions = useMemo(() => {
    const selectedDate = new Date(currentDate);
    let filteredIncomes = [];
    let filteredExpenses = [];
    let period = "";

    if (filterType === "day") {
      filteredIncomes = transactions.incomes.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getDate() === selectedDate.getDate() &&
          itemDate.getMonth() === selectedDate.getMonth() &&
          itemDate.getFullYear() === selectedDate.getFullYear()
        );
      });

      filteredExpenses = transactions.expenses.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getDate() === selectedDate.getDate() &&
          itemDate.getMonth() === selectedDate.getMonth() &&
          itemDate.getFullYear() === selectedDate.getFullYear()
        );
      });

      period = formatDate(selectedDate.toISOString(), "dayMonthYear");
    } else if (filterType === "week") {
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()); // Sunday
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday

      filteredIncomes = transactions.incomes.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
      });

      filteredExpenses = transactions.expenses.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
      });

      period = `${formatDate(startOfWeek.toISOString(), "dayMonth")} - ${formatDate(endOfWeek.toISOString(), "dayMonth")}`;
    } else if (filterType === "month") {
      const selectedMonth = selectedDate.getMonth();
      const selectedYear = selectedDate.getFullYear();

      filteredIncomes = transactions.incomes.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getMonth() === selectedMonth &&
          itemDate.getFullYear() === selectedYear
        );
      });

      filteredExpenses = transactions.expenses.filter((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getMonth() === selectedMonth &&
          itemDate.getFullYear() === selectedYear
        );
      });

      period = formatDate(selectedDate.toISOString(), "monthYear");
    }

    const totalIncomes = filteredIncomes.reduce(
      (sum, item) => sum + item.price,
      0
    );
    const totalExpenses = filteredExpenses.reduce(
      (sum, item) => sum + item.price,
      0
    );
    const result = totalIncomes - totalExpenses;

    // Cumulative balance (sum of all transactions)
    const totalBalance =
      transactions.incomes.reduce((sum, item) => sum + item.price, 0) -
      transactions.expenses.reduce((sum, item) => sum + item.price, 0);

    return {
      incomes: filteredIncomes,
      expenses: filteredExpenses,
      totalIncomes,
      totalExpenses,
      result,
      totalBalance,
      period,
    };
  }, [transactions, currentDate, filterType]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h3 className="text-start text-lg font-medium mb-4">Detalhamento</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-start p-2 text-grey">Período</th>
            <th className="text-start p-2 text-grey">Entradas</th>
            <th className="text-start p-2 text-grey">Saídas</th>
            <th className="text-start p-2 text-grey">Resultado</th>
            <th className="text-end p-2 text-grey">Saldo</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="p-2 text-grey font-medium">
              {filteredTransactions.period}
            </td>
            <td className="p-2 text-green">
              {formatCurrency(filteredTransactions.totalIncomes)}
            </td>
            <td className="p-2 text-red-600">
              {formatCurrency(filteredTransactions.totalExpenses)}
            </td>
            <td className="p-2 text-green">
              {formatCurrency(filteredTransactions.result)}
            </td>
            <td
              className={`p-2 text-end ${
                filteredTransactions.totalBalance >= 0
                  ? "text-green"
                  : "text-red-600"
              }`}
            >
              {formatCurrency(filteredTransactions.totalBalance)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
