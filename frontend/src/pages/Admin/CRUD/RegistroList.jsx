import React, { useState } from "react";
import { HiDocumentPlus } from "react-icons/hi2";

import { Card } from "../../../components/ui/Card";
import DataTable from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import CreateRegisterForm from "../../../components/forms/CreateRegisterForm";
import ConfirmDeleteModal from "../../../components/ui/ConfirmDeleteModal";

const initialRegistroData = [
  {
    id: "REG001",
    nChasis: "ABCDE12345FGHIJ67",
    nMatricula: "NIC001A",
    marca: "Toyota",
    fechaInscripcion: "2023-01-15",
  },
  {
    id: "REG002",
    nChasis: "KLMNO87654PQRST32",
    nMatricula: "NIC002B",
    marca: "Honda",
    fechaInscripcion: "2023-02-20",
  },
  {
    id: "REG003",
    nChasis: "UVWXY98765ZABCD10",
    nMatricula: "NIC003C",
    marca: "Nissan",
    fechaInscripcion: "2023-03-01",
  },
  {
    id: "REG004",
    nChasis: "FGHIJ11223KLMNO44",
    nMatricula: "NIC004D",
    marca: "Mercedes-Benz",
    fechaInscripcion: "2023-04-10",
  },
  {
    id: "REG005",
    nChasis: "PQRST55667UVWXY88",
    nMatricula: "NIC005E",
    marca: "BMW",
    fechaInscripcion: "2023-05-05",
  },
];

function RegistroList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [registroData, setRegistroData] = useState(initialRegistroData);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingRegister, setEditingRegister] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const totalPages = 5;

  const handleSearch = () => alert(`Buscando: ${searchTerm}`);
  const handlePageChange = (page) => setCurrentPage(page);

  const openCreateForm = () => {
    setIsCreateOpen(true);
    setEditingRegister(null);
  };
  const closeCreateForm = () => setIsCreateOpen(false);

  const handleCreateRegister = (newData) => {
    const newId = `REG${(registroData.length + 1).toString().padStart(3, "0")}`;
    const newItem = {
      id: newId,
      nChasis: newData.nChasis,
      nMatricula: newData.nMatricula,
      marca: newData.marca,
      fechaInscripcion: newData.fechaInscripcion,
    };
    setRegistroData((prev) => [...prev, newItem]);
    closeCreateForm();
  };

  const openEditForm = (item) => {
    setEditingRegister(item);
    setIsEditOpen(true);
  };

  const closeEditForm = () => {
    setIsEditOpen(false);
    setEditingRegister(null);
  };

  const handleSaveRegister = (updatedData) => {
    setRegistroData((prev) =>
      prev.map((reg) =>
        reg.id === editingRegister.id
          ? {
              ...reg,
              nChasis: updatedData.nChasis,
              nMatricula: updatedData.nMatricula,
              marca: updatedData.marca,
              fechaInscripcion: updatedData.fechaInscripcion,
            }
          : reg
      )
    );
    closeEditForm();
  };

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = () => {
    if (!itemToDelete) return;
    setRegistroData((prev) => prev.filter((r) => r.id !== itemToDelete.id));
    setItemToDelete(null);
    setIsDeleteModalOpen(false);
  };
  const cancelDelete = () => {
    setItemToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const columns = [
    { key: "id", header: "Código" },
    { key: "nChasis", header: "Nº Chasis" },
    { key: "nMatricula", header: "Nº Matrícula" },
    { key: "marca", header: "Marca" },
    { key: "fechaInscripcion", header: "Fecha inscripción" },
  ];

  const actions = [
    {
      type: "edit",
      onClick: (item) => openEditForm(item),
    },
    {
      type: "delete",
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
            <HiDocumentPlus className="w-5 h-5" />
            <span>Crear</span>
          </button>
        </div>

        <DataTable data={registroData} columns={columns} actions={actions} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Card>

      <CreateRegisterForm
        isOpen={isCreateOpen}
        onClose={closeCreateForm}
        onCreate={handleCreateRegister}
        initialValues={{}}
        isEditMode={false}
      />

      <CreateRegisterForm
        isOpen={isEditOpen}
        onClose={closeEditForm}
        onCreate={handleSaveRegister}
        initialValues={{
          nChasis: editingRegister?.nChasis || "",
          nMatricula: editingRegister?.nMatricula || "",
          marca: editingRegister?.marca || "",
          fechaInscripcion: editingRegister?.fechaInscripcion || "",
        }}
        isEditMode={true}
        uneditableId={editingRegister?.id}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        item={itemToDelete}
        displayValue={itemToDelete?.id}
      />
    </>
  );
}

export default RegistroList;
