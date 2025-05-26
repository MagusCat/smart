import { IconContext } from "react-icons/lib";

function ButtonIcon({ icon, className = "", ...props }) {
  return (
    <button className={`flex items-center justify-center ${className}`} {...props}>
        {icon}
    </button>
  );
}

export default ButtonIcon;