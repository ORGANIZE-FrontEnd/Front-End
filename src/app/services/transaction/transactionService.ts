import { Transaction } from "@/app/types/Types";
import api from "..";
import { getAuthUserId, handleApiRequest } from "../utils/apiUtils";

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
  const userId = getAuthUserId(); // Use the common utility function
  const request = api.post<Transaction>(`/transactions/${userId}`, {
    description,
    price,
    category,
    startDate,
    isRecurring,
    recurrenceType,
    transactionType,
  });

  return handleApiRequest(request, "Transaction created successfully!", "Error creating transaction");
};

export const getIncomes = async (): Promise<{
  status: "success" | "error";
  message: string;
  data?: Transaction[];
}> => {
  const userId = getAuthUserId(); // Use the common utility function
  const request = api.get<Transaction[]>(`/transactions/incomeList/${userId}`);
  return handleApiRequest(request, "", "Error obtaining incomes");
};

export const getExpenses = async (): Promise<{
  status: "success" | "error";
  message: string;
  data?: Transaction[];
}> => {
  const userId = getAuthUserId(); // Use the common utility function
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
  const userId = getAuthUserId(); // Use the common utility function
  const request = api.get<{ totalExpenses: number; totalIncomes: number }>(
    `/transactions/transactionSummary/${userId}/${month}/${year}`
  );

  return handleApiRequest(request, "Transaction summary retrieved successfully!", "Error obtaining transaction summary");
};
