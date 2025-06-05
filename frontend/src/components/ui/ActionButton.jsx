import { FaXmark, FaToolbox } from 'react-icons/fa6'

const options = {
  edit: {
    class: 'bg-blue-500 hover:bg-blue-600',
    iconSrc: FaToolbox,
    altText: 'Editar',
  },
  delete: {
    class: 'bg-red-500 hover:bg-red-600',
    iconSrc: FaXmark,
    altText: 'Eliminar',
  }
};

function ActionButton({ type, onClick }){
  const Icon = options[type] ?? {
    class: 'bg-gray-500 hover:bg-gray-600',
    iconSrc: null,
    altText: 'Acción no definida',
  }

  return (
    <button
      className={`w-10 h-10 rounded-md ${Icon.class} flex items-center justify-center transition duration-200 ease-in-out shadow-sm`}
      onClick={onClick}
      title={Icon.altText}
    >
      {Icon.iconSrc ? <Icon.iconSrc className="text-white w-5 h-5" /> : null}
    </button>
  );
};

export default ActionButton;