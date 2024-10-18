import { getUserById } from "../services/user/userService";

const logUser = async () => {
  try {
    const response = await getUserById();

    if (response) {
      console.log("User data fetched successfully:", response);
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.data || "Erro no serviço ao obter dados do usuário";
    console.error(errorMessage);
  }
};

export default logUser;
