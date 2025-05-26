import NavOptions from "./NavOptions.jsx"

function NavBar({ navOptions = [], className }) {
  return (
    <nav className={`flex w-full items-center justify-end text-[--font-black] text-xs font-medium ${className || ''}`}>
      <NavOptions
        navOptions={navOptions}
        icons
        className="flex flex- flex-row items-center gap-2 md:gap-2 lg:gap-6 text-black w-auto"
        classItem="flex min-w-17 h-10"
        classNav="shadow-[0px_3px_6px_#00000080] rounded-xl transition-all duration-300 ease-in-out hover:-translate-y-0.5 border-white border-1 hover:border-black"
      />
    </nav>
  );
}

export default NavBar;