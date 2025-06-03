// frontend/src/pages/Login.jsx (Mantén este tal cual la versión anterior)

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// Ya no necesitamos useNavigate aquí para el login exitoso, App.jsx lo manejará
// import { useNavigate } from 'react-router-dom';
// Ya no necesitamos importar LoadingScreen aquí para el post-login, App.jsx lo manejará
// import LoadingScreen from '../components/ui/LoadingScreen';

// Recibe onLoginSuccess como prop
function Login({ onLoginSuccess }) { // <--- Asegúrate de recibir onLoginSuccess
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const navigate = useNavigate(); // Ya no se necesita aquí para la redirección post-login

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Por favor, ingresa tu usuario y contraseña.');
      return;
    }

    setIsLoading(true); // Activa el spinner del botón

    setTimeout(() => {
      if (email === 'admin' && password === 'smartdrive') {
        setIsLoading(false); // Desactiva el spinner del botón

        // Llamamos a la función pasada por App.jsx
        if (onLoginSuccess) {
          onLoginSuccess(); // <--- Aquí se activa la LoadingScreen y la navegación
        }
      } else {
        setErrorMessage('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
        setIsLoading(false);
      }
    }, 1500); // Simula el tiempo de respuesta del servidor
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#E3E5E4] font-sans">
      <section className="flex bg-white rounded-2xl overflow-hidden w-[1200px] max-w-[90vw] h-[700px] max-h-[700px]]">
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
          <div className="flex flex-col items-center space-y-8 w-full max-w-sm">
            <header className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-16 h-16 flex items-center justify-center rounded-md overflow-hidden">
                  <img
                    src="/img/logo.svg"
                    alt="SmartDrive Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h5 className="font-bold text-gray-800 text-3xl font-['ABlackLives']">
                  SMARTDRIVE
                </h5>
              </div>
              <span className="text-gray-600 text-sm font-semibold">ADMIN</span>
            </header>

            <form
              className="flex flex-col space-y-6 w-full"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Usuario"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(52,228,175,0.18)] focus:border-transparent transition-all duration-200 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative w-full">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgba(52,228,175,0.18)] focus:border-transparent transition-all duration-200 text-black pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {errorMessage && (
                <div className="text-red-600 text-sm bg-red-100 border border-red-400 p-2 rounded-md">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                className={`
                  w-full
                  h-12
                  rounded-xl
                  font-semibold
                  text-lg
                  text-white
                  flex items-center justify-center gap-4
                  transition-all duration-100 ease-out

                  /* Colores y sombras base */
                  bg-[#2D435D]
                  border-2 border-[#1e2a3c]
                  shadow-[0_8px_0_#1e2a3c] /* Sombra 3D inicial (grosor) */

                  /* Efecto Hover */
                  hover:brightness-110
                  hover:drop-shadow-[0_10px_15px_rgba(45,67,93,0.4)]

                  /* Efecto Active (cuando se hace clic) */
                  active:translate-y-2
                  active:shadow-inner active:shadow-md /* CLAVE: Sombra interior con un tamaño visible */
                  active:brightness-100
                  active:drop-shadow-none /* Quita la sombra externa al presionar */

                  /* Estado de carga */
                  ${isLoading
                    ? 'cursor-not-allowed bg-gray-500 border-gray-600 shadow-none translate-y-2 drop-shadow-none'
                    : ''
                  }
                `}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Iniciar Sesión</span>
                )}
              </button>
            </form>
          </div>
        </section>
      </section>
      {/* Ya NO renderizamos LoadingScreen aquí */}
    </main>
  );
}

export default Login;