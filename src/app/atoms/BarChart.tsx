import React, { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { currentDateAtom } from "./DateSwitcher";
import formatDate from "./formatDate";
import { filterAtom } from "./filterAtom";
import { useAtom } from "jotai";
import { Transaction } from "../types/Types";
import { getIncomes, getExpenses } from "../services/transaction/transactionService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart: React.FC = () => {
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate] = useAtom(currentDateAtom);
  const [filter, setFilter] = useAtom(filterAtom);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const incomeResponse = await getIncomes();
        const expenseResponse = await getExpenses();
        
        if (incomeResponse.status === "success") {
          setIncomes(incomeResponse.data || []);
        }
        
        if (expenseResponse.status === "success") {
          setExpenses(expenseResponse.data || []);
        }
      } catch (error) {
        console.error("Error fetching transactions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentDate]);

  const filteredData = useMemo(() => {
    const startDate = new Date(currentDate);

    let incomeTotals: { [key: string]: number } = {};
    let expenseTotals: { [key: string]: number } = {};

    const normalizeDate = (dateString: string) => {
      const date = new Date(dateString);
      // Normalize date to local time
      return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    };

    if (filter === "day") {
      const daysInMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0).getDate();

      for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(startDate.getFullYear(), startDate.getMonth(), day);
        incomeTotals[formatDate(dayDate.toISOString(), "dayMonth")] = 0;
        expenseTotals[formatDate(dayDate.toISOString(), "dayMonth")] = 0;
      }

      incomes.forEach((item) => {
        const itemDate = normalizeDate(item.startDate);
        if (itemDate.getMonth() === startDate.getMonth() && itemDate.getFullYear() === startDate.getFullYear()) {
          incomeTotals[formatDate(itemDate.toISOString(), "dayMonth")] += item.price;
        }
      });

      expenses.forEach((item) => {
        const itemDate = normalizeDate(item.startDate);
        if (itemDate.getMonth() === startDate.getMonth() && itemDate.getFullYear() === startDate.getFullYear()) {
          expenseTotals[formatDate(itemDate.toISOString(), "dayMonth")] += item.price;
        }
      });
    } else if (filter === "week") {
      const startOfWeek = new Date(startDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);

      for (let i = 0; i < 7; i++) {
        const weekDate = new Date(startOfWeek);
        weekDate.setDate(weekDate.getDate() + i);
        incomeTotals[formatDate(weekDate.toISOString(), "dayMonth")] = 0;
        expenseTotals[formatDate(weekDate.toISOString(), "dayMonth")] = 0;
      }

      incomes.forEach((item) => {
        const itemDate = normalizeDate(item.startDate);
        if (itemDate >= startOfWeek && itemDate <= endOfWeek) {
          incomeTotals[formatDate(itemDate.toISOString(), "dayMonth")] += item.price;
        }
      });

      expenses.forEach((item) => {
        const itemDate = normalizeDate(item.startDate);
        if (itemDate >= startOfWeek && itemDate <= endOfWeek) {
          expenseTotals[formatDate(itemDate.toISOString(), "dayMonth")] += item.price;
        }
      });
    } else if (filter === "month") {
      const month = startDate.getMonth();
      const year = startDate.getFullYear();

      incomes.forEach((item) => {
        const itemDate = normalizeDate(item.startDate);
        if (itemDate.getMonth() === month && itemDate.getFullYear() === year) {
          incomeTotals[`${month + 1}-${year}`] = (incomeTotals[`${month + 1}-${year}`] || 0) + item.price;
        }
      });

      expenses.forEach((item) => {
        const itemDate = normalizeDate(item.startDate);
        if (itemDate.getMonth() === month && itemDate.getFullYear() === year) {
          expenseTotals[`${month + 1}-${year}`] = (expenseTotals[`${month + 1}-${year}`] || 0) + item.price;
        }
      });
    }

    return {
      incomes: incomeTotals,
      expenses: expenseTotals,
    };
  }, [incomes, expenses, currentDate, filter]);

  const chartLabels = Object.keys(filteredData.incomes);
  const incomeValues = chartLabels.map((label) => filteredData.incomes[label]);
  const expenseValues = chartLabels.map((label) => filteredData.expenses[label]);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Receitas",
        data: incomeValues,
        backgroundColor: "#1ABE4E",
        borderColor: "#1ABE4E",
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "Despesas",
        data: expenseValues,
        backgroundColor: "#D72638",
        borderColor: "#D72638",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.dataset.label}: R$ ${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
    },
  };

  if (loading) {
    return <p className="text-center text-gray-500 pt-4">Carregando dados...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="py-4 text-base">Entradas x Saídas</h2>
      <div className="flex justify-start mb-4">
        <ul className="flex space-x-4">
          {["day", "week", "month"].map((type) => (
            <li
              key={type}
              onClick={() => setFilter(type as "day" | "week" | "month")}
              className={`cursor-pointer py-2 ${filter === type ? "text-green" : "text-gray-500"} hover:text-green`}
            >
              {type === "day" ? "diário" : type === "week" ? "semanal" : "mensal"}
            </li>
          ))}
        </ul>
      </div>
      <Bar data={chartData} options={options} />
      {!chartLabels.length && (
        <p className="text-center text-gray-500 pt-4">
          Nenhuma movimentação até o momento. Que tal começar a adicionar seus gastos agora?
        </p>
      )}
    </div>
  );
};

export default BarChart;
