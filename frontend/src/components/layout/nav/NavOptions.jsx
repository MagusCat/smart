<<<<<<< HEAD
=======
// frontend/src/components/nav/NavOptions.jsx (Confirmación - debe estar así)
import React from 'react';
>>>>>>> fe04fbb (WIP: Guardando cambios de categorías antes de mover a rama 'reboot')
import NavItem from "./NavItem.jsx";

function NavOptions({
  className,
  classItem,
  classNav, // Proviene de NavBarAdmin
  icons,
  navOptions = [],
  onNavItemClick
}) {
  const options = navOptions.map((opt) => (
    <li className={classItem || ""} key={opt.name}>
<<<<<<< HEAD
      <NavItem
        className={classNav || ""}
        icon={icons && opt.icon}
        to={opt.to}
        onClick={onNavItemClick}
      >
        {opt.name}
      </NavItem>
=======
      {opt.subMenu ? (
        <NavDropdown
          label={opt.name}
          icon={icons && opt.icon} // Pasa el icono a NavDropdown
          options={opt.subMenu}
          buttonClassName={`${classNav} w-full h-full`} // Aplica classNav al botón principal del dropdown y le da ancho/alto
          dropdownItemClassName={`text-black block w-full px-4 py-2 hover:bg-gray-100`} // Estilo para los ítems individuales del dropdown (texto negro, padding)
          dropdownListItemClassName={classItem || ""} // Estilo para el <li> contenedor de los ítems del dropdown
        />
      ) : (
        <NavItem
          className={classNav || ""}
          icon={icons && opt.icon}
          to={opt.to}
          onClick={onNavItemClick}
        >
          {opt.name}
        </NavItem>
      )}
>>>>>>> fe04fbb (WIP: Guardando cambios de categorías antes de mover a rama 'reboot')
    </li>
  ));

  return <ul className={className || ""}> {options} </ul>;
}

export default NavOptions;