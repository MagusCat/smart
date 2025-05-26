import NavBar from "./nav/NavBar.jsx";
import NavAside from "./nav/NavAside.jsx";

import Logo from "../ui/Logo.jsx";
import Avatar from "../ui/Avatar.jsx";
import { FaBarsStaggered, FaTable, FaDatabase, FaBolt, FaAngleLeft } from "react-icons/fa6";

import { useState } from "react";
import ButtonIcon  from "../ui/ButtonIcon.jsx";

function Header() {
  const [open, setOpen] = useState(false);

  const options = [
    {
      name: "Dashboard",
      icon: <FaBarsStaggered />,
    },
    {
      name: "Compración",
      icon: <FaTable />,
    },
    {
      name: "Consultas",
      icon: <FaDatabase />,
    },
    {
      name: "Acerca de",
      icon: <FaBolt />,
    }
  ];

  return (
    <header className="flex items-center justify-between py-2 pb-10 w-auto h-auto">
      <Logo vertical={false} size="10" />

      <section className="flex gap-5 lg:gap-10">
        <NavBar navOptions={options} className="hidden md:flex" />
        <ButtonIcon
          icon={
            <FaAngleLeft
              className={`transition-transform ${
                open ? "rotate-180" : "rotate-0"
              } 10rem`}
            />
          }
          className="md:hidden p-2 text-black"
          onClick={() => setOpen(!open)}
        />
        <NavAside navOptions={options} open={open} setOpen={setOpen} />
        <Avatar src="https://avatars.githubusercontent.com/u/177873716?v=4" />
      </section>
    </header>
  );
}

export default Header;
