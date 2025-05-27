import { Card, CardHeader, CardFooter, CardContent } from "../components/ui/Card";
import ButtonIcon from "../components/ui/ButtonIcon";
import Button from "../components/ui/Button";
import { Chart } from "../components/ui/Chart";
import Selector from "../components/ui/Selector";
import Switcher from "../components/ui/Switcher";
import { useState } from "react";
import {
  FaAngleDown,
  FaBookMedical,
  FaTable,
  FaChartLine,
} from "react-icons/fa6";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "../components/ui/Table";

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

// Ejemplo de datos para la tabla
const tableNodes = [
  { id: 1, producto: "A", enero: 10, febrero: 20, marzo: 30, abril: 40 },
  { id: 2, producto: "B", enero: 5, febrero: 15, marzo: 25, abril: 35 },
];

const tableColumns = [
  { label: "Producto", renderCell: (item) => item.producto },
  { label: "Enero", renderCell: (item) => item.enero },
  { label: "Febrero", renderCell: (item) => item.febrero },
  { label: "Marzo", renderCell: (item) => item.marzo },
  { label: "Abril", renderCell: (item) => item.abril },
];

function Query() {
  const [option, setOption] = useState(null);
  const [type, setType] = useState("graph");
  const [menu, setMenu] = useState("general");
  const [showAside, setShowAside] = useState(true);

  // Para la tabla general
  const theme = useTheme(getTheme());

  // Para la tabla de tabulados
  const [tabVars, setTabVars] = useState([]); // variables seleccionadas para tabulación
  const [tabAgg, setTabAgg] = useState("suma"); // agregación seleccionada

  // Opciones de ejemplo para configuración de tabulación
  const tabulationVariables = [
    { label: "Producto", value: "producto" },
    { label: "Enero", value: "enero" },
    { label: "Febrero", value: "febrero" },
    { label: "Marzo", value: "marzo" },
    { label: "Abril", value: "abril" },
  ];
  const aggregationOptions = [
    { label: "Suma", value: "suma" },
    { label: "Promedio", value: "promedio" },
    { label: "Máximo", value: "max" },
    { label: "Mínimo", value: "min" },
  ];

  // Datos y columnas para la tabla de tabulados (ejemplo)
  const tabTableNodes = [
    { id: 1, categoria: "X", total: 100, promedio: 25 },
    { id: 2, categoria: "Y", total: 80, promedio: 20 },
  ];
  const tabTableColumns = [
    { label: "Categoría", renderCell: (item) => item.categoria },
    { label: "Total", renderCell: (item) => item.total },
    { label: "Promedio", renderCell: (item) => item.promedio },
  ];

  return (
    <div className="flex flex-row w-full h-145">
      <aside
        className={`flex flex-col mr-2 relative transition-all duration-300 ${
          showAside ? "w-50" : "w-8"
        }`}
      >
        <Card className="flex flex-col w-full h-auto shadow-xl rounded-2xl border-gray-400 border-2 bg-white text-black">
          {showAside && (
            <>
              <CardHeader className="relative text-sm mt-2">
                Categorias
              </CardHeader>
              <CardContent className="flex flex-col">
                <Selector
                  className="px-3 mb-2"
                  options={[
                    { value: "a", label: "a" },
                    { value: "a1", label: "a" },
                    { value: "a2", label: "a" },
                    { value: "a3", label: "a" },
                  ]}
                  value={option}
                  onChange={setOption}
                />
              </CardContent>
            </>
          )}

          <CardFooter className="border-none my-2">
            <ButtonIcon
              icon={
                <FaAngleDown
                  className={`transition-all duration-300 ${
                    showAside ? "rotate-180" : "rotate-0"
                  }`}
                />
              }
              className="w-full"
              onClick={() => setShowAside(!showAside)}
            />
          </CardFooter>
        </Card>
      </aside>

      <Card className="w-full h-150 mx-auto p-6 flex flex-col gap-6 rounded-xl shadow-xl border-gray-400 border-2 bg-white text-black">
        <header className="flex flex-row gap-5 border-b-2 p-2">
          <button
            onClick={() => setMenu("general")}
            className={`px-2 transition-all duration-300 hover:shadow-[0_3px_0_black] hover:-translate-y-0.5 ${
              menu === "general" && "shadow-[0_2px_0_black]"
            }`}
          >
            Información general
          </button>
          <button
            onClick={() => setMenu("table")}
            className={`px-2 transition-all duration-300 hover:shadow-[0_3px_0_black] hover:-translate-y-0.5 ${
              menu === "table" && "shadow-[0_2px_0_black]"
            }`}
          >
            Tabulados
          </button>
        </header>

        <div className="flex flex-row relative min-h-[220px]">
          <section className="relative w-full">
            {/* Información general: aquí va el switcher */}
            {menu === "general" && (
              <>
                <div className="flex justify-end mb-2">
                  <Switcher
                    options={[
                      { label: <FaChartLine size="1.3rem" />, value: "graph" },
                      { label: <FaTable size="1.3rem" />, value: "table" },
                    ]}
                    selected={type}
                    onSelect={setType}
                  />
                </div>
                <div
                  className={`absolute inset-0 transition-all duration-300 ${
                    type === "table"
                      ? "opacity-100 translate-y-0 z-10"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  } w-full`}
                >
                  <CompactTable
                    columns={tableColumns}
                    data={{ nodes: tableNodes }}
                    theme={theme}
                  />
                </div>
                <div
                  className={`absolute inset-0 transition-all duration-300 ${
                    type === "graph"
                      ? "opacity-100 translate-y-0 z-10"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  <Chart
                    className="flex w-[90%] h-[320px]"
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
              </>
            )}

            {/* Tabla de tabulados y configuración */}
            {menu === "table" && (
              <div className="flex flex-row w-full min-h-[220px]">
                <div className="flex-1 relative">
                  <CompactTable
                    columns={tabTableColumns}
                    data={{ nodes: tabTableNodes }}
                    theme={theme}
                  />
                </div>
                <aside className="flex flex-col w-60 gap-4 bg-white border-l px-4 py-2 shadow-sm">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-gray-500 font-semibold mb-1">
                      Configuración de Tabulación
                    </span>
                    <Selector
                      options={tabulationVariables}
                      value={tabVars}
                      onChange={setTabVars}
                      placeholder="Variables a tabular"
                    />
                    <Selector
                      options={aggregationOptions}
                      value={tabAgg}
                      onChange={setTabAgg}
                      placeholder="Agregación"
                      className="mt-1"
                    />
                  </div>
                  <Button
                    style="primary"
                    className="w-full items-center justify-center"
                    icon={<FaBookMedical />}
                  >
                    Consultar
                  </Button>
                </aside>
              </div>
            )}
          </section>
        </div>
      </Card>
    </div>
  );
}

export default Query;
