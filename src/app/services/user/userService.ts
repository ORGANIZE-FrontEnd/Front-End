import { GetUserByIdReponse, RefreshTokenResponse } from "@/app/types/Types";
import { AxiosResponse } from "axios";
import api from "..";
import { saveEncryptedToken } from "../auth/cookieService";
import { getAuthUserId, handleApiRequest } from "../utils/apiUtils";

export const getUserById = async (): Promise<{
  status: "success" | "error";
  message: string;
  data?: GetUserByIdReponse | null;
}> => {
  const userId = await getAuthUserId();
  const request = api.get<GetUserByIdReponse>(`/users/${userId}`);
  return handleApiRequest(
    request,
    "User retrieved successfully",
    "Error fetching user"
  );
};

export const logoutUser = async (): Promise<{
  status: "success" | "error";
  message: string;
}> => {
  const request = api.post<string>("users/logout");
  return handleApiRequest(
    request,
    "User logged out successfully",
    "Failed to log out"
  );
};

export const refreshAccessToken = async (): Promise<any> => {
  try {
    const response: AxiosResponse<RefreshTokenResponse> = await api.post(
      "users/refresh-token"
    );

    if (response.status === 201) {
      const newAccessToken = response.data.jwt;
      await saveEncryptedToken(newAccessToken);
      return newAccessToken;
    }
  } catch (error) {
    console.error("Refresh token failed:", error);
  }
};
