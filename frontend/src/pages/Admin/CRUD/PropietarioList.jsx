import React, { useState } from 'react';
import { HiDocumentPlus } from 'react-icons/hi2';

import { Card } from "../../../components/ui/Card";
import DataTable from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import CreateOwnerForm from '../../../components/forms/CreateOwnerForm';
import ConfirmDeleteModal from '../../../components/ui/ConfirmDeleteModal';

function PropietarioList() {
    const [owners, setOwners] = useState([
        { id: 'P001', nombre: 'Roberto Gómez', cedulaRuc: '001-010180-0000A', tipo: 'Particular' },
        { id: 'P002', nombre: 'Transportes S.A.', cedulaRuc: 'J031000000123', tipo: 'Empresa' },
        { id: 'P003', nombre: 'Ana Hernández', cedulaRuc: '002-050692-0001B', tipo: 'Particular' },
        { id: 'P004', nombre: 'Logística Express', cedulaRuc: 'J031000000456', tipo: 'Empresa' },
        { id: 'P005', nombre: 'Luis Martínez', cedulaRuc: '003-121275-0002C', tipo: 'Particular' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [editingOwner, setEditingOwner] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [ownerToDelete, setOwnerToDelete] = useState(null);

    const handleSearch = () => alert(`Buscando: ${searchTerm}`);
    const handlePageChange = (page) => setCurrentPage(page);

    const handleOpenCreateForm = () => {
        setIsCreateFormOpen(true);
        setEditingOwner(null);
    };
    const handleCloseCreateForm = () => setIsCreateFormOpen(false);

    const handleCreateOwner = (newOwnerData) => {
        const newId = `P00${owners.length + 1}`;
        setOwners(prevOwners => [
            ...prevOwners,
            {
                id: newId,
                nombre: newOwnerData.owner,
                cedulaRuc: newOwnerData.id,
                tipo: newOwnerData.type
            }
        ]);
        handleCloseCreateForm();
    };

    const handleEditClick = (item) => {
        setEditingOwner(item);
        setIsEditFormOpen(true);
    };

    const handleCloseEditForm = () => {
        setIsEditFormOpen(false);
        setEditingOwner(null);
    };

    const handleSaveOwner = (updatedData) => {
        setOwners(prevOwners =>
            prevOwners.map(owner =>
                owner.id === editingOwner.id
                    ? {
                        ...owner,
                        nombre: updatedData.owner,
                        cedulaRuc: updatedData.id,
                        tipo: updatedData.type
                    }
                    : owner
            )
        );
        handleCloseEditForm();
    };

    const handleDeleteClick = (item) => {
        setOwnerToDelete(item);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setOwners(prevOwners => prevOwners.filter(owner => owner.id !== ownerToDelete.id));
        setIsDeleteModalOpen(false);
    };

    const handleCancelDelete = () => {
        setOwnerToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const columns = [
        { key: 'id', header: 'Código' },
        { key: 'nombre', header: 'Propietarios' },
        { key: 'cedulaRuc', header: 'Cédula - Ruc' },
        { key: 'tipo', header: 'Tipo' },
    ];

    const actions = [
        { type: 'edit', onClick: handleEditClick },
        { type: 'delete', onClick: handleDeleteClick },
    ];

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-4">Propietarios</h1>
            <Card className="p-6 rounded-xl shadow-lg border border-gray-200 bg-white">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="flex-grow flex border border-gray-300 rounded-md overflow-hidden shadow-sm">
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="flex-grow p-2 focus:outline-none focus:ring-0 text-black"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 transition duration-200 ease-in-out border-l border-gray-300"
                            onClick={handleSearch}
                        >
                            Buscar
                        </button>
                    </div>
                    <button
                        className="w-[130px] h-10 bg-[#326689] hover:bg-[#2a5573] text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center space-x-2 shadow-md"
                        onClick={handleOpenCreateForm}
                    >
                        <HiDocumentPlus className="w-5 h-5" /><span>Crear</span> {/* Icono actualizado */}
                    </button>
                </div>
                <DataTable data={owners} columns={columns} actions={actions} />
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </Card>

            <CreateOwnerForm
                isOpen={isCreateFormOpen}
                onClose={handleCloseCreateForm}
                onCreate={handleCreateOwner}
                initialValues={{}}
            />

            <CreateOwnerForm
                isOpen={isEditFormOpen}
                onClose={handleCloseEditForm}
                onCreate={handleSaveOwner}
                initialValues={{
                    owner: editingOwner?.nombre,
                    id: editingOwner?.cedulaRuc,
                    type: editingOwner?.tipo
                }}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                item={ownerToDelete}
                displayValue={ownerToDelete?.nombre}
            />
        </>
    );
}

export default PropietarioList;