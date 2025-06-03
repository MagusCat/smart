// frontend/src/pages/Admin/CRUD/CategoriaList.jsx
import React, { useState } from 'react';
import { Card } from "../../../components/ui/Card";
import DataTable from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import CreateCategoryForm from '../../../components/forms/CreateCategoryForm'; // Ahora se usará para crear y editar
import ConfirmDeleteModal from '../../../components/ui/ConfirmDeleteModal';

const initialCategoriaData = [
  { id: 'CAT001', categoria: 'Sedán' },
  { id: 'CAT002', categoria: 'SUV' },
  { id: 'CAT003', categoria: 'Camioneta' },
  { id: 'CAT004', categoria: 'Deportivo' },
  { id: 'CAT005', categoria: 'Compacto' },
];

function CategoriaList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriaData, setCategoriaData] = useState(initialCategoriaData);
  
  // Estados para el formulario de creación
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // NUEVOS Estados para el formulario de edición
  const [isEditOpen, setIsEditOpen] = useState(false); // Para controlar la visibilidad del modal de edición
  const [editingCategory, setEditingCategory] = useState(null); // Para almacenar la categoría que se está editando

  // Estados para el modal de eliminación
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState(null);

  const totalPages = 5;

  const handleSearch = () => alert(`Buscando: ${searchTerm}`);
  const handlePageChange = (page) => setCurrentPage(page);

  // Lógica para Crear Categoría
  const handleCreateClick = () => {
    setIsCreateOpen(true);
    // Asegurarse de que no haya un item de edición previo si se abre el de crear
    setEditingCategory(null);
  };

  const handleCreateClose = () => setIsCreateOpen(false);

  const handleCreateCategory = (newCategoryName) => {
    const newId = `CAT${(categoriaData.length + 1).toString().padStart(3, '0')}`;
    const newItem = { id: newId, categoria: newCategoryName };
    setCategoriaData([...categoriaData, newItem]);
    setIsCreateOpen(false);
  };

  // NUEVA Lógica para Editar Categoría
  const handleEditClick = (item) => {
    setEditingCategory(item); // Establece la categoría a editar
    setIsEditOpen(true);      // Abre el formulario de edición
  };

  const handleEditClose = () => {
    setIsEditOpen(false);      // Cierra el formulario de edición
    setEditingCategory(null);  // Limpia la categoría en edición
  };

  const handleSaveCategory = (updatedCategoryName) => {
    setCategoriaData(prevCategories =>
      prevCategories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, categoria: updatedCategoryName }
          : cat
      )
    );
    handleEditClose(); // Cierra el formulario después de guardar
  };

  // Lógica para Eliminar Categoría
  const openDeleteModal = (item) => {
    setCategoriaToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (categoriaToDelete) {
      setCategoriaData(categoriaData.filter(c => c.id !== categoriaToDelete.id));
      setCategoriaToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setCategoriaToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const columns = [
    { key: 'id', header: 'Código' },
    { key: 'categoria', header: 'Categoría' },
  ];

  const actions = [
    {
      type: 'edit',
      // Llama a la nueva función handleEditClick para abrir el formulario de edición
      onClick: (item) => handleEditClick(item), 
    },
    {
      type: 'delete',
      onClick: (item) => openDeleteModal(item),
    },
  ];

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

        <DataTable data={categoriaData} columns={columns} actions={actions} />

        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </Card>

      {/* Formulario de Creación */}
      <CreateCategoryForm
        isOpen={isCreateOpen}
        onClose={handleCreateClose}
        onCreate={handleCreateCategory} // Función para guardar nueva categoría
        initialValue="" // Valor inicial vacío para creación
        isEditMode={false} // No es modo edición
      />

      {/* Formulario de Edición (reutiliza CreateCategoryForm) */}
      <CreateCategoryForm
        isOpen={isEditOpen} // Usa el nuevo estado para edición
        onClose={handleEditClose} // Función para cerrar el formulario de edición
        onCreate={handleSaveCategory} // Función para guardar cambios en edición
        initialValue={editingCategory?.categoria || ''} // Pasa el valor de la categoría a editar
        isEditMode={true} // Indica que es modo edición
      />

      {/* Modal de Eliminación */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        item={categoriaToDelete}
      />
    </>
  );
}

export default CategoriaList;