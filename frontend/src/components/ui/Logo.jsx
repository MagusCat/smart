import logo from '/img/logo.svg';

function Logo({vertical = false, size = '10', version = ''}) {
  return (
    <header className={`flex items-center gap-2 ${ vertical && 'flex-col'}`}>
      <img src={logo} alt='Logo' className={`h-${size} w-${size} object-contain aspect-square`} />
      <div className='flex flex-col text-center text-sm items-center'>
        <span className={`font-[aBlackLives] text-${vertical ? 'xl' : 'md' } text-(--font-blue)`}>
          SMART DRIVE
        </span>

        {version && (
          <>
            <span className={ vertical ? 'hidden' : 'h-[0.5px] w-[80%] bg-black'}></span>
            <span className='text-(--font-blue)'>{version}</span>
          </>
        )}
      </div>
    </header>
  );
}

export default Logo;
