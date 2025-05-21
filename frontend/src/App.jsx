import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx';
function App() {
  return (
    <>
     <div className="fixed top-0 left-0 w-full h-1/5 bg-(--bg-secundary) -z-10"></div>
      <Header>
          
      </Header>

      <main className='flex-grow'></main>

      <Footer/>
    </>
  );
}

export default App;
