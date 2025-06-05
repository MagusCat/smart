import React, { useState, useEffect } from 'react';
import BaseForm from './BaseForm';

const CreateOwnerForm = ({ isOpen, onClose, onCreate, initialValues = {} }) => {
    const [owner, setOwner] = useState(initialValues.owner || '');
    const [id, setId] = useState(initialValues.id || '');
    const [type, setType] = useState(initialValues.type || '');
    const [error, setError] = useState('');

    // Resetear formulario al cerrar o cuando initialValues cambie
    useEffect(() => {
        if (!isOpen) {
            setOwner('');
            setId('');
            setType('');
            setError('');
        } else {
            setOwner(initialValues.owner || '');
            setId(initialValues.id || '');
            setType(initialValues.type || '');
        }
    }, [isOpen, initialValues]);

    const handleAccept = () => {
        if (!owner.trim() || !id.trim() || !type.trim()) {
            setError('Todos los campos son obligatorios.');
            return;
        }
        onCreate({ owner, id, type });
    };

    return (
        <BaseForm
            title={initialValues.owner ? "Editar Propietario" : "Crear Propietario"}
            isVisible={isOpen}
            onAccept={handleAccept}
            onCancel={onClose}
            extra={
                error && (
                    <div className="text-red-600 font-medium text-center transition-opacity duration-300">
                        {error}
                    </div>
                )
            }
        >
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="owner" className="text-gray-700">Propietario:</label>
                    <input
                        type="text"
                        id="owner"
                        className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
                        style={{ width: '250px', height: '50px', padding: '0.5rem' }}
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="id" className="text-gray-700">Cédula/RUC:</label>
                    <input
                        type="text"
                        id="id"
                        className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
                        style={{ width: '250px', height: '50px', padding: '0.5rem' }}
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                    <label htmlFor="type" className="text-gray-700">Tipo de Propietario:</label>
                    <input
                        type="text"
                        id="type"
                        className="border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white text-black"
                        style={{ width: '250px', height: '50px', padding: '0.5rem' }}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                </div>
            </div>
        </BaseForm>
    );
};

export default CreateOwnerForm;