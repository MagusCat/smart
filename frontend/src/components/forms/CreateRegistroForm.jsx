import { useState, useEffect, useMemo } from "react";
import Input from "./ui/input";
import DropDown from "./ui/DropDown";
import BaseForm from "./BaseForm";
import useFetch from "@hooks/useFetch";
import axios from "axios";

const CreateRegistroForm = ({
  isOpen,
  onClose,
  onCreate,
  message,
  stateOperation,
  initialValues = {},
}) => {
  const [form, setForm] = useState({});
  const [step, setStep] = useState(1);

  const { data: marcas } = useFetch("oltp/marcas");
  const { data: categorias } = useFetch("oltp/categorias");
  const { data: servicios } = useFetch("oltp/servicios");
  const { data: usos } = useFetch("oltp/usos");
  const { data: combustibles } = useFetch("oltp/combustibles");
  const { data: vehiculos } = useFetch("oltp/vehiculos");

  const optionsMarcas = useMemo(() => marcas?.data?.map((m) => ({
    value: m.id,
    label: m.nombre
  })) || [], [marcas]);

  const optionsCategorias = useMemo(() => categorias?.data?.map((c) => ({
    value: c.id,
    label: c.nombre
  })) || [], [categorias]);

  const optionsServicios = useMemo(() => servicios?.data?.map((s) => ({
    value: s.id,
    label: s.nombre
  })) || [], [servicios]);

  const optionsUsos = useMemo(() => usos?.data?.map((u) => ({
    value: u.id,
    label: u.nombre
  })) || [], [usos]);

  const optionsCombustibles = useMemo(() => combustibles?.data?.map((c) => ({
    value: c.id,
    label: c.nombre
  })) || [], [combustibles]);

  const optionsVehiculos = useMemo(() => vehiculos?.data?.map((v) => ({
    value: v.id,
    label: v.nombre
  })) || [], [vehiculos]);

  const handleAccept = () => {
    onCreate(form);
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  useEffect(() => {
    const loadRegistro = async () => {
      try {
        const { data } = await axios.get(`oltp/registro/${initialValues.id}`);
        setForm(data);
      } catch (err) {
        console.error("Error al cargar el registro:", err);
      }
    };

    if (isOpen) {
      if (initialValues.id && initialValues.id !== -1) {
        loadRegistro(); // Fetch del registro si hay ID
      } else {
        setForm({
          id: -1,
          propietario: "",
          motor: "",
          chasis: "",
          modelo: "",
          marca: "",
          categoria: "",
          servicio: "",
          uso: "",
          combustible: "",
          vehiculo: "",
          fecha_inscripcion: "",
          placa: "",
        });
      }
      setStep(1);
    }
  }, [isOpen, initialValues.id]);

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
        {step === 1 && (
          <>
            <Input
              label="Número de Motor"
              id="motor"
              value={form.motor}
              onChange={(e) => setForm({ ...form, motor: e.target.value })}
            />
            <Input
              label="Número de Chasis"
              id="chasis"
              value={form.chasis}
              onChange={(e) => setForm({ ...form, chasis: e.target.value })}
            />
            <Input
              label="Modelo"
              id="modelo"
              value={form.modelo}
              onChange={(e) => setForm({ ...form, modelo: e.target.value })}
            />

            <DropDown
              label="Marca"
              id="marca"
              value={form.marca}
              onChange={(e) => setForm({ ...form, marca: e.target.value })}
              options={optionsMarcas}
            />

            <DropDown
              label="Categoría"
              id="categoria"
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              options={optionsCategorias}
            />
          </>
        )}

        {step === 2 && (
          <>
            <DropDown
              label="Servicio"
              id="servicio"
              value={form.servicio}
              onChange={(e) => setForm({ ...form, servicio: e.target.value })}
              options={optionsServicios}
            />
            <DropDown
              label="Uso"
              id="uso"
              value={form.uso}
              onChange={(e) => setForm({ ...form, uso: e.target.value })}
              options={optionsUsos}
            />
            <DropDown
              label="Combustible"
              id="combustible"
              value={form.combustible}
              onChange={(e) => setForm({ ...form, combustible: e.target.value })}
              options={optionsCombustibles}
            />
            <DropDown
              label="Vehículo"
              id="vehiculo"
              value={form.vehiculo}
              onChange={(e) => setForm({ ...form, vehiculo: e.target.value })}
              options={optionsVehiculos}
            />
          </>
        )}

        {step === 3 && (
          <>
            <Input
              label="Fecha de Inscripción"
              id="fecha_inscripcion"
              type="date"
              value={form.fecha_inscripcion}
              onChange={(e) =>
                setForm({ ...form, fecha_inscripcion: e.target.value })
              }
            />
            <Input
              label="Número de placa"
              id="placa"
              value={form.placa}
              onChange={(e) => setForm({ ...form, placa: e.target.value })}
            />
          </>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleBack}
          className={`px-4 py-2 rounded ${step > 1 ? 'bg-blue-500' : 'opacity-0 pointer-events-none'}`}
        >
          Atrás
        </button>
        {step < 3 && (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Siguiente
          </button>
        )}
      </div>
    </BaseForm>
  );
};

export default CreateRegistroForm;
