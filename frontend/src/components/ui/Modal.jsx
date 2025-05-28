import React from "react";

export function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[280px] max-w-full">
        {children}
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export function ModalAlert({ open, onClose, title = "Alerta", message }) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p>{message}</p>
    </Modal>
  );
}

export function ModalMessage({ open, onClose, title = "Mensaje", message }) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p>{message}</p>
    </Modal>
  );
}

export function ModalQuestion({
  open,
  onClose,
  title = "¿Estás seguro?",
  message,
  onYes,
  onNo,
  yesText = "Sí",
  noText = "No",
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p>{message}</p>
      <div className="flex gap-3 mt-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => {
            onYes && onYes();
            onClose && onClose();
          }}
        >
          {yesText}
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          onClick={() => {
            onNo && onNo();
            onClose && onClose();
          }}
        >
          {noText}
        </button>
      </div>
    </Modal>
  );
}