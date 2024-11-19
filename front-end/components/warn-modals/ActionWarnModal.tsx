import React from "react";
import { WarnIcon } from "../icons/icons";

interface ActionWarnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ActionWarnModal: React.FC<ActionWarnModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center ${
        isOpen ? "open-overlay" : "close-overlay"
      }`}
    >
      <div
        className={`bg-grayDark  rounded-[2rem] shadow-2xl w-[20rem] max-w-lg p-4 ${
          isOpen ? "open" : "close"
        }`}
      >
        <span className="flex justify-center items-center my-2">
          <WarnIcon />
        </span>
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <p className="mb-4">{message}</p>
        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-full w-full"
            onClick={onConfirm}
          >
            تایید
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-full w-full mr-2"
            onClick={onClose}
          >
            لغو
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionWarnModal;
