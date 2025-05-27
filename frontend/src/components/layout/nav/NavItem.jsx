import { Link } from "react-router";
import { IconContext } from "react-icons/lib";

function NavItem({ children, className, icon, to = "#" }) {
  return (
    <Link
      className={`flex items-center justify-center flex-1 h-full px-4 py-1 gap-2 text-center ${
        className || ""
      }`}
      to={to}
    >
      {icon && (
        <IconContext.Provider value={{ size: "1.2rem" }}>
          <span className="flex items-center justify-center">{icon}</span>
        </IconContext.Provider>
      )}
      <span className="flex-1 text-center">{children}</span>
    </Link>
  );
}

export default NavItem;