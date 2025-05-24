// frontend/src/components/login/Login.jsx

import React from 'react';

export const Login = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-[#E3E5E4] font-sans">
      <section className="flex bg-white rounded-2xl overflow-hidden w-[1200px] max-w-[90vw] h-[700px] max-h-[700px] drop-shadow-[0_0px_20px_rgba(52,228,175,1)]">

        <aside className="flex flex-[2] items-center justify-center p-8 text-white text-center bg-[rgba(52,228,175,0.18)]">
          <div className="flex flex-col items-center space-y-5">
            <img
              className="block w-full h-auto object-contain mb-8"
              src="/img/suv-car-concept-illustration-1.png"
              alt="SUV Car Concept"
              loading="lazy"
            />
            <h6 className="text-xl font-medium text-[#387D5F]">
              Somos una solución inteligente
            </h6>
          </div>
        </aside>

        <section className="flex flex-1 flex-col p-10 items-center justify-center">
          <div className="flex flex-col items-center space-y-8">
            <header className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-16 h-16 flex items-center justify-center rounded-md overflow-hidden">
                  <img src="/img/logo.svg" alt="SmartDrive Logo" className="w-full h-full object-contain" />
                </div>
                <h5 className="font-bold text-gray-800 text-3xl font-['ABlackLives']">
                  SMARTDRIVE
                </h5>
              </div>
              <span className="text-gray-600 text-sm font-semibold">
                ADMIN
              </span>
            </header>

            <form className="flex flex-col space-y-6 w-full" noValidate autoComplete="off">
              <input
                type="email"
                placeholder="Usuario"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(52,228,175,0.18)] focus:border-transparent transition-all duration-200 text-black"
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(52,228,175,0.18)] focus:border-transparent transition-all duration-200 text-black"
              />
              <button
                type="submit"
                className="w-full bg-[#2D435D] text-white py-3 rounded-md hover:bg-opacity-90 transition-colors duration-200 mt-5 font-semibold text-lg"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
};