import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Layout from "./components/layout/Layout";
import MainContent from "./components/layout/MainContent";
import Dashboard from "./pages/Dashboard";
import ChartSection from "./pages/Compare";
import Login from "./pages/Login"

function App() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1/5 bg-(--bg-secundary) -z-10"></div>

      <Layout>
        <Header />
        <MainContent children={<ChartSection></ChartSection>}/>
      </Layout>
      <Footer />
    </>
  );
}

export default App;
