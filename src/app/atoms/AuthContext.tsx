import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useRouter } from "next/router"; // Import useRouter
import { getDecryptedToken } from "../services/auth/loginService";
import { getUserById, refreshAccessToken } from "../services/user/userService";
import { isTokenExpired } from "./useDecodeJwt";
import { GetUserByIdReponse } from "../types/Types";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  userData: GetUserByIdReponse | null;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<GetUserByIdReponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const encryptedToken = await getDecryptedToken();

      const isLoginPage = router.pathname === "/login";

      // If the user is on the login page, skip the service calls
      if (isLoginPage) {
        setLoading(false);
        return;
      }

      if (!encryptedToken || (await isTokenExpired(encryptedToken))) {
        const newToken = await refreshAccessToken();
        if (!newToken) {
          setIsAuthenticated(false);
          setLoading(false);
          router.push("/login");
          return;
        }
      }
      setIsAuthenticated(true);
      await refreshUserData();
      setLoading(false);
    };

    checkAuth();
  }, [router.pathname]);

  const refreshUserData = async () => {
    const result = await getUserById();

    if (result.status === "success" && result.data) {
      setUserData(result.data);
    }
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      loading,
      userData,
      refreshUserData,
    }),
    [isAuthenticated, loading, userData]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
