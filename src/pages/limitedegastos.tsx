import useLogUser from "@/app/atoms/logUser";
import useRequireAuth from "@/app/atoms/useRequireAuth";
import SpendingLimitDisplay from "@/app/molecules/SpendingLimitDisplay";
import Header from "@/app/organisms/Header";
import Button from "@/app/atoms/Button";

export default function LimiteDeGastos() {
  useLogUser();
  useRequireAuth();
  return (
    <>
      <Header />
      <div className="px-8 sm:px-16 md:px-24 lg:px-32 xl:px-64">
        <SpendingLimitDisplay
          title={"Limite de gastos"}
          displayType={"limiteDeGastos"}
        />
        <div
          style={{ padding: "0rem 0rem 0" }}
          className="bg-white rounded-lg py-4 min-h-[500px] max-h-[calc(100vh-64px)] flex items-center justify-center shadow-sm"
        >
          <div className="flex justify-center">
            <div className="">
              <p style={{ color: "#6E6767", fontWeight: "600" }}>
                Nenhum limite de gastos definidos para o mês de agosto de 2024.
              </p>
              <div className="flex justify-center p-5 m-3">
                <Button
                  title="Definir Limites de Gastos"
                  className="shadow-gray-400 shadow-md focus:outline-none text-white bg-green500 hover:bg-green800 font-medium rounded-md text-base px-8 py-1.5"
                  type={"button"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
