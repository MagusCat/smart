import { NavLink } from "react-router";
import { IconContext } from "react-icons/lib";

function NavItem({ children, className, icon, to = "#", onClick }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `flex items-center justify-center flex-1 h-full px-4 py-1 gap-2 text-center ${className || ""}
          ${isActive ? "bg-black text-white" : "text-black hover:text-gray-900"}`
      }
      to={to}
      onClick={onClick}
    >
      {icon && (
        <IconContext.Provider value={{ size: "1.2rem" }}>
          <span className="flex items-center justify-center">{icon}</span>
        </IconContext.Provider>
      )}
      <span className="flex-1 text-center">{children}</span>
    </NavLink>
  );
}

export default NavItem;