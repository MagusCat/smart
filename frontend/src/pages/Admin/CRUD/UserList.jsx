// frontend/src/pages/Admin/CRUD/UserList.jsx
import React, { useState } from 'react';
import { Card } from "../../../components/ui/Card";
import DataTable from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import CreateUserForm from '../../../components/forms/CreateUserForm'; // Reutilizaremos este para crear y editar
import ConfirmDeleteModal from '../../../components/ui/ConfirmDeleteModal'; // Para el modal de eliminación

const initialUsersData = [ // Renombrado a initialUsersData para consistencia
  { id: '001', user: 'jperez', name: 'Juan Pérez', role: 'Administrador' },
  { id: '002', user: 'mlopez', name: 'María López', role: 'Editor' },
  { id: '003', user: 'cgarcia', name: 'Carlos García', role: 'Visor' },
  { id: '004', user: 'arodriguez', name: 'Ana Rodríguez', role: 'Editor' },
  { id: '005', user: 'dbrown', name: 'David Brown', role: 'Visor' },
  { id: '006', user: 'ssmith', name: 'Sofía Smith', role: 'Administrador' },
  { id: '007', user: 'amartinez', name: 'Andrés Martínez', role: 'Visor' },
  { id: '008', user: 'lgonzalez', name: 'Laura González', role: 'Editor' },
  { id: '009', user: 'jperez', name: 'Juan Pérez', role: 'Administrador' },
  { id: '010', user: 'mlopez', name: 'María López', role: 'Editor' },
];

function UserList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersData, setUsersData] = useState(initialUsersData); // Nuevo estado para los datos mutables

  // Estados para el formulario de creación
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // NUEVOS Estados para el formulario de edición
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // Almacena el usuario que se está editando

  // Estados para el modal de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null); // Almacena el usuario a eliminar

  const totalPages = 7; // Manteniendo el valor original

  const handleSearch = () => alert(`Buscando: ${searchTerm}`);
  const handlePageChange = (page) => setCurrentPage(page);

  // Lógica para Crear Usuario
  const handleCreateClick = () => {
    setIsCreateOpen(true);
    setEditingUser(null); // Asegurarse de que no haya un item de edición previo
  };

  const handleCreateClose = () => setIsCreateOpen(false);

  const handleCreateUser = (newUserData) => {
    const newId = (usersData.length + 1).toString().padStart(3, '0');
    const newUser = { id: newId, ...newUserData };
    setUsersData(prev => [...prev, newUser]);
    handleCreateClose(); // Cerrar el formulario después de crear
  };

  // NUEVA Lógica para Editar Usuario
  const handleEditClick = (user) => {
    setEditingUser(user); // Establece el usuario a editar
    setIsEditOpen(true);   // Abre el formulario de edición
  };

  const handleEditClose = () => {
    setIsEditOpen(false);   // Cierra el formulario de edición
    setEditingUser(null);   // Limpia el usuario en edición
  };

  const handleSaveUser = (updatedData) => {
    setUsersData(prevUsers =>
      prevUsers.map(user =>
        user.id === editingUser.id
          ? { ...user, ...updatedData } // Actualiza todas las propiedades del usuario
          : user
      )
    );
    handleEditClose(); // Cierra el formulario después de guardar
  };

  // Lógica para Eliminar Usuario
  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsersData(prevUsers => prevUsers.filter(u => u.id !== userToDelete.id));
      setUserToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setUserToDelete(null);
    setIsDeleteModalOpen(false);
  };

  // Definición de las columnas para DataTable
  const userColumns = [
    { key: 'id', header: 'Código' },
    { key: 'user', header: 'Usuario' },
    { key: 'name', header: 'Nombre' },
    { key: 'role', header: 'Rol' },
  ];

  // Definición de las acciones para DataTable
  const userActions = [
    {
      type: 'edit',
      onClick: (user) => handleEditClick(user), // Llama a la nueva función de edición
    },
    {
      type: 'delete',
      onClick: (user) => openDeleteModal(user), // Llama al modal de confirmación
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-4">Usuarios</h1>

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

        <DataTable
          data={usersData}
          columns={userColumns}
          actions={userActions}
        />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Card>

      {/* Formulario de Creación de Usuario */}
      <CreateUserForm
        isOpen={isCreateOpen}
        onClose={handleCreateClose}
        onCreate={handleCreateUser}
        initialValues={{}} // Sin valores iniciales para crear
        isEditMode={false} // No es modo edición
      />

      {/* Formulario de Edición de Usuario (reutiliza CreateUserForm) */}
      <CreateUserForm
        isOpen={isEditOpen}
        onClose={handleEditClose}
        onCreate={handleSaveUser}
        initialValues={editingUser} // Pasa los datos del usuario a editar
        isEditMode={true} // Es modo edición
        uneditableId={editingUser?.id} // Pasa el ID para que no sea editable
      />

      {/* Modal de confirmación de eliminación */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        item={userToDelete}
        displayValue={userToDelete?.name} // Mostrar el nombre del usuario al eliminar
      />
    </>
  );
}

export default UserList;