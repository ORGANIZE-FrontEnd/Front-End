import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { userAtom } from "@/app/atoms/authAtom";
import Button from "@/app/atoms/Button";
import InputField from "@/app/atoms/InputField";
import SidebarContent from "@/app/molecules/SideBarContent";
import React, { useState } from "react";

const MainContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useAtom(userAtom);
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    // Save email and password to Jotai
    setUser({ email, password, birthDate, cpf, phone, isAuthenticated });
    // Redirect to login page
    router.push("/login");
  };

  return (
    <div className="w-4/6 bg-white flex flex-col justify-center items-center gap-2.5 border-l-2 border-gray-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] shadow-[#898686]">
      <div className="text-5xl font-semibold text-green text-center">
        <p>Bem-vindo!</p>
      </div>
      <InputField
        type="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        id="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        type="text"
        id="cpf"
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
      />
      <InputField
        type="text"
        id="phone"
        placeholder="Telefone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <InputField
        type="date"
        id="birthDate"
        placeholder="Data de Nacimento"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <Button
        title="Cadastre-se"
        onClick={handleSignUp}
        className="w-1/2 focus:outline-none text-white bg-green hover:bg-green800 focus:ring-4 focus:ring-green300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2"
      />
    </div>
  );
};

const Cadastro = () => (
  <main>
    <div className="flex w-full h-screen sm:px-5 md:px-10 lg:px-20 xl:px-40 sm:py-1.5 md:py-3.5 lg:py-7 xl:py-20 bg-bgWhite">
      <MainContent />
      <SidebarContent
        title="ORGANIZA"
        description="Acesse sua conta agora mesmo"
        buttonText="Login"
        buttonLink="/login"
      />
    </div>
  </main>
);

export default Cadastro;
