function Input({
  label,
  id,
  value,
  onChange,
  type = 'text',
  className = '',
  wrapperClassName = '',
  ...props
}) {
  return (
    <div className={`flex flex-col gap-2 ${wrapperClassName}`}>
      {label && (
        <label htmlFor={id} className="text-gray-700 font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`border-2 border-gray-300 outline-0 rounded-md focus:border-blue-500 focus:ring-blue-500 bg-white text-black px-3 py-2 w-full ${className}`}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}

export default Input;
