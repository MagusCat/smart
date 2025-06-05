import { useState, useMemo } from "react";
import { FaBolt, FaBookMedical } from "react-icons/fa6";
import { ViewSelector, Button, DropDown } from "@components/ui";
import { CrossTableStyled } from "@components/ui/Table";
import { Chart, ChartPalettes } from "@components/ui/Chart";
import { Card, CardMain, CardContentLoader } from "@components/ui/Card";
import { ModalDownload } from "@components/ui/Modal";
import useFetch from "@hooks/useFetch";
import useParser from "@hooks/useParser";

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

function getCrossGraphData(crossData) {
  const keys = Object.keys(crossData[0]).filter((k) => k !== "rowField");

  return {
    labels: keys,
    datasets: crossData.map((row, index) => ({
      label: row.rowField,
      data: keys.map((key) => row[key]),
      backgroundColor: ChartPalettes[index % ChartPalettes.length].color1,
      borderColor: ChartPalettes[index % ChartPalettes.length].main,
      fill: true,
      borderWidth: 1 
    })),
  };
}

function Compare() {
  const [type, setType] = useState("table");
  const [formTable, setFormTable] = useState({
    v1: "",
    v2: "",
    t: null,
  });
  const [Modal, setModal] = useState({
    open: false,
    loading: false,
    fileUrl: "",
    fileName: "datos.csv",
  });
  const { data: categories, state: catState } = useFetch(
    "olap/summary/category/dim"
  );
  const { data: times, state: timeState } = useFetch("olap/summary/category/time");

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
  const graphData = useMemo(
    () =>
      crossState === "done" && crossData.data
        ? getCrossGraphData(crossData.data)
        : null,
    [crossState, crossData]
  );

  function handleCrossFetch() {
    crossFetch();
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

  function handleCloseModal() {
    setModal({ ...Modal, open: false });

    if (Modal.fileUrl) {
      setTimeout(() => {
        URL.revokeObjectURL(Modal.fileUrl);
        setCsvUrl("");
      }, 150);
    }
  }

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
              type="bar"
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: true, position: "top" },
                  datalabels: { display: false },
                },
              }}
              data={graphData}
              state={crossState}
            />
          </div>
        </section>

        <aside className="flex flex-col w-full px-10 md:w-70 gap-4 order-1 md:order-2 mb-5 md:mb-0">
          <Button
            style="primary"
            className="w-full items-center justify-center"
            icon={<FaBolt />}
            disabled={!crossData.data || crossState !== "done"}
            onClick={handleExportCross}
          >
            Exportar
          </Button>
          <Button
            style="primary"
            className="w-full items-center justify-center"
            icon={<FaBookMedical />}
            disabled={!formTable.v1 || !formTable.v2}
            onClick={handleCrossFetch}
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
