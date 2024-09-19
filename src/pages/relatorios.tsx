import useLogUser from "@/app/atoms/useLogUser";
import useRequireAuth from "@/app/atoms/useRequireAuth";
import Header from "@/app/organisms/Header";
import SpendingLimitDisplay from "@/app/molecules/SpendingLimitDisplay";
import { useState } from "react";
import Container from "@/app/atoms/Container";
import PieChart from "@/app/atoms/PieChart";
import CategoryTable from "@/app/atoms/CategoryTable";

export default function Relatorios() {
  useLogUser();
  useRequireAuth();

  const [activeTab, setActiveTab] = useState<"movimentacoes" | "categorias">(
    "categorias"
  );

  return (
    <>
      <Header />
      <Container className="">
        <SpendingLimitDisplay title={"Relatórios"} />
        <div className="bg-white rounded-b-lg py-1.5 min-h-[600px] shadow-md">
          <div className="flex border-b-2">
            <button
              onClick={() => setActiveTab("categorias")}
              className={`flex-1 py-1 text-lg text-center font-semibold transition-all duration-100 ease-in-out
                  ${
                    activeTab === "categorias"
                      ? "text-[#539C6A] border-b-2 border-[#539C6A]"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
            >
              Categorias
            </button>
            <button
              onClick={() => setActiveTab("movimentacoes")}
              className={`flex-1 py-1 text-lg text-center font-semibold transition-all duration-100 ease-in-out
                ${
                  activeTab === "movimentacoes"
                    ? "text-[#539C6A] border-b-2 border-[#539C6A]"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
            >
              Entradas X Saídas
            </button>
          </div>
          <div className="p-5">
            {activeTab === "categorias" ? (
              <>
                <PieChart />
                <CategoryTable />
              </>
            ) : (
              <p className="text-center text-gray-500 pt-24">
                {/* Aqui eh onde vai ficar o outro grafico */}
                Nenhuma categoria encontrada. Por favor, adicione novas
                categorias.
              </p>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
