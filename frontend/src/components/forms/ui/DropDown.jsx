const DropDown = ({
  label,
  id,
  value,
  onChange,
  options = [],
  className = "",
  wrapperClassName = "",
  ... props
}) => (
  <div className={`flex flex-col gap-2 w-full ${wrapperClassName}`}>
    {label && (
      <label htmlFor={id} className="text-gray-700 font-medium">
        {label}
      </label>
    )}
    <select
      id={id}
      name={id}
      className={`border-2 outline-0 border-gray-300 rounded-md  focus:border-blue-500 bg-white text-black px-3 py-2 w-full transition-colors duration-200 ${className}`}
      value={value}
      onChange={onChange}
      {... props}
    >
      <option value="">----</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default DropDown;