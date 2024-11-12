import { AuthProvider, useAuth } from "@/app/atoms/AuthContext";
import LoadingSpinner from "@/app/atoms/LoadingSpinner";
import Header from "@/app/organisms/Header";
import QuickAccess from "@/app/organisms/QuickAccess";

const HomeContent = () => {
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
