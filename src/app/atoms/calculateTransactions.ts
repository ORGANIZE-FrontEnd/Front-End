import formatDate from "./formatDate";
import { FilterType } from "./SummaryTable";

export const calculateSummary = (
  transactions: any,
  currentDate: Date,
  filterType: FilterType
) => {
  const selectedDate = new Date(currentDate);
  const normalizeDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    );
  };

  let incomesByPeriod: { [key: string]: number } = {};
  let expensesByPeriod: { [key: string]: number } = {};
  let resultsByPeriod: { [key: string]: number } = {};
  let balanceByPeriod: { [key: string]: number } = {};

  // Cumulative balance calculation
  const calculateCumulativeBalance = (transactions: any, upToDate: Date) => {
    let cumulativeBalance = 0;

    transactions.incomes.forEach((item: { date: string; price: number }) => {
      const itemDate = normalizeDate(item.date);
      if (itemDate <= upToDate) {
        cumulativeBalance += item.price;
      }
    });

    transactions.expenses.forEach((item: { date: string; price: number }) => {
      const itemDate = normalizeDate(item.date);
      if (itemDate <= upToDate) {
        cumulativeBalance -= item.price;
      }
    });

    return cumulativeBalance;
  };

  if (filterType === "day") {
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        day
      );
      const dayLabel = formatDate(dayDate.toISOString(), "dayMonth");

      incomesByPeriod[dayLabel] = transactions.incomes.reduce(
        (sum: number, item: { date: string; price: number }) => {
          const itemDate = normalizeDate(item.date);
          return itemDate.getDate() === day &&
            itemDate.getMonth() === selectedDate.getMonth() &&
            itemDate.getFullYear() === selectedDate.getFullYear()
            ? sum + item.price
            : sum;
        },
        0
      );

      expensesByPeriod[dayLabel] = transactions.expenses.reduce(
        (sum: number, item: { date: string; price: number }) => {
          const itemDate = normalizeDate(item.date);
          return itemDate.getDate() === day &&
            itemDate.getMonth() === selectedDate.getMonth() &&
            itemDate.getFullYear() === selectedDate.getFullYear()
            ? sum + item.price
            : sum;
        },
        0
      );

      resultsByPeriod[dayLabel] =
        incomesByPeriod[dayLabel] - expensesByPeriod[dayLabel];
      balanceByPeriod[dayLabel] = calculateCumulativeBalance(
        transactions,
        dayDate
      );
    }
  } else if (filterType === "week") {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = new Date(firstDayOfMonth);
    firstDayOfWeek.setDate(
      firstDayOfMonth.getDate() - firstDayOfMonth.getDay()
    );
    let currentWeekStart = new Date(firstDayOfWeek);

    while (
      currentWeekStart.getMonth() === month ||
      currentWeekStart <= firstDayOfMonth
    ) {
      const weekEnd = new Date(currentWeekStart);
      weekEnd.setDate(currentWeekStart.getDate() + 6);
      const weekLabel = `${formatDate(currentWeekStart.toISOString(), "dayMonth")} à ${formatDate(weekEnd.toISOString(), "dayMonth")}`;

      incomesByPeriod[weekLabel] = transactions.incomes.reduce(
        (sum: number, item: { date: string; price: number }) => {
          const itemDate = normalizeDate(item.date);
          return itemDate >= currentWeekStart && itemDate <= weekEnd
            ? sum + item.price
            : sum;
        },
        0
      );

      expensesByPeriod[weekLabel] = transactions.expenses.reduce(
        (sum: number, item: { date: string; price: number }) => {
          const itemDate = normalizeDate(item.date);
          return itemDate >= currentWeekStart && itemDate <= weekEnd
            ? sum + item.price
            : sum;
        },
        0
      );

      resultsByPeriod[weekLabel] =
        incomesByPeriod[weekLabel] - expensesByPeriod[weekLabel];
      balanceByPeriod[weekLabel] = calculateCumulativeBalance(
        transactions,
        weekEnd
      );

      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }
  } else if (filterType === "month") {
    const monthLabel = formatDate(selectedDate.toISOString(), "monthYear");
    incomesByPeriod[monthLabel] = transactions.incomes.reduce(
      (sum: number, item: { date: string; price: number }) => {
        const itemDate = normalizeDate(item.date);
        return itemDate.getMonth() === selectedDate.getMonth() &&
          itemDate.getFullYear() === selectedDate.getFullYear()
          ? sum + item.price
          : sum;
      },
      0
    );

    expensesByPeriod[monthLabel] = transactions.expenses.reduce(
      (sum: number, item: { date: string; price: number }) => {
        const itemDate = normalizeDate(item.date);
        return itemDate.getMonth() === selectedDate.getMonth() &&
          itemDate.getFullYear() === selectedDate.getFullYear()
          ? sum + item.price
          : sum;
      },
      0
    );

    resultsByPeriod[monthLabel] =
      incomesByPeriod[monthLabel] - expensesByPeriod[monthLabel];
    balanceByPeriod[monthLabel] = calculateCumulativeBalance(
      transactions,
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)
    );
  }

  return {
    incomesByPeriod,
    expensesByPeriod,
    resultsByPeriod,
    balanceByPeriod,
    periods: Object.keys(incomesByPeriod),
  };
};
