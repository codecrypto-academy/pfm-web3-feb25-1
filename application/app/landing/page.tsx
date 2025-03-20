"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Head>
        <title>EcoTrackChain - Blockchain para la Trazabilidad y Tokenización</title>
        <meta name="description" content="Transparencia Total en la Huella de Carbono para la Industria del automovil" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header 
        className={`fixed w-full z-10 transition-all duration-300 ${
          scrolled 
            ? "bg-white shadow-md py-2" 
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg 
              viewBox="0 0 24 24" 
              className="h-8 w-8 mr-2 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            <span className="text-2xl font-bold text-gray-800">EcoTrackChain</span>
          </div>
          <button className="bg-green-400 hover:bg-green-500 text-gray-900 font-medium py-2 px-8 rounded-full transition-colors duration-300">
            <a href="/">Launch App</a>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Blockchain para la Trazabilidad y Tokenización en la Industria del automovil
          </h1>
          <div className="text-xl md:text-2xl font-medium text-gray-600 max-w-4xl mx-auto">
           
            <p className="mb-3">
              EcoTrackChain permite a fabricantes, proveedores y clientes finales 
              <span className="font-bold text-green-600"> rastrear cada pieza de un vehículo y su impacto ambiental</span>. 
            </p>
            <p>
              Desde la producción de componentes hasta el ensamblaje final, nuestra plataforma registra y certifica en blockchain la 
              <span className="font-bold text-green-600"> huella de CO₂</span> generada en cada etapa.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
      Transparencia Total en la Huella de Carbono
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Feature 1 */}
      <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
        <div className="text-green-500 mb-4">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Trazabilidad Completa</h3>
        <p className="text-gray-600">
          Seguimiento detallado de cada componente desde su fabricación hasta el ensamblaje final del vehículo.
        </p>
        {/* Imagen asociada */}
        <img src="/fabrica1.jpg" alt="Fábrica 1" className="mt-4 w-full rounded-lg shadow-md" />
      </div>

      {/* Feature 2 */}
      <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
        <div className="text-green-500 mb-4">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Tokenización de Carbono</h3>
        <p className="text-gray-600">
          Convierte la reducción de emisiones en activos digitales verificables y comercializables.
        </p>
        {/* Imagen asociada */}
        <img src="/fabrica3.jpg" alt="Fábrica 3" className="mt-4 w-full rounded-lg shadow-md" />
      </div>

      {/* Feature 3 */}
      <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
        <div className="text-green-500 mb-4">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Medición Precisa</h3>
        <p className="text-gray-600">
          Cálculo exacto de la huella de carbono en cada etapa del proceso productivo.
        </p>
        {/* Imagen asociada */}
        <img src="/fabrica2.jpg" alt="Fábrica 2" className="mt-4 w-full rounded-lg shadow-md" />
      </div>
    </div>
  </div>
</section>

        {/* Blockchain-as-a-Service Section */}
<section className="py-20 bg-gray-100">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
        Blockchain-as-a-Service
      </h2>
      
      <div className="bg-white rounded-lg shadow-sm p-8 mb-10">
        <p className="text-lg text-gray-600 mb-6">
          Nuestra plataforma <span className="font-bold text-green-600">descentralizada y autónoma</span> permite a cualquier actor de la cadena acceder a la tecnología blockchain <span className="font-bold text-green-600">sin necesidad de conocimientos técnicos</span>. Empresas y fabricantes pueden integrar <span className="font-bold text-green-600">EcoTrackChain</span> en sus procesos para cumplir con normativas ambientales y optimizar la sostenibilidad de sus operaciones.
        </p>
      </div>
      
      <div className="bg-green-50 rounded-lg shadow-sm p-8">
        <div className="flex items-center mb-6">
          <div className="bg-green-100 p-2 rounded-full mr-4">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800">¿Qué puedes hacer?</h3>
        </div>
        
        <ul className="space-y-4">
          <li className="flex items-start">
            <div className="text-green-500 mr-4 mt-1">
              <span className="inline-block h-4 w-4 rounded-full bg-green-500"></span>
            </div>
            <span className="text-gray-700">Auditar en tiempo real la trazabilidad de productos y emisiones.</span>
          </li>
          
          <li className="flex items-start">
            <div className="text-green-500 mr-4 mt-1">
              <span className="inline-block h-4 w-4 rounded-full bg-green-500"></span>
            </div>
            <span className="text-gray-700">Cumplir con regulaciones medioambientales de forma automática.</span>
          </li>
          
          <li className="flex items-start">
            <div className="text-green-500 mr-4 mt-1">
              <span className="inline-block h-4 w-4 rounded-full bg-green-500"></span>
            </div>
            <span className="text-gray-700">Integrar nuevas oportunidades de negocio basadas en tokenización.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Cómo Funciona
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto">
                  <span className="text-green-600 text-2xl font-bold">1</span>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Registro de Componentes</h3>
                <p className="text-gray-600">
                  Cada pieza se registra en la blockchain con datos detallados sobre materiales, procesos de fabricación y huella de carbono asociada.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto">
                  <span className="text-green-600 text-2xl font-bold">2</span>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Seguimiento en Tiempo Real</h3>
                <p className="text-gray-600">
                  Monitoreo constante del impacto ambiental a lo largo de toda la cadena de suministro, identificando áreas de mejora.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto">
                  <span className="text-green-600 text-2xl font-bold">3</span>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Certificación y Tokenización</h3>
                <p className="text-gray-600">
                  Las reducciones de emisiones se verifican y convierten en tokens digitales respaldados por datos inmutables en la blockchain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
       
      <section 
  className="relative py-40 bg-cover bg-center"
  style={{ backgroundImage: "url('/mercado.jpg')" }}
>
  {/* Fallback en Tailwind en caso de que inline styles fallen */}
  <div className="absolute inset-0 bg-black bg-opacity-40 bg-[url('/mercado.jpg')] bg-cover bg-center"></div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-10 tracking-wide">
        Marketplace
      </h2>

      {/* Contenedor verde con transparencia aplicada correctamente */}
      <div
        className="p-8 rounded-lg backdrop-blur-sm shadow-lg"
        style={{ backgroundColor: "rgba(55, 96, 55, 0.6)" }}
      >
        <p className="text-xl md:text-2xl text-white font-medium mb-8">
          Equilibra las emisiones de tu empresa participando en proyectos de captura de CO₂
        </p>
        <p className="text-lg text-white mb-6">
          <span className="font-bold">Economía Circular:</span> Los proyectos de captura de carbono certificados obtienen 1 token por cada tonelada de carbono capturada que pueden vender a empresas que necesiten equilibrar sus emisiones.
        </p>

        {/* Botón "Ir al mercado" con el mismo estilo que "Launch App" */}
        <a
          href="#"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-md transition-all duration-300"
        >
          Ir al mercado
        </a>
      </div>
    </div>
  </div>
</section>


{/* Roadmap Section */}
<section className="py-24 bg-gray-800 text-white">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
      Roadmap
    </h2>
    
    <div className="max-w-5xl mx-auto">
      {/* Timeline container */}
      <div className="relative">
        {/* Línea vertical conectora */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-500"></div>
        
        {/* Fase 1 */}
        <div className="relative mb-20">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-500 h-12 w-12 rounded-full flex items-center justify-center z-10 shadow-lg">
              <span className="text-gray-800 font-bold text-lg">Q2</span>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-green-400 mb-2">2025</h3>
            <h4 className="text-xl font-semibold mb-4">App de trazabilidad y tokenización</h4>
            <p className="text-gray-300">
              Lanzamiento de la plataforma base que permite rastrear componentes y su huella de carbono asociada. 
              Implementación del sistema de tokenización para cuantificar y representar digitalmente las emisiones.
            </p>
          </div>
        </div>
        
        {/* Fase 2 */}
        <div className="relative mb-20">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-500 h-12 w-12 rounded-full flex items-center justify-center z-10 shadow-lg">
              <span className="text-gray-800 font-bold text-lg">Q4</span>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-green-400 mb-2">2025</h3>
            <h4 className="text-xl font-semibold mb-4">Integración de entidades de certificación</h4>
            <p className="text-gray-300">
              Incorporación de entidades certificadoras a la red blockchain. Desarrollo de una interfaz 
              especializada para facilitar el proceso de certificación de reducción de emisiones o 
              captura de CO₂.
            </p>
          </div>
        </div>
        
        {/* Fase 3 */}
        <div className="relative">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-500 h-12 w-12 rounded-full flex items-center justify-center z-10 shadow-lg">
              <span className="text-gray-800 font-bold text-lg">Q1</span>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-green-400 mb-2">2026</h3>
            <h4 className="text-xl font-semibold mb-4">Desarrollo del Marketplace</h4>
            <p className="text-gray-300">
              Lanzamiento del marketplace completo donde los tokens de carbono pueden ser 
              intercambiados. Implementación de sistemas de verificación y validación avanzados 
              para garantizar la integridad de las transacciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Únete a la Revolución de la Movilidad Sostenible
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Forma parte del cambio hacia una industria automotriz más transparente y responsable con el medio ambiente.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300">
            <a href="/">Launch App</a>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <svg 
                  viewBox="0 0 24 24" 
                  className="h-6 w-6 mr-2 text-green-400" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="text-xl font-bold">EcoTrackChain</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Transformando la industria automotriz mediante la trazabilidad blockchain y la tokenización de la huella de carbono.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-4">Producto</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Características</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Cómo funciona</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Precios</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Recursos</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Documentación</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Webinars</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Compañía</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Sobre nosotros</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Contacto</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Términos</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 EcoTrackChain. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}