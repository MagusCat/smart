import React from "react";

export const AboutUs = () => {
  return (
    <div className="min-h-screen  font-sans text-gray-800">
      <div className="fixed top-0 left-0 w-full h-1/5 bg-(--bg-secundary) -z-10"></div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="my-16 flex justify-center text-center md:text-left">
          <div className="max-w-3xl w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#387D5F] leading-tight">
              Convertimos grandes ideas <br /> en gran software
            </h2>
          </div>
        </section>

        <section className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8 my-16">
          <div className="w-full md:w-1/2 flex justify-center px-4">
            <img
              src="/img/open-source-concept-illustration-1.png"
              alt="Open Source Concept"
              className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
            />
          </div>
          <div
            className="w-full md:w-1/2 p-8 bg-[#6EFDBF] max-w-md"
            style={{
              boxShadow: `
                0px 30px 0px 0px rgba(110, 253, 191, 0.36),
                0px -30px 0px 0px rgba(110, 253, 191, 0.36),
                30px 0px 0px 0px rgba(110, 253, 191, 0.36),
                -30px 0px 0px 0px rgba(110, 253, 191, 0.36)
              `,
            }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-[#0A422A] mb-4">
              SmartDrive
            </h3>
            <p className="text-[#0A422A] leading-relaxed text-base sm:text-lg text-justify">
              Impulsando decisiones inteligentes para una ciudad más eficiente.
              SmartDrive es una herramienta de análisis y gestión de datos
              diseñada para apoyar el crecimiento del parque vehicular urbano.
              SmartDrive ayuda a tomadores de decisiones y planificadores
              urbanos a una movilidad vial de manera más informada y sostenible.
            </p>
          </div>
        </section>
        <section className="my-16 flex justify-center text-center md:text-left">
          <div className="max-w-3xl px-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0A422A] mb-6">
              Nuestra Razón de Ser
            </h3>
            <p className="text-[#0A422A] font-semibold leading-relaxed text-base sm:text-lg text-justify">
              Lo que hoy es una herramienta digital de análisis comenzó como una
              necesidad: comprender y mejorar la ciudad urbana. SmartDrive busca
              generar la información en manos de quienes la necesitan:
              planificadores urbanos, instituciones, empresas y ciudadanos.
            </p>
          </div>
        </section>
        <section className="flex flex-col md:flex-row items-stretch justify-center gap-8 my-16 px-4">
          <div className="w-full md:w-1/2 p-6 bg-[#2D435D] rounded-2xl text-[#2EC7B6] flex flex-col items-start max-w-md mx-auto md:mx-0">
            <div className="flex items-center mb-4">
              <img
                src="/img/objetivo-1.png"
                alt="Vision Icon"
                className="w-7 h-7 sm:w-8 sm:h-8 mr-2"
              />
              <h4 className="text-lg sm:text-xl font-semibold">Visión</h4>{" "}
            </div>
            <p className="text-[#2EC7B6] justify-center leading-relaxed text-sm sm:text-base text-justify">
              Ser la plataforma de referencia en análisis de tráfico vehicular
              urbano en Nicaragua, contribuyendo al diseño de ciudades
              inteligentes y optimizando la movilidad en las ciudades.
            </p>
          </div>
          <div className="w-full md:w-1/2 p-6 bg-[#2D435D] rounded-2xl text-[#2EC7B6] flex flex-col items-start max-w-md mx-auto md:mx-0">
            <div className="flex items-center mb-4">
              <img
                src="/img/progreso-de-la-flecha-del-ojo-1.png"
                alt="Mission Icon"
                className="w-7 h-7 sm:w-8 sm:h-8 mr-2"
              />
              <h4 className="text-lg sm:text-xl font-semibold">Misión</h4>{" "}
            </div>
            <p className="text-[#2EC7B6] leading-relaxed text-sm sm:text-base text-justify">
              Simplificar la toma de decisiones sobre la movilidad urbana
              mediante el uso de datos y tecnología, permitiendo a la ciudad
              adaptarse y crecer de manera informada y sostenible.
            </p>
          </div>
        </section>
        <section className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12 my-16 px-4">
          <div className="w-full md:w-1/2 flex justify-center order-2 md:order-1">
            <div className="text-center max-w-md md:max-w-md lg:max-w-lg md:ml-auto md:mr-0 text-center md:text-center">
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1CBDAB] leading-tight">
                Construido con{" "}
                <span className="text-[#2D435D]">
                  Datos.
                  <br />
                  Impulsado por
                </span>
                <span> Compromiso</span>
              </h3>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center order-1 md:order-2">
            <img
              src="/img/8821548_4018854-1.png"
              alt="Scrum Board"
              className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
            />
          </div>
        </section>
        <section className="flex flex-col items-center justify-center my-16 px-4">
          <div className="w-full flex justify-center mb-8">
            <img
              src="/img/13746484_5345077-1.png"
              alt="Meeting Present"
              className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto"
            />
          </div>
          <h3 className="text-xl sm:text-4xl font-bold text-[#0A422A] mb-4 text-center">
            CheeseCake Team
          </h3>
          <p className="text-[#0A422A] max-w-xl text-center leading-relaxed text-base sm:text-2xl">
            Nuestro equipo está conformado por conocedores en análisis,
            desarrollo web y ciencia de datos, con una visión común.
          </p>
        </section>
      </main>
    </div>
  );
};