// src/utils/apiUtils.ts
import { getUserIdFromJwt } from "@/app/atoms/useDecodeJwt";
import { AxiosError, AxiosResponse } from "axios";

export const handleApiRequest = async <T>(
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

export const getAuthUserId = (): string => {
    const userId = getUserIdFromJwt();
    return userId ?? "";
  };