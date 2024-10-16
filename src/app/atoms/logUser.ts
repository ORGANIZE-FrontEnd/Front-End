import axios, { AxiosError } from "axios";
import router from "next/router";
import Cookies from "js-cookie"; // Import Cookies to access cookies
import { getUserByIdReponse } from "../types/Types";
import { getUserIdFromJwt } from "./useDecodeJwt";

const logUser = async () => {
  const userId = getUserIdFromJwt();
  const accessToken = Cookies.get("accessToken");

  // Check if the access token exists
  if (!accessToken) {
    return router.push("/login"); // Redirect if no token
  }

  try {
    const response = await axios.get<getUserByIdReponse>(
      `http://localhost:8080/api/users/${userId}`,
      {
        headers: {
          "X-ORGANIZA-JWT": accessToken,
        },
      }
    );

    if (response.status === 200) {
      console.log("User data fetched successfully:", response.data);
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message ||
        "Erro no servico obter dados do usuario";
    }
  }
};

export default logUser;
