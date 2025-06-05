// frontend/src/components/forms/CreateOwnerTypeForm.jsx
import React, { useState, useEffect } from 'react'; // Importar useEffect
import BaseForm from './BaseForm';

const CreateOwnerTypeForm = ({
  isOpen,
  onClose,
  onCreate,
  initialValue = '',
  isEditMode = false, // Nuevo prop para diferenciar creación/edición
  uneditableId = null // Nuevo prop para pasar el ID que no se puede editar
}) => {
  const [ownerType, setOwnerType] = useState(initialValue);
  const [error, setError] = useState(''); // Estado para manejar errores de validación

  // Reiniciar estado cuando se abre o cierra el formulario o cuando initialValue cambie
  useEffect(() => {
    if (isOpen) {
      setOwnerType(initialValue);
      setError('');
    }
  }, [isOpen, initialValue]);

  const handleAccept = () => {
    if (ownerType.trim() === '') {
      setError('El tipo de propietario no puede estar vacío.'); // Establecer mensaje de error
      return;
    }
    setError(''); // Limpiar errores si la validación pasa
    onCreate(ownerType);
    // Solo limpiar el campo en modo creación, no en edición
    if (!isEditMode) {
      setOwnerType('');
    }
  };

  const handleCancel = () => {
    setError(''); // Limpiar errores al cancelar
    onClose();
  };

  return (
    <BaseForm
      title={isEditMode ? "Editar Tipo de Propietario" : "Crear Tipo de Propietario"} // Título dinámico
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

        <label htmlFor="ownerType" className="text-gray-700">Tipo de Propietario:</label>
        <input
          type="text"
          id="ownerType"
          className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
          style={{ width: '200px', height: '50px', padding: '0.5rem' }}
          value={ownerType}
          onChange={(e) => setOwnerType(e.target.value)}
          autoFocus
        />
      </div>
    </BaseForm>
  );
};

export default CreateOwnerTypeForm;