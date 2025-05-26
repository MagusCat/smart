import { IconContext } from "react-icons/lib";

function NavItem({ children, className, icon, href = "#" }) {
  return (
    <a
      className={`flex items-center justify-center flex-1 h-full px-4 py-1 gap-2 text-center ${
        className || ""
      }`}
      href={href}
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