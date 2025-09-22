import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{ background: "rgba(0,0,0,0.8)" }}
      onClick={onClose}
    >
      <div
        className="minecraft-modal max-w-lg w-full relative transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold minecraft-text">{title}</h2>
          <button
            onClick={onClose}
            className="minecraft-button redstone text-xs"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};
