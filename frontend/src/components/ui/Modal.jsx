export function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose} // Allows closing by clicking outside the modal
    >
      <div
        className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-md mx-auto transform scale-95 animate-scale-in"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
      >
        <div className="flex flex-col p-6">
          {children}
        </div>
      </div>

      {/* Tailwind CSS keyframes for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0.8; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export function ModalAlert({ open, onClose, title = "Alerta", message }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-start text-center w-full">
        <div className="flex items-center mb-4 self-center">
          <svg
            className="w-8 h-8 text-red-500 mr-3"
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
          <h2 className="text-2xl font-bold text-red-600">{title}</h2>
        </div>
        <p className="text-gray-700 text-base mb-6 text-center w-full">{message}</p>
        <div className="flex justify-center w-full mt-4">
          <button
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition duration-150 ease-in-out"
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
      <div className="flex flex-col items-start text-center w-full">
        <div className="flex items-center mb-4 self-center">
          <svg
            className="w-8 h-8 text-blue-500 mr-3"
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
          <h2 className="text-2xl font-bold text-blue-600">{title}</h2>
        </div>
        <p className="text-gray-700 text-base mb-6 text-center w-full">{message}</p>
        <div className="flex justify-center w-full mt-4">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-150 ease-in-out"
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
      <div className="flex flex-col items-start text-center w-full">
        <div className="flex items-center mb-4 self-center">
          <svg
            className="w-8 h-8 text-yellow-500 mr-3"
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
          <h2 className="text-2xl font-bold text-yellow-600">{title}</h2>
        </div>
        <p className="text-gray-700 text-base mb-6 text-center w-full">{message}</p>
        <div className="flex justify-center gap-4 w-full mt-4">
          <button
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-150 ease-in-out"
            onClick={() => {
              onNo && onNo();
              onClose && onClose();
            }}
          >
            {noText}
          </button>
          <button
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-150 ease-in-out"
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
      <div className="flex flex-col items-center justify-center min-h-[120px] text-center w-full">
        {loading ? (
          <>
            <div className="flex space-x-2 mb-4">
              <span
                className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></span>
              <span
                className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.15s" }}
              ></span>
              <span
                className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.3s" }}
              ></span>
            </div>
            <p className="text-gray-700 text-lg">Preparando tu descarga...</p>
          </>
        ) : (
          <>
            <p className="text-gray-800 text-lg mb-4">Tu archivo está listo para descargar.</p>
            <a
              href={fileUrl}
              download={fileName}
              onClick={onClose}
              className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out text-center"
            >
              Descargar {fileName}
            </a>
            <span className="text-sm text-gray-500 mt-3">
              Haz clic para descargar el archivo.
            </span>
          </>
        )}
      </div>
      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); } /* Slightly adjusted bounce height */
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
      `}</style>
    </Modal>
  );
}