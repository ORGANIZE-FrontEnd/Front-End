import { useAuth } from "@/app/atoms/AuthContext";
import LoadingSpinner from "@/app/atoms/LoadingSpinner";
import SpendingLimitDisplay from "@/app/molecules/SpendingLimitDisplay";
import Header from "@/app/organisms/Header";
import Button from "@/app/atoms/Button";
import BarChart from "@/app/atoms/BarChart";
import ModalIntestments from "../app/atoms/ModalIntestment";
import { useState } from "react";

export default function Investimentos() {
  const [isInvestmentsOpen, setIsInvestmentsOpen] = useState(false);

  const { loading } = useAuth();

  const handleOpenInvestments = () => {
    setIsInvestmentsOpen(true);
  };

  const handleCloseInvestments = () => {
    setIsInvestmentsOpen(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header />
      <div className="px-8  pt-10 sm:px-16 md:px-24 lg:px-32 xl:px-64">
        <SpendingLimitDisplay
          title={"Investimentos"}
          displayType={"limiteDeGastos"}
        />
        <div
          style={{ padding: "0rem 0rem 0" }}
          className="bg-white rounded-lg py-4 min-h-[500px] max-h-[calc(100vh-64px)] flex items-center justify-center shadow-sm"
        >
                    <div className="flex justify-center">
            <div>
              <p style={{ color: "#6E6767", fontWeight: "600" }}>
                Nenhum Investimento definido para o mês.
              </p>
              <div className="flex justify-center p-5 m-3">
              <Button
              onClick={handleOpenInvestments}
              title="Adicionar Investimento"
              className="shadow-gray-400 shadow-md bg-green hover:bg-green500 text-white font-medium rounded-md text-base px-8 py-2"
              type="button"
/>

              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalIntestments
          show={isInvestmentsOpen}
          onClose={handleCloseInvestments}
          title={"Novo Investimento"}
      />
    </>
  );
}