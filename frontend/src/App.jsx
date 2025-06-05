import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import { Routes, Route, useLocation, useNavigate } from "react-router"; 
import { Routes, Route, redirect } from "react-router";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import MainContent from "./components/layout/MainContent";
import useFetch from "@hooks/useFetch";
import LoadingScreen from "./components/layout/LoadingScreen";
import OhNo from "./pages/ohno"; 

// Use React.lazy for route components
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Compare = lazy(() => import("./pages/Compare"));
const Query = lazy(() => import("./pages/Query"));
const Login = lazy(() => import("./pages/Login"));
const Tabulated = lazy(() => import("./pages/Tabulated"));
const Propietario = lazy(() => import("./pages/admin/PropietarioList"));
const Registro = lazy(() => import("./pages/admin/RegistroList"));

function App() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    const appLoadTimer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 12000);

    return () => clearTimeout(appLoadTimer);
  }, []);

function App() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1/5 bg-(--bg-secundary) -z-10"></div>

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
                <Route path="/tabulated" element={<Tabulated />} />
                <Route path="/admin/propietarios" element={<Propietario />} />
                <Route path="/admin/registros" element={<Registro />} />


                <Route path="/*" element={redirect("ohno")} />
                <Route path="/ohno" element={<OhNo />} />
              </Routes>
          </Suspense>
        </MainContent>
      </Layout>
      <Footer />
    </>
  );
}

export default App;
