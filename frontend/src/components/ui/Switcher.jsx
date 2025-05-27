function Switcher({ options, selected, onSelect, className }) {
  const index = options.findIndex((opt) => opt.value === selected);

  return (
    <div className={`relative flex w-min h-min border-2 border-(--font-blue) bg-white rounded-md overflow-hidden ${className}`}>
      <div
        className="absolute top-0 bottom-0 h-full -left-0.02 bg-(--font-blue) z-0 transition-transform duration-300"
        style={{
          width: `calc((100% / ${options.length}) + 1px)`,
          transform: `translateX(calc(100% * ${index}))`,
        }}
      />

      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.value)}
          className={`flex-[1_1_0] max-w-10 px-2 py-1 z-10 text-sm font-medium rounded-md transition-colors
          ${
            selected === option.value
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
