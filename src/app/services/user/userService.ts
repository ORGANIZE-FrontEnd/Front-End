import { getUserIdFromJwt } from "@/app/atoms/useDecodeJwt";
import { getUserByIdReponse } from "@/app/types/Types";
import { AxiosError, AxiosResponse } from "axios";
import api from "..";
import Cookies from "js-cookie";

// Generic function for handling API requests
const handleApiRequest = async <T>(
  request: Promise<AxiosResponse<T>>,
  successMessage: string,
  errorMessage: string
): Promise<{ status: "success" | "error"; message: string; data?: T }> => {
  try {
    const response = await request;

    if (response.status === 200 || response.status === 201) {
      return {
        status: "success",
        message: successMessage,
        data: response.data,
      };
    }

    return {
      status: "error",
      message: "An unexpected error occurred.",
    };
  } catch (error: unknown) {
    let errorMsg = errorMessage;
    if (error instanceof AxiosError) {
      errorMsg = error.response?.data?.message || errorMessage;
    }

    return {
      status: "error",
      message: errorMsg,
    };
  }
};

export const getUserById = async (): Promise<{
  status: "success" | "error";
  message: string;
  data?: getUserByIdReponse | null; // Change here to directly return the data type
}> => {
  const userId = getUserIdFromJwt();
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    return {
      status: "error",
      message: "User not authenticated",
    };
  }

  const request = api.get<getUserByIdReponse>(`/users/${userId}`); // Adjusted request type
  return handleApiRequest(request, "User retrieved successfully", "Error fetching user");
};
