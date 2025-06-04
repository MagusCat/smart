import img_terriry from "/img/territory.svg";
import { CardInfo, CardMain, CardDetails, CardContentLoader } from "@components/ui/Card";
import {
  Chart,
  ChartPalettes,
  getBackgroundGradient,
} from "@components/ui/Chart";
import Switcher from "@components/ui/Switcher";
import { useState, useMemo } from "react";
import useFetchOlap from "@hooks/useFetchOlap.jsx";
import useFetch  from "@hooks/useFetch.jsx";

const getValue = (raw, value) => (raw ? raw.map((e) => e[value]) : []);

const labelsOptionsMain = {
  Year:  ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
}	

//Main Chart

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

const bodyOptionsMain = {
  Mounth: {
    top: 30,
    columns: [
      {
        name: "dia",
        alias: "label",
      },
      {
        name: "mes",
      },
      {
        name: "anio",
      },
    ],
    order: {
      by: ["anio", "mes", "dia"],
      type: "ASC",
    },
  },
  Year: {
    top: 12,
    columns: [
      {
        name: "mes",
        alias: "label",
      },
      {
        name: "anio",
      },
    ],
    order: {
      by: ["anio", "mes"],
      type: "ASC",
    },
  },
  BeforeYear: {
    top: 5,
    columns: [
      {
        name: "anio",
        alias: "label",
      },
    ],
    order: {
      by: ["anio"],
      type: "ASC",
    },
  },
};

const bodyBasicMain = {
  table: "hecho_inscripcion",

  dims: [
    {
      name: "dim_tiempo",
      type: "inner",
      identify: "id_dim_tiempo",
    },
  ],
  aggregations: [
    {
      fields: [
        {
          name: "mes",
          alias: "data",
        },
      ],
      agg: "COUNT",
    },
  ],
};

const getBodyMain = (time) => {
  const options = bodyOptionsMain[time] || bodyOptionsMain.Mounth;

  return {
    ...bodyBasicMain,
    ...options,
  };
};

const optionsTime = [
  { label: "1M", value: "Mounth" },
  { label: "1A", value: "Year" },
  { label: "5A", value: "BeforeYear" },
];

