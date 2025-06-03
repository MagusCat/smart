// frontend/src/components/ui/NavDropdown.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';

function NavDropdown({ label, icon, options = [], buttonClassName = "", dropdownListClassName = "" }) {
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
        className={`
          flex items-center justify-center
          gap-2 px-4 py-2 rounded-xl
          min-w-[120px]
          h-10 // <-- AÑADIDO: Experimenta con h-8, h-9, h-10, h-11, etc.
          // O min-h-10 si prefieres que pueda crecer si el contenido lo requiere
          transition-all duration-300 ease-in-out
          text-black
          bg-transparent
          border-none
          focus:outline-none focus:ring-0 focus:shadow-none
          ${buttonClassName}
        `}
      >
        {icon}
        {label}
        <FaChevronDown className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg py-1 z-10 min-w-[150px] ${dropdownListClassName}`}
        >
          {options.map((option, index) => (
            <Link
              key={index}
              to={option.to}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              {option.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default NavDropdown;