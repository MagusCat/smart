import { useState } from "react";
import DropDown from "../components/ui/DropDown";
import Button from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { FaBolt, FaBookMedical } from "react-icons/fa6";
import { Chart } from "../components/ui/Chart";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "../components/ui/Table";

const variables = [
  { label: "Ventas", value: "ventas" },
  { label: "Usuarios", value: "usuarios" },
  { label: "Ingresos", value: "ingresos" },
];

const tiempos = [
  { label: "Enero", value: "ene" },
  { label: "Febrero", value: "feb" },
  { label: "Marzo", value: "mar" },
  { label: "Abril", value: "abr" },
];

const contingencyData = [
  { id: 0, var1: "Hombre", var2: "Sí", data: 12 },
  { id: 1, var1: "Hombre", var2: "No", data: 8 },
  { id: 2, var1: "Mujer", var2: "Sí", data: 15 },
  { id: 3, var1: "Mujer", var2: "No", data: 5 },
];

function pivotData(data, rowKey, colKey, valueKey) {
  const result = {};
  let index = 0;

  data.forEach((item) => {
    const row = item[rowKey];
    const col = item[colKey];
    const value = item[valueKey];

    if (!result[row]) {
      result[row] = { [rowKey]: row, id: index++ };
    }

    result[row][col] = value;
  });

  return Object.values(result);
}

function getColumnsFromPivot(pivoted, ignore) {
  if (pivoted.length == 0) return [];

  const keys = new Set(Object.keys(pivoted[0]).filter((key) => !ignore[key]));

  return Array.from(keys);
}

function CrossTable({ dataSoruce }) {
  const data = pivotData(dataSoruce, "var1", "var2", "data");
  const headers = getColumnsFromPivot(data, { var1: true, id: true });
  const theme = useTheme(getTheme());

  const cols = [
    {
      label: "Categoría",
      renderCell: (item) => item.var1,
    },
    ...headers.map((header) => ({
      label: header,
      renderCell: (item) => item[header] ?? 0,
    })),
  ];

  return <CompactTable className="min-w-full" columns={cols} data={{ nodes: data }} theme={theme} />;
}

function Compare() {
  const [type, setType] = useState("table");
  const [form, setForm] = useState({
    v1: "",
    t1: "",
    v2: "",
    t2: "",
  });

  // Datos de ejemplo para el gráfico
  const chartData = {
    labels: ["Enero", "Febrero", "Marzo", "Abril"],
    datasets: [
      {
        label: "Ventas",
        data: [10, 20, 30, 40],
        borderColor: "rgb(100, 220, 180)",
        backgroundColor: "rgba(100, 220, 180, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  return (
    <Card className="w-full min_h-140 mx-auto p-6 flex flex-col gap-6 rounded-xl shadow-xl border-gray-400 border-2 bg-white text-black">
      <header className="flex flex-row gap-5 border-b-2 p-2">
        <button
          onClick={() => setType("table")}
          className={`px-2 transition-all duration-300 hover:shadow-[0_3px_0_black] hover:-translate-y-0.5 ${
            type === "table" && "shadow-[0_2px_0_black]"
          }`}
        >
          Tabla Contingencia
        </button>
        <button
          onClick={() => setType("graph")}
          className={`px-2 transition-all duration-300 hover:shadow-[0_3px_0_black] hover:-translate-y-0.5 ${
            type === "graph" && "shadow-[0_2px_0_black]"
          }`}
        >
          Gráfico
        </button>
      </header>

      <Card className="flex flex-col md:flex-row justify-between lg:justify-normal items-center gap-3 p-3 border-1 border-gray-300 rounded-lg">
        <div className="flex flex-col md:flex-row flex-wrap w-full gap-3 justify-center">
          <DropDown
            options={variables}
            value={form.v1}
            onChange={(value) => setForm({ ...form, v1: value })}
            placeholder="Variable 1"
            className="min-w-0 flex-1"
          />
          <DropDown
            options={tiempos}
            value={form.t1}
            onChange={(value) => setForm({ ...form, t1: value })}
            placeholder="Tiempo 1"
            className="min-w-0 flex-1"
          />
        </div>
        <div className="flex flex-col md:flex-row flex-wrap w-full gap-3 justify-center">
          <DropDown
            options={variables}
            value={form.v2}
            onChange={(value) => setForm({ ...form, v2: value })}
            placeholder="Variable 2"
            className="min-w-0 flex-1"
          />
          <DropDown
            options={tiempos}
            value={form.t2}
            onChange={(value) => setForm({ ...form, t2: value })}
            placeholder="Tiempo 2"
            className="min-w-0 flex-1"
          />
        </div>
      </Card>

      <div className="flex flex-col md:flex-row relative min-h-[220px]">
        <section className="flex-grow relative w-full min-h-35 overflow-x-auto order-2 md:order-1 min-w-0">
          <div
            className={`block transition-all duration-300 ${
              type == "table"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1 pointer-events-none min-w-0 h-0 overflow-hidden"
            } w-full`}
          >
            <CrossTable dataSoruce={contingencyData} />
          </div>
          <div
            className={`block transition-all duration-300 ${
              type == "graph"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1 pointer-events-none h-0 overflow-hidden"
            } w-full`}
          >
            <Chart
              className="w-full h-[220px] min-w-0"
              type="line"
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
              data={chartData}
              state="done"
            />
          </div>
        </section>

        <aside className="flex flex-col w-full px-10 md:w-70 gap-4 order-1 md:order-2 mb-5 md:mb-0">
          <Button
            style="primary"
            className="w-full items-center justify-center"
            icon={<FaBolt />}
          >
            Exportar
          </Button>
          <Button
            style="primary"
            className="w-full items-center justify-center"
            icon={<FaBookMedical />}
          >
            Consultar
          </Button>
        </aside>
      </div>
    </Card>
  );
}

export default Compare;
