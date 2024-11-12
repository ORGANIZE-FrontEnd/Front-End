import type { AppProps } from "next/app";
import "@/app/globals.css";
import { AuthProvider } from "@/app/atoms/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
