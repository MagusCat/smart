import logo from "/img/logo.svg";

function Logo({ version }) {
  return (
    <aside className="flex items-center gap-2">
      <img src={logo} alt="Logo" className="h-10 w-10 aspect-square" />
      <div className="flex gap-2 text-center text-sm items-center">
        <span className="font-[aBlackLives] text-md text-(--font-blue)">
          SMART DRIVE
        </span>

        {version && (
          <>
            <span className="h-8 w-0.5 bg-black"></span>
            <span className="text-(--font-blue)">{version}</span>
          </>
        )}
      </div>
    </aside>
  );
}

export default Logo;
