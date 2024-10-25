import { useAuth, AuthProvider } from "@/app/atoms/AuthContext";
import LoadingSpinner from "@/app/atoms/LoadingSpinner";
import logUser from "@/app/atoms/logUser";
import Header from "@/app/organisms/Header";
import QuickAccess from "@/app/organisms/QuickAccess";

const HomeContent = () => {
  logUser();
  const { loading, userData } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Header />
      <div className="pt-8 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-64">
        <QuickAccess userName={userData?.name} />
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
