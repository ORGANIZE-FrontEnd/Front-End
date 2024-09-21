import React, { useState } from "react";
import Button from "./Button";

type LimitExpenseProps = {
  show: boolean;
  onClose: () => void;
};

export default function LimitExpenses(props: LimitExpenseProps) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("Select category");

  const expenseCategories = [
    "Alimentação",
    "Transporte",
    "Saúde",
    "Educação",
    "Lazer",
    "Outros",
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const expenseData = {
      value,
      category,
      description,
    };
    console.log("Expense Data Submitted:", expenseData);

    props.onClose();
  };

  return (
    <>
      {props.show && (
        <div
          id="crud-modal"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full min-w-[600px]">
            <div className="relative bg-white rounded-sm shadow ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-grey ">
                  Novo limite
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
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      required
                    />
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
                      {expenseCategories.map((cat, index) => (
                        <option key={index} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-medium text-grey "
                    >
                      Adicione uma descrição
                    </label>
                    <textarea
                      rows={4}
                      name="descricao"
                      id="description"
                      className="bg-gray-50 border border-gray-300 text-grey text-sm rounded-sm focus:ring-green focus:border-green block w-full p-2.5"
                      placeholder="Adicione uma descricao"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4 justify-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <Button
                    title={"Adicionar limite"}
                    type="submit"
                    className="w-3/6 focus:outline-none text-white bg-green hover:bg-green800 focus:ring-4 focus:ring-green300 font-medium rounded-lg text-base px-5 py-2.5 "
                  ></Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
