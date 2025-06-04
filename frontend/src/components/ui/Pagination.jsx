const Pagination = ({ totalPages, currentPage, onPageChange, maxPages = 5 }) => {
  // Calcula el rango de páginas a mostrar
  let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
  let endPage = startPage + maxPages - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPages + 1);
  }
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-6 space-x-2 text-gray-700">
      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}>
        &lt;&lt;
      </button>
      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}>
        &lt;
      </button>
      {startPage > 1 && (
        <>
          <button
            className="px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-gray-100"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}
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
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <button
            className="px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-gray-100"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}>
        &gt;
      </button>
      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;