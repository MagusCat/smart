import img_terriry from "/img/territory.svg";
import { CardInfo, CardMain, CardDetails } from "../components/ui/Card";
import {
  Chart,
  ChartPalettes,
  getBackgroundGradient,
} from "../components/ui/Chart";
import Switcher from "../components/ui/Switcher";
import { useState } from "react";

function Dashboard() {
  const optionsTime = [
    { label: "1M", value: "Mounth" },
    { label: "1A", value: "Year" },
    { label: "5A", value: "BeforeYear" },
  ];

  const optionsChart = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: { grid: { display: true } },
      y: { grid: { color: "#e5e7eb" } },
    },
  };

  const mainData = {
    labels: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
    ],
    datasets: [
      {
        label: "Crecimiento",
        data: [1, 100, 10, 50, 5, 123, 50, 80, 120, 60],
        borderColor: ChartPalettes[0].main,
        backgroundColor: (context) =>
          getBackgroundGradient(context, ChartPalettes[0]),
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  const barData1 = {
    labels: ["A", "B", "C", "D", "E"],
    datasets: [
      {
        label: "Barra 1",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(100, 220, 180, 0.7)",
        borderColor: "rgb(100, 220, 180)",
        borderWidth: 1,
      },
    ],
  };

  const barData2 = {
    labels: ["X", "Y", "Z", "W", "Q"],
    datasets: [
      {
        label: "Barra 2",
        data: [7, 11, 5, 8, 3],
        backgroundColor: "rgba(120, 180, 220, 0.7)",
        borderColor: "rgb(120, 180, 220)",
        borderWidth: 1,
      },
    ],
  };

  const pieData1 = {
    labels: ["Rojo", "Verde", "Azul"],
    datasets: [
      {
        label: "Pie 1",
        data: [10, 20, 30],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(54, 162, 235, 0.7)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieData2 = {
    labels: ["Amarillo", "Morado", "Naranja"],
    datasets: [
      {
        label: "Pie 2",
        data: [15, 25, 60],
        backgroundColor: [
          "rgba(255, 205, 86, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgb(255, 205, 86)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#e5e7eb" } },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "bottom" } },
  };

  const [time, setTime] = useState(optionsTime[0].value);
  return (
    <>
      <article className="flex flex-col md:flex-row items-center justify-between w-full gap-3 lg:gap-10">
        <CardInfo
          title="Crecimiento Vehicular"
          items={[
            { value: "36.6%", label: "anual" },
            { value: "36.6%", label: "anual" },
          ]}
        />

        <CardInfo
          title="Parqueo Vehicular"
          items={[{ value: "10,000", label: "vehiculos" }]}
        />

        <CardInfo
          title="Variacion Vehicular"
          items={[
            { value: "3.5", label: "vehiculos" },
            { value: "3.5", label: "vehiculos" },
          ]}
        />
      </article>

      <CardMain className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 h-70">
        <section className="gap-5 justify-center transition-none flex flex-col min-w-0">
          <div className="flex w-full justify-end">
            <Switcher
              options={optionsTime}
              selected={time}
              onSelect={setTime}
            />
          </div>
          <div className="flex-1 flex min-w-0">
            <Chart
              type="line"
              className="w-full h-47 min-w-0"
              options={optionsChart}
              data={mainData}
              state="done"
            />
          </div>
        </section>

        <aside className="hidden sm:flex h-full min-w-[180px] max-w-[200px] lg:max-w-[260px] items-center justify-center">
          <img
            src={img_terriry}
            alt="Logo"
            className="object-contain aspect-square w-full max-w-[200px] lg:max-w-[260px]"
          />
        </aside>
      </CardMain>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        <CardDetails>
          <Chart
            name="Categoria"
            type="bar"
            options={barOptions}
            data={barData1}
            state="done"
          />
        </CardDetails>

        <CardDetails>
          <Chart
            type="bar"
            name="Tipo"
            options={barOptions}
            data={barData2}
            state="done"
          />
        </CardDetails>
        <CardDetails>
          <Chart
            type="pie"
            name="Uso"
            options={pieOptions}
            data={pieData1}
            state="done"
          />
        </CardDetails>
        <CardDetails>
          <Chart
            type="pie"
            name="Servicio"
            options={pieOptions}
            data={pieData2}
            state="done"
          />
        </CardDetails>
      </div>
    </>
  );
}

export default Dashboard;
