import logUser from "@/app/atoms/logUser";
import useRequireAuth from "@/app/atoms/useRequireAuth";
import Header from "@/app/organisms/Header";
import QuickAccess from "@/app/organisms/QuickAccess";

export default function Home() {
  useRequireAuth();
  logUser();
  return (
    <>
      <Header />
      <div className="pt-8 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-64">
        <QuickAccess />
      </div>
    </>
  );
}
