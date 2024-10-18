import { useAtom } from "jotai";
import React, { useEffect, useMemo, useState } from "react";
import { currentDateAtom } from "./DateSwitcher";
import { calculateSummary } from "./calculateTransactions";
import {
  getExpenses,
  getIncomes,
} from "../services/transaction/transactionService";
import { Transaction } from "../types/Types";

const formatCurrency = (value: number) => `R$ ${value.toFixed(2)}`;

export type FilterType = "day" | "week" | "month";

export type SummaryTableProps = {
  filterType: FilterType;
};

const SummaryTable: React.FC<SummaryTableProps> = ({ filterType }) => {
  const [currentDate] = useAtom(currentDateAtom);
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const incomeResponse = await getIncomes();
      const expenseResponse = await getExpenses();

      if (incomeResponse.status === "success") {
        setIncomes(incomeResponse.data || []);
      }

      if (expenseResponse.status === "success") {
        setExpenses(expenseResponse.data || []);
      }
    };

    fetchTransactions();
  }, []);

  console.log(incomes);
  console.log(expenses);
  console.log(currentDate);
  console.log(filterType);

  const filteredTransactions = useMemo(
    () => calculateSummary(incomes, expenses, currentDate, filterType),
    [incomes, expenses, currentDate, filterType]
  );

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
          {filteredTransactions.periods.map((period) => (
            <tr key={period} className="border-b border-gray-100">
              <td className="p-2 text-grey font-medium">{period}</td>
              <td className="p-2 text-green">
                {formatCurrency(filteredTransactions.incomesByPeriod[period])}
              </td>
              <td className="p-2 text-red-600">
                {formatCurrency(filteredTransactions.expensesByPeriod[period])}
              </td>
              <td
                className={`p-2 ${filteredTransactions.resultsByPeriod[period] < 0 ? "text-red-600" : "text-green"}`}
              >
                {formatCurrency(filteredTransactions.resultsByPeriod[period])}
              </td>
              <td
                className={`p-2 text-end ${filteredTransactions.balanceByPeriod[period] >= 0 ? "text-green" : "text-red-600"}`}
              >
                {formatCurrency(filteredTransactions.balanceByPeriod[period])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
