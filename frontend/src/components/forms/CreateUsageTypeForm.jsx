// frontend/src/components/forms/CreateUsageTypeForm.jsx
import React, { useState, useEffect } from 'react'; // Importar useEffect
import BaseForm from './BaseForm';

const CreateUsageTypeForm = ({
  isOpen,
  onClose,
  onCreate,
  initialValue = '',
  isEditMode = false, // Nuevo prop para diferenciar creación/edición
  uneditableId = null // Nuevo prop para pasar el ID que no se puede editar
}) => {
  const [usageType, setUsageType] = useState(initialValue);
  const [error, setError] = useState(''); // Estado para manejar errores de validación

  // Reiniciar estado cuando se abre o cierra el formulario o cuando initialValue cambie
  useEffect(() => {
    if (isOpen) {
      setUsageType(initialValue);
      setError('');
    }
  }, [isOpen, initialValue]);

  const handleAccept = () => {
    if (usageType.trim() === '') {
      setError('El tipo de uso no puede estar vacío.'); // Establecer mensaje de error
      return;
    }
    setError(''); // Limpiar errores si la validación pasa
    onCreate(usageType);
    // Solo limpiar el campo en modo creación, no en edición
    if (!isEditMode) {
      setUsageType('');
    }
  };

  const handleCancel = () => {
    setError(''); // Limpiar errores al cancelar
    onClose();
  };

  return (
    <BaseForm
      title={isEditMode ? "Editar Tipo de Uso" : "Crear Tipo de Uso"} // Título dinámico
      isVisible={isOpen}
      onAccept={handleAccept}
      onCancel={handleCancel}
      extra={ // Mostrar error si existe
        error && (
          <div className="text-red-600 font-medium text-center mt-4 transition-opacity duration-300">
            {error}
          </div>
        )
      }
    >
      <div className="flex flex-col gap-2">
        {/* Campo de Código (ID) - Solo visible y no editable en modo edición */}
        {isEditMode && uneditableId && (
          <div className="flex flex-col gap-2 mb-4">
            <label htmlFor="id" className="text-gray-700">Código:</label>
            <input
              type="text"
              id="id"
              className="border border-gray-300 rounded-md shadow-sm bg-gray-100 text-black cursor-not-allowed"
              style={{ width: '200px', height: '50px', padding: '0.5rem' }}
              value={uneditableId}
              readOnly
              disabled
            />
          </div>
        )}

        <label htmlFor="usageType" className="text-gray-700">Tipo de Uso:</label>
        <input
          type="text"
          id="usageType"
          className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
          style={{ width: '200px', height: '50px', padding: '0.5rem' }}
          value={usageType}
          onChange={(e) => setUsageType(e.target.value)}
          autoFocus
        />
      </div>
    </BaseForm>
  );
};

export default CreateUsageTypeForm;