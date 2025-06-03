import { useState, useMemo } from "react";
import { FaBolt, FaBookMedical } from "react-icons/fa6";
import { ViewSelector, Button, DropDown } from "@components/ui";
import { CrossTableStyled } from "@components/ui/Table";
import { Chart, ChartPalettes } from "@components/ui/Chart";
import { Card, CardMain, CardContentLoader } from "@components/ui/Card";
import { ModalDownload } from "@components/ui/Modal";
import useFetch from "@hooks/useFetch";
import useParser from "@hooks/useParser";

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
  if (!y && !m) return `Todo el tiempo`
  if (!y && m) return `${labelsMonth[m]}`;
  if (y && !m) return `${y}`;
  if (!y && m) return `Mes ${labelsMonth[m]}`;
  return `${y} - Mes ${labelsMonth[m]}`;
}

function getBodyCompare(var1, y1, m1, y2, m2) {
  return {
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
  };
}

function getBodyCross(var1, var2, year) {
  return {
    colField: var1,
    rowField: var2,
    agg: "Count",
    field: "id_hecho_inscripcion",
    filters: year ? [{ field: "anio", condition: "=", value: year }] : [],
  };
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

function Compare() {
  const [type, setType] = useState("table");
  const [formTable, setFormTable] = useState({
    v1: "",
    v2: "",
    t: null,
  });
  const [formGraph, setFormGraph] = useState({
    v1: "",
    t1_y: null,
    t1_m: null,
    t2_y: null,
    t2_m: null,
  });

  const [Modal, setModal] = useState({
    open: false,
    loading: false,
    fileUrl: "",
    fileName: "datos.csv",
  });
  const { data: categories, state: catState } = useFetch(
    "olap/compare/categories"
  );
  const { data: times, state: timeState } = useFetch("olap/compare/times");

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

  const crossBody = useMemo(
    () => getBodyCross(formTable.v1, formTable.v2, formTable.t),
    [formTable]
  );

  const graphBody = useMemo(
    () =>
      getBodyCompare(
        formGraph.v1,
        formGraph.t1_y,
        formGraph.t1_m,
        formGraph.t2_y,
        formGraph.t2_m
      ),
    [formGraph]
  );

  const { unparseCSV } = useParser();

  const {
    data: crossData,
    state: crossState,
    refetch: crossFetch,
  } = useFetch(
    "olap/compare/cross",
    {
      body: JSON.stringify(crossBody),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    },
    false
  );

  const {
    data: graphRaw,
    state: graphState,
    refetch: graphFetch,
  } = useFetch(
    "olap/compare/lines",
    {
      body: JSON.stringify(graphBody),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    },
    false
  );

  function handleCrossFetch() {
    crossFetch();
  }

  function handleGraphFetch() {
    if (formGraph.t1_m != null && formGraph.t2_m == null) {
      return;
    }

    graphFetch();
  }

  async function handleExportCross() {
    if (crossState !== "done" || !crossData.data) return;

    setModal({ ...Modal, open: true, loading: true });

    const csv = await unparseCSV(crossData.data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    setModal({
      ...Modal,
      loading: false,
      open: true,
      fileUrl: url,
      fileName: `cross_${formTable.v1}_${formTable.v2}.csv`,
    });
  }

    async function handleExportGraph() {
    if (graphState !== "done" || !graphRaw.data) return;

    setModal({ ...Modal, open: true, loading: true });

    const csv = await unparseCSV(graphRaw.data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    setModal({
      ...Modal,
      loading: false,
      open: true,
      fileUrl: url,
      fileName: `line_${formGraph.v1}.csv`,
    });
  }

  function handleCloseModal() {
    setModal({ ...Modal, open: false });

    if (Modal.fileUrl) {
      setTimeout(() => {
        URL.revokeObjectURL(Modal.fileUrl);
        setCsvUrl("");
      }, 150);
    }
  }

  function getGraphData() {
    const keys = Object.keys(graphRaw.data);

    return {
      labels:
        (formGraph.t1_m || formGraph.t2_m) || (!formGraph.t1_y || !formGraph.t2_y)
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

  const graphData = graphState === "done" ? getGraphData() : {};

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
        {type === "table" ? (
          <>
            <div className="flex flex-col md:flex-row flex-wrap w-full gap-3 justify-center">
              <DropDown
                options={categorias}
                value={formTable.v1}
                onChange={(value) => setFormTable({ ...formTable, v1: value })}
                placeholder="Variable 1"
                className="min-w-0 flex-1"
                disabled={catState !== "done"}
              />
              <DropDown
                options={categorias}
                value={formTable.v2}
                onChange={(value) => setFormTable({ ...formTable, v2: value })}
                placeholder="Variable 2"
                className="min-w-0 flex-1"
                disabled={catState !== "done"}
              />
            </div>
            <div className="flex flex-1/2 flex-col md:flex-row flex-wrap w-full gap-3 justify-end">
              <DropDown
                options={tiempos}
                value={formTable.t}
                onChange={(value) => setFormTable({ ...formTable, t: value })}
                placeholder="Tiempo"
                className="min-w-0 flex-1"
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-1/2 flex-col md:flex-row flex-wrap w-full gap-3 justify-center">
              <DropDown
                options={categorias}
                value={formGraph.v1}
                onChange={(value) => setFormGraph({ ...formGraph, v1: value })}
                placeholder="Variable"
                className="min-w-0 flex-1"
                disabled={catState !== "done"}
              />
            </div>
            <div className="flex flex-col md:flex-row flex-wrap w-full gap-3 justify-end">
              <DropDown
                options={months}
                value={formGraph.t1_m}
                onChange={(value) =>
                  setFormGraph({ ...formGraph, t1_m: value })
                }
                placeholder="Meses"
                className="min-w-0 flex-2"
                disabled={timeState !== "done"}
              />
              <DropDown
                options={tiempos}
                value={formGraph.t1_y}
                onChange={(value) =>
                  setFormGraph({ ...formGraph, t1_y: value })
                }
                placeholder="Año"
                className="min-w-0 flex-2"
                disabled={timeState !== "done"}
              />

              <DropDown
                options={months}
                value={formGraph.t2_m}
                onChange={(value) =>
                  setFormGraph({ ...formGraph, t2_m: value })
                }
                placeholder="Meses"
                className="min-w-0 flex-2"
                disabled={timeState !== "done"}
              />
              <DropDown
                options={tiempos}
                value={formGraph.t2_y}
                onChange={(value) =>
                  setFormGraph({ ...formGraph, t2_y: value })
                }
                placeholder="Año"
                className="min-w-0 flex-2"
                disabled={timeState !== "done"}
              />
            </div>
          </>
        )}
      </Card>

      <div className="flex flex-col md:flex-row relative min-h-[220px]">
        <section className="flex-grow relative w-full min-h-35 overflow-x-auto order-2 md:order-1 min-w-0">
          <div
            className={`block transition-all duration-300 ${
              type === "table"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1 pointer-events-none min-w-0 h-0 overflow-hidden"
            } w-full`}
          >
            <CardContentLoader state={crossState}>
              <CrossTableStyled dataSource={crossData.data || []} />
            </CardContentLoader>
          </div>
          <div
            className={`block transition-all duration-300 ${
              type === "graph"
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
                plugins: {
                  legend: { display: true, position: "top" },
                  datalabels: { display: false },
                },
              }}
              data={graphData}
              state={graphState}
            />
          </div>
        </section>

        <aside className="flex flex-col w-full px-10 md:w-70 gap-4 order-1 md:order-2 mb-5 md:mb-0">
          <Button
            style="primary"
            className="w-full items-center justify-center"
            icon={<FaBolt />}
            disabled={ type === "table" ? !crossData.data || crossState !== "done" : !graphRaw.data || graphState !== "done" }
            onClick={ type === "table" ? handleExportCross : handleExportGraph }
          >
            Exportar
          </Button>
          <Button
            style="primary"
            className="w-full items-center justify-center"
            icon={<FaBookMedical />}
            disabled={
              type === "table" ? !formTable.v1 || !formTable.v2 : !formGraph.v1
            }
            onClick={type === "table" ? handleCrossFetch : handleGraphFetch}
          >
            Consultar
          </Button>
        </aside>
      </div>

      <ModalDownload
        open={Modal.open}
        onClose={handleCloseModal}
        loading={Modal.loading}
        fileUrl={Modal.fileUrl}
        fileName={Modal.fileName || "datos.csv"}
      />
    </CardMain>
  );
}

export default Compare;
