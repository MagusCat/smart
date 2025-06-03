// frontend/src/components/forms/CreateUserForm.jsx
import React, { useState, useEffect } from 'react';
import BaseForm from '../ui/BaseForm';

const CreateUserForm = ({
  isOpen,
  onClose,
  onCreate,
  initialValues = {},
  isEditMode = false, // Nuevo prop para diferenciar creación/edición
  uneditableId = null // Nuevo prop para pasar el ID que no se puede editar
}) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [username, setUsername] = useState(initialValues?.user || ''); // Corregido: initialValues.user para el nombre de usuario
  const [role, setRole] = useState(initialValues?.role || '');
  const [error, setError] = useState(''); // Estado para manejar errores de validación

  // Resetear el formulario al abrir/cerrar o cuando initialValues cambie
  useEffect(() => {
    if (isOpen) {
      setName(initialValues?.name || '');
      setUsername(initialValues?.user || ''); // Usar initialValues.user
      setRole(initialValues?.role || '');
      setError('');
    }
  }, [isOpen, initialValues]);

  const handleAccept = () => {
    if (name.trim() === '' || username.trim() === '' || role.trim() === '') {
      setError('Todos los campos son obligatorios.'); // Establecer el mensaje de error
      return;
    }
    setError(''); // Limpiar errores si la validación pasa
    onCreate({ name, user: username, role }); // Asegúrate de pasar 'user' para el nombre de usuario
    
    // Solo limpiar los campos en modo creación
    if (!isEditMode) {
      setName('');
      setUsername('');
      setRole('');
    }
  };

  const handleCancel = () => {
    setError(''); // Limpiar errores al cancelar
    onClose();
  };

  return (
    <BaseForm
      title={isEditMode ? "Editar Usuario" : "Crear Usuario"} // Título dinámico
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
      <div className="grid grid-cols-2 gap-4">
        {/* Campo de Código (ID) - Solo visible y no editable en modo edición */}
        {isEditMode && uneditableId && (
          <div className="flex flex-col gap-2 col-span-2">
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

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-gray-700">Nombre Completo:</label>
          <input
            type="text"
            id="name"
            className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
            style={{ width: '250px', height: '50px', padding: '0.5rem' }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="username" className="text-gray-700">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
            style={{ width: '250px', height: '50px', padding: '0.5rem' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <label htmlFor="role" className="text-gray-700">Rol:</label>
          <input
            type="text"
            id="role"
            className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
            style={{ width: '250px', height: '50px', padding: '0.5rem' }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
      </div>
    </BaseForm>
  );
};

export default CreateUserForm;