import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { useAtom } from "jotai";
import React, { useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getExpenses, getIncomes } from "../services/transaction/transactionService";
import { currentDateAtom } from "./DateSwitcher";

ChartJS.register(ArcElement, Tooltip, Legend);

// Helper function to group data by category
const groupByCategory = (items: any[]) => {
  const grouped: { [key: string]: number } = {};
  items.forEach((item) => {
    if (grouped[item.category]) {
      grouped[item.category] += item.price;
    } else {
      grouped[item.category] = item.price;
    }
  });
  return grouped;
};

const DonutChart: React.FC = () => {
  const [currentDate] = useAtom(currentDateAtom);
  const [incomeData, setIncomeData] = useState<any[]>([]);
  const [expenseData, setExpenseData] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const incomeResponse = await getIncomes();
      if (incomeResponse.status === "success") {
        setIncomeData(incomeResponse.data || []);
      }

      const expenseResponse = await getExpenses();
      if (expenseResponse.status === "success") {
        setExpenseData(expenseResponse.data || []);
      }
    };

    fetchData();
  }, []);
  const filteredTransactions = useMemo(() => {
    const selectedMonth = currentDate.getMonth();
    const selectedYear = currentDate.getFullYear();

    const filteredIncomes = incomeData.filter((item) => {
      const itemDate = new Date(item.startDate);
      return (
        itemDate.getMonth() === selectedMonth &&
        itemDate.getFullYear() === selectedYear
      );
    });

    const filteredExpenses = expenseData.filter((item) => {
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
  }, [incomeData, expenseData, currentDate]);

  const incomeCategories = Object.keys(groupByCategory(filteredTransactions.incomes));
  const incomeValues = Object.values(groupByCategory(filteredTransactions.incomes));

  const expenseCategories = Object.keys(groupByCategory(filteredTransactions.expenses));
  const expenseValues = Object.values(groupByCategory(filteredTransactions.expenses));

  const incomeChartData = {
    labels: incomeCategories,
    datasets: [
      {
        label: "Incomes by Category",
        data: incomeValues,
        backgroundColor: ["#2EE8B3", "#4BC0C0", "#FFCE56", "#FF6384"],
        borderColor: ["#2EE8B3", "#4BC0C0", "#FFCE56", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  const expenseChartData = {
    labels: expenseCategories,
    datasets: [
      {
        label: "Expenses by Category",
        data: expenseValues,
        backgroundColor: ["#E274A8", "#FF9F40", "#FFCE56", "#4BC0C0"],
        borderColor: ["#E274A8", "#FF9F40", "#FFCE56", "#4BC0C0"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: R$ ${value.toFixed(2)}`;
          },
        },
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
  };

  const hasTransactions =
    filteredTransactions.incomes.length > 0 ||
    filteredTransactions.expenses.length > 0;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {!hasTransactions ? (
        <p className="text-center text-gray-500 pt-24">
          Nenhuma movimentação até o momento. Que tal começar a adicionar seus
          gastos agora?
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-10 relative">
          {/* Donut chart for Expenses */}
          <div className="relative w-1/2 max-w-xs">
            <Doughnut data={expenseChartData} options={options} />
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <h3
                className="text-center font-semibold text-lg text-gray-800 bg-white p-2 rounded-full"
                style={{ zIndex: 1 }}
              >
                Despesas
              </h3>
            </div>
          </div>

          <div className="relative w-1/2 max-w-xs">
            <Doughnut data={incomeChartData} options={options} />
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <h3
                className="text-center font-semibold text-lg text-gray-800 bg-white p-2 rounded-full"
                style={{ zIndex: 1 }}
              >
                Receitas
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonutChart;
