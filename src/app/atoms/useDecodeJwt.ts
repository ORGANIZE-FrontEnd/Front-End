import { jwtDecode } from "jwt-decode";
import { getDecryptedToken } from "../services/auth/loginService";
import { DecodedToken } from "../types/Types";

export const getUserIdFromJwt = async (): Promise<string | null> => {
  const token = await getDecryptedToken();

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken.jti;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

export const isTokenExpired = async (): Promise<boolean | null> => {
  const token = await getDecryptedToken();

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const expirationTime = decodedToken.exp * 1000;
    return Date.now() > expirationTime;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};
