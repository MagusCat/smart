// frontend/src/components/forms/CreateRegisterForm.jsx
import React, { useState, useEffect } from 'react';
import BaseForm from '../ui/BaseForm';

const CreateRegisterForm = ({
  isOpen,
  onClose,
  onCreate,
  initialValues = {},
  isEditMode = false, // Nuevo prop para diferenciar creación/edición
  uneditableId = null // Nuevo prop para pasar el ID que no se puede editar
}) => {
  // Los estados ahora corresponden directamente a las propiedades del registro
  const [nChasis, setNChasis] = useState(initialValues?.nChasis || '');
  const [nMatricula, setNMatricula] = useState(initialValues?.nMatricula || '');
  const [marca, setMarca] = useState(initialValues?.marca || '');
  const [fechaInscripcion, setFechaInscripcion] = useState(initialValues?.fechaInscripcion || '');
  const [error, setError] = useState('');

  // Cada vez que se abra/cierre el modal o initialValues cambie, reiniciar campos y error
  useEffect(() => {
    if (isOpen) {
      setNChasis(initialValues?.nChasis || '');
      setNMatricula(initialValues?.nMatricula || '');
      setMarca(initialValues?.marca || '');
      setFechaInscripcion(initialValues?.fechaInscripcion || '');
      setError('');
    }
  }, [isOpen, initialValues]);

  const handleAccept = () => {
    if (nChasis.trim() === '' || nMatricula.trim() === '' || marca.trim() === '' || fechaInscripcion.trim() === '') {
      setError('Todos los campos son obligatorios.');
      return;
    }
    setError('');
    // Se pasa un objeto con los nombres de las propiedades del registro
    onCreate({ nChasis, nMatricula, marca, fechaInscripcion });
  };

  const handleCancel = () => {
    setError('');
    onClose();
  };

  return (
    <BaseForm
      title={isEditMode ? "Editar Registro" : "Crear Registro"} // Título dinámico
      isVisible={isOpen}
      onAccept={handleAccept}
      onCancel={handleCancel}
      extra={
        error && (
          <div className="text-red-600 font-medium text-center transition-opacity duration-300">
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
              readOnly // Hace el campo de solo lectura
              disabled // Deshabilita el campo para evitar cambios
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="nChasis" className="text-gray-700">Nº Chasis:</label>
          <input
            type="text"
            id="nChasis"
            className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
            style={{ width: '250px', height: '50px', padding: '0.5rem' }}
            value={nChasis}
            onChange={(e) => setNChasis(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="nMatricula" className="text-gray-700">Nº Matrícula:</label>
          <input
            type="text"
            id="nMatricula"
            className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
            style={{ width: '250px', height: '50px', padding: '0.5rem' }}
            value={nMatricula}
            onChange={(e) => setNMatricula(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="marca" className="text-gray-700">Marca:</label>
          <input
            type="text"
            id="marca"
            className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
            style={{ width: '250px', height: '50px', padding: '0.5rem' }}
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="fechaInscripcion" className="text-gray-700">Fecha inscripción:</label>
          <input
            type="date" // Cambiado a tipo "date" para un selector de fecha
            id="fechaInscripcion"
            className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
            style={{ width: '250px', height: '50px', padding: '0.5rem' }}
            value={fechaInscripcion}
            onChange={(e) => setFechaInscripcion(e.target.value)}
          />
        </div>
      </div>
    </BaseForm>
  );
};

export default CreateRegisterForm;