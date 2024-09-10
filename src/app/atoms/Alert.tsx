import React from "react";

type AlertProps = {
  message: string;
  type: "error" | "success" | "info";
};

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const alertStyles = {
    error: "text-red-600 bg-red-100",
    success: "text-white bg-green300",
    info: "text-blue-600 bg-blue-100",
  };

  return (
    <div className={`mt-4 p-4 rounded-md ${alertStyles[type]}`}>
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Alert;
