import React from "react";
import ModalForm from "../atoms/ModalForm";
import ModalHeader from "../atoms/ModalHeader";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  type: "receipt" | "expense";
};

const ModalReceiptExpenses: React.FC<ModalProps> = ({
  show,
  onClose,
  type,
}) => {
  return (
    <>
      {show && (
        <div
          id="crud-modal"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full min-w-[600px]">
            <div className="relative bg-white rounded-sm shadow">
              <ModalHeader
                title={type === "receipt" ? "Nova receita" : "Nova despesa"}
                onClose={onClose}
              />
              <ModalForm type={type} onClose={onClose} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalReceiptExpenses;
