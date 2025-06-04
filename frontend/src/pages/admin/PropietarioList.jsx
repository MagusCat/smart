import { useEffect, useState } from "react";
import { CardMain } from "../../components/ui/Card";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import SearchBar from "../../components/ui/SearchBar";
import Button from "../../components/ui/Button";
import { FaPlus } from "react-icons/fa";

import useFetch from "@hooks/useFetch";

function PropietarioList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: propietarioData,
    state: propietarioState,
    refetch,
  } = useFetch(`oltp/propietarios?page=${currentPage}`, null, false);
  const totalPages = propietarioData?.totalPages || 1;
  const propiertarios = propietarioData?.data || [];

  console.log(propietarioData, propietarioState)

  const handleEditClick = (item) => {};

  const handleDeleteClick = (item) => {};

  const columns = [
    { key: "id_propietario", header: "Código" },
    { key: "cedula", header: "Cédula" },
    { key: "ruc", header: "Ruc" },
    { key: "propietario", header: "Tipo" },
  ];

  const actions = [
    { type: "edit", onClick: handleEditClick },
    { type: "delete", onClick: handleDeleteClick },
  ];

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Propietarios</h1>
      <CardMain>
        <div className="flex items-center w-full justify-between mb-6">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onClick={(term) => {
              // Aquí puedes implementar la lógica de búsqueda
              console.log("Buscar:", term);
            }}
          />

          <Button
            icon={<FaPlus />}
            className="min-w-25"
            style="primary"
            onClick={() => {
              console.log("Agregar nuevo propietario");
            }}
            children="Agregar"
          />
        </div>

        <DataTable data={propiertarios} columns={columns} actions={actions} />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </CardMain>
    </>
  );
}

export default PropietarioList;
