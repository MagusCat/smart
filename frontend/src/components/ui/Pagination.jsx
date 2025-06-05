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

  // Responsive: reduce maxPages en pantallas pequeñas
  const isMobile = window.innerWidth < 640;
  const visiblePages = isMobile ? 3 : maxPages;
  let mobileStart = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let mobileEnd = mobileStart + visiblePages - 1;
  if (mobileEnd > totalPages) {
    mobileEnd = totalPages;
    mobileStart = Math.max(1, mobileEnd - visiblePages + 1);
  }
  const mobilePages = [];
  for (let i = mobileStart; i <= mobileEnd; i++) {
    mobilePages.push(i);
  }

  const renderPages = isMobile ? mobilePages : pages;

  return (
    <div className="flex flex-wrap justify-center items-center mt-6 gap-1 sm:gap-2 text-gray-700 text-xs sm:text-base">
      <button
        className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        aria-label="Primera página"
      >
        &lt;&lt;
      </button>
      <button
        className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        &lt;
      </button>
      {renderPages[0] > 1 && (
        <>
          <button
            className="px-2 py-1 rounded-md bg-white border border-gray-300 hover:bg-gray-100"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {renderPages[0] > 2 && <span className="px-1">...</span>}
        </>
      )}
      {renderPages.map(page => (
        <button
          key={page}
          className={`px-2 sm:px-3 py-1 rounded-md ${
            page === currentPage
              ? 'bg-[#34e4af] text-white font-bold'
              : 'bg-white hover:bg-gray-100'
          } border border-gray-300`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {renderPages[renderPages.length - 1] < totalPages && (
        <>
          {renderPages[renderPages.length - 1] < totalPages - 1 && <span className="px-1">...</span>}
          <button
            className="px-2 py-1 rounded-md bg-white border border-gray-300 hover:bg-gray-100"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
      >
        &gt;
      </button>
      <button
        className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Última página"
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;