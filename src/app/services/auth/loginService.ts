import { LoginResponse } from "@/app/types/Types";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { baseURL } from "..";
import { decryptToken } from "./cookieService";

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
        withCredentials: true, // This is required to handle the cookie
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
  const secretKeyBase64 = process.env.SECRET_KEY || "";
  const encryptedToken = Cookies.get("accessToken");

  if (!encryptedToken) {
    console.error("No token found in cookies");
    return null;
  }

  try {
    return await decryptToken(encryptedToken, secretKeyBase64);
  } catch (error) {
    console.error("Error decrypting token:", error);
    return null;
  }
};
