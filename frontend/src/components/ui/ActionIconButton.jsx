import React from "react";

const ActionIconButton = ({ type, onClick }) => {
  let bgColorClass = "";
  let iconSrc = "";
  let altText = "";
  let buttonSizeClass = "w-10 h-7.5";

  switch (type) {
    case "edit":
      bgColorClass = "bg-[#1CBDAB] hover:bg-[#159e87]";
      iconSrc = "/img/edit.svg";
      altText = "Editar";
      break;
    case "delete":
      bgColorClass = "bg-[#FF746C] hover:bg-[#d65f57]";
      iconSrc = "/img/delete.svg";
      altText = "Eliminar";
      break;
    default:
      bgColorClass = "bg-gray-500 hover:bg-gray-600";
      iconSrc = "";
      altText = "";
  }

  return (
    <button
      className={`${buttonSizeClass} rounded-md ${bgColorClass} flex items-center justify-center transition duration-200 ease-in-out shadow-sm`}
      onClick={onClick}
      title={altText}
    >
      {iconSrc && <img src={iconSrc} alt={altText} className="w-4 h-4" />}
    </button>
  );
};

export default ActionIconButton;
