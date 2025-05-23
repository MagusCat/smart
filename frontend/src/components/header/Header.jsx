import Navbar from "./Navbar.jsx";
import Logo from "./Logo.jsx";
import Avatar from "./Avatar.jsx";

function Header() {

  const options = [
    {
      name: 'none'
    }
  ]

  return (
    <header className="flex items-center justify-between py-2 px-5 md:px-10 lg:px-20 pb-10 w-auto h-auto">
      <Logo/>

      <div className="flex gap-5 lg:gap-10">
        <Navbar options={options}/>
        <Avatar src="https://avatars.githubusercontent.com/u/177873716?v=4" />
      </div>

    </header>
  );
}

export default Header;
