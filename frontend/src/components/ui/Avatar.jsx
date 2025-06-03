import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Link } from "react-router-dom"; // Importa Link

function Avatar({ src, menu = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); 
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 focus:outline-none"
      >
        <img
          src={src}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
        />
        <FaChevronDown
          className={`text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
          {menu.map((item, index) =>
            item.to ? ( // Si la opción tiene 'to', renderiza un Link
              <Link
                key={index}
                to={item.to}
                // Si hay un onClick, llámalo, pero asegúrate de que no interfiera con el Link.
                // Generalmente, para navegación, solo se necesita 'to'.
                // Si el onClick es para una acción *adicional* (ej. cerrar sesión), asegúrate de que no haga e.preventDefault()
                onClick={(e) => {
                  // AÑADIDO 'e' como argumento del evento
                  setIsOpen(false); // Cierra el dropdown
                  if (item.onClick) {
                    item.onClick(e); // Pasa el evento al onClick, si es necesario
                  }
                  // No se necesita e.preventDefault() aquí, el Link debe navegar
                }}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                {item.label}
              </Link>
            ) : (
              // Si no tiene 'to', es un botón normal (ej. Cerrar sesión)
              <button
                key={index}
                onClick={(e) => {
                  // AÑADIDO 'e' como argumento del evento
                  setIsOpen(false); // Cierra el dropdown
                  if (item.onClick) {
                    item.onClick(e);
                  }
                }}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default Avatar;
