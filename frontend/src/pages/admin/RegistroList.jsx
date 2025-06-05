import { useEffect, useMemo, useState } from "react";
import { CardMain } from "../../components/ui/Card";
import DataTable from "../../components/ui/DataTable";
import Pagination from "../../components/ui/Pagination";
import SearchBar from "../../components/ui/SearchBar";
import Button from "../../components/ui/Button";
import { FaPlus } from "react-icons/fa";
import CreateRegistroForm from "@forms/CreateRegistroForm";
import { ModalQuestion } from "../../components/ui/Modal";
import useFetch from "@hooks/useFetch";
import useFetchCallback from "@hooks/useFetchCallback";

function PropietarioList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [createForm, setCreateForm] = useState({
    isOpen: false,
    state: "",
    message: "",
    init: {},
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    message: "",
    target: -1,
  });

  const { data: propietarioData, refetch } = useFetch(
    `oltp/vehiculos?page=${currentPage}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`,
    null,
    false
  );

  const callback = useFetchCallback();
  const totalPages = propietarioData?.totalPages || 1;
  const propiertarios = propietarioData?.data || [];

  const create = async (form) => {
    return await callback("oltp/propietarios", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        cedula: form.cedula,
        ruc: form.ruc,
        id_tipo_propietario: parseInt(form.propietario) || 0,
      }),
    });
  };

  const update = async (form) => {
    return await callback(`oltp/propietarios/${form.id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify({
        id_propietario: form.id,
        cedula: form.cedula,
        ruc: form.ruc,
        id_tipo_propietario: parseInt(form.propietario) || 0,
      }),
    });
  };

  const search = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    refetch();
  };

  const handleOpenCreateForm = (init) => {
    setCreateForm({ isOpen: true, state: "idle", init: init ?? {} });
  };

  const handleCloseCreateForm = () =>
    setCreateForm({ isOpen: false, state: "" });

  const handleCreate = async (form) => {
    setCreateForm({ isOpen: true, state: "loading" });

    const { success, data } = await (form.id > 0 ? update(form) : create(form));

    if (success) {
      setCreateForm({ isOpen: false, state: "" });
      setTimeout(
        () => (form.id > 0 ? refetch() : search(data.data.id_propietario)),
        450
      );
    } else {
      setCreateForm({
        isOpen: true,
        state: "error",
        message: (data ?? []).join("|"),
      });
    }
  };

  const handleOpenDelete = (message, target) =>
    setDeleteModal({ isOpen: true, message: message, target: target });
  const handleCloseDelete = () =>
    setDeleteModal({ isOpen: false, message: "", target: -1 });

  const handleDelete = async () => {
    const { success, data } = await callback(
      `oltp/propietarios/${deleteModal.target}`,
      {
        method: "DELETE",
      }
    );

    if (success) {
      setTimeout(() => refetch(), 450);
    }

    handleCloseDelete();
  };

  const handleEditClick = (item) => {
    handleOpenCreateForm({
      id: item.id_propietario,
      ruc: item.ruc,
      cedula: item.cedula,
      propietario: item.propietario,
    });
  };

  const handleDeleteClick = (item) =>
    handleOpenDelete(
      `¿Esta seguro de eliminar este registro [${item.id_propietario}]?`,
      item.id_propietario
    );

  const columns = [
    { key: "id_vehiculo", header: "Código" },
    { key: "num_motor", header: "Num Motor" },
    { key: "num_chasis", header: "Num Chasis" },
    { key: "modelo", header: "Modelo" },
    { key: "marca", header: "Marca" },
    { key: "vehiculo", header: "Vehiculo" },
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
        <div className="flex items-center w-full justify-between mb-6 gap-10">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onClick={(term) => {
              search(term);
            }}
          />

          <Button
            icon={<FaPlus />}
            className="min-w-25"
            style="primary"
            onClick={() => handleOpenCreateForm()}
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
      <CreateRegistroForm
        isOpen={createForm.isOpen}
        message={createForm?.message}
        stateOperation={createForm.state}
        onClose={handleCloseCreateForm}
        onCreate={handleCreate}
        initialValues={createForm?.init}
      />
      {/*
      <ModalQuestion
        open={deleteModal.isOpen}
        onClose={() => handleCloseDelete()}
        message={deleteModal.message}
        onYes={() => handleDelete()}
        onNo={() => handleCloseDelete()}
      />{" "}
      */}
    </>
  );
}

export default PropietarioList;
