import { getUserById } from "../services/user/userService";

const logUser = async () => {
  try {
    const response = await getUserById();

    if (response.status === "success") {
      console.log("User data fetched successfully:", response);
    }

    if (response.status === "error") {
      console.log("error getting user data:", response);
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data || "Erro no serviço ao obter dados do usuário";
    console.error(errorMessage);
  }
};

export default logUser;
