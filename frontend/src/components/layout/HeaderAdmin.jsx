// frontend/src/components/HeaderAdmin.jsx (modificado)

import React, { useState } from "react";

import NavBarAdmin from "./nav/NavBarAdmin.jsx";
import NavAside from "./nav/NavAside.jsx";

import Logo from "../ui/Logo.jsx";
import Avatar from "../ui/Avatar.jsx";
import ButtonIcon from "../ui/ButtonIcon.jsx";
import {
  FaUser,
  FaClipboardList,
  FaUsers,
  FaFolder,
  FaAngleLeft,
} from "react-icons/fa6";

function HeaderAdmin() {
  const [open, setOpen] = useState(false);

  const adminOptions = [
    { name: "Propietarios", icon: <FaUser />, to: "/admin/propietarios" },
    { name: "Registros", icon: <FaClipboardList />, to: "/admin/registros" },
    { name: "Usuarios", icon: <FaUsers />, to: "/admin/users" },
    {
      name: "Catálogos",
      icon: <FaFolder />,
      // CAMBIO AQUÍ: RENOMBRAR 'subOptions' a 'subMenu'
      subMenu: [
        { name: "Categorías", to: "/admin/categorias" },
        { name: "Marcas", to: "/admin/marcas" },
        { name: "Servicios", to: "/admin/servicios" },
        { name: "Tipo Propietario", to: "/admin/tipo-propietario" },
        { name: "Tipo Vehículo", to: "/admin/tipo-vehiculo" },
        { name: "Usos", to: "/admin/usos" },
      ],
    },
  ];

  return (
    <header className="flex items-center justify-between pb-10 w-auto h-auto z-50 mt-4">
      <Logo vertical={false} size="10" />

      <section className="flex gap-15 lg:gap-10">

        <NavBarAdmin navOptions={adminOptions} className="hidden md:flex" />

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
            { label: "Dashboard", to: "/" },
            { label: "Perfil", onClick: () => alert("Perfil") },
            { label: "Cerrar sesión", to: "/login" },
          ]}
        />
      </section>
    </header>
  );
}

export default HeaderAdmin;