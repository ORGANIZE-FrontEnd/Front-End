import SpendingLimitDisplay from "@/app/molecules/SpendingLimitDisplay";
import Header from "@/app/organisms/Header";

export default function LimiteDeGastos() {
  return (
    <>
      <Header />
      <SpendingLimitDisplay title={"Limite de gastos"} />
    </>
  );
}
