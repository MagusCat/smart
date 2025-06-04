import React, { useState } from "react";
import { HiDocumentPlus } from "react-icons/hi2";

import { Card } from "../../../components/ui/Card";
import DataTable from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import CreateBrandForm from "../../../components/forms/CreateBrandForm";
import ConfirmDeleteModal from "../../../components/ui/ConfirmDeleteModal";

const initialMarcaData = [
  { id: "M001", marca: "Toyota" },
  { id: "M002", marca: "Honda" },
  { id: "M003", marca: "Nissan" },
  { id: "M004", marca: "Mercedes-Benz" },
  { id: "M005", marca: "BMW" },
];

function MarcaList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [marcaData, setMarcaData] = useState(initialMarcaData);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const totalPages = 5;

  const handleSearch = () => alert(`Buscando: ${searchTerm}`);
  const handlePageChange = (page) => setCurrentPage(page);

  const handleCreateClick = () => {
    setIsCreateOpen(true);
    setEditingBrand(null);
  };
  const handleCreateClose = () => setIsCreateOpen(false);

  const handleCreateBrand = (newBrandName) => {
    const newId = `M${(marcaData.length + 1).toString().padStart(3, "0")}`;
    const newItem = { id: newId, marca: newBrandName };
    setMarcaData([...marcaData, newItem]);
    handleCreateClose();
  };

  const handleEditClick = (item) => {
    setEditingBrand(item);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditingBrand(null);
  };

  const handleSaveBrand = (updatedBrandName) => {
    setMarcaData((prevBrands) =>
      prevBrands.map((brand) =>
        brand.id === editingBrand.id
          ? { ...brand, marca: updatedBrandName }
          : brand
      )
    );
    handleEditClose();
  };

  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    setMarcaData((prevBrands) =>
      prevBrands.filter((m) => m.id !== itemToDelete.id)
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
    { key: "marca", header: "Marca" },
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-4">Marcas</h1>
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
        <DataTable data={marcaData} columns={columns} actions={actions} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Card>

      <CreateBrandForm
        isOpen={isCreateOpen}
        onClose={handleCreateClose}
        onCreate={handleCreateBrand}
        initialValue=""
        isEditMode={false}
      />

      <CreateBrandForm
        isOpen={isEditOpen}
        onClose={handleEditClose}
        onCreate={handleSaveBrand}
        initialValue={editingBrand?.marca || ""}
        isEditMode={true}
        uneditableId={editingBrand?.id}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        item={itemToDelete}
        displayValue={itemToDelete?.marca}
      />
    </>
  );
}

export default MarcaList;
