import React, { useState, useEffect } from "react";
import { HiDocumentPlus } from "react-icons/hi2";

import { Card } from "../../../components/ui/Card";
import DataTable from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import CreateServiceTypeForm from "../../../components/forms/CreateServiceTypeForm";
import ConfirmDeleteModal from "../../../components/ui/ConfirmDeleteModal";

const initialServicioData = [
  { id: "S001", tipo: "Mantenimiento Preventivo" },
  { id: "S002", tipo: "Reparación de Motor" },
  { id: "S003", tipo: "Cambio de Aceite" },
  { id: "S004", tipo: "Alineación y Balanceo" },
  { id: "S005", tipo: "Inspección General" },
];

function ServicioList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [servicioData, setServicioData] = useState(initialServicioData);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const totalPages = 5;

  const handleSearch = () => alert(`Buscando: ${searchTerm}`);
  const handlePageChange = (page) => setCurrentPage(page);

  const handleCreateClick = () => {
    setIsCreateOpen(true);
    setEditingService(null);
  };
  const handleCreateClose = () => setIsCreateOpen(false);

  const handleCreateService = (newServiceType) => {
    const newId = `S${(servicioData.length + 1).toString().padStart(3, "0")}`;
    const newItem = { id: newId, tipo: newServiceType };
    setServicioData((prev) => [...prev, newItem]);
    handleCreateClose();
  };

  const handleEditClick = (item) => {
    setEditingService(item);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditingService(null);
  };

  const handleSaveService = (updatedServiceType) => {
    setServicioData((prevServices) =>
      prevServices.map((service) =>
        service.id === editingService.id
          ? { ...service, tipo: updatedServiceType }
          : service
      )
    );
    handleEditClose();
  };

  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    setServicioData((prevServices) =>
      prevServices.filter((s) => s.id !== itemToDelete.id)
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
    { key: "tipo", header: "Tipo de Servicio" },
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
        Tipos de Servicios
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
        <DataTable data={servicioData} columns={columns} actions={actions} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Card>

      <CreateServiceTypeForm
        isOpen={isCreateOpen}
        onClose={handleCreateClose}
        onCreate={handleCreateService}
        initialValue=""
        isEditMode={false}
      />

      <CreateServiceTypeForm
        isOpen={isEditOpen}
        onClose={handleEditClose}
        onCreate={handleSaveService}
        initialValue={editingService?.tipo || ""}
        isEditMode={true}
        uneditableId={editingService?.id}
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

export default ServicioList;
