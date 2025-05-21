import logo from "/img/logo.svg";

function Logo({ version }) {
  return (
    <aside className="flex items-center gap-2 text-red">
      <img src={logo} alt="Logo" className="h-14 w-14 aspect-square" />
      <div className="flex gap-2 text-center items-center">
        <span className="font-[aBlackLives] text-lg text-(--font-blue)">
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
