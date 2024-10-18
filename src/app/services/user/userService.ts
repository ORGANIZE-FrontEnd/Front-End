import { getUserByIdReponse } from "@/app/types/Types";
import Cookies from "js-cookie";
import api from "..";
import { getAuthUserId, handleApiRequest } from "../utils/apiUtils";

export const getUserById = async (): Promise<{
  status: "success" | "error";
  message: string;
  data?: getUserByIdReponse | null;
}> => {
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    return {
      status: "error",
      message: "User not authenticated",
    };
  }

  const userId = getAuthUserId(); // Use the common utility function
  const request = api.get<getUserByIdReponse>(`/users/${userId}`);
  return handleApiRequest(request, "User retrieved successfully", "Error fetching user");
};
