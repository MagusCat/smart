import { IconContext } from "react-icons/lib";

function ButtonIcon({ icon, className = "", ...props }) {
  return (
    <button className={`flex items-center justify-center text-black ${className}`} {...props}>
        {icon}
    </button>
  );
}

export default ButtonIcon;