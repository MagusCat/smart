import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Chart, ChartPalettes } from "@components/ui/Chart";
import { CardMain } from "@components/ui/Card";
import { DropDown, Button } from "@components/ui";
import useFetch from "@hooks/useFetch";
import { FaArrowUp, FaArrowDown, FaArrowRight } from "react-icons/fa";

function useQueryParams() {
  const { search } = useLocation();
  return useMemo(
    () => Object.fromEntries(new URLSearchParams(search)),
    [search]
  );
}

const months = [
  { label: "Enero", value: 1 },
  { label: "Febrero", value: 2 },
  { label: "Marzo", value: 3 },
  { label: "Abril", value: 4 },
  { label: "Mayo", value: 5 },
  { label: "Junio", value: 6 },
  { label: "Julio", value: 7 },
  { label: "Agosto", value: 8 },
  { label: "Septiembre", value: 9 },
  { label: "Octubre", value: 10 },
  { label: "Noviembre", value: 11 },
  { label: "Diciembre", value: 12 },
  { label: "Todos", value: null },
];

const getValue = (raw, value) => (raw ? raw.map((e) => e[value]) : []);

const labelsMonth = [
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
  "Nov",
  "Dic",
];

function getLabel(y, m) {
  if (!y && !m) return `Todo el tiempo`;
  if (!y && m) return `${labelsMonth[m]}`;
  if (y && !m) return `${y}`;
  if (!y && m) return `Mes ${labelsMonth[m]}`;
  return `${y} - Mes ${labelsMonth[m]}`;
}

function getFormatCategory(cat) {
  return cat.data.map((cat) => ({
    label: cat.label,
    value: cat.dim,
  }));
}

function getFormatTime(times) {
  return times.data.map((time) => ({
    label: time.label,
    value: time.id,
  }));
}

