// import React, { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";

// import Footer from "./components/layout/Footer";
// import Header from "./components/layout/Header";
// import Layout from "./components/layout/Layout";
// import MainContent from "./components/layout/MainContent";

// import LoadingScreen from "./components/ui/LoadingScreen";

// import { AboutUs } from "./pages/AboutUs";
// import Dashboard from "./pages/Dashboard";
// import Compare from "./pages/Compare";
// import Query from "./pages/Query";
// import Login from "./pages/Login";

// function App() {
//   const [showLoadingScreen, setShowLoadingScreen] = useState(true);

//   useEffect(() => {
//     const appLoadTimer = setTimeout(() => {
//       setShowLoadingScreen(false);
//     }, 2000);

//     return () => clearTimeout(appLoadTimer);
//   }, []);

//   return (
//     <>
//       {showLoadingScreen && <LoadingScreen />}

//       {/* El resto de tu aplicación no se toca */}
//       <div className="fixed top-0 left-0 w-full h-1/5 bg-(--bg-secundary) -z-10"></div>

//       <Layout>
//         <Header />
//         <MainContent>
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/compare" element={<Compare />} />
//             <Route path="/query" element={<Query />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/about-us" element={<AboutUs />} />
//           </Routes>
//         </MainContent>
//       </Layout>
//       <Footer />
//     </>
//   );
// }

// export default App;












// frontend/src/App.jsx

import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

// ... (tus importaciones de layout y UI) ...
import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import Layout from "./components/layout/Layout.jsx";
import MainContent from "./components/layout/MainContent.jsx";
import HeaderAdmin from "./components/layout/HeaderAdmin.jsx";
import LoadingScreen from "./components/ui/LoadingScreen.jsx"; // Importa la LoadingScreen
// ... (tus importaciones de páginas generales) ...
import AboutUs from "./pages/AboutUs.jsx";
import Dashboard from "./pages/Dashboard.jsx"; // Dashboard general
import Compare from "./pages/Compare.jsx";
import Query from "./pages/Query.jsx";
import Login from "./pages/Login.jsx";
// ... (tus importaciones de componentes de lista CRUD) ...
import UserList from "./pages/Admin/CRUD/UserList.jsx";
import TipoPropietarioList from "./pages/Admin/CRUD/TipoPropietarioList.jsx";
import UsoList from "./pages/Admin/CRUD/UsoList.jsx";
import CategoriaList from "./pages/Admin/CRUD/CategoriaList.jsx";
import MarcaList from "./pages/Admin/CRUD/MarcaList.jsx";
import PropietarioList from "./pages/Admin/CRUD/PropietarioList.jsx";
import RegistroList from "./pages/Admin/CRUD/RegistroList.jsx";
import ServicioList from "./pages/Admin/CRUD/ServicioList.jsx";
import TipoVehiculoList from "./pages/Admin/CRUD/TipoVehiculoList.jsx";


function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Estados para las pantallas de carga
  const [showInitialAppLoading, setShowInitialAppLoading] = useState(false);
  const [showLoginSuccessLoading, setShowLoginSuccessLoading] = useState(false);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';

  // Lógica para mostrar la pantalla de carga solo la primera vez por sesión
  useEffect(() => {
    const hasShownInitialLoading = sessionStorage.getItem('hasShownInitialLoading');

    if (!hasShownInitialLoading) {
      setShowInitialAppLoading(true);
      const totalInitialLoadingTime = 1150; // Duración estimada de LoadingScreen
      const timer = setTimeout(() => {
        setShowInitialAppLoading(false);
        sessionStorage.setItem('hasShownInitialLoading', 'true');
      }, totalInitialLoadingTime);

      return () => clearTimeout(timer);
    }
  }, []);

  // NUEVA LÓGICA: Controlar la ocultación de la LoadingScreen después del login
  useEffect(() => {
    let timer;
    // Si la LoadingScreen de post-login está activa y la ruta NO es la de login
    // significa que ya navegamos al dashboard y es hora de ocultar la LoadingScreen
    if (showLoginSuccessLoading && !isLoginPage) {
      // Ajustamos el tiempo para que la LoadingScreen se desvanezca
      // Se recomienda un tiempo igual o ligeramente superior a la duración del fade-out de LoadingScreen (500ms)
      // para asegurar que el dashboard ya esté renderizado y visible.
      timer = setTimeout(() => {
        setShowLoginSuccessLoading(false);
      }, 500); // Duración de la transición de opacidad en LoadingScreen.jsx
    }
    return () => clearTimeout(timer);
  }, [showLoginSuccessLoading, isLoginPage]); // Se ejecuta cuando el estado de carga o la ruta cambian


  // Función que Login.jsx llamará para notificar el inicio de sesión exitoso
  const handleLoginSuccess = () => {
    setShowLoginSuccessLoading(true); // Activa la LoadingScreen para el login exitoso
    // IMPORTANTE: Navega INMEDIATAMENTE después de activar la LoadingScreen
    navigate('/');
  };

  // Renderiza LoadingScreen inicial si está activa
  if (showInitialAppLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1/5 bg-[var(--bg-secundary)] -z-10"></div>

      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      ) : (
        <Layout>
          {isAdminRoute ? <HeaderAdmin /> : <Header />}

          <MainContent>
            <Routes>
              {/* RUTAS PÚBLICAS/GENERALES */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/query" element={<Query />} />
              <Route path="/about-us" element={<AboutUs />} />

              {/* RUTAS DE ADMINISTRACIÓN */}
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<UserList />} />
              <Route path="/admin/tipo-propietario" element={<TipoPropietarioList />} />
              <Route path="/admin/usos" element={<UsoList />} />
              <Route path="/admin/categorias" element={<CategoriaList />} />
              <Route path="/admin/marcas" element={<MarcaList />} />
              <Route path="/admin/propietarios" element={<PropietarioList />} />
              <Route path="/admin/registros" element={<RegistroList />} />
              <Route path="/admin/servicios" element={<ServicioList />} />
              <Route path="/admin/tipo-vehiculo" element={<TipoVehiculoList />} />

              <Route path="/admin" element={<div><h1>Panel de Administración</h1><p>Selecciona una opción del menú.</p></div>} />
              <Route path="*" element={<div><h1>404 - Página no encontrada</h1><p>Lo sentimos, la página que buscas no existe.</p></div>} />
            </Routes>
          </MainContent>
        </Layout>
      )}
          <Footer />

      {/* Renderiza la LoadingScreen si showLoginSuccessLoading es true.
          Esta se superpondrá a todo el contenido de la aplicación. */}
      {showLoginSuccessLoading && <LoadingScreen />}
    </>
  );
}

export default App;