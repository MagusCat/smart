import NavItem from "./NavItem.jsx";
import { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa6";

function Dropdown({
  label,
  icon,
  options = [],
  className = "",
  dropdownListClassName = "",
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`flex items-center justify-center flex-1 h-full px-4 py-1 gap-2 text-center w-full ${className || ""} ${
          isOpen ? "bg-black text-white" : "text-black hover:text-gray-900"
        }`}
        style={{ minWidth: 0 }}
      >
        <span className="flex-1 flex items-center justify-start gap-2">
          {icon}
          {label}
        </span>
        <FaChevronDown
          className={`ml-1 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`
            absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg py-1 z-10
            w-[90vw] max-w-xs sm:min-w-[150px] sm:w-auto sm:left-0
            ${dropdownListClassName}
          `}
          style={{
            minWidth: "140px",
          }}
        >
          {options.map((option, index) => (
            <NavItem
              key={index}
              to={option.to}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              {option.name}
            </NavItem>
          ))}
        </div>
      )}
    </div>
  );
}

function NavOptions({
  className,
  classItem,
  classNav,
  icons,
  navOptions = [],
  onNavItemClick,
}) {
  const options = navOptions.map((opt) => (
    <li className={classItem || ""} key={opt.name}>
      {opt.subOptions ? (
        <Dropdown
          label={opt.name}
          icon={icons ? opt.icon : null}
          className={`${classNav || ""}`}
          options={opt.subOptions}
          dropdownListClassName="bg-white rounded-md shadow-lg py-1 z-10 min-w-[150px]"
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
    </li>
  ));

  return <ul className={className || ""}> {options} </ul>;
}

export default NavOptions;
