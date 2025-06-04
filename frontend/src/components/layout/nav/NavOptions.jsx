import React from 'react';
import NavItem from "./NavItem.jsx";
import NavDropdown from '../../ui/NavDropdown.jsx';

function NavOptions({
  className,
  classItem,
  classNav,
  icons,
  navOptions = [],
  onNavItemClick
}) {
  const options = navOptions.map((opt) => (
    <li className={classItem || ""} key={opt.name}>
      {opt.subMenu ? (
        <NavDropdown label={opt.name} options={opt.subMenu} />
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
    </li>
  ));

  return <ul className={className || ""}> {options} </ul>;
}

export default NavOptions;