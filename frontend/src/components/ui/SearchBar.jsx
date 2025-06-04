function SearchBar({ searchTerm, setSearchTerm, onClick }) {
  return (
    <div className="flex-grow flex border-1 text-sm  border-gray-300 rounded-md overflow-hidden max-w-xl">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar..."
        className="flex-grow p-2 focus:outline-none focus:ring-0 text-black"
      />
      <button
        onClick={() => onClick(searchTerm)}
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 transition duration-200 ease-in-out border-l border-gray-300"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;