function getBodyCompare(var1, y1, m1, y2, m2) {
  if (!var1 || !y1 || !y2) return null;

  return {
    body: JSON.stringify({
      field: var1,
      agg: "Count",
      group: m1 || m2 ? ["dia"] : y1 || y2 ? ["mes"] : ["anio"],
      filters: [
        {
          label: getLabel(y1, m1),
          conditions: [
            y1 && { field: "anio", condition: "=", value: y1 },
            m1 && { field: "mes", condition: "=", value: m1 },
          ].filter(Boolean),
        },
        {
          label: getLabel(y2, m2),
          conditions: [
            y2 && { field: "anio", condition: "=", value: y2 },
            m2 && { field: "mes", condition: "=", value: m2 },
          ].filter(Boolean),
        },
      ],
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  };
}

function getSummaryCompareBody(variable, year1, month1, year2, month2) {
  const conds1 = [
    year1 && { field: "anio", condition: "=", value: year1 },
    month1 && { field: "mes", condition: "=", value: month1 },
  ].filter(Boolean);
  const conds2 = [
    year2 && { field: "anio", condition: "=", value: year2 },
    month2 && { field: "mes", condition: "=", value: month2 },
  ].filter(Boolean);
  return {
    body: JSON.stringify({
      field: variable,
      agg: "COUNT",
      group: [],
      filters: [
        { label: getLabel(year1, month1), conditions: conds1 },
        { label: getLabel(year2, month2), conditions: conds2 },
      ],
    }),
    head
    meters: { "Content-Type": "application/json" },hod: "POST",
  };
}

function ResumenEstadistico({
  variable,
  year1,
  month1,
  year2,
  month2,
  fetchTrigger,
}) {
  if (!variable || !year1 || !year2) return null;

  const summaryBody = useMemo(
    () =>
      variable && year1 && year2
        ? getSummaryCompareBody(variable, year1, month1, year2, month2)
        : null,
    [variable, year1, month1, year2, month2]
  );

  const { data, state, refetch } = useFetch(
    summaryBody ? "olap/summary/compare-summary" : null,
    summaryBody,
    false
  );

  useEffect(() => {
    if (fetchTrigger) refetch();
  }, [fetchTrigger]);

  function TrendIcon({ trend }) {
    let Icon = FaArrowRight;
    let color = "text-gray-500";
    let rotate = "rotate-0";
    if (trend === "up") {
      Icon = FaArrowUp;
      color = "text-green-600";
      rotate = "animate-bounce";
    } else if (trend === "down") {
      Icon = FaArrowDown;
      color = "text-red-600";
      rotate = "animate-bounce";
    }
    return (
      <Icon
        className={`transition-transform duration-500 ${color} ${rotate} text-lg md:text-xl`}
        title={`Tendencia ${trend}`}
      />
    );
  }

  return (
    <div className="rounded-lg border-2 border-blue-300 bg-blue-50 px-2 py-1 mb-2 max-w-full">
      {state === "loading" && (
        <div className="text-xs md:text-sm">Cargando resumen...</div>
      )}
      {state === "done" && data && (
        <div className="flex flex-wrap justify-between items-center gap-2 md:gap-4 w-full px-1 md:px-5 text-xs md:text-base">
          <div className="flex flex-col items-center min-w-[80px] md:min-w-[120px]">
            <span className="font-bold text-blue-900">
              {data.period1.label}
            </span>
            <span>{data.period1.value}</span>
          </div>
          <div className="flex flex-col items-center min-w-[80px] md:min-w-[120px]">
            <span className="font-semibold text-blue-900">
              {data.period2.label}
            </span>
            <span>{data.period2.value}</span>
          </div>
          <div className="flex flex-col items-center min-w-[80px] md:min-w-[120px]">
            <span className="font-semibold text-blue-900">Diferencia</span>
            <span>{data.diff}</span>
          </div>
          <div className="flex flex-col items-center min-w-[80px] md:min-w-[120px]">
            <span className="font-semibold text-blue-900">Porcentaje</span>
            <span>{data.percent.toFixed(2)}%</span>
          </div>
          <div className="flex flex-col items-center min-w-[80px] md:min-w-[120px]">
            <span className="font-semibold text-blue-900">Tendencia</span>
            <span className="flex items-center">
              <TrendIcon trend={data.trend} />
            </span>
          </div>
        </div>
      )}
      {state === "error" && (
        <div className="text-red-600 text-xs md:text-sm">
          Error al cargar el resumen.
        </div>
      )}
    </div>
  );
}

function Tabulated() {
  const params = useQueryParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    variable: params.variable || null,
    month1: parseInt(params.month1) || null,
    year1: parseInt(params.year1) || null,
    month2: parseInt(params.month2) || null,
    year2: parseInt(params.year2) || null,
  });

  const [fetchTrigger, setFetchTrigger] = useState(0);

  const { data: categories, state: catState } = useFetch(
    "olap/summary/category/dim"
  );
  const { data: times, state: timeState } = useFetch(
    "olap/summary/category/time"
  );

  const categorias = useMemo(
    () => (catState === "done" ? getFormatCategory(categories) : []),
    [catState, categories]
  );
  const tiempos = useMemo(
    () =>
      timeState === "done"
        ? [...getFormatTime(times), { label: "Todos", value: null }]
        : [],
    [timeState, times]
  );

  const graphBody = useMemo(
    () =>
      getBodyCompare(
        form.variable,
        form.year1,
        form.month1,
        form.year2,
        form.month2
      ),
    [form]
  );

  const {
    data: graphRaw,
    state: graphState,
    refetch: fetchGraph,
  } = useFetch("olap/compare/lines", graphBody, false);

  function getGraphData() {
    if (!graphRaw || !graphRaw.data) return { labels: [], datasets: [] };
    const keys = Object.keys(graphRaw.data);
    if (!keys.length) return { labels: [], datasets: [] };

    return {
      labels:
        form.month1 || form.month2 || !form.year1 || !form.year2
          ? getValue(graphRaw.data[keys[0]], "label")
          : labelsMonth,
      datasets: keys.map((key, index) => ({
        label: key,
        data: getValue(graphRaw.data[key], "value"),
        borderColor: ChartPalettes[index].main,
        tension: 0.4,
        pointRadius: 3,
      })),
    };
  }

  const graphData = useMemo(() => getGraphData(), [graphRaw]);

  function handleConsult() {
    const search = new URLSearchParams({
      variable: form.variable,
      month1: form.month1,
      year1: form.year1,
      month2: form.month2,
      year2: form.year2,
    }).toString();

    navigate(`?${search}`);
    fetchGraph();
    setFetchTrigger((n) => n + 1); // Trigger resumen fetch
  }

  useEffect(() => {
    fetchGraph();
  }, []);

  return (
    <CardMain className="w-full h-full mx-auto p-6 flex flex-col gap-6 rounded-xl shadow-xl border-gray-400 border-2 bg-white text-black">
      <h2 className="text-xl font-bold mb-4">Información Tabulada</h2>
      <div className="flex flex-col flex-wrap md:flex-row gap-4 mb-4">
        <DropDown
          options={categorias}
          value={form.variable}
          onChange={(value) => setForm((f) => ({ ...f, variable: value }))}
          placeholder="Variable"
          className="min-w-[180px] flex-1"
        />
        <div className="flex gap-2 items-center">
          <DropDown
            options={months}
            value={form.month1}
            onChange={(value) => setForm((f) => ({ ...f, month1: value }))}
            placeholder="Mes"
            className="min-w-[110px]"
          />
          <DropDown
            options={tiempos}
            value={form.year1}
            onChange={(value) => setForm((f) => ({ ...f, year1: value }))}
            placeholder="Año"
            className="min-w-[90px]"
          />
        </div>
        <div className="flex gap-2 items-center">
          <DropDown
            options={months}
            value={form.month2}
            onChange={(value) => setForm((f) => ({ ...f, month2: value }))}
            placeholder="Mes"
            className="min-w-[110px]"
          />
          <DropDown
            options={tiempos}
            value={form.year2}
            onChange={(value) => setForm((f) => ({ ...f, year2: value }))}
            placeholder="Año"
            className="min-w-[90px]"
          />
        </div>

        <Button
          style="primary"
          className="h-10"
          onClick={handleConsult}
          disabled={
            (!form.month1 && form.month2) ||
            (form.month1 && !form.month2) ||
            (!form.year1 && form.year2) ||
            (form.year1 && !form.year2) ||
            !form.variable ||
            catState !== "done" ||
            timeState !== "done"
          }
        >
          Consultar
        </Button>
      </div>

      <ResumenEstadistico
        variable={form.variable}
        year1={form.year1}
        month1={form.month1}
        year2={form.year2}
        month2={form.month2}
        fetchTrigger={fetchTrigger}
      />

      {form.variable && (
        <section className="flex-grow relative w-full min-h-35 overflow-x-auto order-2 md:order-1 min-w-0">
          <Chart
            className="w-full h-[220px] min-w-0"
            type="line"
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: true, position: "top" },
                datalabels: { display: false },
              },
            }}
            data={graphData}
            state={graphState}
          />
        </section>
      )}
    </CardMain>
  );
}

export default Tabulated;
