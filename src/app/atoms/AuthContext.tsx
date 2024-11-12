import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import { useRouter } from "next/router";
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
  const authCheckedRef = useRef(false);
  const retryAttemptedRef = useRef(false);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      if (authCheckedRef.current) return;

      const isExcludedRoute = ["/login", "/cadastro"].includes(router.pathname);

      if (isExcludedRoute) {
        setLoading(false);
        authCheckedRef.current = true;
        return;
      }

      try {
        const encryptedToken = await getDecryptedToken();

        if (!encryptedToken || (await isTokenExpired(encryptedToken))) {
          const newToken = await refreshAccessToken();
          if (!newToken) {
            if (mounted) {
              setIsAuthenticated(false);
              setLoading(false);
              authCheckedRef.current = true;
              router.push("/login");
            }
            return;
          }
        }

        if (mounted) {
          setIsAuthenticated(true);
          await refreshUserData();
          setLoading(false);
          authCheckedRef.current = true;
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        if (!retryAttemptedRef.current && mounted) {
          retryAttemptedRef.current = true;
          await checkAuth();
        } else if (mounted) {
          setIsAuthenticated(false);
          setLoading(false);
          authCheckedRef.current = true;
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
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
