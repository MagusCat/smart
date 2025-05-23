import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Card from "./components/dashboard/Card.jsx";
import Switcher from "./components/dashboard/Switcher.jsx";
import { useState } from "react";

function App() {
  const [time, setTime] = useState("years");

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1/5 bg-(--bg-secundary) -z-10"></div>
      <Header/>
      <main className="flex-grow px-5 md:px-10 lg:px-20">
        <div className="flex flex-col items-center sm:flex-row justify-between w-full gap-2 lg:gap-10">
          <Card>
            <p className="text-(--font-accent)">a</p>
          </Card>
          <Card></Card>
          <Card></Card>
        </div>

        <Switcher
          options={[
            {
              label: 'A1',
              id: 'years'
            },
                        {
              label: 'AA2',
              id: 'years2'
            },
                        {
              label: 'AAAaaa3',
              id: 'years3'
            }
          ]}
          selected={time}
          onSelect={setTime}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
