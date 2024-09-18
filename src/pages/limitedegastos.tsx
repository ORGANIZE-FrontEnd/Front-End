import useLogUser from "@/app/atoms/useLogUser";
import useRequireAuth from "@/app/atoms/useRequireAuth";
import SpendingLimitDisplay from "@/app/molecules/SpendingLimitDisplay";
import Header from "@/app/organisms/Header";

export default function LimiteDeGastos() {
  useLogUser();
  useRequireAuth();
  return (
    <>
      <Header />
      <SpendingLimitDisplay title={"Limite de gastos"} />
      <div className="px-8 sm:px-16 md:px-24 lg:px-32 xl:px-64">
      <div
        style={{ padding: "0rem 0rem 0" }}
        className="bg-white rounded-lg py-4 h-screen shadow-sm">
        <div className="flex justify-between items-end p-5">
          <div className="p-5">
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
