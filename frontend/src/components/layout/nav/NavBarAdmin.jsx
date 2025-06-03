import NavOptions from "./NavOptions.jsx"

function NavBar({ navOptions = [], className }) {
  return (
    <nav className={`flex w-full items-center justify-end text-[--font-black] text-xs font-normal ${className || ''}`}>
      <NavOptions
        navOptions={navOptions}
        icons
        className="flex flex-row items-center gap-2 md:gap-2 lg:gap-6 text-black w-auto" 
        classItem="flex min-w-19 h-10"
        classNav="shadow-[0px_2px_3px_#00000080] rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 border-white border-2 hover:border-black"
      />
    </nav>
  );
}

export default NavBar;