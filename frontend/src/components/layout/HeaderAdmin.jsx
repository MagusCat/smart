// frontend/src/components/layout/HeaderAdmin.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom"; 

// Componentes locales
import NavBarAdmin from "./nav/NavBarAdmin.jsx"; // NavBar para opciones de Admin
import NavAside from "./nav/NavAside.jsx"; // NavAside para el menú lateral

// Componentes de UI
import Logo from "../ui/Logo.jsx";
import Avatar from "../ui/Avatar.jsx";
import ButtonIcon from "../ui/ButtonIcon.jsx"; // Asegúrate de que esta importación exista

// Íconos
import {
  FaUser,
  FaClipboardList,
  FaUsers,
  FaFolder,
  FaAngleLeft, // Para el botón de NavAside
  // Si en el Figma de admin hay íconos diferentes para Dashboard/Comparación/Consultas/AcercaDe,
  // asegúrate de importarlos aquí o donde se definan las opciones.
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

  return (
    // ¡Aplica las mismas clases al <header> principal como en tu Header.jsx!
    // Si tu Header.jsx tiene 'mt-8', mantenlo aquí también para la consistencia.
    <header className="flex items-center justify-between py-2 pb-10 w-auto h-auto z-50 mt-4"> 
      <Logo vertical={false} size="10" />

      {/* Aplica las mismas clases a la sección de navegación como en tu Header.jsx! */}
      <section className="flex gap-5 lg:gap-10">
        {/* NavBarAdmin usará el mismo NavBar general, pero con opciones de admin */}
        {/* Asegúrate que NavBarAdmin.jsx pase las clases correctas a NavOptions para el estilo de los botones */}
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
            { label: "Dashboard", to: "/" }, // Para que el Dashboard funcione correctamente
            { label: "Perfil", onClick: () => alert("Perfil") },
            { label: "Cerrar sesión", onClick: () => alert("Logout") },
          ]}
        />
      </section>
    </header>
  );
}

export default HeaderAdmin;