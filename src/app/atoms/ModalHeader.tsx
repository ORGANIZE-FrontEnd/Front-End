import React from "react";

type ModalHeaderProps = {
  title: string;
  onClose: () => void;
};

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose }) => (
  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
    <h3 className="text-lg font-semibold text-grey ">{title}</h3>
    <button
      onClick={onClose}
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
);

export default ModalHeader;
