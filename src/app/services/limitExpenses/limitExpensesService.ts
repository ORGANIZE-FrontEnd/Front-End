import api from "..";
import { getAuthUserId, handleApiRequest } from "../utils/apiUtils";

export const createExpenseLimit = async (
  limitValue: number,
  category: string,
  month: string
): Promise<{
  status: "success" | "error";
  message: string;
  data?: Date;
}> => {
  const userId = await getAuthUserId();

  const request = api.post(`/expenseLimits/${userId}`, {
    limitValue,
    category,
    month,
  });

  return handleApiRequest(
    request,
    "Expense limit created successfully!",
    "Error creating expense limit"
  );
};

export const getMonthlyLimits = async (
  month: string
): Promise<{
  status: "success" | "error";
  message: string;
  data?: any;
}> => {
  const userId = await getAuthUserId();

  const request = api.get(`/expenseLimits/${userId}`, {
    params: { month },
  });

  return handleApiRequest(
    request,
    "Fetched monthly expense limits successfully!",
    "Error fetching monthly expense limits"
  );
};

/**
 * Update an existing expense limit.
 * @param limitId The ID of the expense limit to update.
 * @param limitValue The updated limit value.
 */
export const updateExpenseLimit = async (
  limitId: string,
  limitValue: number
): Promise<{
  status: "success" | "error";
  message: string;
  data?: any;
}> => {
  const userId = await getAuthUserId();

  const request = api.put(`/expenseLimits/${userId}/${limitId}`, {
    limitValue,
  });

  return handleApiRequest(
    request,
    "Expense limit updated successfully!",
    "Error updating expense limit"
  );
};
