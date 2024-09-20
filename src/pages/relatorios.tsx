import useLogUser from "@/app/atoms/useLogUser";
import useRequireAuth from "@/app/atoms/useRequireAuth";
import Header from "@/app/organisms/Header";
import SpendingLimitDisplay from "@/app/molecules/SpendingLimitDisplay";
import { useState } from "react";
import Container from "@/app/atoms/Container";
import DonutChart from "@/app/atoms/DonutChart";
import CategoryTable from "@/app/atoms/CategoryTable";
import BarChart from "@/app/atoms/BarChart";

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
        <SpendingLimitDisplay title={"Relatórios"} displayType={"relatorios"} />
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
          <div className="py-5">
            {activeTab === "categorias" ? (
              <>
                <DonutChart />
                <CategoryTable />
              </>
            ) : (
              <>
                <BarChart />
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
