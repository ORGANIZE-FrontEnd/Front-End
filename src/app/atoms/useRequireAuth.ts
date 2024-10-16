import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const useRequireAuth = () => {
  const router = useRouter();

  function checkAuth() {
    return Cookies.get("accessToken") !== undefined;
  }

  useEffect(() => {
    if (!checkAuth()) {
      console.log("Not authenticated, redirecting to login...");
      router.push("/login");
    } else {
      console.log("Authenticated");
    }

    const interval = setInterval(() => {
      if (!checkAuth()) {
        console.log(
          "Auth check interval: Not authenticated, redirecting to login..."
        );
        router.push("/login");
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [router]);
};

export default useRequireAuth;
