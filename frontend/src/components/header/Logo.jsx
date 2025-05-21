import logo from "/img/logo.svg";

function Logo() {
  return (
    <aside className="flex items-center gap-2 text-red">
      <img src={logo} alt="Logo" className="h-14 w-14 aspect-square" />
      <span className="font-[aBlackLives] text-lg text-(--font-blue)">
        SMART DRIVE
      </span>
    </aside>
  );
}

export default Logo;
