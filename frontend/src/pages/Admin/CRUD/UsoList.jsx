import React, { useState, useEffect } from "react";
import { HiDocumentPlus } from "react-icons/hi2";
import { Card } from "../../../components/ui/Card";
import DataTable from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import CreateUsageTypeForm from "../../../components/forms/CreateUsageTypeForm";
import ConfirmDeleteModal from "../../../components/ui/ConfirmDeleteModal";

const initialUsoData = [
  { id: "US001", tipo: "Particular" },
  { id: "US002", tipo: "Comercial" },
  { id: "US003", tipo: "Público" },
  { id: "US004", tipo: "Transporte" },
  { id: "US005", tipo: "Agrícola" },
];

function UsoList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usoData, setUsoData] = useState(initialUsoData);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUsageType, setEditingUsageType] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const totalPages = 5;

  const handleSearch = () => alert(`Buscando: ${searchTerm}`);
  const handlePageChange = (page) => setCurrentPage(page);

  const handleCreateClick = () => {
    setIsCreateOpen(true);
    setEditingUsageType(null);
  };
  const handleCreateClose = () => setIsCreateOpen(false);

  const handleCreateUsageType = (newUsageType) => {
    const newId = `US${(usoData.length + 1).toString().padStart(3, "0")}`;
    const newItem = { id: newId, tipo: newUsageType };
    setUsoData((prev) => [...prev, newItem]);
    handleCreateClose();
  };

  const handleEditClick = (item) => {
    setEditingUsageType(item);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditingUsageType(null);
  };

  const handleSaveUsageType = (updatedUsageType) => {
    setUsoData((prevTypes) =>
      prevTypes.map((type) =>
        type.id === editingUsageType.id
          ? { ...type, tipo: updatedUsageType }
          : type
      )
    );
    handleEditClose();
  };

  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    setUsoData((prevTypes) =>
      prevTypes.filter((t) => t.id !== itemToDelete.id)
    );
    setItemToDelete(null);
    setIsDeleteOpen(false);
  };

  const handleDeleteCancel = () => {
    setItemToDelete(null);
    setIsDeleteOpen(false);
  };

  const columns = [
    { key: "id", header: "Código" },
    { key: "tipo", header: "Tipo de Uso" },
  ];

  const actions = [
    {
      type: "edit",
      onClick: (item) => handleEditClick(item),
    },
    {
      type: "delete",
      onClick: (item) => {
        setItemToDelete(item);
        setIsDeleteOpen(true);
      },
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-4">
        Tipos de Uso
      </h1>
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
        <DataTable data={usoData} columns={columns} actions={actions} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Card>

      <CreateUsageTypeForm
        isOpen={isCreateOpen}
        onClose={handleCreateClose}
        onCreate={handleCreateUsageType}
        initialValue=""
        isEditMode={false}
      />

      <CreateUsageTypeForm
        isOpen={isEditOpen}
        onClose={handleEditClose}
        onCreate={handleSaveUsageType}
        initialValue={editingUsageType?.tipo || ""}
        isEditMode={true}
        uneditableId={editingUsageType?.id}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        item={itemToDelete}
        displayValue={itemToDelete?.tipo}
      />
    </>
  );
}

export default UsoList;
