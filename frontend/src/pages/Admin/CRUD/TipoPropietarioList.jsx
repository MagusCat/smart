import React, { useState, useEffect } from "react";
import { HiDocumentPlus } from "react-icons/hi2";

import { Card } from "../../../components/ui/Card";
import DataTable from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import CreateOwnerTypeForm from "../../../components/forms/CreateOwnerTypeForm";
import ConfirmDeleteModal from "../../../components/ui/ConfirmDeleteModal";

const initialTipoPropietarioData = [
  { id: "TP001", tipo: "Particular" },
  { id: "TP002", tipo: "Empresa" },
  { id: "TP003", tipo: "Gobierno" },
  { id: "TP004", tipo: "Organización No Lucrativa" },
  { id: "TP005", tipo: "Arrendador" },
  { id: "TP006", tipo: "Empresa" },
];

function TipoPropietarioList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tipoPropietarioData, setTipoPropietarioData] = useState(
    initialTipoPropietarioData
  );

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingOwnerType, setEditingOwnerType] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const totalPages = 5;

  const handleSearch = () => alert(`Buscando: ${searchTerm}`);
  const handlePageChange = (page) => setCurrentPage(page);

  const handleCreateClick = () => {
    setIsCreateOpen(true);
    setEditingOwnerType(null);
  };
  const handleCreateClose = () => setIsCreateOpen(false);

  const handleCreateOwnerType = (newOwnerType) => {
    const newId = `TP${(tipoPropietarioData.length + 1)
      .toString()
      .padStart(3, "0")}`;
    const newItem = { id: newId, tipo: newOwnerType };
    setTipoPropietarioData((prev) => [...prev, newItem]);
    handleCreateClose();
  };

  const handleEditClick = (item) => {
    setEditingOwnerType(item);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditingOwnerType(null);
  };

  const handleSaveOwnerType = (updatedOwnerType) => {
    setTipoPropietarioData((prevTypes) =>
      prevTypes.map((type) =>
        type.id === editingOwnerType.id
          ? { ...type, tipo: updatedOwnerType }
          : type
      )
    );
    handleEditClose();
  };

  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    setTipoPropietarioData((prevTypes) =>
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
    { key: "tipo", header: "Tipo de Propietario" },
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
        Tipos de Propietario
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
            <HiDocumentPlus className="w-5 h-5" /> {/* Icono actualizado */}
            <span>Crear</span>
          </button>
        </div>
        <DataTable
          data={tipoPropietarioData}
          columns={columns}
          actions={actions}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Card>

      <CreateOwnerTypeForm
        isOpen={isCreateOpen}
        onClose={handleCreateClose}
        onCreate={handleCreateOwnerType}
        initialValue=""
        isEditMode={false}
      />

      <CreateOwnerTypeForm
        isOpen={isEditOpen}
        onClose={handleEditClose}
        onCreate={handleSaveOwnerType}
        initialValue={editingOwnerType?.tipo || ""}
        isEditMode={true}
        uneditableId={editingOwnerType?.id}
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

export default TipoPropietarioList;
