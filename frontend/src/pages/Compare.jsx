import { useState } from "react";
import { FaBolt, FaBookMedical } from "react-icons/fa6";
import { ViewSelector, Button, DropDown} from "@components/ui"
import { CrossTable, CrossTableStyled } from "@components/ui/Table";
import { Chart } from "@components/ui/Chart";
import { Card, CardMain } from "@components/ui/Card";


const variables = [
  { label: "Categoria", value: "category" },
  { label: "Uso", value: "use" }

];

const tiempos = [
  { label: "2024", value: "2024" },
];

const contingencyData = [
  { id: 0, var1: "Particular", var2: "Privado", data: 1 },
  { id: 1, var1: "Particular", var2: "Publico", data: 2 },
  { id: 2, var1: "Particular", var2: "Oficial", data: 5 },
  { id: 3, var1: "Comercial", var2: "Privado", data: 2 },
  { id: 4, var1: "Comercial", var2: "Publico", data: 4 },
  { id: 5, var1: "Comercial", var2: "Oficial", data: 10 },
  { id: 6, var1: "Carga", var2: "Privado", data: 3 },
  { id: 7, var1: "Carga", var2: "Publico", data: 6 },
  { id: 8, var1: "Carga", var2: "Oficial", data: 15 }
];


const chartData = {
  labels: ["Enero", "Febrero", "Marzo"],
  datasets: [
    {
      label: "Particular",    // var1 categoría 1
      data: [1, 2, 5],        // valores para cada label de var2
      backgroundColor: "rgba(100,200,250,0.6)"
    },
    {
      label: "Comercial",     // var1 categoría 2
      data: [2, 4, 10],
      backgroundColor: "rgba(255,180,100,0.6)"
    },
    {
      label: "Carga",         // var1 categoría 3
      data: [3, 6, 15],
      backgroundColor: "rgba(150,100,255,0.6)"
    }
  ]
};

function Compare() {
  const [type, setType] = useState("table");
  const [form, setForm] = useState({
    v1: "",
    t1: "",
    v2: "",
    t2: "",
  });

  return (
    <CardMain className="flex flex-col w-full min-h-140 gap-3">
      <ViewSelector
        current={type}
        onChange={setType}
        options={[
          { label: "Tabla de Contingencia", value: "table" },
          { label: "Gráficos", value: "graph" },
        ]}
      />

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
            <CrossTableStyled dataSource={contingencyData} />
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
                plugins: { legend: { display: false }, datalabels: {display:false} },
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
    </CardMain>
  );
}

export default Compare;
