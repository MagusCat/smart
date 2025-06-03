import React from "react";
import { FaRegCalendarAlt, FaChartLine } from "react-icons/fa";

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
  if (!dataSource || dataSource.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto border rounded-sm overflow-hidden bg-white">
        <p className="text-center p-4 text-gray-500">
          No hay datos disponibles
        </p>
      </div>
    );
  }

  const data = dataSource || [];
  const headers = Array.from(
    new Set(Object.keys(data[0] || {}).filter((key) => key !== "rowField"))
  );
  const totalRows = dataSource.reduce((acc, item) => {
    Object.keys(item).forEach((key) => {
      if (key !== "rowField") {
        acc[item.rowField] = (acc[item.rowField] || 0) + (item[key] || 0);
      }
    });

    return acc;
  }, {});

  const totalCols = headers.reduce((acc, header) => {
    acc[header] = data.reduce((sum, item) => sum + (item[header] || 0), 0);
    return acc;
  }, {});

  return (
    <div className="w-full max-w-2xl mx-auto border rounded-sm overflow-auto bg-white">
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
            <th className="bg-gray-200 px-4 py-2 text-left font-bold border-b">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="hover:bg-blue-50 transition">
              <td className="px-4 py-2 border-b">{item.rowField}</td>
              {headers.map((header) => (
                <td key={header} className="px-4 py-2 border-b">
                  {item[header] ?? 0}
                </td>
              ))}
              <td className="px-4 py-2 border-b font-bold">
                {totalRows[item.rowField] || 0}
              </td>
            </tr>
          ))}

          <tr>
            <td className="px-4 py-2 font-bold border-t">Total</td>
            {headers.map((header) => (
              <td key={header} className="px-4 py-2 font-bold border-t">
                {totalCols[header] || 0}
              </td>
            ))}
            <td className="px-4 py-2 font-bold border-t">
              {Object.values(totalRows).reduce((sum, val) => sum + val, 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
