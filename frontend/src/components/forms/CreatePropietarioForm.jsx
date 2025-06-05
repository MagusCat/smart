import { useState, useEffect, useMemo } from "react";
import Input from "./ui/input";
import DropDown from "./ui/DropDown";
import BaseForm from "./BaseForm";

import useFetch from "@hooks/useFetch";

const tipoPropietarioOptions = [
  { value: "", label: "Seleccione tipo..." },
  { value: "Natural", label: "Persona Natural" },
  { value: "Jurídico", label: "Persona Jurídica" },
  { value: "Otro", label: "Otro" },
];

const CreatePropietarioForm = ({
  isOpen,
  onClose,
  onCreate,
  message,
  stateOperation,
  initialValues = {},
}) => {
  const [form, setForm] = useState({});
  const { data: propietarios, state } = useFetch("oltp/tipos_propietarios");

  const options = useMemo(
    () =>
      state === "done"
        ? propietarios.data.map((t) => {
            return {
              value: t.id_tipo_propietario,
              label: t.propietario,
            };
          })
        : [],
    [state]
  );

  const handleAccept = () => {
    onCreate(form);
  };

  useEffect(() => {
    if (isOpen) {
      setForm({
        id: parseInt(initialValues.id) || -1,
        propietario: options.find(option => option.label === initialValues.propietario)?.value ?? -1,
        cedula: initialValues.cedula || "",
        ruc: initialValues.ruc || "",
      });
    }
  }, [isOpen]);

  return (
    <BaseForm
      title={form.id > 0 ? "Editar Propietario" : "Crear Propietario"}
      isVisible={isOpen}
      onAccept={handleAccept}
      onCancel={onClose}
      stateOperation={stateOperation}
      message={message}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <DropDown
          label="Tipo de Propietario"
          id="type"
          value={form.propietario}
          onChange={(e) => setForm({ ...form, propietario: e.target.value })}
          options={options}
          className="w-full"
          wrapperClassName="flex flex-col gap-2"
        />
        <Input
          label="Número de Cédula"
          id="owner"
          value={form.cedula}
          onChange={(e) => setForm({ ...form, cedula: e.target.value })}
          className="w-full"
          wrapperClassName="flex flex-col gap-2"
        />
        <Input
          label="Número RUC"
          id="id"
          value={form.ruc}
          onChange={(e) => setForm({ ...form, ruc: e.target.value })}
          className="w-full"
          wrapperClassName="flex flex-col gap-2"
        />
      </div>
    </BaseForm>
  );
};

export default CreatePropietarioForm;
