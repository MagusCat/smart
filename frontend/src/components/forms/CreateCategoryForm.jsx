import React, { useState, useEffect } from 'react';
import BaseForm from './BaseForm';

const CreateCategoryForm = ({
  isOpen,
  onClose,
  onCreate,
  initialValue = '',
  isEditMode = false
}) => {
  const [category, setCategory] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCategory(initialValue);
      setErrorMessage(''); // Limpia el error al abrir el modal
    }
  }, [isOpen, initialValue]);


  const handleAccept = async () => {
    setErrorMessage(''); // Siempre limpia el mensaje de error anterior al intentar enviar

    if (!category.trim()) {
      setErrorMessage('El nombre de la categoría no puede estar vacío.');
      return;
    }

    try {
      await onCreate(category);
      onClose();
      if (!isEditMode) {
        setCategory(''); // Limpiar campo solo en modo creación
      }
    } catch (err) {
      setErrorMessage(err.message || 'Ocurrió un error inesperado al guardar la categoría.');
      console.error("Error en handleAccept de CreateCategoryForm:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <BaseForm
      title={isEditMode ? "Editar Categoría" : "Crear Categoría"}
      isVisible={isOpen}
      onAccept={handleAccept}
      onCancel={() => {
        setErrorMessage(''); // Limpiar error al cancelar
        onClose();
      }}
      extra={errorMessage && (
        <p className="text-red-600 text-center mt-4 transition-opacity duration-300">
          {errorMessage}
        </p>
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="category" className="text-gray-700">
            {isEditMode ? "Nuevo nombre" : "Nombre de la categoría"}:
          </label>
          <input
            type="text"
            id="category"
            className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
            style={{ width: '100%', height: '50px', padding: '0.5rem' }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            autoFocus
          />
        </div>
      </div>
    </BaseForm>
  );
};

export default CreateCategoryForm;