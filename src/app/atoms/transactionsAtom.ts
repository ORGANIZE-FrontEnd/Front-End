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

// Atoms to calculate current month's income and expenses
export const currentMonthIncomeAtom = atom((get) => {
  const transactions = get(transactionsAtom);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return transactions.incomes.reduce((total, transaction) => {
    const transactionDate = new Date(transaction.date);
    if (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    ) {
      return total + transaction.price;
    }
    return total;
  }, 0);
});

export const currentMonthExpenseAtom = atom((get) => {
  const transactions = get(transactionsAtom);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return transactions.expenses.reduce((total, transaction) => {
    const transactionDate = new Date(transaction.date);
    if (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    ) {
      return total + transaction.price;
    }
    return total;
  }, 0);
});
