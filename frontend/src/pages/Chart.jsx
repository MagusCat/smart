import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const timeOptions = ["Mensual", "Trimestral", "Anual"];
const graphTypes = ["bars", "table"];

const chartData = {
  labels: ["ENERO", "ABRIL", "JULIO", "OCTUBRE"],
  datasets: [
    {
      label: "Motos",
      data: [120000, 80000, 60000, 70000],
      backgroundColor: "#5EF8D6",
    },
    {
      label: "Vehículo particular",
      data: [100000, 50000, 550000, 40000],
      backgroundColor: "#3F68F9",
    },
    {
      label: "Vehículo comercial",
      data: [1200000, 20000, 200000, 80000],
      backgroundColor: "#D0C3F1",
    },
    {
      label: "Vehículos privados",
      data: [250000, 100000, 170000, 30000],
      backgroundColor: "#97F2C5",
    },
  ],
};

export default function ChartSection() {
  const [selectedTime, setSelectedTime] = useState("Trimestral");
  const [selectedGraph, setSelectedGraph] = useState("bars");

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl p-6 gap-6">
      {/* Sidebar Filtro */}
      <aside className="w-full md:w-1/4 bg-white border border-gray-200 p-4 rounded-xl">
        <label className="block text-sm font-medium mb-2">Selecciona un filtro</label>
        <input
          type="text"
          placeholder="Placeholder"
          className="w-full border border-gray-300 rounded-md px-2 py-1 mb-4"
        />
        <ul className="text-sm space-y-2">
          <li>lorem ipsum dolor</li>
          <li>lorem ipsum dolor</li>
          <li>lorem ipsum dolor</li>
          <li>lorem ipsum dolor</li>
          <li>lorem ipsum dolor</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-4">
        {/* Tabs */}
        <div className="flex gap-4 border-b">
          <button className="pb-2 border-b-2 border-black font-semibold">Información general</button>
          <button className="pb-2 text-gray-400">Tabulados</button>
        </div>

        {/* Encabezado y Switcher */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Estadística</p>
            <h2 className="text-xl font-semibold">Total de crecimiento</h2>
          </div>

          <div className="flex space-x-2 bg-gray-100 rounded-full p-1">
            {timeOptions.map((option) => (
              <button
                key={option}
                // className={classNames(
                //   "px-3 py-1 rounded-full text-sm",
                //   selectedTime === option
                //     ? "bg-black text-white"
                //     : "text-gray-600"
                // )}
                onClick={() => setSelectedTime(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Chart & Sidebar */}
        <div className="flex gap-4">
          <div className="flex-1">
            {selectedGraph === "bars" && (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            )}
          </div>

          <aside className="w-[250px] hidden md:block">
            {/* Tipo de gráfico */}
            <div className="flex space-x-2 mb-4">
              <button
                // className={classNames(
                //   "p-2 border rounded-md",
                //   selectedGraph === "bars"
                //     ? "bg-black text-white"
                //     : "border-gray-300"
                //)}
                onClick={() => setSelectedGraph("bars")}
              >
                📊
              </button>
              <button
                // className={classNames(
                //   "p-2 border rounded-md",
                //   selectedGraph === "table"
                //     ? "bg-black text-white"
                //     : "border-gray-300"
                // )}
                onClick={() => setSelectedGraph("table")}
              >
                🧾
              </button>
            </div>

            {/* Leyenda */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#5EF8D6]"></span>
                  Motos
                </span>
                <span>- 37%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#3F68F9]"></span>
                  Vehículo particular
                </span>
                <span>- 23%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#D0C3F1]"></span>
                  Vehículo comercial
                </span>
                <span>- 29%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#97F2C5]"></span>
                  Vehículos privados
                </span>
                <span>- 21%</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
