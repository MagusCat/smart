import { FaRegCircleXmark } from "react-icons/fa6";
import NavOptions from "./NavOptions.jsx";
import ButtonIcon from "../../ui/ButtonIcon.jsx";

function NavAside({ navOptions = [], className, open, setOpen }) {
  return (
    <>
      <aside
        className={`fixed top-0 left-0 w-[50%] max-w-80 min-w-50 h-full bg-white shadow-lg z-50 transition-transform duration-300 ${className || ''}
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ButtonIcon
          icon={<FaRegCircleXmark className="h-5 w-5"/>}
          className="p-4 text-black"
          onClick={() => setOpen(false)}
        />
        
        <NavOptions
          navOptions={navOptions}
          className="flex flex-col gap-4 mt-4 px-4 text-black"
          classNav="w-full justify-start px-2 py-2 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0px_2px_0px_#000]"
        />
      </aside>

      {open && (
        <div
          className={`fixed inset-0 bg-[#00000080] z-40 ${className || ''}`}
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default NavAside;
