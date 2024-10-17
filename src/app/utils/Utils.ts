export const removeAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ç/g, "c")         
      .replace(/Ç/g, "C") 
      .replace(/ñ/g, "n")
      .replace(/Ñ/g, "N");
  };
  