import { LoginResponse } from "@/app/types/Types";
import axios, { AxiosError } from "axios";
import { baseURL } from "..";

export const loginService = async (
  email: string,
  password: string
): Promise<LoginResponse | null> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${baseURL}/users/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

    if (response.status === 200) {
      return response.data;
    }

    return null;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || "Erro ao logar o usuário.";
      throw new Error(errorMessage);
    }

    throw new Error("Erro inesperado ao logar.");
  }
};

export const getDecryptedToken = async () => {
  try {
    const response = await axios.get("/api/getCookie");
    const { decryptedToken } = response.data;
    return decryptedToken;
  } catch (error) {
    console.error("Error fetching encrypted token:", error);
    return "";
  }
};
