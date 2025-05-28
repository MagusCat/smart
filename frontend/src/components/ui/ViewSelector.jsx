function ViewSelector({ current, onChange, options }) {
  return (
    <header className="flex flex-row gap-5 border-b-2 p-2">
      {options.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-2 transition-all duration-300 hover:shadow-[0_3px_0_black] hover:-translate-y-0.5 ${
            current === value ? "shadow-[0_2px_0_black]" : ""
          }`}
        >
          {label}
        </button>
      ))}
    </header>
  );
}

export default ViewSelector;
