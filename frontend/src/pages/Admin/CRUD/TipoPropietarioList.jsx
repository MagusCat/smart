// frontend/src/pages/Admin/CRUD/TipoPropietarioList.jsx
import React, { useState, useEffect } from 'react'; // Importar useEffect
import { Card } from "../../../components/ui/Card";
import DataTable from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import CreateOwnerTypeForm from '../../../components/forms/CreateOwnerTypeForm'; // Se usará para crear y editar
import ConfirmDeleteModal from '../../../components/ui/ConfirmDeleteModal'; // Para el modal de eliminación

const initialTipoPropietarioData = [ // Renombrado para consistencia
  { id: 'TP001', tipo: 'Particular' },
  { id: 'TP002', tipo: 'Empresa' },
  { id: 'TP003', tipo: 'Gobierno' },
  { id: 'TP004', tipo: 'Organización No Lucrativa' },
  { id: 'TP005', tipo: 'Arrendador' },
  { id: 'TP006', tipo: 'Empresa' },
];

function TipoPropietarioList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tipoPropietarioData, setTipoPropietarioData] = useState(initialTipoPropietarioData); // Estado para los datos mutables

  // Estados para el formulario de creación
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // NUEVOS Estados para el formulario de edición
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingOwnerType, setEditingOwnerType] = useState(null); // Almacena el tipo de propietario a editar

  // Estados para el modal de eliminación
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const totalPages = 5; // Ajusta según el número de páginas reales

  const handleSearch = () => alert(`Buscando: ${searchTerm}`);
  const handlePageChange = (page) => setCurrentPage(page);

  // Lógica para Crear Tipo de Propietario
  const handleCreateClick = () => {
    setIsCreateOpen(true);
    setEditingOwnerType(null); // Asegurarse de que no haya un item de edición previo
  };
  const handleCreateClose = () => setIsCreateOpen(false);

  const handleCreateOwnerType = (newOwnerType) => {
    const newId = `TP${(tipoPropietarioData.length + 1).toString().padStart(3, '0')}`;
    const newItem = { id: newId, tipo: newOwnerType };
    setTipoPropietarioData(prev => [...prev, newItem]);
    handleCreateClose(); // Cerrar el formulario después de crear
  };

  // NUEVA Lógica para Editar Tipo de Propietario
  const handleEditClick = (item) => {
    setEditingOwnerType(item); // Establece el tipo de propietario a editar
    setIsEditOpen(true);        // Abre el formulario de edición
  };

  const handleEditClose = () => {
    setIsEditOpen(false);       // Cierra el formulario de edición
    setEditingOwnerType(null);  // Limpia el tipo de propietario en edición
  };

  const handleSaveOwnerType = (updatedOwnerType) => {
    setTipoPropietarioData(prevTypes =>
      prevTypes.map(type =>
        type.id === editingOwnerType.id
          ? { ...type, tipo: updatedOwnerType }
          : type
      )
    );
    handleEditClose(); // Cierra el formulario después de guardar
  };

  // Lógica para Eliminar Tipo de Propietario
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    setTipoPropietarioData(prevTypes => prevTypes.filter(t => t.id !== itemToDelete.id));
    setItemToDelete(null);
    setIsDeleteOpen(false);
  };

  const handleDeleteCancel = () => {
    setItemToDelete(null);
    setIsDeleteOpen(false);
  };

  const columns = [
    { key: 'id', header: 'Código' },
    { key: 'tipo', header: 'Tipo de Propietario' },
  ];

  const actions = [
    {
      type: 'edit',
      onClick: (item) => handleEditClick(item), // Llama a la nueva función de edición
    },
    {
      type: 'delete',
      onClick: (item) => {
        setItemToDelete(item);
        setIsDeleteOpen(true);
      },
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-4">Tipos de Propietario</h1> {/* Título pluralizado */}
      <Card className="p-6 rounded-xl shadow-lg border border-gray-200 bg-white">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-grow flex border border-gray-300 rounded-md overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Buscar"
              className="flex-grow p-2 focus:outline-none focus:ring-0 text-gray-700"
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
            onClick={handleCreateClick}
          >
            <img src="/img/create.svg" alt="Crear" className="w-5 h-5" />
            <span>Crear</span>
          </button>
        </div>
        <DataTable data={tipoPropietarioData} columns={columns} actions={actions} />
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </Card>

      {/* Formulario de Creación de Tipo de Propietario */}
      <CreateOwnerTypeForm
        isOpen={isCreateOpen}
        onClose={handleCreateClose}
        onCreate={handleCreateOwnerType}
        initialValue="" // Valor inicial vacío para creación
        isEditMode={false} // No es modo edición
      />

      {/* Formulario de Edición de Tipo de Propietario (reutiliza CreateOwnerTypeForm) */}
      <CreateOwnerTypeForm
        isOpen={isEditOpen} // Usa el nuevo estado para edición
        onClose={handleEditClose} // Función para cerrar el formulario de edición
        onCreate={handleSaveOwnerType} // Función para guardar cambios en edición
        initialValue={editingOwnerType?.tipo || ''} // Pasa el valor del tipo de propietario a editar
        isEditMode={true} // Indica que es modo edición
        uneditableId={editingOwnerType?.id} // Pasa el ID para hacerlo no editable
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        item={itemToDelete}
        // Mostrar el tipo de propietario en el modal de confirmación
        displayValue={itemToDelete?.tipo}
      />
    </>
  );
}

export default TipoPropietarioList;