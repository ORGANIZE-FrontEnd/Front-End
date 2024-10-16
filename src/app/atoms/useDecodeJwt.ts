import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types/Types";
import Cookies from "js-cookie";

export const getUserIdFromJwt = (): string | null => {
  const token = Cookies.get("accessToken"); // Retrieve token from cookie

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    console.log("Decoded Token:", decodedToken); // View the decoded token
    return decodedToken.jti;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};
