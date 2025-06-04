// frontend/src/components/ui/Pagination.jsx
import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // Para un diseño básico, generamos un rango de páginas
  // En una implementación real, podrías querer manejar rangos de páginas más complejos (ej. 1 2 3 ... 8 9 10)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center mt-6 space-x-2 text-gray-700">
      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={() => onPageChange(1)} // Ir a la primera página
              disabled={currentPage === 1}>
        &lt;&lt;
      </button>
      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={() => onPageChange(currentPage - 1)} // Ir a la página anterior
              disabled={currentPage === 1}>
        &lt;
      </button>
      {pages.map(page => (
        <button
          key={page}
          className={`px-3 py-1 rounded-md ${
            page === currentPage ? 'bg-[#34e4af] text-white font-bold' : 'bg-white hover:bg-gray-100'
          } border border-gray-300`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={() => onPageChange(currentPage + 1)} // Ir a la página siguiente
              disabled={currentPage === totalPages}>
        &gt;
      </button>
      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={() => onPageChange(totalPages)} // Ir a la última página
              disabled={currentPage === totalPages}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;