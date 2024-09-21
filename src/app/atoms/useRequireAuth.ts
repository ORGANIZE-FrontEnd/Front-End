import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "./authAtom";

const useRequireAuth = () => {
  const router = useRouter();
  const [user] = useAtom(userAtom);

  useEffect(() => {
    if (!user.isAuthenticated) {
      router.push("/login");
    }
  }, [user, router]);
};

export default useRequireAuth;
