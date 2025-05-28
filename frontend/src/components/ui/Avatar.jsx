import { useState, useRef, useEffect } from "react";

function Avatar({ src, name, menu = [] }) {
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
    <div className="relative inline-block" ref={ref}>
      <div
        className="block min-w-[3em] min-h-[3em] size-[3em] rounded-full overflow-hidden cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        title={name}
      >
        <img
          src={src}
          alt={name || "Avatar"}
          className="w-full h-full aspect-square"
        />
      </div>
      {open && menu.length > 0 && (
        <ul className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 text-black rounded shadow-lg z-20">
          {menu.map((item, idx) => (
            <li
              key={idx}
              className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                setOpen(false);
                item.onClick && item.onClick();
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Avatar;
