import React, { useState, useEffect, useRef } from "react";
import { useRef } from "react";
import { FaCat } from "react-icons/fa";

const BaseForm = ({
  title,
  children,
  onAccept,
  onCancel,
  isVisible,
  extra,
}) => {
  const formRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setAnimate(true);
      const timer = setTimeout(() => {}, 0);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [isVisible]);
  message = "",
  stateOperation = "",
}) => {
  const formRef = useRef(null);

  const handleOverlayClick = (event) => {
    if (
      formRef.current &&
      !formRef.current.contains(event.target) &&
      onCancel
    ) {
      onCancel();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#0000003a] z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        ref={formRef}
        className={`bg-white rounded-lg shadow-xl p-8 transition-all duration-300 ${
          animate && isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        style={{ minWidth: "300px" }}
      >
        <h2 className="text-xl font-semibold mb-4 text-center text-black">
        className={`bg-white flex flex-col border-2 border-gray-400 rounded-lg shadow-xl p-5 transition-all duration-300  min-w-lg min-h-md ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <h2 className="text-xl font-semibold text-center text-black mb-3">
          {title}
        </h2>

        {children}

        {extra && <div className="mt-4">{extra}</div>}

        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-[#326689] text-white font-semibold py-3 rounded-md shadow-md transition-colors duration-200 hover:bg-[#285471]"
            style={{ width: "150px", height: "50px" }}
            onClick={onAccept}
        {stateOperation === "loading" && (
          <div className="mt-4">
            {
              <div className="flex justify-center items-center">
                <FaCat className="animate-spin text-2xl text-gray-500" />
                <span className="ml-2 text-gray-500">Cargando...</span>
              </div>
            }
          </div>
        )}

        {message && (
          <div className="mt-4 text-center text-red-500">
            {message.split("|").map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        )}

        <div className="flex text-sx justify-between items-center mt-6 gap-4">
          <button
            className="disabled:bg-gray-200 w-30 bg-[#326689] text-white font-semibold py-3 rounded-md shadow-md transition-colors duration-200 hover:bg-[#285471]"
            onClick={onAccept}
            disabled={stateOperation === "loading"}
          >
            Aceptar
          </button>
          <button
            className="bg-[#FF746C] text-white font-semibold py-3 rounded-md shadow-md transition-colors duration-200 hover:bg-[#e05d56]"
            style={{ width: "150px", height: "50px" }}
            onClick={onCancel}
            className="disabled:bg-gray-200 w-30 bg-[#FF746C] text-white font-semibold py-3 rounded-md shadow-md transition-colors duration-200 hover:bg-[#e05d56]"
            onClick={onCancel}
            disabled={stateOperation === "loading"}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseForm;