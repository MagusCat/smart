// frontend/src/pages/Admin/CRUD/RegistroList.jsx
import React, { useState } from 'react';
import { Card } from "../../../components/ui/Card";
import DataTable from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import CreateRegisterForm from '../../../components/forms/CreateRegisterForm'; // Se usará para crear y editar
import ConfirmDeleteModal from '../../../components/ui/ConfirmDeleteModal';

const initialRegistroData = [
  { id: 'REG001', nChasis: 'ABCDE12345FGHIJ67', nMatricula: 'NIC001A', marca: 'Toyota', fechaInscripcion: '2023-01-15' },
  { id: 'REG002', nChasis: 'KLMNO87654PQRST32', nMatricula: 'NIC002B', marca: 'Honda', fechaInscripcion: '2023-02-20' },
  { id: 'REG003', nChasis: 'UVWXY98765ZABCD10', nMatricula: 'NIC003C', marca: 'Nissan', fechaInscripcion: '2023-03-01' },
  { id: 'REG004', nChasis: 'FGHIJ11223KLMNO44', nMatricula: 'NIC004D', marca: 'Mercedes-Benz', fechaInscripcion: '2023-04-10' },
  { id: 'REG005', nChasis: 'PQRST55667UVWXY88', nMatricula: 'NIC005E', marca: 'BMW', fechaInscripcion: '2023-05-05' },
];

function RegistroList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [registroData, setRegistroData] = useState(initialRegistroData);

  // Estados para el formulario de creación
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // NUEVOS Estados para el formulario de edición
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingRegister, setEditingRegister] = useState(null); // Almacena el registro que se está editando

  // Estados para el modal de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const totalPages = 5;

  const handleSearch = () => alert(`Buscando: ${searchTerm}`);
  const handlePageChange = (page) => setCurrentPage(page);

  // Lógica para Crear Registro
  const openCreateForm = () => {
    setIsCreateOpen(true);
    setEditingRegister(null); // Asegurarse de que no haya un item de edición previo
  };
  const closeCreateForm = () => setIsCreateOpen(false);

  // Crear nuevo registro (recibe { nChasis, nMatricula, marca, fechaInscripcion } desde el formulario)
  const handleCreateRegister = (newData) => {
    const newId = `REG${(registroData.length + 1).toString().padStart(3, '0')}`;
    const newItem = {
      id: newId,
      nChasis: newData.nChasis,
      nMatricula: newData.nMatricula,
      marca: newData.marca,
      fechaInscripcion: newData.fechaInscripcion
    };
    setRegistroData(prev => [...prev, newItem]);
    closeCreateForm();
  };

  // NUEVA Lógica para Editar Registro
  const openEditForm = (item) => {
    setEditingRegister(item); // Establece el registro a editar
    setIsEditOpen(true);      // Abre el formulario de edición
  };

  const closeEditForm = () => {
    setIsEditOpen(false);      // Cierra el formulario de edición
    setEditingRegister(null);  // Limpia el registro en edición
  };

  const handleSaveRegister = (updatedData) => {
    setRegistroData(prev =>
      prev.map(reg =>
        reg.id === editingRegister.id
          ? {
              ...reg,
              nChasis: updatedData.nChasis,
              nMatricula: updatedData.nMatricula,
              marca: updatedData.marca,
              fechaInscripcion: updatedData.fechaInscripcion
            }
          : reg
      )
    );
    closeEditForm(); // Cierra el formulario después de guardar
  };

  // Lógica para Eliminar Registro
  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = () => {
    if (!itemToDelete) return;
    setRegistroData(prev => prev.filter(r => r.id !== itemToDelete.id));
    setItemToDelete(null);
    setIsDeleteModalOpen(false);
  };
  const cancelDelete = () => {
    setItemToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const columns = [
    { key: 'id', header: 'Código' },
    { key: 'nChasis', header: 'Nº Chasis' },
    { key: 'nMatricula', header: 'Nº Matrícula' },
    { key: 'marca', header: 'Marca' },
    { key: 'fechaInscripcion', header: 'Fecha inscripción' },
  ];

  const actions = [
    {
      type: 'edit',
      onClick: (item) => openEditForm(item), // Llama a la nueva función para abrir el formulario de edición
    },
    {
      type: 'delete',
      onClick: (item) => openDeleteModal(item),
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-4">Registros</h1>
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
            onClick={openCreateForm}
          >
            <img src="/img/create.svg" alt="Crear" className="w-5 h-5" />
            <span>Crear</span>
          </button>
        </div>

        <DataTable data={registroData} columns={columns} actions={actions} />
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </Card>

      {/* Formulario de creación de registro */}
      <CreateRegisterForm
        isOpen={isCreateOpen}
        onClose={closeCreateForm}
        onCreate={handleCreateRegister} // Ahora espera un objeto con las props correctas de registro
        initialValues={{}} // Valores iniciales vacíos para crear
        isEditMode={false} // No es modo edición
      />

      {/* Formulario de edición de registro (reutiliza CreateRegisterForm) */}
      <CreateRegisterForm
        isOpen={isEditOpen} // Usa el nuevo estado para edición
        onClose={closeEditForm} // Función para cerrar el formulario de edición
        onCreate={handleSaveRegister} // Función para guardar cambios en edición
        initialValues={{ // Pasa los valores del registro a editar
          nChasis: editingRegister?.nChasis || '',
          nMatricula: editingRegister?.nMatricula || '',
          marca: editingRegister?.marca || '',
          fechaInscripcion: editingRegister?.fechaInscripcion || '',
        }}
        isEditMode={true} // Indica que es modo edición
        uneditableId={editingRegister?.id} // Pasa el ID para hacerlo no editable
      />

       {/* Modal de confirmación de eliminación */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        item={itemToDelete}
        // PASO CLAVE: Sobreescribir la prop 'displayValue' para que muestre el 'id'
        displayValue={itemToDelete?.id}
      />
    </>
  );
}

export default RegistroList;