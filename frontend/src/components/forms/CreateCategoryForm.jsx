import React, { useState, useEffect } from 'react';
import BaseForm from '../ui/BaseForm';

const CreateCategoryForm = ({ 
  isOpen, 
  onClose, 
  onCreate, 
  initialValue = '',
  isEditMode = false // Nuevo prop para diferenciar creación/edición
}) => {
    const [category, setCategory] = useState(initialValue);
    const [error, setError] = useState('');

    // Resetear el formulario al abrir/cerrar o cuando initialValue cambie
    useEffect(() => {
        setCategory(initialValue);
        setError('');
    }, [isOpen, initialValue]);

    const handleAccept = () => {
        if (!category.trim()) {
            setError('El nombre de la categoría no puede estar vacío.');
            return;
        }
        onCreate(category);
        if (!isEditMode) setCategory(''); // Solo resetea en creación, no en edición
    };

    return (
        <BaseForm
            title={isEditMode ? "Editar Categoría" : "Crear Categoría"} // Título dinámico
            isVisible={isOpen}
            onAccept={handleAccept}
            onCancel={() => {
                setError('');
                onClose();
            }}
            extra={error && (
                <p className="text-red-600 text-center mt-4 transition-opacity duration-300">
                    {error}
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