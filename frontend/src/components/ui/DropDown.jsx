import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";

function DropDown({
  options = [],
  value,
  onChange,
  placeholder = "Selecciona...",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`text-black relative max-w-xs ${className}`}>
      <button
        type="button"
        className={`flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow transition-all duration-200
          hover:border-blue-400 focus:border-blue-500 outline-none`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`text-sm ${!value ? "text-gray-400" : ""}`}>
          {options.find((opt) => opt.value === value)?.label || placeholder}
        </span>
        <FaChevronDown
          className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul className="absolute w-min top-10/12 left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-fade-in flex flex-col">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`px-4 py-2 cursor-pointer hover:bg-green-100 transition-colors text-sm rounded
                ${
                  value === opt.value
                    ? "bg-green-50 font-semibold text-green-700"
                    : ""
                }`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropDown;
