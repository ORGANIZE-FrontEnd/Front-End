export const formatDate = (
  dateString: string,
  formatType:
    | "default"
    | "monthOnly"
    | "monthYear"
    | "dayMonth"
    | "dayMonthYear" = "default" // Add "dayMonthYear"
) => {
  const date = new Date(dateString);

  const localDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  switch (formatType) {
    case "monthOnly":
      return monthNames[localDate.getMonth()];

    case "monthYear":
      return `${monthNames[localDate.getMonth()]} ${localDate.getFullYear()}`;

    case "dayMonth": {
      const day = localDate.getDate().toString().padStart(2, "0");
      const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
      return `${day}/${month}`;
    }

    case "dayMonthYear": {
      const fullDay = localDate.getDate().toString().padStart(2, "0");
      const fullMonth = (localDate.getMonth() + 1).toString().padStart(2, "0");
      const year = localDate.getFullYear();
      return `${fullDay}/${fullMonth}/${year}`;
    }

    case "default":
    default: {
      const defaultDay = localDate.getDate().toString().padStart(2, "0");
      const defaultMonth = (localDate.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const defaultYear = localDate.getFullYear();
      return `${defaultDay}/${defaultMonth}/${defaultYear}`;
    }
  }
};

export default formatDate;
// Example usages:
// const dateString = "2024-09-18";
// formatDate(dateString); // Outputs: 18/09/2024
// formatDate(dateString, "monthOnly"); // Outputs: Setembro
// formatDate(dateString, "dayMonth"); // Outputs: 18/09
