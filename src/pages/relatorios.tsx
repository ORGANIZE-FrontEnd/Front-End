import useLogUser from "@/app/atoms/useLogUser";
import useRequireAuth from "@/app/atoms/useRequireAuth";
import Header from "@/app/organisms/Header";
import SpendingLimitDisplay from "@/app/molecules/SpendingLimitDisplay";
import { useState } from "react";

export default function Relatorios() {
  useLogUser();
  useRequireAuth();
  
  const [activeTab, setActiveTab] = useState<'movimentacoes' | 'categorias'>('movimentacoes');

  return (
    <>
      <Header />
      <SpendingLimitDisplay title={"Relatórios"} />
      
      <div className="px-8 sm:px-16 md:px-24 lg:px-32 xl:px-64">
        <div
          className="bg-white rounded-b-lg py-1.5 min-h-[600px] max-h-[calc(100vh-64px)] overflow-auto shadow-md"
        >
          <div className="flex border-b-2">
            <button
              onClick={() => setActiveTab('movimentacoes')}
              className={`flex-1 py-1 text-lg text-center font-semibold transition-all duration-100 ease-in-out
                ${activeTab === 'movimentacoes' 
                  ? 'text-[#539C6A] border-b-2 border-[#539C6A]' 
                  : 'text-gray-500 hover:bg-gray-50'
                }`}
            >
              Movimentações
            </button>
            <button
              onClick={() => setActiveTab('categorias')}
              className={`flex-1 py-1 text-lg text-center font-semibold transition-all duration-100 ease-in-out
                ${activeTab === 'categorias' 
                  ? 'text-[#539C6A] border-b-2 border-[#539C6A]' 
                  : 'text-gray-500 hover:bg-gray-50'
                }`}
            >
              Categorias
            </button>
          </div>
          <div className="p-5">
            {activeTab === 'movimentacoes' ? (
              <p className="text-center text-gray-500 pt-24">
                Nenhuma movimentação até o momento. Que tal começar a adicionar seus gastos agora?.
              </p>

            ) : (
              <p className="text-center text-gray-500 pt-24">
                Nenhuma categoria encontrada. Por favor, adicione novas categorias.
              </p>
            )}


          </div>
        </div>
      </div>
    </>
  );
}
