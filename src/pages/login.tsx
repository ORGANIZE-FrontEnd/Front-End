import Alert from "@/app/atoms/Alert";
import Button from "@/app/atoms/Button";
import InputField from "@/app/atoms/InputField";
import LoadingSpinner from "@/app/atoms/LoadingSpinner";
import SidebarContent from "@/app/molecules/SideBarContent";
import { saveEncryptedToken } from "@/app/services/auth/cookieService";
import { loginService } from "@/app/services/auth/loginService";
import { useRouter } from "next/router";
import { useState } from "react";

const MainContent = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "success" | "info">(
    "info"
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  const handleLogin = async () => {
    if (!inputEmail || !inputPassword) {
      setAlertType("error");
      setAlertMessage("Email e senha não podem estar vazios.");
      return;
    }

    let retryCount = 0;
    const maxRetries = 2;
    setLoading(true);

    while (retryCount < maxRetries) {
      try {
        const response = await loginService(inputEmail, inputPassword);

        if (response) {
          setAlertMessage(
            "Login realizado com sucesso! Redirecionando pra home..."
          );
          setAlertType("success");

          const { accessToken } = response;
          const result = await saveEncryptedToken(accessToken.jwt);

          if (result !== 200) {
            return;
          }
          setTimeout(() => {
            router.push("/home");
          }, 2000);

          setLoading(false);
          return;
        }
      } catch (error: unknown) {
        retryCount += 1;
        if (error instanceof Error) {
          setAlertMessage(error.message);
          setAlertType("error");
        }
      }
    }

    setAlertMessage("Falha no login após várias tentativas. Tente novamente.");
    setAlertType("error");
    setLoading(false);
  };

  return (
    <div className="w-4/6 bg-white flex flex-col justify-center items-center gap-2.5 border-l-2 border-gray-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] shadow-[#898686]">
      <div className="text-5xl font-semibold text-green text-center">
        <p>Bem-vindo de</p>
        <p>volta!</p>
      </div>
      <InputField
        type="email"
        id="email"
        placeholder="Email"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
      />
      <InputField
        type="password"
        id="password"
        placeholder="Senha"
        value={inputPassword}
        onChange={(e) => setInputPassword(e.target.value)}
      />
      <div className="w-2/6 h-12 flex items-center justify-center">
        {" "}
        {/* Added container for button/spinner */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Button
            type="button"
            title="Entrar"
            onClick={handleLogin}
            className="w-full focus:outline-none text-white bg-green hover:bg-green800 focus:ring-4 focus:ring-green300 font-medium rounded-lg text-base px-5 py-2.5"
            disabled={loading}
          />
        )}
      </div>
      {alertMessage && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
};

const Login = () => (
  <main>
    <div className="flex w-full h-screen sm:px-5 md:px-10 lg:px-20 xl:px-40 sm:py-1.5 md:py-3.5 lg:py-7 xl:py-20 bg-bgWhite">
      <MainContent />
      <SidebarContent
        title="ORGANIZA"
        description="Cadastre uma conta para você"
        buttonText="Cadastre-se"
        buttonLink="/cadastro"
      />
    </div>
  </main>
);

export default Login;
