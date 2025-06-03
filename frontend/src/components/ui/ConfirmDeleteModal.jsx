// frontend/src/components/ui/ConfirmDeleteModal.jsx
import React, { useEffect, useRef, useState } from 'react';

const ConfirmDeleteModal = ({ isOpen, onConfirm, onCancel, item, displayValue }) => { // <--- Aquí recibe displayValue
  const modalRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
      const timer = setTimeout(() => {}, 0);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  const handleOverlayClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onCancel?.();
    }
  };

  // Determina qué propiedad usar: displayValue (si se pasa) > nombre > marca > categoria > ''
  // Esto es lo que necesitas para que la prop displayValue tenga prioridad
  const valueToDisplay = displayValue ?? item?.nombre ?? item?.marca ?? item?.categoria ?? '';

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#0000003a] z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-xl p-8 transition-all duration-300 ${
          animate && isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{ width: '590px', height: '270px' }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Confirmar Eliminación
        </h2>

        <p className="text-center text-gray-700 text-lg mb-6">
          {`¿Estás seguro de que deseas eliminar "${valueToDisplay}"?`}
        </p>

        <div className="flex justify-center gap-6 mt-8">
          <button
            type="button"
            className="bg-[#FF746C] text-white font-semibold py-3 rounded-md shadow-md transition-colors duration-200 hover:bg-[#e05d56]"
            style={{ width: '150px', height: '50px' }}
            onClick={onConfirm}
          >
            Eliminar
          </button>
          <button
            type="button"
            className="bg-[#326689] text-white font-semibold py-3 rounded-md shadow-md transition-colors duration-200 hover:bg-[#285471]"
            style={{ width: '150px', height: '50px' }}
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;