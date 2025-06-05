import React, { useState, useEffect, useMemo } from "react";
import { HiDocumentPlus } from "react-icons/hi2"; // Asumo que usabas Hi2

import { Card } from "../../../components/ui/Card";
import DataTable from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import ConfirmDeleteModal from "../../../components/ui/ConfirmDeleteModal";

import CreateCategoryForm from "../../../components/forms/CreateCategoryForm";

import useCategorias from "@hooks/useCategorias"; // Importamos el hook que interactúa con la API

function CategoriaList() {
  const {
    categorias,
    loading,
    fetchError, // Usa fetchError del hook
    page,
    limit,
    total,
    totalPages,
    setPage,
    createCategoria,
    updateCategoria,
    deleteCategoria,
  } = useCategorias();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState(null);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleCreateClick = () => {
    setIsCreateOpen(true);
    setEditingCategory(null);
  };

  const handleCreateClose = () => setIsCreateOpen(false);

  const handleEditClick = (item) => {
    setEditingCategory(item);
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditingCategory(null);
  };

  const handleCreateCategory = async (newCategoryName) => {
    try {
      await createCategoria({ categoria: newCategoryName });
      handleCreateClose(); // Cerrar el formulario si es exitoso
    } catch (err) {
      console.error("Error al crear categoría en CategoriaList (se mostrará en el formulario):", err);
      throw err; // El formulario (CreateCategoryForm) es el que muestra este error
    }
  };

  const handleSaveCategory = async (updatedCategoryName) => {
    if (!editingCategory || !editingCategory.id_categoria) return;
    try {
      await updateCategoria(editingCategory.id_categoria, { categoria: updatedCategoryName });
      handleEditClose(); // Cerrar el formulario si es exitoso
    } catch (err) {
      console.error("Error al actualizar categoría en CategoriaList (se mostrará en el formulario):", err);
      throw err; // El formulario (CreateCategoryForm) es el que muestra este error
    }
  };

  const openDeleteModal = (item) => {
    setCategoriaToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoriaToDelete || !categoriaToDelete.id_categoria) return;
    try {
      await deleteCategoria(categoriaToDelete.id_categoria);
      setCategoriaToDelete(null);
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Error al eliminar categoría en CategoriaList:", err);
      // En esta versión el error de eliminación se mostraba solo en consola o manejaba internamente en el hook
    }
  };

  const cancelDelete = () => {
    setCategoriaToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const sortedCategorias = useMemo(() => {
    return categorias;
  }, [categorias]);

  const columns = useMemo(() => [
    {
      key: "sequential_code",
      header: "Código",
      className: "w-24 text-center",
    },
    {
      key: "categoria",
      header: "Categoría",
      className: "text-center",
    },
  ], []);

  const actions = [
    {
      type: "edit",
      onClick: (item) => handleEditClick(item),
    },
    {
      type: "delete",
      onClick: (item) => openDeleteModal(item),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-700">Cargando categorías...</p>
      </div>
    );
  }

  // fetchError es para errores iniciales de carga de la lista
  if (fetchError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-red-600">Error: {fetchError}</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-4">Categorías</h1>
      <Card className="p-6 rounded-xl shadow-lg border border-gray-200 bg-white">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-grow flex border border-gray-300 rounded-md overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Buscar"
              className="flex-grow p-2 focus:outline-none focus:ring-0 text-gray-700"
            />
            <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 transition duration-200 ease-in-out border-l border-gray-300"
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

        <DataTable data={sortedCategorias} columns={columns} actions={actions} />

        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Card>

      <CreateCategoryForm
        isOpen={isCreateOpen}
        onClose={handleCreateClose}
        onCreate={handleCreateCategory}
        initialValue=""
        isEditMode={false}
      />

      <CreateCategoryForm
        isOpen={isEditOpen}
        onClose={handleEditClose}
        onCreate={handleSaveCategory}
        initialValue={editingCategory?.categoria || ""}
        isEditMode={true}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        item={categoriaToDelete}
        displayValue={categoriaToDelete?.categoria}
      />
    </>
  );
}

export default CategoriaList;