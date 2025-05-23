import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { IconContext } from "react-icons/lib";

function Navbar({ options = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full justify-center text-[--font-black] text-sm font-medium">
      <div className="flex items-center justify-between w-full">
        <button
          className="lg:hidden p-2 text-black"
          onClick={() => setOpen(!open)}
        >
          <IconContext.Provider
            value={{
              className: `transition-transform ${
                open ? "rotate-180" : "rotate-0"
              }`,
            }}
          >
            <FaAngleLeft></FaAngleLeft>
          </IconContext.Provider>
        </button>

        <ul className="hidden  text-black lg:flex flex-wrap gap-2 md:gap-4 lg:gap-6 flex-col sm:flex-row items-center">
          {options.map((option) => (
            <li key={option.name}>{option.name}</li>
          ))}
        </ul>
      </div>

      <div
        className={`fixed top-0 left-0 w-2/3 max-w-xs h-full bg-white shadow-lg z-50 transition-transform duration-300 lg:hidden
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button className="p-4 text-black" onClick={() => setOpen(false)}>
          ✕
        </button>
        <ul className="flex flex-col gap-4 mt-4 px-4">
          {options.map((option) => (
            <li key={option.name} className="text-black">{option.name}</li>  
          ))}
        </ul>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-[#00000080] z-40 lg:hidden pointer-event-none"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default Navbar;
