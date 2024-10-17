import Alert from "@/app/atoms/Alert";
import Button from "@/app/atoms/Button";
import InputField from "@/app/atoms/InputField";
import SidebarContent from "@/app/molecules/SideBarContent";
import { loginService } from "@/app/services/auth/loginService";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";

const MainContent = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "success" | "info">(
    "info"
  );
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

    try {
      const response = await loginService(inputEmail, inputPassword);

      if (response) {
        setAlertMessage(
          "Login realizado com sucesso! Redirecionando pra home..."
        );
        setAlertType("success");

        const { accessToken, refreshToken } = response;
        // need to check here a way to encript before storing JWTs
        Cookies.set("accessToken", accessToken.jwt, {
          expires: accessToken.expiresIn,
          secure: true,
          sameSite: "strict",
        });
        Cookies.set("refreshToken", refreshToken.jwt, {
          expires: refreshToken.expiresIn,
          secure: true,
          sameSite: "strict",
        });

        setTimeout(() => {
          router.push("/home");
        }, 2000);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setAlertMessage(error.message);
        setAlertType("error");
      }
    }
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
      <Button
        type="button"
        title="Entrar"
        onClick={handleLogin}
        className="w-2/6 focus:outline-none text-white bg-green hover:bg-green800 focus:ring-4 focus:ring-green300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2"
      />
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
