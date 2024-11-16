import { useAuth } from "@/app/atoms/AuthContext";
import { useState } from "react";
import Button from "@/app/atoms/Button";
import LoadingSpinner from "@/app/atoms/LoadingSpinner";
import SpendingLimitDisplay from "@/app/molecules/SpendingLimitDisplay";
import Header from "@/app/organisms/Header";
import LimitExpenses from "../app/atoms/LimitExpenses"; 

export default function LimiteDeGastos() {

  const [isLimitExpensesOpen, setIsLimitExpensesOpen] = useState(false);

  const { loading } = useAuth();

  const handleLimitExpensesOpen = () => {
    setIsLimitExpensesOpen(true);
  };

  const handleCloseLimitExpenses = () => {
    setIsLimitExpensesOpen(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

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
          <div className="flex justify-center">
            <div>
              <p style={{ color: "#6E6767", fontWeight: "600" }}>
                Nenhum limite de gastos definidos para o mês.
              </p>
              <div className="flex justify-center p-5 m-3">
              <Button
              onClick={handleLimitExpensesOpen}
              title="Definir Limites de Gastos"
              className="shadow-gray-400 shadow-md bg-green hover:bg-green500 text-white font-medium rounded-md text-base px-8 py-2"
              type="button"
/>

              </div>
            </div>
          </div>
        </div>
      </div>
      <LimitExpenses
        show={isLimitExpensesOpen}
        onClose={handleCloseLimitExpenses}
      />
    </>
  );
}
