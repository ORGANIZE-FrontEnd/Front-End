import { useAtom } from "jotai";
import ModalReceiptExpenses from "../molecules/ModalReceiptExpenses";
import LimitExpenses from "../atoms/LimitExpenses";
import ModalIntestments from "../atoms/ModalIntestment";
import {
  currentMonthIncomeAtom,
  currentMonthExpenseAtom,
} from "@/app/atoms/transactionsAtom"; // Import the current month atoms
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../atoms/Button";

export default function QuickAccess() {
  const [isModalExpensesOpen, setIsModalExpensesOpen] = useState(false);
  const [isModalReceiptsOpen, setIsModalReceiptsOpen] = useState(false);
  const [isLimitExpensesOpen, setIsLimitExpensesOpen] = useState(false);
  const [isInvestmentsOpen, setIsInvestmentsOpen] = useState(false);
  const router = useRouter();

  // Use the derived current month atoms
  const [currentMonthIncome] = useAtom(currentMonthIncomeAtom);
  const [currentMonthExpense] = useAtom(currentMonthExpenseAtom);

  const handleLimitExpensesOpen = () => {
    setIsLimitExpensesOpen(true);
  };

  const handleCloseLimitExpenses = () => {
    setIsLimitExpensesOpen(false);
  };

  const handleOpenExpenses = () => {
    setIsModalExpensesOpen(true);
  };

  const handleCloseModalExpenses = () => {
    setIsModalExpensesOpen(false);
  };

  const handleOpenReceipts = () => {
    setIsModalReceiptsOpen(true);
  };

  const handleCloseModalReceipts = () => {
    setIsModalReceiptsOpen(false);
  };

  const handleOpenInvestments = () => {
    setIsInvestmentsOpen(true);
  };

  const handleCloseInvestments = () => {
    setIsInvestmentsOpen(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow flex flex-row p-6">
      <div className="flex flex-col justify-between w-full pr-7">
        <div className="flex flex-col">
          <p>Boa tarde,</p>
          <p className="flex items-center gap-1">
            <strong>Trummer!</strong>
            <img src="/sunAndCloud.svg" className="w-10" />
          </p>
        </div>

        <div className="grid grid-flow-col gap-4">
          <div className="flex flex-col rounded-lg border border-white bg-[#fefdf9] shadow-lg flex-grow ml-4 items-center justify-center h-16">
            <p className="text-gray-500 font-semibold">receita mensal</p>
            <p className="text-lg font-medium text-[#1ABE4E]">
              R$ {currentMonthIncome.toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col rounded-lg border border-white bg-[#fefdf9] shadow-lg flex-grow ml-4 items-center justify-center h-16">
            <p className="text-gray-500 font-semibold">despesa mensal</p>
            <p className="text-lg font-medium text-red-600">
              R$ {currentMonthExpense.toFixed(2)}
            </p>
          </div>
          <Button
            className="flex flex-row rounded-lg border border-white bg-[#fefdf9] shadow-lg flex-grow ml-4 items-center justify-center h-16 font-semibold"
            type={"button"}
            buttonLink="/relatorios"
          >
            <img src="/increase.svg" className="w-10 mr-1" />
            ver relatórios
          </Button>
        </div>
      </div>
      <div className="border-l border-[#ebebeb] pl-7 bg-transparent">
        <h2 className="text-lg font-bold">Acesso rápido</h2>
        <ul className="flex items-center mt-6 text-xs font-normal">
          <li>
            <button
              onClick={handleOpenExpenses}
              className="w-[82px] p-4 h-[103px] flex flex-col items-center pt-4 transition-opacity duration-300 ease-in opacity-100"
            >
              <img src="/minusSign.svg" className="w-8" />
              DESPESA
            </button>
            <ModalReceiptExpenses
              show={isModalExpensesOpen}
              onClose={handleCloseModalExpenses}
              type={"expense"}
            />
          </li>
          <li>
            <button
              onClick={handleOpenReceipts}
              className="w-[82px] p-4 h-[103px] flex flex-col items-center pt-4 transition-opacity duration-300 ease-in opacity-100"
            >
              <img src="/plus.svg" className="w-8" />
              RECEITA
            </button>
            <ModalReceiptExpenses
              show={isModalReceiptsOpen}
              onClose={handleCloseModalReceipts}
              type={"income"}
            />
          </li>
          <li>
            <button
              onClick={handleOpenInvestments}
              className="w-[82px] p-4 h-[103px] flex flex-col items-center pt-4 transition-opacity duration-300 ease-in opacity-100"
            >
              <img src="/investmentIcon.svg" className="w-8" />
              INVESTIR
            </button>
            <ModalIntestments
              show={isInvestmentsOpen}
              onClose={handleCloseInvestments}
              title={"Novo Investimento"}
            />
          </li>
          <li>
            <button
              onClick={handleLimitExpensesOpen}
              className="w-[82px] p-4 h-[103px] flex flex-col items-center pt-4 transition-opacity duration-300 ease-in opacity-100"
            >
              <img src="/alertSign.svg" className="w-8" />
              LIMITAR GASTOS
            </button>
            <LimitExpenses
              show={isLimitExpensesOpen}
              onClose={handleCloseLimitExpenses}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
