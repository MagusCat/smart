import { IconContext } from "react-icons/lib";

function ButtonIcon({ icon, className = "", ...props }) {
  return (
    <button
      className={`
        flex items-center justify-center
        text-black
        bg-transparent 
        border-none
        focus:outline-none 
        focus:ring-0  
        focus:shadow-none
        ${className}
      `}
      {...props}
    >
      {icon}
    </button>
  );
}

export default ButtonIcon;
