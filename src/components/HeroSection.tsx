// Importa o React para criar componentes.

import React from 'react'


// Define o componente HeroSection.
const HeroSection: React.FC = () => {
  return (
    <section 
        id="home" 
        className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center overflow-hidden"
    >
       {/* Background Glows for depth */}
       <div className="absolute top-0 left-0 w-96 h-96 bg-brand-purple/20 dark:bg-brand-purple/5 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
       <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/20 dark:bg-brand-blue/5 rounded-full filter blur-3xl opacity-50 animate-pulse [animation-delay:2s]"></div>

        <div className="z-10 animate-fade-in-scale">
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 dark:text-white leading-tight mb-4">
                Somos Especializados em<br />Desenvolvimento de Sites
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Somos especializados no desenvolvimento de sites profissionais e utilizamos as<br className="hidden lg:block" /> mais modernas técnicas para web design existentes na internet.
            </p>
        </div>

        <div className="mt-12 z-10 w-full [animation-delay:0.5s]">
             <img 
                src="src/img/img-home.png"
                alt="Área de trabalho com múltiplos dispositivos exibindo um projeto de design de interface"
                className="w-1/2 mx-auto"
            />
        </div>
    </section>
  );
};

export default HeroSection;