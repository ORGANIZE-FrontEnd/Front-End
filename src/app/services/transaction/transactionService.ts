import { getUserIdFromJwt } from "@/app/atoms/useDecodeJwt";
import { Transaction } from "@/app/types/Types";
import { AxiosError, AxiosResponse } from "axios";
import api from "../index";

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

export const createTransaction = async (
  description: string,
  price: number,
  category: string,
  startDate: string,
  isRecurring: boolean,
  recurrenceType: string,
  transactionType: "expense" | "income"
): Promise<{
  status: "success" | "error";
  message: string;
  data?: Transaction;
}> => {
  const userId = getUserIdFromJwt();
  const request = api.post<Transaction>(`/transactions/${userId}`, {
    description,
    price,
    category,
    startDate,
    isRecurring,
    recurrenceType,
    transactionType,
  });

  return handleApiRequest(
    request,
    "Transaction created successfully!",
    "Error creating transaction"
  );
};

export const getIncomes = async (): Promise<{
  status: "success" | "error";
  message: string;
  data?: Transaction[];
}> => {
  const userId = getUserIdFromJwt();
  const request = api.get<Transaction[]>(`/transactions/incomeList/${userId}`);
  return handleApiRequest(request, "", "Error obtaining incomes");
};

export const getExpenses = async (): Promise<{
  status: "success" | "error";
  message: string;
  data?: Transaction[];
}> => {
  const userId = getUserIdFromJwt();
  const request = api.get<Transaction[]>(`/transactions/expenseList/${userId}`);
  return handleApiRequest(request, "", "Error obtaining expenses");
};

export const getTransactionSummary = async (
  month: number,
  year: number
): Promise<{
  status: "success" | "error";
  message: string;
  data?: { totalExpenses: number; totalIncomes: number };
}> => {
  const userId = getUserIdFromJwt();
  const request = api.get<{ totalExpenses: number; totalIncomes: number }>(
    `/transactions/transactionSummary/${userId}/${month}/${year}`
  );

  return handleApiRequest(
    request,
    "Transaction summary retrieved successfully!",
    "Error obtaining transaction summary"
  );
};
