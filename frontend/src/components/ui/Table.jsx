import React from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { FaRegCalendarAlt, FaChartLine } from "react-icons/fa";

export function getTheme() {
  return {
    Table: `
      border: 2px solid #00000080;
      margin: 0rem 2rem;
    `,
    HeaderRow: `
        .th {
          border-bottom: 2px solid #000;
          padding: 0.25rem;
        }
      `,
    BaseCell: `
        &:not(:last-of-type) {
          border-right: 1px solid #a0a8ae;
        }

        text-align: center;
        padding: 0.2rem;
      `,
  };
}

function pivotCrossData(data, rowKey, colKey, valueKey) {
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

function getColumnsFromCrossPivot(pivoted, ignore) {
  if (pivoted.length == 0) return [];

  const keys = new Set(Object.keys(pivoted[0]).filter((key) => !ignore[key]));

  return Array.from(keys);
}

export function CrossTable({ dataSource }) {
  const data = pivotCrossData(dataSource, "var1", "var2", "data");
  const headers = getColumnsFromCrossPivot(data, { var1: true, id: true });
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

  return (
    <CompactTable
      className="min-w-full"
      columns={cols}
      data={{ nodes: data }}
      theme={theme}
    />
  );
}

function pivotFrecuencyTable(dataSource, total) {
  return dataSource.map((current) => ({
    var: current.var,
    cat: current.cat,
    f: current.total,
    fi: current.total / total,
    fx: (current.total / total) * 100,
  }));
}

export function FrecuencyTable({ dataSource }) {
  const total = dataSource.reduce((prev, current) => prev + current.total, 0);

  const data = pivotFrecuencyTable(dataSource, total);

  const cols = [
    {
      label: data[0].var,
      renderCell: (item) => item.cat,
    },
    {
      label: "Frecuencia (f)",
      renderCell: (item) => item.f,
    },
    {
      label: "Frecuencia Relativa (fi)",
      renderCell: (item) => item.fi.toFixed(2),
    },
    {
      label: "Frecuencia % (fx)",
      renderCell: (item) => item.fx.toFixed(2) + "%",
    },
  ];

  const theme = useTheme(getTheme());

  return (
    <CompactTable
      className="min-w-full"
      columns={cols}
      data={{ nodes: data }}
      theme={theme}
    />
  );
}

export function FrecuencyTableStyled({ dataSource }) {
  const total = dataSource.reduce((prev, current) => prev + current.total, 0);

  const data = dataSource.map((current) => ({
    var: current.var,
    cat: current.cat,
    f: current.total,
    fi: current.total / total,
    fx: (current.total / total) * 100,
  }));

  return (
    <div className="w-full max-w-2xl mx-auto border rounded-sm overflow-hidden bg-white">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="bg-gray-200 px-4 py-2 text-left font-bold border-b">
              {data[0]?.var || "Variable"}
            </th>
            <th className="bg-gray-200 px-4 py-2 text-left font-bold border-b">
              Frecuencia (f)
            </th>
            <th className="bg-gray-200 px-4 py-2 text-left font-bold border-b">
              Frecuencia Relativa (fi)
            </th>
            <th className="bg-gray-200 px-4 py-2 text-left font-bold border-b">
              Frecuencia % (fx)
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-blue-50 transition">
              <td className="px-4 py-2 border-b">{item.cat}</td>
              <td className="px-4 py-2 border-b">{item.f}</td>
              <td className="px-4 py-2 border-b">{item.fi.toFixed(2)}</td>
              <td className="px-4 py-2 border-b">{item.fx.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SystemRecordsTable({ title, data = [], onPeriodClick }) {
  // Agrupa por variable
  const grouped = data.reduce((acc, curr) => {
    if (!acc[curr.variable]) acc[curr.variable] = [];
    acc[curr.variable].push(curr.period);
    return acc;
  }, {});

  return (
    <div className="w-full max-w-2xl mx-auto border rounded-sm overflow-hidden bg-white">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th
              className="bg-gray-200 px-4 py-2 text-left font-bold border-b"
              colSpan={2}
            >
              Información tabulada {title && `- ${title}`}
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(grouped).map(([variable, periods], idx) => (
            <React.Fragment key={variable}>
              <tr>
                <td
                  className={`px-4 py-2 font-semibold border-b bg-gray-50 border-t-2 border-gray-300 ${
                    idx > 0 ? "mt-2" : ""
                  }`}
                  colSpan={2}
                  style={{ borderTopWidth: idx > 0 ? "2px" : undefined }}
                >
                  <span className="flex items-center gap-2">
                    <FaChartLine className="text-blue-500" />
                    {variable}
                  </span>
                </td>
              </tr>
              {periods.map((period) => (
                <tr
                  key={period}
                  className="cursor-pointer hover:bg-blue-50 transition"
                  onClick={() =>
                    onPeriodClick && onPeriodClick(variable, period)
                  }
                >
                  <td className="px-4 py-2 border-b w-10">
                    <FaRegCalendarAlt className="text-blue-500 inline-block" />
                  </td>
                  <td className="px-4 py-2 border-b">{period}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CrossTableStyled({ dataSource }) {
  // Pivot
  const data = pivotCrossData(dataSource, "var1", "var2", "data");
  const headers = getColumnsFromCrossPivot(data, { var1: true, id: true });

  return (
    <div className="w-full max-w-2xl mx-auto border rounded-sm overflow-hidden bg-white">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="bg-gray-200 px-4 py-2 text-left font-bold border-b">
              Categoría
            </th>
            {headers.map((header) => (
              <th
                key={header}
                className="bg-gray-200 px-4 py-2 text-left font-bold border-b"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-blue-50 transition">
              <td className="px-4 py-2 border-b">{item.var1}</td>
              {headers.map((header) => (
                <td key={header} className="px-4 py-2 border-b">
                  {item[header] ?? 0}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
