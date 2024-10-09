import { useAtom } from "jotai";
import { userAtom } from "@/app/atoms/authAtom";
import { useRouter } from "next/router";
import Button from "@/app/atoms/Button";
import InputField from "@/app/atoms/InputField";
import SidebarContent from "@/app/molecules/SideBarContent";
import React, { useEffect, useState } from "react";
import useLogUser from "@/app/atoms/useLogUser";
import Alert from "@/app/atoms/Alert";
import axios, { AxiosError } from "axios";

const MainContent = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [user, setUser] = useAtom(userAtom);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "success" | "info">(
    "info"
  );
  const router = useRouter();
  useLogUser();

  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  useEffect(() => {
    if (user.isAuthenticated) {
      router.push("/home");
    }
  }, [user, router]);

  const handleLogin = async () => {
    if (!inputEmail || !inputPassword) {
      setAlertType("error");
      setAlertMessage("Email e senha não podem estar vazios.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email: inputEmail,
          password: inputPassword,
        }
      );

      if (response.status === 200) {
        setAlertMessage(
          "Login realizado com sucesso! Redirecionando pra home.. "
        );
        setAlertType("success");
        const { token } = response.data;
        document.cookie = `X-ORGANIZA-JWT=${token}; path=/; max-age=3600`;

        setTimeout(() => {
          router.push("/home");
        }, 2000);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || "Erro ao criar o usuário.";
        setAlertMessage(errorMessage);
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
