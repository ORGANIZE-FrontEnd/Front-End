import { atom } from "jotai";

type User = {
  email: string;
  password: string;
  birthDate: string;
  cpf: string;
  phone: string;
  isAuthenticated: boolean;
};

export const userAtom = atom<User>({
  email: "",
  password: "",
  birthDate: "",
  cpf: "",
  phone: "",
  isAuthenticated: false,
});
