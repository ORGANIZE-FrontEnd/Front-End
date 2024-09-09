import Button from "@/app/atoms/Button";
import InputField from "@/app/atoms/InputField";
import SidebarContent from "@/app/molecules/SideBarContent";
import React from "react";

const MainContent = () => (
  <div className="w-4/6 bg-white flex flex-col justify-center items-center gap-2.5 border-l-2 border-gray-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] shadow-[#898686]">
    <div className="text-5xl font-semibold text-green text-center">
      <p>Bem-vindo!</p>
    </div>
    <div className="text-lg font-normal text-center">
      <p>Acesse sua conta agora mesmo</p>
    </div>
    <InputField type="email" id="email" placeholder="Email" />
    <InputField type="password" id="password" placeholder="Senha" />
    <InputField type="text" id="cpf" placeholder="CPF" />
    <InputField type="tel" id="phone" placeholder="Telefone" />
    <InputField type="text" id="birthDate" placeholder="Data de Nacimento" />
    <Button
      title={"Cadastre-se"}
      buttonLink={"/login"}
      className="focus:outline-none text-white bg-green hover:bg-green800 focus:ring-4 focus:ring-green300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2 w-1/2"
    ></Button>
  </div>
);

const Cadastro = () => (
  <main>
    <div className="flex w-full h-screen sm:px-5 md:px-10 lg:px-20 xl:px-40 sm:py-1.5 md:py-3.5 lg:py-7 xl:py-20 bg-bgWhite">
      <MainContent />
      <SidebarContent
        title={"ORGANIZA"}
        description={"Acesse sua conta agora mesmo"}
        buttonText={"Login"}
        buttonLink={"/login"}
      />
    </div>
  </main>
);

export default Cadastro;
