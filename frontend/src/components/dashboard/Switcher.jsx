import { IconContext } from "react-icons/lib";

function Switcher({ options, selected, onSelect }) {
  const index = options.findIndex((opt) => opt.id == selected);

  return (
    <div className="relative inline-flex border-2 border-(--font-blue) bg-white rounded-md overflow-hidden">
      <div
        className="absolute top-0 bottom-0 h-full left-0 bg-(--font-blue) z-0 transition-transform duration-300"
        style={{
          width: `calc(100% / ${options.length})`,
          transform: `translateX(calc(100% * ${index}))`,
        }}
      />

      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={`flex-[1_1_0] max-w-10 px-2 py-1 z-10 text-sm font-medium rounded-md transition-colors
          ${
            selected == option.id
              ? "text-(--font-white)"
              : "text-(--font-black)"
          }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Switcher;
