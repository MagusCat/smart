import React from 'react';
import { IconContext } from "react-icons/lib";

function NavItem({ children, className, icon, to = "#", onClick }) {
  return (
    <a
      className={`flex items-center justify-center flex-1 h-full px-4 py-1 gap-2 text-center ${
        className || ""
      }`}
      href={to}
      onClick={onClick}
    >
      {icon && (
        <IconContext.Provider value={{ size: "1.2rem" }}>
          <span className="flex items-center justify-center">{icon}</span>
        </IconContext.Provider>
      )}
      <span className="flex-1 text-center">{children}</span>
    </a>
  );
}

export default NavItem;