import useLogUser from "@/app/atoms/useLogUser";
import useRequireAuth from "@/app/atoms/useRequireAuth";
import SpendingLimitDisplay from "@/app/molecules/SpendingLimitDisplay";
import Header from "@/app/organisms/Header";

export default function Investimentos() {
  useLogUser();
  useRequireAuth();
  return (
    <>
      <Header />
      <SpendingLimitDisplay title={"Investimentos"} />
    </>
  );
}
