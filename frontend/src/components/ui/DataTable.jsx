import React from "react";
import ActionIconButton from "./ActionIconButton"; // Asegúrate de que esta ruta sea correcta.

function DataTable({
  data,
  columns,
  actions,
  tableClassName = "min-w-full bg-white border border-gray-300 border-collapse",
  headerClassName = "bg-gray-100",
  rowClassName = "hover:bg-gray-50",
}) {
  // Número mínimo de filas a mostrar para mantener la altura visual de la tabla
  const minRowsToShow = 10;
  // Calcula cuántas filas vacías necesitamos añadir si hay menos de minRowsToShow datos
  const emptyRowsCount = Math.max(0, minRowsToShow - data.length);

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <table className={tableClassName}>
        <thead>
          <tr className={headerClassName}>
            {columns.map((col, index) => (
              <th
                key={col.key || `header-${index}`}
                // El encabezado siempre estará centrado
                className={`py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-200 ${
                  col.className || ""
                }`}
              >
                {col.header}
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-200 w-40">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {/* Mapea los datos existentes */}
          {data.map((item, rowIndex) => (
            <tr key={item.id || `row-${rowIndex}`} className={rowClassName}>
              {columns.map((col, colIndex) => (
                <td
                  key={`${item.id}-${col.key || `cell-${colIndex}`}`}
                  // Las celdas individuales heredan las clases de columna (incluido text-center)
                  className={`py-3 px-4 text-sm text-gray-700 border border-gray-200 ${
                    col.className || ""
                  }`}
                >
                  {col.render ? col.render(item, col) : item[col.key]}
                </td>
              ))}
              {actions && actions.length > 0 && (
                <td className="py-3 px-4 flex justify-center space-x-2 border border-gray-200">
                  {actions.map((action, actionIndex) => (
                    <ActionIconButton
                      key={`action-${item.id || `item-${rowIndex}`}-${actionIndex}`}
                      type={action.type}
                      onClick={() => action.onClick(item)}
                    />
                  ))}
                </td>
              )}
            </tr>
          ))}
          {/* Filas vacías para mantener la altura de la tabla si hay pocos datos */}
          {Array(emptyRowsCount)
            .fill(null)
            .map((_, index) => (
              <tr key={`empty-${index}`} className={rowClassName}>
                {columns.map((col, colIndex) => (
                  <td
                    key={`empty-${index}-${col.key || `cell-${colIndex}`}`}
                    className={`py-3 px-4 text-sm text-gray-700 border border-gray-200 ${
                      col.className || ""
                    }`}
                  >
                    &nbsp; {/* Espacio no rompible para que la celda no colapse */}
                  </td>
                ))}
                {actions && actions.length > 0 && (
                  <td className="py-3 px-4 border border-gray-200">
                    <div className="flex justify-center space-x-2 opacity-0"> {/* Opacidad 0 para que no se vean los botones en filas vacías */}
                      {actions.map((action, actionIndex) => (
                        <ActionIconButton
                          key={`empty-action-${index}-${actionIndex}`}
                          type={action.type}
                          onClick={() => {}} // No hace nada en filas vacías
                        />
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      {/* Mensaje "No hay datos disponibles" solo si no hay datos en absoluto */}
      {data.length === 0 && (
        <p className="text-center text-gray-500 py-8">No hay datos disponibles.</p>
      )}
    </div>
  );
}

export default DataTable;