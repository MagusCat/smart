function Selector({ options = [], value, onChange, className = "" }) {
  const index = options.findIndex((opt) => opt.value == value);

  function handleSelect(optionValue) {
    onChange(optionValue);
  }

  return (
    <div className={`flex flex-col w-full max-w-xs overflow-hidden ${className}`}>
      <ul className="relative flex flex-col">
        <div
          className="absolute top-0 bottom-0 w-full bg-(--font-blue) rounded-lg z-0 transition-transform duration-300"
          style={{
            height: `calc(100% / ${options.length})`,
            transform: `translateY(calc(100% * ${index}))`,
          }}
        />

        {options.map((opt) => (
          <li
            key={opt.value}
            className={`flex items-center z-10 px-3 py-1 cursor-pointer transition-colors duration-100 text-sm
                 ${opt.className || ""}
                 ${opt.value === value ? "text-white" : "text-black"}
                `}
            onClick={() => handleSelect(opt.value)}
          >
            <div className="relative grid place-items-center mr-2">
              <input
                type="radio"
                name="multi-radio"
                checked={value === opt.value}
                onChange={() => handleSelect(opt.value)}
                className={`col-start-1 row-start-1 appearance-none w-4 h-4 shirk-0 border-2 rounded-full border-(--font-accent)`}
              />

              <div
                className={`col-start-1 row-start-1 transition-all duration-300 ${
                  value === opt.value ? "size-2" : "size-0"
                } shirk-0 bg-(--font-accent) rounded-full border-(--font-accent)`}
              ></div>
            </div>

            <span className="flex-1">{opt.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Selector;
