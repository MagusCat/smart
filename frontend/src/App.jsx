// frontend/src/App.jsx

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import MainContent from "./components/layout/MainContent";

import LoadingScreen from "./components/ui/LoadingScreen";

import { AboutUs } from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import Compare from "./pages/Compare";
import Query from "./pages/Query";
import Login from "./pages/Login";

function App() {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    const appLoadTimer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 12000);

    return () => clearTimeout(appLoadTimer);
  }, []);

  return (
    <>
      {showLoadingScreen && <LoadingScreen />}

      {/* El resto de tu aplicación no se toca */}
      <div className="fixed top-0 left-0 w-full h-1/5 bg-(--bg-secundary) -z-10"></div>

      <Layout>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/query" element={<Query />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </MainContent>
      </Layout>
      <Footer />
    </>
  );
}

export default App;