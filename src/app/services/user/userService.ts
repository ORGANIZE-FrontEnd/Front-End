import { getUserIdFromJwt } from "@/app/atoms/useDecodeJwt";
import { getUserByIdReponse } from "@/app/types/Types";
import Cookies from "js-cookie";
import router from "next/router";
import api from "../index";

export const getUserById = async () => {
  const userId = getUserIdFromJwt();
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    return router.push("/login");
  }
  try {
    const response: getUserByIdReponse = await api.get(`/users/${userId}`);
    return response;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
};
