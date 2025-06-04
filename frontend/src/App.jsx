import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import MainContent from "./components/layout/MainContent";

<<<<<<< HEAD
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












import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router";

import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import Layout from "./components/layout/Layout.jsx";
import MainContent from "./components/layout/MainContent.jsx";
import HeaderAdmin from "./components/layout/HeaderAdmin.jsx";
import LoadingScreen from "./components/ui/LoadingScreen.jsx";

const AboutUs = lazy(() => import("./pages/AboutUs.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Compare = lazy(() => import("./pages/Compare.jsx"));
const Query = lazy(() => import("./pages/Query.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));

import UserList from "./pages/Admin/CRUD/UserList.jsx";
import TipoPropietarioList from "./pages/Admin/CRUD/TipoPropietarioList.jsx";
import UsoList from "./pages/Admin/CRUD/UsoList.jsx";
import CategoriaList from "./pages/Admin/CRUD/CategoriaList.jsx";
import MarcaList from "./pages/Admin/CRUD/MarcaList.jsx";
import PropietarioList from "./pages/Admin/CRUD/PropietarioList.jsx";
import RegistroList from "./pages/Admin/CRUD/RegistroList.jsx";
import ServicioList from "./pages/Admin/CRUD/ServicioList.jsx";
import TipoVehiculoList from "./pages/Admin/CRUD/TipoVehiculoList.jsx";
=======
import LoadingScreen from "./components/layout/LoadingScreen";
>>>>>>> 1f71e124c8d635ad1e4b6696ccd508bd30dd9b5e

// Use React.lazy for route components
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Compare = lazy(() => import("./pages/Compare"));
const Query = lazy(() => import("./pages/Query"));
const Login = lazy(() => import("./pages/Login"));

function App() {
<<<<<<< HEAD
  const location = useLocation();
  const navigate = useNavigate();

  const [showInitialAppLoading, setShowInitialAppLoading] = useState(true);
  const [showLoginSuccessLoading, setShowLoginSuccessLoading] = useState(false);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    const hasShownInitialLoading = sessionStorage.getItem('hasShownInitialLoading');

    if (!hasShownInitialLoading) {
      setShowInitialAppLoading(true);
      const totalInitialLoadingTime = 1150;
      const timer = setTimeout(() => {
        setShowInitialAppLoading(false);
        sessionStorage.setItem('hasShownInitialLoading', 'true');
      }, totalInitialLoadingTime);

      return () => clearTimeout(timer);
    } else {
      setShowInitialAppLoading(false);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (showLoginSuccessLoading && !isLoginPage) {
      timer = setTimeout(() => {
        setShowLoginSuccessLoading(false);
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [showLoginSuccessLoading, isLoginPage]);


  const handleLoginSuccess = () => {
    setShowLoginSuccessLoading(true);
    navigate('/');
  };

  if (showInitialAppLoading) {
    return <LoadingScreen />;
  }

=======
>>>>>>> 1f71e124c8d635ad1e4b6696ccd508bd30dd9b5e
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1/5 bg-(--bg-secundary) -z-10"></div>

<<<<<<< HEAD
      {isLoginPage ? (
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          </Routes>
        </Suspense>
      ) : (
        <Layout>
          {isAdminRoute ? <HeaderAdmin /> : <Header />}

          <MainContent> 
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/query" element={<Query />} />
                <Route path="/about-us" element={<AboutUs />} />

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
            </Suspense>
          </MainContent>
        </Layout>
      )}
      <Footer />

      {showLoginSuccessLoading && <LoadingScreen />}
=======
      <Layout>
        <Header />
        <MainContent>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/query" element={<Query />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about-us" element={<AboutUs />} />
            </Routes>
          </Suspense>
        </MainContent>
      </Layout>
      <Footer />
>>>>>>> 1f71e124c8d635ad1e4b6696ccd508bd30dd9b5e
    </>
  );
}

export default App;