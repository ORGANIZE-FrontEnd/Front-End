import React, { useMemo } from "react";
import { useAtom } from "jotai";
import { transactionsAtom } from "./transactionsAtom";
import { currentDateAtom } from "./DateSwitcher";
import { calculateSummary } from "./calculateTransactions";

const formatCurrency = (value: number) => `R$ ${value.toFixed(2)}`;

export type FilterType = "day" | "week" | "month";

export type SummaryTableProps = {
  filterType: FilterType;
};

const SummaryTable: React.FC<SummaryTableProps> = ({ filterType }) => {
  const [transactions] = useAtom(transactionsAtom);
  const [currentDate] = useAtom(currentDateAtom);

  const filteredTransactions = useMemo(
    () => calculateSummary(transactions, currentDate, filterType),
    [transactions, currentDate, filterType]
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
              <td className={`p-2 ${filteredTransactions.resultsByPeriod[period] < 0 ? "text-red-600" : "text-green"}`}>
                {formatCurrency(filteredTransactions.resultsByPeriod[period])}
              </td>
              <td className={`p-2 text-end ${filteredTransactions.balanceByPeriod[period] >= 0 ? "text-green" : "text-red-600"}`}>
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
