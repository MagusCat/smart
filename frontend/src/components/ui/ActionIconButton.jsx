// frontend/src/components/ui/ActionIconButton.jsx
import React from 'react';

const ActionIconButton = ({ type, onClick }) => {
  let bgColorClass = '';
  let iconSrc = '';
  let altText = '';
  let buttonSizeClass = 'w-10 h-8'; // w-40 h-30 (pixels) -> w-10 h-8 (tailwind units, 1 unit = 4px)

  switch (type) {
    case 'edit':
      bgColorClass = 'bg-[#1CBDAB] hover:bg-[#159e87]'; // Color de fondo y hover
      iconSrc = '/img/edit.svg'; // Ruta al SVG
      altText = 'Editar';
      break;
    case 'delete':
      bgColorClass = 'bg-[#FF746C] hover:bg-[#d65f57]'; // Color de fondo y hover
      iconSrc = '/img/delete.svg'; // Ruta al SVG
      altText = 'Eliminar';
      break;
    default:
      bgColorClass = 'bg-gray-500 hover:bg-gray-600';
      iconSrc = '';
      altText = '';
  }

  return (
    <button
      className={`${buttonSizeClass} rounded-md ${bgColorClass} flex items-center justify-center transition duration-200 ease-in-out shadow-sm`}
      onClick={onClick}
      title={altText}
    >
      {iconSrc && <img src={iconSrc} alt={altText} className="w-4 h-4" />} {/* Tamaño del icono dentro del botón */}
    </button>
  );
};

export default ActionIconButton;