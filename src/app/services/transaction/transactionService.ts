import { getUserIdFromJwt } from "@/app/atoms/useDecodeJwt";
import { Transaction } from "@/app/types/Types";
import { AxiosError } from "axios";
import api from "../index"; // Import your configured axios instance

export const createTransaction = async (
  description: string,
  price: number,
  category: string,
  startDate: string,
  isRecurring: boolean,
  recurrenceType: string,
  transactionType: "expense" | "income"
): Promise<{ status: "success" | "error"; message: string; data?: Transaction }> => {
  const userId = getUserIdFromJwt();

  try {
    const response = await api.post<Transaction>(
      `/transactions/${userId}`,
      {
        description,
        price,
        category,
        startDate,
        isRecurring,
        recurrenceType,
        transactionType,
      }
    );

    if (response.status === 201) {
      return {
        status: "success",
        message: "Transaction created successfully!",
        data: response.data
      };
    }

    return {
      status: "error",
      message: "An unexpected error occurred while creating the transaction."
    };
  } catch (error: unknown) {
    let errorMessage = "Unexpected error occurred.";
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || "Error creating transaction";
    }

    return {
      status: "error",
      message: errorMessage
    };
  }
};

export const getIncomes = async (): Promise<{ status: "success" | "error"; message: string; data?: Transaction[] }> => {
  const userId = getUserIdFromJwt();
  try {
    const response = await api.get(
      `/transactions/incomeList/${userId}`,
    );

    if (response.status === 200) {
      return {
        status: "success",
        message: "",
        data: response.data
      };
    }

    return {
      status: "error",
      message: "An unexpected error occurred while creating the transaction."
    };
  } catch (error: unknown) {
    let errorMessage = "Unexpected error occurred.";
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || "Error obtaining transaction";
    }

    return {
      status: "error",
      message: errorMessage
    };
  }
};

export const getExpenses = async (): Promise<{ status: "success" | "error"; message: string; data?: Transaction[] }> => {
  const userId = getUserIdFromJwt();
  try {
    const response = await api.get(
      `/transactions/expenseList/${userId}`,
    );

    if (response.status === 200) {
      return {
        status: "success",
        message: "",
        data: response.data
      };
    }

    return {
      status: "error",
      message: "An unexpected error occurred while creating the transaction."
    };
  } catch (error: unknown) {
    let errorMessage = "Unexpected error occurred.";
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.message || "Error obtaining transaction";
    }

    return {
      status: "error",
      message: errorMessage
    };
  }
};
