import { Routes, Route } from "react-router";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import MainContent from "./components/layout/MainContent";
import Dashboard from "./pages/Dashboard";
import Compare from "./pages/Compare";
import Query from "./pages/Query";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1/5 bg-(--bg-secundary) -z-10"></div>

      <Layout>
        <Header />
        <MainContent>
          <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/query" element={<Query />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        </MainContent>
      </Layout>
      <Footer />
    </>
  );
}
//99 - 1999 / 01 -- 1901 / 2000 - 00 1900
// 
export default App;
