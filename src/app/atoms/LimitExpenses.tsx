import { useState, useEffect } from "react";
import {
  updateExpenseLimit,
  createExpenseLimit,
} from "../services/limitExpenses/limitExpensesService";
import Alert from "./Alert";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";

type LimitExpenseProps = {
  show: boolean;
  onClose: () => void;
  limitId?: string;
  initialLimitData?: {
    limitValue: number;
    category: string;
  };
  category?: string;
};

export default function LimitExpenses(props: Readonly<LimitExpenseProps>) {
  const [limitValue, setLimitValue] = useState<string>("");
  const [category, setCategory] = useState<string>("Select category");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(false);

  const expenseCategories = [
    "Alimentação",
    "Transporte",
    "Saúde",
    "Educação",
    "Lazer",
    "Outros",
  ];

  const categoryMapping: { [key: string]: string } = {
    Alimentação: "Alimentacao",
    Transporte: "Transporte",
    Saúde: "Saude",
    Educação: "Educacao",
    Lazer: "Lazer",
    Outros: "Outros",
  };

  useEffect(() => {
    if (props.limitId && props.initialLimitData) {
      setLimitValue(props.initialLimitData.limitValue.toString());
      setCategory(props.initialLimitData.category);
    } else if (props.category) {
      setLimitValue("");
      setCategory(props.category);
    } else {
      setLimitValue("");
      setCategory("Select category");
    }
  }, [props.limitId, props.initialLimitData, props.category]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setAlertMessage(null);
    setLoading(true);

    try {
      let response;
      if (props.limitId) {
        response = await updateExpenseLimit(
          props.limitId,
          parseFloat(limitValue)
        );
      } else {
        const backendCategory = categoryMapping[category];
        const currentMonth = new Date();
        const formattedMonth = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-01`;

        response = await createExpenseLimit(
          parseFloat(limitValue),
          backendCategory,
          formattedMonth
        );
      }

      if (response?.status === "success") {
        setAlertMessage(
          props.limitId
            ? "Expense limit updated successfully!"
            : "Expense limit created successfully!"
        );
        setAlertType("success");
        setTimeout(() => props.onClose(), 3000);
      } else {
        setAlertMessage(response?.message || "Error saving expense limit");
        setAlertType("error");
      }
    } catch (err: any) {
      setAlertMessage(err.message || "An unexpected error occurred");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlertMessage(null);
    setAlertType(null);
  };

  useEffect(() => {
    if (!props.show) {
      setLimitValue("");
      setCategory("Select category");
    }
  }, [props.show]);

  return (
    <>
      {props.show && (
        <div
          id="crud-modal"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full min-w-[600px]">
            <div className="relative bg-white rounded-xl shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-grey ">
                  {props.limitId ? "Editar Limite" : "Novo Limite"}
                </h3>
                <button
                  onClick={props.onClose}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-grey rounded-sm text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {alertMessage && (
                <Alert
                  message={alertMessage}
                  type={alertType!}
                  onClose={handleCloseAlert}
                />
              )}

              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-1">
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
                      value={limitValue}
                      onChange={(e) => setLimitValue(e.target.value)}
                      required
                    />
                  </div>

                  {!props.category && !props.limitId && (
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
                        {expenseCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div className="w-full h-12 flex items-center justify-center">
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <Button
                      title={
                        props.limitId ? "Editar limite" : "Adicionar limite"
                      }
                      type="submit"
                      className="w-3/6 focus:outline-none text-white bg-green hover:bg-green800 focus:ring-4 focus:ring-green300 font-medium rounded-lg text-base px-5 py-2.5"
                      disabled={loading}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
