import React from "react";
import { FaCreditCard } from "react-icons/fa";

const Card = () => {
  return (
    <section
      className="bg-white max-w-sm mx-auto rounded-lg shadow p-6 mt-6"
      style={{ marginRight: "20px" }}
    >
      {/* Seção de faturas */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          <span className="font-semibold">Todas as faturas</span>
          <br />
          <span className="text-xl font-semibold">R$ 0,00</span>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l3-3m0 0l3 3m-3-3v12m0 0l-3-3m3 3l3-3m0 0l-3-3"
            />
          </svg>
        </div>
      </div>

      {/* Meus cartões */}
      <h2 className="text-lg font-semibold mb-4">Meus cartões</h2>
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-500">
        <FaCreditCard className="h-10 w-10 text-gray-400 mb-4" />
        <p className="text-gray-500">Adicione seu primeiro cartão</p>
      </div>

      {/* Botão Gerenciar cartões */}
      <div className="mt-4">
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
          Gerenciar cartões
        </button>
      </div>
    </section>
  );
};

export default Card;
