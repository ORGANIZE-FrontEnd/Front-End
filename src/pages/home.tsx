import { AuthProvider, useAuth } from "@/app/atoms/AuthContext";
import LoadingSpinner from "@/app/atoms/LoadingSpinner";
import Header from "@/app/organisms/Header";
import QuickAccess from "@/app/organisms/QuickAccess";
import Card from "@/app/molecules/card";

const HomeContent = () => {
  const { loading, userData } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  const cards = [
    { title: "Minhas Contas", description: "rapaz, vou fazer." },
    { title: "Meus Cartões", description: "caoma, ro fazer tbm" },
    { title: "Contas a Pagar", description: "Você não possui contas a pagar." },
    {
      title: "Maiores Gastos do Mês",
      description: "Você não possui gastos no mês.",
    },
    {
      title: "Contas a Receber",
      description: "Você não possui valores a receber.",
    },
    {
      title: "Limite de Gastos",
      description: "Você não limitou gastos no mês.",
    },
    {
      title: "Investimentos Mensais",
      description: "Você não fez investimentos.",
    },
  ];

  return (
    <>
      <Header />
      <div className="pt-8 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-64">
        <QuickAccess userName={userData?.name} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`bg-white border border-gray-200 rounded-xl shadow-md p-6 flex flex-col justify-start items-start relative ${
                card.title === "Minhas Contas"
                  ? "h-[320px]"
                  : card.title === "Meus Cartões"
                    ? "h-[370px]"
                    : "h-[240px]"
              }`}
            >
              {card.title === "Minhas Contas" && (
                <>
                  <div className="flex w-full mb-4">
                    <div className="w-[6px] bg-[#1ABE4E] h-full rounded-xl" />
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Saldo Geral</p>
                      <p className="text-xl">R$ 0,00</p>
                    </div>
                  </div>

                  {/* Linha separadora clarinha */}
                  <div className="w-full border-t border-gray-300 mb-4" />

                  <h3 className="text-lg font-semibold text-left w-full">
                    {card.title}
                  </h3>
                </>
              )}

              {card.title !== "Minhas Contas" && (
                <div className="flex-grow flex items-center justify-center">
                  <div className="absolute inset-0 flex flex-col justify-center items-center">
                    <h3 className="absolute top-5 left-5 text-lg font-semibold">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {card.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
          <Card />
        </div>
      </div>
    </>
  );
};

export default function Home() {
  return (
    <AuthProvider>
      <HomeContent />
    </AuthProvider>
  );
}
