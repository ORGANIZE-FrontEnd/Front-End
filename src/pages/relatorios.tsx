import useLogUser from "@/app/atoms/useLogUser";
import useRequireAuth from "@/app/atoms/useRequireAuth";
import Header from "@/app/organisms/Header";

export default function Relatorios() {
  useLogUser();
  useRequireAuth();
  return (
    <>
      <Header></Header>
      <h1>relatorios</h1>
    </>
  );
}
