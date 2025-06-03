// frontend/src/pages/Admin/CRUD/MarcaList.jsx
import React, { useState } from 'react';
import { Card } from "../../../components/ui/Card";
import DataTable from "../../../components/ui/DataTable";
import Pagination from "../../../components/ui/Pagination";
import CreateBrandForm from '../../../components/forms/CreateBrandForm'; // Se usará para crear y editar
import ConfirmDeleteModal from '../../../components/ui/ConfirmDeleteModal';

const initialMarcaData = [
  { id: 'M001', marca: 'Toyota' },
  { id: 'M002', marca: 'Honda' },
  { id: 'M003', marca: 'Nissan' },
  { id: 'M004', marca: 'Mercedes-Benz' },
  { id: 'M005', marca: 'BMW' },
];

function MarcaList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [marcaData, setMarcaData] = useState(initialMarcaData);

  // Estados para el formulario de creación
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // NUEVOS Estados para el formulario de edición
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null); // Almacena la marca que se está editando

  // Estados para el modal de eliminación
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const totalPages = 5;

  const handleSearch = () => alert(`Buscando: ${searchTerm}`);
  const handlePageChange = (page) => setCurrentPage(page);

  // Lógica para Crear Marca
  const handleCreateClick = () => {
    setIsCreateOpen(true);
    setEditingBrand(null); // Asegurarse de que no haya un item de edición previo
  };
  const handleCreateClose = () => setIsCreateOpen(false);

  const handleCreateBrand = (newBrandName) => {
    const newId = `M${(marcaData.length + 1).toString().padStart(3, '0')}`;
    const newItem = { id: newId, marca: newBrandName };
    setMarcaData([...marcaData, newItem]);
    handleCreateClose(); // Cerrar el formulario después de crear
  };

  // NUEVA Lógica para Editar Marca
  const handleEditClick = (item) => {
    setEditingBrand(item); // Establece la marca a editar
    setIsEditOpen(true);    // Abre el formulario de edición
  };

  const handleEditClose = () => {
    setIsEditOpen(false);   // Cierra el formulario de edición
    setEditingBrand(null);  // Limpia la marca en edición
  };

  const handleSaveBrand = (updatedBrandName) => {
    setMarcaData(prevBrands =>
      prevBrands.map(brand =>
        brand.id === editingBrand.id
          ? { ...brand, marca: updatedBrandName }
          : brand
      )
    );
    handleEditClose(); // Cierra el formulario después de guardar
  };

  // Lógica para Eliminar Marca
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    setMarcaData(prevBrands => prevBrands.filter(m => m.id !== itemToDelete.id));
    setItemToDelete(null);
    setIsDeleteOpen(false);
  };

  const handleDeleteCancel = () => {
    setItemToDelete(null);
    setIsDeleteOpen(false);
  };

  const columns = [
    { key: 'id', header: 'Código' },
    { key: 'marca', header: 'Marca' },
  ];

  const actions = [
    {
      type: 'edit',
      onClick: (item) => handleEditClick(item), // Llama a la nueva función de edición
    },
    {
      type: 'delete',
      onClick: (item) => {
        setItemToDelete(item);
        setIsDeleteOpen(true);
      },
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 mt-4">Marcas</h1> {/* Cambiado a plural */}
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
        <DataTable data={marcaData} columns={columns} actions={actions} />
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </Card>

      {/* Formulario de Creación de Marca */}
      <CreateBrandForm
        isOpen={isCreateOpen}
        onClose={handleCreateClose}
        onCreate={handleCreateBrand}
        initialValue="" // Valor inicial vacío para creación
        isEditMode={false} // No es modo edición
      />

      {/* Formulario de Edición de Marca (reutiliza CreateBrandForm) */}
      <CreateBrandForm
        isOpen={isEditOpen} // Usa el nuevo estado para edición
        onClose={handleEditClose} // Función para cerrar el formulario de edición
        onCreate={handleSaveBrand} // Función para guardar cambios en edición
        initialValue={editingBrand?.marca || ''} // Pasa el valor de la marca a editar
        isEditMode={true} // Indica que es modo edición
        uneditableId={editingBrand?.id} // Pasa el ID para hacerlo no editable
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        item={itemToDelete}
        // Asegúrate de que el modal de eliminación muestre el código si es necesario,
        // o el nombre de la marca si es más descriptivo. En este caso, la marca es descriptiva.
        displayValue={itemToDelete?.marca}
      />
    </>
  );
}

export default MarcaList;