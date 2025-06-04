import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Por favor, ingresa tu usuario y contraseña.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (email === "admin" && password === "smartdrive") {
        setIsLoading(false);

        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        setErrorMessage(
          "Usuario o contraseña incorrectos. Inténtalo de nuevo."
        );
        setIsLoading(false);
      }
    }, 1500);
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
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#13263D] focus:border-transparent transition-all duration-200 text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#13263D] focus:border-transparent transition-all duration-200 text-black pr-10"
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

                  bg-[#13263D]
                  border-2 border-[#1e2a3c]

                  /* Efecto Hover */
                  hover:brightness-110

                  /* Estado de carga */
                  ${
                    isLoading
                      ? "cursor-not-allowed bg-gray-500 border-gray-600 shadow-none translate-y-2 drop-shadow-none"
                      : ""
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
    </main>
  );
}

export default Login;
