import Navbar from "./Navbar.jsx";
import Logo from "./Logo.jsx";
import Opttion from "./Option.jsx";
import Avatar from "./Avatar.jsx";

function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-2 pb-10 w-auto h-auto">
      <Logo version="chamba" />

      <div className="flex gap-10">
        <Navbar>
          <Opttion />
          <Opttion />
          <Opttion />
          <Opttion />
        </Navbar>

        <Avatar src="https://avatars.githubusercontent.com/u/177873716?v=4" />
      </div>
    </header>
  );
}

export default Header;
