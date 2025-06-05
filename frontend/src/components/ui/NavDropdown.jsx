// frontend/src/ui/NavDropdown.jsx (Modificado)
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { FaChevronDown } from 'react-icons/fa6'; // Ya tienes este
import { IconContext } from "react-icons/lib";

function NavDropdown({
    label,
    icon, // Recibe el icono del HeaderAdmin
    options = [],
    buttonClassName = "",
    dropdownListClassName = "",
    dropdownItemClassName = "",
    dropdownListItemClassName = ""
}) {
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
        <div className="relative h-full flex items-center" ref={dropdownRef}> {/* Añade h-full y flex items-center */}
            {/* El botón principal del dropdown */}
            <button
                onClick={toggleDropdown}
                className={`flex items-center justify-center gap-2 focus:outline-none ${buttonClassName}`} // Añade justify-center
            >
                {icon && (
                    <IconContext.Provider value={{ size: "1.2rem" }}>
                        <span className="flex items-center justify-center">{icon}</span>
                    </IconContext.Provider>
                )}
                {label}
                <FaChevronDown className={`ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                // Posicionar el dropdown justo debajo del botón
                <ul className={`absolute top-full left-0 z-10 bg-white rounded-md shadow-lg py-1 mt-2 w-48 ${dropdownListClassName}`}>
                    {options.map((item, index) => (
                        <li key={index} className={dropdownListItemClassName}>
                            {item.to ? (
                                <Link
                                    to={item.to}
                                    onClick={() => setIsOpen(false)}
                                    // Aplica dropdownItemClassName aquí
                                    className={`block w-full text-left ${dropdownItemClassName}`}
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <button
                                    onClick={() => { setIsOpen(false); if (item.onClick) item.onClick(); }}
                                    // Aplica dropdownItemClassName aquí
                                    className={`block w-full text-left ${dropdownItemClassName}`}
                                >
                                    {item.name}
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