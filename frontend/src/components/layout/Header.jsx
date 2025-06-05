import NavBar from "./nav/NavBar.jsx";
import NavAside from "./nav/NavAside.jsx";
import Logo from "../ui/Logo.jsx";
import Avatar from "../ui/Avatar.jsx";
import {
  FaBarsStaggered,
  FaTable,
  FaDatabase,
  FaBolt,
  FaAngleLeft,
  FaUser,
  FaClipboardList,
  FaUsers,
  FaFolder,
} from "react-icons/fa6";

import { useState } from "react";
import ButtonIcon from "../ui/ButtonIcon.jsx";

const options = [
  {
    name: "Dashboard",
    icon: <FaBarsStaggered />,
    to: "/",
  },
  {
    name: "Comparación",
    icon: <FaTable />,
    to: "/compare",
  },
  {
    name: "Consultas",
    icon: <FaDatabase />,
    to: "/query",
  },
  {
    name: "Acerca de",
    icon: <FaBolt />,
    to: "/about-us",
  },
];

const adminOptions = [
  { name: "Propietarios", icon: <FaUser />, to: "/admin/propietarios" },
  { name: "Registros", icon: <FaClipboardList />, to: "/admin/registros" },
  { name: "Usuarios", icon: <FaUsers />, to: "/admin/users" },
  {
    name: "Catálogos",
    icon: <FaFolder />,
    subOptions: [
      { name: "Categorías", to: "/admin/categorias" },
      { name: "Marcas", to: "/admin/marcas" },
      { name: "Servicios", to: "/admin/servicios" },
      { name: "Tipo Propietario", to: "/admin/tipo-propietario" },
      { name: "Tipo Vehículo", to: "/admin/tipo-vehiculo" },
      { name: "Usos", to: "/admin/usos" },
    ],
  },
];

function Header({ isAdmin = false }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between py-2 pb-10 w-auto h-auto z-50">
      <Logo vertical={false} size="10" version="" />

      <section className="flex gap-5 lg:gap-10">
        <NavBar navOptions={adminOptions} className="hidden md:flex" />
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
        <NavAside navOptions={adminOptions} open={open} setOpen={setOpen} />
        <Avatar
          src="https://avatars.githubusercontent.com/u/177873716?v=4"
          menu={[
            { label: "Perfil", onClick: () => alert("Perfil") },
            { label: "Cerrar sesión", onClick: () => alert("Logout") },
          ]}
        />
      </section>
    </header>
  );
}

export default Header;