//Others Graphs

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    enabled: false,
  },
  layout: {
    padding: {
      top: 10,
    },
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
    padding: {
      top: 20,
      bottom: 20,
      left: 10,
      right: 10,
    },
  },
  plugins: {
    legend: { display: true, position: "chartArea" },
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

const bodyCategory = {
  table: "hecho_inscripcion",
  columns: [
    {
      name: "categoria",
      alias: "label",
    }
  ],
  dims: [
    {
      name: "dim_categoria",
      type: "inner",
      identify: "id_dim_categoria",
    },
  ],
  aggregations: [
    {
      fields: [
        {
          name: "categoria",
          alias: "data",
        },
      ],
      agg: "COUNT",
    },
  ],
  order: {
    by: ["data"],
    type: "DESC",
  },
  top: 5
};

const bodyType = {
  table: "hecho_inscripcion",
  columns: [
    {
      name: "vehiculo",
      alias: "label",
    }
  ],
  dims: [
    {
      name: "dim_tipo_vehiculo",
      type: "inner",
      identify: "id_dim_tipo_vehiculo",
    },
  ],
  aggregations: [
    {
      fields: [
        {
          name: "vehiculo",
          alias: "data",
        },
      ],
      agg: "COUNT",
    },
  ],
  order: {
    by: ["data"],
    type: "DESC",
  },
  top: 5
};

const bodyUse = {
  table: "hecho_inscripcion",
  columns: [
    {
      name: "uso",
      alias: "label",
    }
  ],
  dims: [
    {
      name: "dim_tipo_uso",
      type: "inner",
      identify: "id_dim_tipo_uso",
    },
  ],
  aggregations: [
    {
      fields: [
        {
          name: "uso",
          alias: "data",
        },
      ],
      agg: "COUNT",
    },
  ],
  order: {
    by: ["data"],
    type: "DESC",
  },
  top: 5
};


const bodyService = {
  table: "hecho_inscripcion",
  columns: [
    {
      name: "servicio",
      alias: "label",
    }
  ],
  dims: [
    {
      name: "dim_tipo_servicio",
      type: "inner",
      identify: "id_dim_tipo_servicio",
    },
  ],
  aggregations: [
    {
      fields: [
        {
          name: "servicio",
          alias: "data",
        },
      ],
      agg: "COUNT",
    },
  ],
  order: {
    by: ["data"],
    type: "DESC",
  },
  top: 5
};


function formatNumber(value) {
  if (value === null || value === undefined || isNaN(value)) return "—";
  return Number(value)
    .toLocaleString("es-ES", { maximumFractionDigits: 2, minimumFractionDigits: 0 });
}

function Dashboard() {
  const [time, setTime] = useState("Mounth");
  const bodyMain = useMemo(() => getBodyMain(time), [time]);
  const { data: rawMain, state: stateMain } = useFetchOlap(bodyMain);
  const { data: rawCat, state: stateCat } = useFetchOlap(bodyCategory);
  const { data: rawSer, state: stateSer } = useFetchOlap(bodyService);
  const { data: rawUses, state: stateUses } = useFetchOlap(bodyUse);
  const { data: rawType, state: stateType } = useFetchOlap(bodyType);

  const {data: summaryRaw, state: summaryState} = useFetch("olap/summary");

  const mainData = {
    labels: labelsOptionsMain[time] ? labelsOptionsMain[time] : getValue(rawMain, "label"),
    datasets: [
      {
        data: getValue(rawMain, "data"),
        borderColor: ChartPalettes[0].main,
        backgroundColor: (context) =>
          getBackgroundGradient(context, ChartPalettes[0]),
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  const catData = {
    labels: getValue(rawCat, "label"),
    datasets: [
      {
        data: getValue(rawCat, "data"),
        backgroundColor: ChartPalettes[0].color1,
        borderColor: ChartPalettes[0].main,
        borderWidth: 2,
      },
    ],
  };

  const typeData = {
    labels: getValue(rawType, "label"),
    datasets: [
      {
        data: getValue(rawType, "data"),
        backgroundColor: ChartPalettes[1].color1,
        borderColor: ChartPalettes[1].main,
        borderWidth: 2,
      },
    ],
  };

  const useData = {
    labels: getValue(rawUses, "label"),
    datasets: [
      {
        data: getValue(rawUses, "data"),
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

  const serviceData = {
    labels: getValue(rawSer, "label"),
    datasets: [
      {
        data: getValue(rawSer, "data"),
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

  return (
    <>
      <article className="flex flex-col md:flex-row items-center justify-between w-full gap-3 lg:gap-10">
        <CardInfo
          title="Crecimiento Vehicular"
          items={
            summaryState === "done"
              ? [
                  { value: formatNumber(summaryRaw?.grow_m?.[0]?.diff) + "%", label: "mensual" },
                  { value: formatNumber(summaryRaw?.grow_q?.[0]?.diff) + "%", label: "trimestral" },
                ]
              : []
          }
          loader
          state={summaryState}
        />

        <CardInfo
          title="Parqueo Vehicular"
          items={
            summaryState === "done"
              ? [{ value: formatNumber(summaryRaw?.total), label: "vehiculos" }]
              : []
          }
          loader
          state={summaryState}
        />
        <CardInfo
          title="Promedio Vehicular"
          items={
            summaryState === "done"
              ? [
                  { value: formatNumber(summaryRaw?.avg_m), label: "mensual" },
                  { value: formatNumber(summaryRaw?.avg_q), label: "trimestral" },
                ]
              : []
          }
          loader
          state={summaryState}
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
              state={stateMain}
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
            data={catData}
            state={stateCat}
          />
        </CardDetails>

        <CardDetails>
          <Chart
            type="bar"
            name="Tipo"
            options={barOptions}
            data={typeData}
            state={stateType}
          />
        </CardDetails>
        <CardDetails>
          <Chart
            type="pie"
            name="Uso"
            options={pieOptions}
            data={useData}
            state={stateUses}
          />
        </CardDetails>
        <CardDetails>
          <Chart
            type="pie"
            name="Servicio"
            options={pieOptions}
            data={serviceData}
            state={stateSer}
          />
        </CardDetails>
      </div>
    </>
  );
}

export default Dashboard;
