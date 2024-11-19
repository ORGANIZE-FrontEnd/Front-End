import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import FormFooter from "./FormFooter";
import { balanceAtom, transactionsAtom } from "@/app/atoms/transactionsAtom";

type ModalFormProps = {
  type: "income" | "expense";
  onClose: () => void;
};

const ModalForm: React.FC<ModalFormProps> = ({ type, onClose }) => {
  const [today, setToday] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState(today);
  const [card, setCard] = useState("Conta Inicial");
  const [category, setCategory] = useState("Select category");
  const [isFixedExpense, setIsFixedExpense] = useState(false);
  const [isPurchasedInInstallments, setIsPurchasedInInstallments] =
    useState(false);
  const [fixedExpenseType, setFixedExpenseType] = useState("");
  const [installmentCount, setInstallmentCount] = useState("");

  const [balance, setBalance] = useAtom(balanceAtom);
  const [transactions, setTransactions] = useAtom(transactionsAtom);
  const paymentTypes = [
    "Semanal",
    "Quinzenal",
    "Mensal",
    "Trimestral",
    "Anual",
  ];
  const expenseCategories = [
    "Alimentação",
    "Transporte",
    "Saúde",
    "Educação",
    "Lazer",
    "Outros",
  ];
  const receiptsCategory = [
    "Empréstimos",
    "Investimentos",
    "Salário",
    "Outras receitas",
  ];
  const categories = type === "income" ? receiptsCategory : expenseCategories;

  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    setToday(currentDate);
    setSelectedDate(currentDate);
  }, []);

  const handleCheckboxFixedExpense = (event: {
    target: { checked: boolean };
  }) => {
    setIsFixedExpense(event.target.checked);
  };

  const handleCheckboxInstallmentsChange = (event: {
    target: { checked: boolean };
  }) => {
    setIsPurchasedInInstallments(event.target.checked);
  };

  const generateOptionsInstallmentsOptions = () => {
    return Array.from({ length: 64 }, (_, index) => (
      <option key={index + 1} value={index + 1}>
        {index + 1}
      </option>
    ));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const parsedPrice = parseFloat(price);

    const transactionData = {
      type,
      description,
      price: parsedPrice,
      date: selectedDate,
      card,
      category,
      isFixedExpense,
      fixedExpenseType,
      isPurchasedInInstallments,
      installmentCount,
    };

    let newBalance = balance;
    if (type === "expense") {
      newBalance -= parsedPrice;
      setTransactions((prev) => ({
        ...prev,
        expenses: [...prev.expenses, transactionData],
      }));
    } else {
      newBalance += parsedPrice;
      setTransactions((prev) => ({
        ...prev,
        incomes: [...prev.incomes, transactionData],
      }));
    }

    setBalance(newBalance);

    console.log("Transaction Submitted:", transactionData);
    console.log("Updated Balance:", newBalance);
    console.log("new array of transactions: ", transactions);

    onClose();
  };

  return (
    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
      <div className="grid gap-4 mb-4 grid-cols-2">
        <div className="col-span-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-grey "
          >
            Descrição
          </label>
          <input
            type="text"
            name="description"
            id="description"
            className="bg-gray-50 border border-gray-300 text-grey text-sm rounded-sm focus:ring-green focus:border-green block w-full p-2.5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-grey "
          >
            Valor
          </label>
          <input
            type="number"
            name="price"
            id="price"
            className="bg-gray-50 border border-gray-300 text-grey text-sm rounded-sm focus:ring-green focus:border-green block w-full p-2.5"
            placeholder="R$ 0,00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-grey focus:ring-green focus:border-green "
          >
            Data
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="bg-gray-50 border border-gray-300 text-grey text-sm rounded-sm focus:ring-green focus:border-green block w-full p-2.5"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="card"
            className="block mb-2 text-sm font-medium text-white "
          >
            Conta / Cartão
          </label>
          <select
            id="card"
            className="bg-gray-50 border border-gray-300 text-grey text-sm rounded-sm focus:ring-green focus:border-green block w-full p-2.5"
            value={card}
            onChange={(e) => setCard(e.target.value)}
          >
            <option value="Conta Inicial">Conta Inicial</option>
            <option value="Conta">Conta Inicial</option>
          </select>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-grey "
          >
            Categoria
          </label>
          <select
            id="category"
            className="bg-gray-50 border border-gray-300 text-grey text-sm rounded-sm focus:ring-green focus:border-green block w-full p-2.5"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <div>
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={isFixedExpense}
                  onChange={handleCheckboxFixedExpense}
                  className="w-4 h-4 text-green bg-gray-100 border-gray-300 rounded-lg focus:ring-green "
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-sm font-medium text-grey dark:text-gray-300"
                >
                  {type === "income"
                    ? "é uma receita fixa "
                    : "é uma despesa fixa "}
                </label>
              </div>
              {isFixedExpense && (
                <select
                  className="bg-gray-50 border border-gray-300 text-grey text-sm rounded-sm focus:ring-green focus:border-green block w-full p-2.5"
                  value={fixedExpenseType}
                  onChange={(e) => setFixedExpenseType(e.target.value)}
                >
                  <option value="">Selecione a parcela</option>
                  {paymentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-2">
          <div>
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={isPurchasedInInstallments}
                  onChange={handleCheckboxInstallmentsChange}
                  className="w-4 h-4 text-green bg-gray-100 border-gray-300 rounded-lg focus:ring-green "
                />
                <label
                  htmlFor="default-checkbox"
                  className="ms-2 text-sm font-medium text-grey dark:text-gray-300"
                >
                  é um lançamento parcelado em
                </label>
              </div>
              {isPurchasedInInstallments && (
                <select
                  className="bg-gray-50 border border-gray-300 text-grey text-sm rounded-sm focus:ring-green focus:border-green block w-full p-2.5"
                  value={installmentCount}
                  onChange={(e) => setInstallmentCount(e.target.value)}
                >
                  <option value="">Selecione o número de parcelas</option>
                  {generateOptionsInstallmentsOptions()}
                </select>
              )}
            </div>
          </div>
        </div>
      </div>
      <FormFooter onClose={onClose} onSubmit={handleSubmit} />
    </form>
  );
};

export default ModalForm;
