import { IconContext } from "react-icons";

const styleMap = {
  default: "bg-white hover:bg-gray-300 text-black",
  primary: "bg-(--btn-primary) hover:bg-(--btn-primary-hover) text-white",
  danger: "bg-red-100 hover:bg-red-200 text-black",
};

function Button({
  icon,
  children,
  className = "",
  style = "default",
  ...props
}) {
  return (
    <button
      className={`flex items-center gap-2 px-2 py-2 rounded-lg text-sm shadow transition-all duration-200 focus:outline-none focus:ring-2 disabled:bg-gray-300 ${styleMap[style] || styleMap.default} ${className}`}
      {...props}
    >
      {icon && (
        <IconContext.Provider value={{ className: "w-5 h-5" }}>
          <span className="flex items-center">{icon}</span>
        </IconContext.Provider>
      )}
      {children && <span className="w-full text-center">{children}</span>}
    </button>
  );
}

export default Button;
