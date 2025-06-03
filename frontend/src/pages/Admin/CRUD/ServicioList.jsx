// frontend/src/pages/Admin/CRUD/ServicioList.jsx
import React, { useState, useEffect } from 'react'; // Importar useEffect
import { Card } from "../../../components/ui/Card";
import DataTable from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import CreateServiceTypeForm from '../../../components/forms/CreateServiceTypeForm'; // Componente para crear/editar
import ConfirmDeleteModal from '../../../components/ui/ConfirmDeleteModal'; // Componente para confirmar eliminación

const initialServicioData = [
  { id: 'S001', tipo: 'Mantenimiento Preventivo' },
  { id: 'S002', tipo: 'Reparación de Motor' },
  { id: 'S003', tipo: 'Cambio de Aceite' },
  { id: 'S004', tipo: 'Alineación y Balanceo' },
  { id: 'S005', tipo: 'Inspección General' },
];

function ServicioList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [servicioData, setServicioData] = useState(initialServicioData); // Estado para los datos mutables

  // Estados para el formulario de creación
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // NUEVOS Estados para el formulario de edición
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingService, setEditingService] = useState(null); // Almacena el servicio que se está editando

  // Estados para el modal de eliminación
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const totalPages = 5;

  const handleSearch = () => alert(`Buscando: ${searchTerm}`);
  const handlePageChange = (page) => setCurrentPage(page);

  // Lógica para Crear Tipo de Servicio
  const handleCreateClick = () => {
    setIsCreateOpen(true);
    setEditingService(null); // Asegurarse de que no haya un item de edición previo
  };
  const handleCreateClose = () => setIsCreateOpen(false);

  const handleCreateService = (newServiceType) => {
    // Generar un nuevo ID basado en la longitud actual, puedes ajustar la lógica
    const newId = `S${(servicioData.length + 1).toString().padStart(3, '0')}`;
    const newItem = { id: newId, tipo: newServiceType };
    setServicioData(prev => [...prev, newItem]);
    handleCreateClose(); // Cerrar el formulario después de crear
  };

  // NUEVA Lógica para Editar Tipo de Servicio
  const handleEditClick = (item) => {
    setEditingService(item); // Establece el servicio a editar
    setIsEditOpen(true);     // Abre el formulario de edición
  };

  const handleEditClose = () => {
    setIsEditOpen(false);    // Cierra el formulario de edición
    setEditingService(null); // Limpia el servicio en edición
  };

  const handleSaveService = (updatedServiceType) => {
    setServicioData(prevServices =>
      prevServices.map(service =>
        service.id === editingService.id
          ? { ...service, tipo: updatedServiceType }
          : service
      )
    );
    handleEditClose(); // Cierra el formulario después de guardar
  };

  // Lógica para Eliminar Tipo de Servicio
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    setServicioData(prevServices => prevServices.filter(s => s.id !== itemToDelete.id));
    setItemToDelete(null);
    setIsDeleteOpen(false);
  };

  const handleDeleteCancel = () => {
    setItemToDelete(null);
    setIsDeleteOpen(false);
  };

  const columns = [
    { key: 'id', header: 'Código' },
    { key: 'tipo', header: 'Tipo de Servicio' },
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-4">Tipos de Servicios</h1> {/* Título pluralizado */}
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
        <DataTable data={servicioData} columns={columns} actions={actions} />
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </Card>

      {/* Formulario de Creación de Tipo de Servicio */}
      <CreateServiceTypeForm
        isOpen={isCreateOpen}
        onClose={handleCreateClose}
        onCreate={handleCreateService}
        initialValue="" // Valor inicial vacío para creación
        isEditMode={false} // No es modo edición
      />

      {/* Formulario de Edición de Tipo de Servicio (reutiliza CreateServiceTypeForm) */}
      <CreateServiceTypeForm
        isOpen={isEditOpen} // Usa el nuevo estado para edición
        onClose={handleEditClose} // Función para cerrar el formulario de edición
        onCreate={handleSaveService} // Función para guardar cambios en edición
        initialValue={editingService?.tipo || ''} // Pasa el valor del tipo de servicio a editar
        isEditMode={true} // Indica que es modo edición
        uneditableId={editingService?.id} // Pasa el ID para hacerlo no editable
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        item={itemToDelete}
        // Mostrar el tipo de servicio en el modal de confirmación
        displayValue={itemToDelete?.tipo}
      />
    </>
  );
}

export default ServicioList;