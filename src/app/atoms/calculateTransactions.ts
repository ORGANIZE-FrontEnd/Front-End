import formatDate from "./formatDate";
import { FilterType } from "./SummaryTable";

export const calculateSummary = (
  incomes: any[],
  expenses: any[],
  currentDate: Date,
  filterType: FilterType
) => {
  const selectedDate = new Date(currentDate);
  const normalizeDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  let incomesByPeriod: { [key: string]: number } = {};
  let expensesByPeriod: { [key: string]: number } = {};
  let resultsByPeriod: { [key: string]: number } = {};
  let balanceByPeriod: { [key: string]: number } = {};

  const calculateCumulativeBalance = (upToDate: Date) => {
    let cumulativeBalance = 0;

    incomes.forEach((item: { startDate: string; price: number }) => {
      const itemDate = normalizeDate(item.startDate);
      if (itemDate <= upToDate) {
        cumulativeBalance += item.price;
      }
    });

    expenses.forEach((item: { startDate: string; price: number }) => {
      const itemDate = normalizeDate(item.startDate);
      if (itemDate <= upToDate) {
        cumulativeBalance -= item.price;
      }
    });

    return cumulativeBalance;
  };

  // Handle different filter types
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

      incomesByPeriod[dayLabel] = incomes.reduce((sum, item) => {
        const itemDate = normalizeDate(item.startDate); // Use startDate
        return itemDate.getDate() === day &&
          itemDate.getMonth() === selectedDate.getMonth() &&
          itemDate.getFullYear() === selectedDate.getFullYear()
          ? sum + item.price
          : sum;
      }, 0);

      expensesByPeriod[dayLabel] = expenses.reduce((sum, item) => {
        const itemDate = normalizeDate(item.startDate); // Use startDate
        return itemDate.getDate() === day &&
          itemDate.getMonth() === selectedDate.getMonth() &&
          itemDate.getFullYear() === selectedDate.getFullYear()
          ? sum + item.price
          : sum;
      }, 0);

      resultsByPeriod[dayLabel] =
        incomesByPeriod[dayLabel] - expensesByPeriod[dayLabel];
      balanceByPeriod[dayLabel] = calculateCumulativeBalance(dayDate);
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

      incomesByPeriod[weekLabel] = incomes.reduce((sum, item) => {
        const itemDate = normalizeDate(item.startDate); // Use startDate
        return itemDate >= currentWeekStart && itemDate <= weekEnd
          ? sum + item.price
          : sum;
      }, 0);

      expensesByPeriod[weekLabel] = expenses.reduce((sum, item) => {
        const itemDate = normalizeDate(item.startDate); // Use startDate
        return itemDate >= currentWeekStart && itemDate <= weekEnd
          ? sum + item.price
          : sum;
      }, 0);

      resultsByPeriod[weekLabel] =
        incomesByPeriod[weekLabel] - expensesByPeriod[weekLabel];
      balanceByPeriod[weekLabel] = calculateCumulativeBalance(weekEnd);

      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    }
  } else if (filterType === "month") {
    const monthLabel = formatDate(selectedDate.toISOString(), "monthYear");
    incomesByPeriod[monthLabel] = incomes.reduce((sum, item) => {
      const itemDate = normalizeDate(item.startDate); // Use startDate
      return itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getFullYear() === selectedDate.getFullYear()
        ? sum + item.price
        : sum;
    }, 0);

    expensesByPeriod[monthLabel] = expenses.reduce((sum, item) => {
      const itemDate = normalizeDate(item.startDate); // Use startDate
      return itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getFullYear() === selectedDate.getFullYear()
        ? sum + item.price
        : sum;
    }, 0);

    resultsByPeriod[monthLabel] =
      incomesByPeriod[monthLabel] - expensesByPeriod[monthLabel];
    balanceByPeriod[monthLabel] = calculateCumulativeBalance(selectedDate);
  }

  return {
    incomesByPeriod,
    expensesByPeriod,
    resultsByPeriod,
    balanceByPeriod,
    periods: Object.keys(incomesByPeriod),
  };
};
