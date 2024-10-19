import { GetUserByIdReponse } from "@/app/types/Types";
import Cookies from "js-cookie";
import api from "..";
import { getAuthUserId, handleApiRequest } from "../utils/apiUtils";

export const getUserById = async (): Promise<{
  status: "success" | "error";
  message: string;
  data?: GetUserByIdReponse | null;
}> => {
  const userId = await getAuthUserId();
  const request = api.get<GetUserByIdReponse>(`/users/${userId}`);
  return handleApiRequest(request, "User retrieved successfully", "Error fetching user");
};
