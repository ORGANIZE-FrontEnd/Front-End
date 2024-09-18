import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Create atoms with localStorage persistence
export const balanceAtom = atomWithStorage<number>("balance", 0);
export const transactionsAtom = atomWithStorage<{
  incomes: any[];
  expenses: any[];
}>("transactions", { incomes: [], expenses: [] });

export const totalIncomeAtom = atom((get) => {
  const transactions = get(transactionsAtom);
  return transactions.incomes.reduce(
    (total, transaction) => total + transaction.price,
    0
  );
});

// Derived atom to calculate total expenses
export const totalExpensesAtom = atom((get) => {
  const transactions = get(transactionsAtom);
  return transactions.expenses.reduce(
    (total, transaction) => total + transaction.price,
    0
  );
});
