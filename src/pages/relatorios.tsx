import BarChart from "@/app/atoms/BarChart";
import CategoryTable from "@/app/atoms/CategoryTable";
import Container from "@/app/atoms/Container";
import DonutChart from "@/app/atoms/DonutChart";
import { filterAtom } from "@/app/atoms/filterAtom";
import logUser from "@/app/atoms/logUser";
import SummaryTable from "@/app/atoms/SummaryTable";
import useRequireAuth from "@/app/atoms/useRequireAuth";
import SpendingLimitDisplay from "@/app/molecules/SpendingLimitDisplay";
import Header from "@/app/organisms/Header";
import { useAtom } from "jotai";
import { useState } from "react";

export default function Relatorios() {
  useRequireAuth();
  logUser();

  const [activeTab, setActiveTab] = useState<"movimentacoes" | "categorias">(
    "categorias"
  );
  const [filter] = useAtom(filterAtom);

  console.log("Current filter:", filter);

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
                <SummaryTable filterType={filter} />
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
