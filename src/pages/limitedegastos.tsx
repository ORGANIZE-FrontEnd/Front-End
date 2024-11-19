import { useAuth } from "@/app/atoms/AuthContext";
import { currentDateAtom } from "@/app/atoms/DateSwitcher";
import LimitExpenses from "@/app/atoms/LimitExpenses";
import LoadingSpinner from "@/app/atoms/LoadingSpinner";
import SpendingChart from "@/app/atoms/SpendingChart";
import SpendingLimitDisplay from "@/app/molecules/SpendingLimitDisplay";
import Header from "@/app/organisms/Header";
import { getMonthlyLimits } from "@/app/services/limitExpenses/limitExpensesService";
import { getExpenses } from "@/app/services/transaction/transactionService";
import { Transaction } from "@/app/types/Types";
import { Button } from "flowbite-react";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";

type ExpenseLimit = {
  id: string;
  limitValue: number;
  category: string;
  month: string;
};

export default function LimiteDeGastos() {
  const [isLimitExpensesOpen, setIsLimitExpensesOpen] = useState(false);
  const [currentDate] = useAtom(currentDateAtom);
  const [limits, setLimits] = useState<{
    [category: string]: { limitValue: number; id?: string };
  }>({});
  const [expenses, setExpenses] = useState<{ [category: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const { loading: authLoading } = useAuth();
  const [selectedLimitId, setSelectedLimitId] = useState<string | undefined>(
    undefined
  );
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [selectedLimitData, setSelectedLimitData] = useState<{
    limitValue: number;
    category: string;
  }>({ limitValue: 0, category: "Select category" });

  const handleLimitExpensesOpen = (id?: string, category?: string) => {
    if (id && category) {
      const limitData = limits[category];

      if (limitData) {
        setSelectedLimitId(id);
        setSelectedLimitData({
          limitValue: limitData.limitValue,
          category: category,
        });
      }
    } else {
      setSelectedLimitId(undefined);
      setSelectedCategory(category);
      setSelectedLimitData({
        limitValue: 0,
        category: category || "Select category",
      });
    }

    setIsLimitExpensesOpen(true);
  };

  const handleCloseLimitExpenses = () => {
    setIsLimitExpensesOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const currentMonth = `${currentDate.getFullYear()}-${String(
          currentDate.getMonth() + 1
        ).padStart(2, "0")}-01`;

        const [limitsResponse, expensesResponse] = await Promise.all([
          getMonthlyLimits(currentMonth),
          getExpenses(),
        ]);

        const fetchedLimits =
          limitsResponse?.data?.reduce(
            (
              acc: { [category: string]: { limitValue: number; id?: string } },
              limit: ExpenseLimit
            ) => {
              acc[limit.category] = {
                limitValue: limit.limitValue,
                id: limit.id,
              };
              return acc;
            },
            {}
          ) || {};

        const fetchedExpenses =
          expensesResponse?.data?.reduce(
            (acc: { [category: string]: number }, expense: Transaction) => {
              acc[expense.category] =
                (acc[expense.category] || 0) + expense.price;
              return acc;
            },
            {}
          ) || {};

        setLimits(fetchedLimits);
        setExpenses(fetchedExpenses);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLimits({});
        setExpenses({});
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentDate]);

  if (authLoading || loading) {
    return <LoadingSpinner />;
  }

  const categories = [
    "Alimentacao",
    "Transporte",
    "Saude",
    "Educacao",
    "Lazer",
    "Outros",
  ];

  return (
    <>
      <Header />
      <div className="px-8 pt-10 sm:px-16 md:px-24 lg:px-32 xl:px-64">
        <SpendingLimitDisplay
          title={"Limite de gastos"}
          displayType={"limiteDeGastos"}
        />
        <div
          style={{ padding: "0rem 0rem 0" }}
          className="bg-white rounded-lg py-4 min-h-[500px] max-h-[calc(100vh-64px)] flex items-center justify-center shadow-sm"
        >
          {categories.length > 0 ? (
            <div className="w-full">
              <h2 className="text-center text-lg font-bold text-gray-700 mb-4">
                Limites de Gastos do Mês
              </h2>

              <SpendingChart
                categories={categories}
                limits={limits}
                expenses={expenses}
                onEditLimit={(id, category) =>
                  handleLimitExpensesOpen(id, category)
                }
              />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p style={{ color: "#6E6767", fontWeight: "600" }}>
                Nenhum limite de gastos definidos para o mês.
              </p>
              <div className="flex justify-center p-5 m-3">
                <Button
                  onClick={() => handleLimitExpensesOpen()} // Open with no ID for a new limit
                  title="Definir Limites de Gastos"
                  className="shadow-gray-400 shadow-md bg-green hover:bg-green500 text-white font-medium rounded-md text-base px-8 py-2"
                  type="button"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <LimitExpenses
        show={isLimitExpensesOpen}
        onClose={handleCloseLimitExpenses}
        limitId={selectedLimitId}
        category={selectedCategory}
        initialLimitData={selectedLimitData}
      />
    </>
  );
}
