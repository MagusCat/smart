import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importa los iconos necesarios.

const ActionIconButton = ({ type, onClick }) => {
  let icon;
  let className;
  let title;

  switch (type) {
    case 'edit':
      icon = <FaEdit className="h-5 w-5" />;
      className = "text-green-600 hover:text-green-900 hover:bg-green-100 focus:ring-green-500";
      title = "Editar";
      break;
    case 'delete':
      icon = <FaTrash className="h-5 w-5" />;
      className = "text-red-600 hover:text-red-900 hover:bg-red-100 focus:ring-red-500";
      title = "Eliminar";
      break;
    default:
      return null;
  }

  return (
    <button
      onClick={onClick}
      className={`p-1 rounded-full transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      title={title}
    >
      {icon}
    </button>
  );
};

export default ActionIconButton;