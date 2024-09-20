export const formatDate = (
  dateString: string,
  formatType: "default" | "monthOnly" | "monthYear" | "dayMonth" = "default"
) => {
  const date = new Date(dateString);

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
      return monthNames[date.getMonth()];

    case "monthYear":
      return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

    case "dayMonth":
      const day = date.getDate().toString().padStart(2, "0");
      const month = date.getMonth().toString().padStart(2, "0"); // Get the first three letters of the month
      return `${day}/${month}`;

    case "default":
    default:
      // Format date as dd/mm/yyyy
      const fullDay = date.getDate().toString().padStart(2, "0");
      const monthNumber = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${fullDay}/${monthNumber}/${year}`;
  }
};

export default formatDate;

// Example usages:
// const dateString = "2024-09-18";
// formatDate(dateString); // Outputs: 18/09/2024
// formatDate(dateString, "monthOnly"); // Outputs: Setembro
// formatDate(dateString, "dayMonth"); // Outputs: 18/09
