import useLogUser from "@/app/atoms/useLogUser";
import useRequireAuth from "@/app/atoms/useRequireAuth";
import QuickAccess from "@/app/organisms/QuickAccess";
import Header from "@/app/organisms/Header";

export default function Home() {
  useLogUser();
  useRequireAuth();
  return (
    <>
      <Header />
      <div className="pt-8 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-64">
        <QuickAccess />
      </div>
    </>
  );
}
