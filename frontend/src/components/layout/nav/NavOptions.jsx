// frontend/src/components/layout/nav/NavOptions.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import NavDropdown from '../../ui/NavDropdown.jsx';

function NavOptions({ navOptions = [], icons, className, classItem, classNav }) {
  return (
    <ul className={className}>
      {navOptions.map((option, index) => (
        <li key={index} className={classItem}>
          {option.subOptions ? (
            <NavDropdown
              label={option.name}
              icon={icons ? option.icon : null}
              buttonClassName={`${classNav || ''}`}
              options={option.subOptions}
              dropdownListClassName="bg-white rounded-md shadow-lg py-1 z-10 min-w-[150px]"
            />
          ) : (
            <NavLink
              to={option.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl
                transition-all duration-300 ease-in-out
                focus:outline-none
                focus:ring-0
                focus:shadow-none
                ${classNav || ''}
                ${
                  isActive
                    ? 'bg-[#1CBDAB] text-white shadow-md border-none'
                    : 'text-black bg-transparent border-none hover:-translate-y-0.5 hover:border-black' 
                }`
              }
            >
              {icons && option.icon}
              {option.name}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
}

export default NavOptions;