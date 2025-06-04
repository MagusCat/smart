import React, { useState } from "react";
import { HiDocumentPlus } from "react-icons/hi2";

import { Card } from "../../../components/ui/Card";
import DataTable from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import CreateUserForm from "../../../components/forms/CreateUserForm";
import ConfirmDeleteModal from "../../../components/ui/ConfirmDeleteModal";

const initialUsersData = [
  { id: "001", user: "jperez", name: "Juan Pérez", role: "Administrador" },
  { id: "002", user: "mlopez", name: "María López", role: "Editor" },
  { id: "003", user: "cgarcia", name: "Carlos García", role: "Visor" },
  { id: "004", user: "arodriguez", name: "Ana Rodríguez", role: "Editor" },
  { id: "005", user: "dbrown", name: "David Brown", role: "Visor" },
  { id: "006", user: "ssmith", name: "Sofía Smith", role: "Administrador" },
  { id: "007", user: "amartinez", name: "Andrés Martínez", role: "Visor" },
  { id: "008", user: "lgonzalez", name: "Laura González", role: "Editor" },
  { id: "009", user: "jperez", name: "Juan Pérez", role: "Administrador" },
  { id: "010", user: "mlopez", name: "María López", role: "Editor" },
];

function UserList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersData, setUsersData] = useState(initialUsersData);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const totalPages = 7;

  const handleSearch = () => alert(`Buscando: ${searchTerm}`);
  const handlePageChange = (page) => setCurrentPage(page);

  const handleCreateClick = () => {
    setIsCreateOpen(true);
    setEditingUser(null);
  };

  const handleCreateClose = () => setIsCreateOpen(false);

  const handleCreateUser = (newUserData) => {
    const newId = (usersData.length + 1).toString().padStart(3, "0");
    const newUser = { id: newId, ...newUserData };
    setUsersData((prev) => [...prev, newUser]);
    handleCreateClose();
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = (updatedData) => {
    setUsersData((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editingUser.id ? { ...user, ...updatedData } : user
      )
    );
    handleEditClose();
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsersData((prevUsers) =>
        prevUsers.filter((u) => u.id !== userToDelete.id)
      );
      setUserToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setUserToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const userColumns = [
    { key: "id", header: "Código" },
    { key: "user", header: "Usuario" },
    { key: "name", header: "Nombre" },
    { key: "role", header: "Rol" },
  ];

  const userActions = [
    {
      type: "edit",
      onClick: (user) => handleEditClick(user),
    },
    {
      type: "delete",
      onClick: (user) => openDeleteModal(user),
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
            <HiDocumentPlus className="w-5 h-5" />
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

      <CreateUserForm
        isOpen={isCreateOpen}
        onClose={handleCreateClose}
        onCreate={handleCreateUser}
        initialValues={{}}
        isEditMode={false}
      />

      <CreateUserForm
        isOpen={isEditOpen}
        onClose={handleEditClose}
        onCreate={handleSaveUser}
        initialValues={editingUser}
        isEditMode={true}
        uneditableId={editingUser?.id}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        item={userToDelete}
        displayValue={userToDelete?.name}
      />
    </>
  );
}

export default UserList;
