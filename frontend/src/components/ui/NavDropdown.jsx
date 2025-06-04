import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center gap-2 px-4 py-2 rounded-md focus:outline-none ${buttonClassName}`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        <FaChevronDown className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul className={`absolute z-10 bg-white rounded-md shadow-lg py-1 mt-2 w-48 ${dropdownListClassName}`}>
          {options.map((item, index) => (
            <li key={index}>
              {item.to ? (
                <Link
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => { setIsOpen(false); if (item.onClick) item.onClick(); }}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NavDropdown;