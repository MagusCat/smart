// frontend/src/components/ui/DataTable.jsx
import React from 'react';
import ActionIconButton from './ActionIconButton';

function DataTable({
  data,
  columns,
  actions,
  // Mantén tableClassName con 'border-collapse' y un borde general
  tableClassName = 'min-w-full bg-white border border-gray-300 border-collapse',
  headerClassName = 'bg-gray-100',
  rowClassName = 'hover:bg-gray-50'
}) {
  const minRowsToShow = 10;
  const emptyRowsCount = Math.max(0, minRowsToShow - data.length);

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className={tableClassName}>
        <thead className={headerClassName}>
          <tr>
            {columns.map((col, index) => (
              <th
                key={col.key || `header-${index}`}
                // Volvemos a 'border' completo para todos los th
                className={`py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-200 ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
            {actions && actions.length > 0 && (
              // th de acciones también con 'border' completo
              <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider border border-gray-200">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={item.id || `row-${rowIndex}`} className={rowClassName}>
              {columns.map((col, colIndex) => (
                <td
                  key={`${item.id}-${col.key || `cell-${colIndex}`}`}
                  // td de datos con 'border' completo
                  className={`py-3 px-4 text-sm text-gray-700 border border-gray-200 ${col.className || ''}`}
                >
                  {col.render ? col.render(item, col) : item[col.key]}
                </td>
              ))}
              {actions && actions.length > 0 && (
                // td de acciones con 'border' completo
                <td className="py-3 px-4 flex justify-center space-x-2 border border-gray-200">
                  {actions.map((action, actionIndex) => (
                    <ActionIconButton
                      key={`action-${item.id}-${actionIndex}`}
                      type={action.type}
                      onClick={() => action.onClick(item)}
                    />
                  ))}
                </td>
              )}
            </tr>
          ))}
          {/* Filas vacías para rellenar el espacio visual */}
          {Array(emptyRowsCount).fill(null).map((_, index) => (
            <tr key={`empty-${index}`} className={rowClassName}>
              {columns.map((col, colIndex) => (
                <td
                  key={`empty-${index}-${col.key || `cell-${colIndex}`}`}
                  // Asegura el borde completo para las celdas vacías de datos
                  className={`py-3 px-4 text-sm text-gray-700 border border-gray-200 ${col.className || ''}`}
                >
                  &nbsp; {/* Esencial para la altura */}
                </td>
              ))}
              {actions && actions.length > 0 && (
                // CAMBIO CLAVE AQUÍ: La celda TD SÍ tiene sus bordes.
                // El div interno que contiene los botones es el que tiene opacity-0
                <td className="py-3 px-4 border border-gray-200">
                  <div className="flex justify-center space-x-2 opacity-0"> {/* opacity-0 para ocultar SOLO los botones */}
                    {actions.map((action, actionIndex) => (
                      <ActionIconButton
                        key={`empty-action-${index}-${actionIndex}`}
                        type={action.type}
                        onClick={() => {}}
                      />
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;