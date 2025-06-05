export function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg border-1 border-gray-400 min-w-50 min-h-40">
        <div className="flex flex-col p-6 justify-center items-center">
          {children}
          <div className="mt-10 flex justify-end">
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ModalAlert({ open, onClose, title = "Alerta", message }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-start">
        <div className="flex items-center mb-4">
          <svg
            className="w-6 h-6 text-red-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
          <h2 className="text-xl font-semibold text-red-600">{title}</h2>
        </div>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end w-full">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function ModalMessage({ open, onClose, title = "Mensaje", message }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-start">
        <div className="flex items-center mb-4">
          <svg
            className="w-6 h-6 text-blue-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-6-6C6.91 5 5 6.91 5 9v2m10 8h-3m-9-9h2m3-13h3m-3 17h3m2-6h2m2-4h2m-2-2H9"
            ></path>
          </svg>
          <h2 className="text-xl font-semibold text-blue-600">{title}</h2>
        </div>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end w-full">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
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
      <div className="flex flex-col items-start">
        <div className="flex items-center mb-4">
          <svg
            className="w-6 h-6 text-yellow-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h2 className="text-xl font-semibold text-yellow-600">{title}</h2>
        </div>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end gap-3 w-full">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={() => {
              onNo && onNo();
              onClose && onClose();
            }}
          >
            {noText}
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            onClick={() => {
              onYes && onYes();
              onClose && onClose();
            }}
          >
            {yesText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export function ModalDownload({
  open,
  onClose,
  loading = false,
  fileUrl,
  fileName = "archivo.xlsx",
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-start">
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <div className="flex space-x-2">
              <span
                className="w-3 h-3 bg-(--font-accent) rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></span>
              <span
                className="w-3 h-3 bg-(--font-accent) rounded-full animate-bounce"
                style={{ animationDelay: "0.15s" }}
              ></span>
              <span
                className="w-3 h-3 bg-(--font-accent) rounded-full animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></span>
            </div>
            <style>
              {`
            @keyframes bounce {
              0%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-12px); }
            }
            .animate-bounce {
              animation: bounce 1s infinite;
            }
          `}
            </style>
          </div>
        ) : (
          <>
          <a
            href={fileUrl}
            download={fileName}
            onClick={onClose}
            className="w-full px-4 py-2 bg-indigo-500 text-center text-white rounded-md hover:bg-indigo-600"
          >
            Descargar
          </a>
          <span className="text-xs text-gray-500 mt-2">
            {fileName}
          </span>
          </>
        )}
      </div>
    </Modal>
  );
}