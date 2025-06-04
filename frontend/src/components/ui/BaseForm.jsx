import React, { useState, useEffect, useRef } from "react";

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
          {title}
        </h2>

        {children}

        {extra && <div className="mt-4">{extra}</div>}

        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-[#326689] text-white font-semibold py-3 rounded-md shadow-md transition-colors duration-200 hover:bg-[#285471]"
            style={{ width: "150px", height: "50px" }}
            onClick={onAccept}
          >
            Aceptar
          </button>
          <button
            className="bg-[#FF746C] text-white font-semibold py-3 rounded-md shadow-md transition-colors duration-200 hover:bg-[#e05d56]"
            style={{ width: "150px", height: "50px" }}
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseForm;
