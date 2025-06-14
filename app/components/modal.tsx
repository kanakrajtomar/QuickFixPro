import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-6xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-5xl max-sm:text-xl font-semibold text-black w-full text-center">
            {title}
          </h2>
          <button onClick={onClose} className="text-black text-2xl">
            &times;
          </button>
        </div>
        <div className="flex space-x-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;