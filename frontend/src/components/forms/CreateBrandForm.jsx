import React, { useState, useEffect } from 'react';
import BaseForm from './BaseForm';

const CreateBrandForm = ({
  isOpen,
  onClose,
  onCreate,
  initialValue = '',
  isEditMode = false, // Nuevo prop para diferenciar creación/edición
  uneditableId = null // Nuevo prop para pasar el ID que no se puede editar
}) => {
  const [brand, setBrand] = useState(initialValue);
  const [error, setError] = useState('');

  // Reiniciar estado cuando se abre o cierra el formulario o cuando initialValue cambie
  useEffect(() => {
    if (isOpen) {
      setBrand(initialValue);
      setError('');
    }
  }, [isOpen, initialValue]);

  const handleAccept = () => {
    if (brand.trim() === '') {
      setError('El nombre de la marca no puede estar vacío.');
      return;
    }
    setError('');
    onCreate(brand);
    // Solo limpiar el campo en modo creación, no en edición
    if (!isEditMode) {
      setBrand('');
    }
  };

  const handleCancel = () => {
    setError('');
    onClose();
  };

  return (
    <BaseForm
      title={isEditMode ? "Editar Marca" : "Crear Marca"} // Título dinámico
      isVisible={isOpen}
      onAccept={handleAccept}
      onCancel={handleCancel}
      extra={
        error && (
          <div className="text-red-600 font-medium text-center transition-opacity duration-300 mt-4">
            {error}
          </div>
        )
      }
    >
      <div className="flex flex-col gap-2">
        {/* Campo de Código (ID) - Solo visible y no editable en modo edición */}
        {isEditMode && uneditableId && (
          <div className="flex flex-col gap-2 mb-4"> {/* Añadido mb-4 para espacio */}
            <label htmlFor="id" className="text-gray-700">Código:</label>
            <input
              type="text"
              id="id"
              className="border border-gray-300 rounded-md shadow-sm bg-gray-100 text-black cursor-not-allowed"
              style={{ width: '250px', height: '50px', padding: '0.5rem' }}
              value={uneditableId}
              readOnly
              disabled
            />
          </div>
        )}

        <label htmlFor="brand" className="text-gray-700">Marca:</label>
        <input
          type="text"
          id="brand"
          className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
          style={{ width: '250px', height: '50px', padding: '0.5rem' }}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          autoFocus // Mantener autoFocus para el campo principal
        />
      </div>
    </BaseForm>
  );
};

export default CreateBrandForm;