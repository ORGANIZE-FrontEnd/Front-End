export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR").format(date); // Formats date as dd/mm/yyyy
};

// Example usage
// const dateString = "2024-09-18";
// Outputs: 18/09/2024

export default formatDate;
