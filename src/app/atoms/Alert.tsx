import React from "react";

interface AlertProps {
  message: string;
  type: "error" | "success" | "info";
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  const alertStyles = {
    error: "text-red-600 bg-red-100",
    success: "text-white bg-green300",
    info: "text-blue-600 bg-blue-100",
  };

  return (
    <div
      className={`fixed top-5 left-0 right-0 mx-auto w-full md:w-2/3 lg:w-1/3 z-50 p-4 shadow-lg rounded-b-lg ${alertStyles[type]}`}
      style={{ zIndex: 9999 }}
    >
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button onClick={onClose} className="text-xl font-bold">
          <p className="font-normal">x</p>
        </button>
      </div>
    </div>
  );
};

export default Alert;
