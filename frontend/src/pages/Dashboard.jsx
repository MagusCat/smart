import img_terriry from "/img/territory.svg";
import { CardInfo, CardMain, CardDetails } from "@components/ui/Card";
import {
  Chart,
  ChartPalettes,
  getBackgroundGradient,
} from "@components/ui/Chart";
import Switcher from "@components/ui/Switcher";
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
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: { grid: { display: false } },
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
    labels: ["Pasajeros", "Carga", "Pesado"],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: ChartPalettes[0].color1,
        borderColor: ChartPalettes[0].main,
        borderWidth: 2,
      },
    ],
  };

  const barData2 = {
    labels: ["Autobus", "Automovil", "Camion", "Motocicleta", "Microbus"],
    datasets: [
      {
        data: [7, 11, 5, 8, 3],
        backgroundColor: ChartPalettes[1].color1,
        borderColor: ChartPalettes[1].main,
        borderWidth: 2,
      },
    ],
  };

  const pieData1 = {
    labels: ["Particular", "Comercial", "Carga"],
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: [
          ChartPalettes[0].color1,
          ChartPalettes[1].color1,
          ChartPalettes[2].color1,
          ChartPalettes[3].color1,
        ],
        borderColor: [
          ChartPalettes[0].main,
          ChartPalettes[1].main,
          ChartPalettes[2].main,
          ChartPalettes[3].main,
        ],
        borderWidth: 2,
      },
    ],
  };

  const pieData2 = {
    labels: ["Privado", "Publico", "Oficial"],
    datasets: [
      {
        data: [15, 25, 60],
        backgroundColor: [
          ChartPalettes[3].color1,
          ChartPalettes[2].color1,
          ChartPalettes[1].color1,
          ChartPalettes[0].color1,
        ],
        borderColor: [
          ChartPalettes[3].main,
          ChartPalettes[2].main,
          ChartPalettes[1].main,
          ChartPalettes[0].main,
        ],
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: false,
    },
    layout: {
      padding: {
        top: 10
      }
    },
    plugins: {
      legend: { display: false },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: "#000",
        anchor: "end",
        align: "end",
        offset: -5,
        font: {
          weight: "bold",
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#e5e7eb" } },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 15,
    },
    plugins: {
      legend: { display: false },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: "#000",
        anchor: "end",
        align: "end",
        font: {
          weight: "bold",
        },
      },
    },
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

      <CardMain className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 h-70 mt-10">
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
