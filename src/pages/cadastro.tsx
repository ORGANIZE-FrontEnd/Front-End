import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { userAtom } from "@/app/atoms/authAtom";
import Button from "@/app/atoms/Button";
import InputField from "@/app/atoms/InputField";
import SidebarContent from "@/app/molecules/SideBarContent";
import { useState } from "react";
import useLogUser from "@/app/atoms/useLogUser";
import Alert from "@/app/atoms/Alert";

// Validation functions
const validators = {
  email: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  cpf: (cpf: string) => /^[0-9]{11}$/.test(cpf),
  phone: (phone: string) => /^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/.test(phone),
  password: (password: string) => password.trim() !== "",
  birthDate: (date: string) => date.trim() !== "",
};

// Validation messages
const validationMessages = {
  email: "Por favor, insira um e-mail válido.",
  cpf: "Por favor, insira um CPF válido com 11 dígitos.",
  phone:
    "Por favor, insira um número de telefone válido no formato brasileiro.",
  password: "Por favor, insira uma senha.",
  birthDate: "Por favor, insira uma data de nascimento.",
};

const MainContent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cpf: "",
    phone: "",
    birthDate: "",
  });
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"error" | "success" | "info">(
    "info"
  );
  const [, setUser] = useAtom(userAtom);
  const router = useRouter();
  useLogUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleValidation = () => {
    for (const [key, validator] of Object.entries(validators)) {
      if (!validator(formData[key as keyof typeof formData])) {
        return validationMessages[key as keyof typeof formData];
      }
    }
    return null;
  };

  const handleSignUp = () => {
    const validationError = handleValidation();
    if (validationError) {
      setAlertMessage(validationError);
      setAlertType("error");
      return;
    }

    // If all validations pass, save the user and show success alert
    setUser({ ...formData, isAuthenticated: false });
    setAlertMessage("Usuário criado com sucesso!");
    setAlertType("success");

    // Redirect to login after a brief delay
    setTimeout(() => {
      router.push("/login");
    }, 2000); // Adjust timing as needed
  };

  const handleCloseAlert = () => {
    setAlertMessage(null);
  };

  return (
    <>
      {alertMessage && (
        <Alert
          message={alertMessage}
          type={alertType}
          onClose={handleCloseAlert}
        />
      )}
      <div className="w-4/6 bg-white flex flex-col justify-center items-center gap-2.5 border-l-2 border-gray-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] shadow-[#898686]">
        <div className="text-5xl font-semibold text-green text-center">
          <p>Bem-vindo!</p>
        </div>
        <InputField
          type="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          type="password"
          id="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
        />
        <InputField
          type="text"
          id="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
        />
        <InputField
          type="text"
          id="phone"
          placeholder="Telefone"
          value={formData.phone}
          onChange={handleChange}
        />
        <InputField
          type="date"
          id="birthDate"
          placeholder="Data de Nacimento"
          value={formData.birthDate}
          onChange={handleChange}
        />
        <Button
          title="Cadastre-se"
          onClick={handleSignUp}
          className="w-1/2 focus:outline-none text-white bg-green hover:bg-green800 focus:ring-4 focus:ring-green300 font-medium rounded-lg text-base px-5 py-2.5 me-2 mb-2"
        />
      </div>
    </>
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
