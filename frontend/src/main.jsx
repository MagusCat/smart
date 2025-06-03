// frontend/src/main.jsx (¡LA VERSIÓN CORRECTA!)

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Esto es correcto aquí
import App from "./App.jsx"; // Asegúrate de que la ruta sea correcta
import { BrowserRouter } from "react-router-dom"; // <--- ¡Esta importación es CRUCIAL!

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> {/* <--- ¡Esta envoltura es CRUCIAL! */}
      <App />
    </BrowserRouter>
  </StrictMode>
);