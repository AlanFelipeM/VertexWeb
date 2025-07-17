// Importa o React e os componentes de cada seção da página.
import React, { useState, useEffect } from 'react';
import Header from './src/components/Header';
import HeroSection from './src/components/HeroSection';
import AboutSection from './src/components/AboutSection';
import FaqSection from './src/components/FaqSection';
import CtaSection from './src/components/CtaSection';
import StepsSection from './src/components/StepsSection';
import CtaSection2 from './src/components/CtaSection2';
import ResponsiveSitesSection from './src/components/ResponsiveSitesSection';
import InvestmentSection from './src/components/InvestmentSection';
import ServicesSection from './src/components/ServicesSection';
import ProjectsSection from './src/components/ProjectsSection';
import TestimonialsSection from './src/components/TestimonialsSection';
import Footer from './src/components/Footer';
import LoadingScreen from './src/components/LoadingScreen';

// Define o componente principal 'App' como um Functional Component (FC) do React.
const App: React.FC = () => {
  // Estado para controlar a visibilidade da tela de carregamento.
  const [isLoading, setIsLoading] = useState(true);
  // Estado para o tema, 'dark' ou 'light'.
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // Efeito para aplicar a classe 'dark' no elemento <html> e ouvir mudanças no sistema.
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);

    // Opcional: ouvir mudanças no tema do sistema operacional.
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
       // Apenas muda se o usuário não tiver setado um tema manualmente.
      if (!('theme' in localStorage)) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Função para alternar o tema.
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    // Simula o tempo de carregamento do site para exibir a animação.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // A tela de carregamento será exibida por 2.5 segundos.

    // Limpa o timer quando o componente é desmontado para evitar vazamentos de memória.
    return () => clearTimeout(timer);
  }, []);

  return (
    // O React Fragment <> permite retornar múltiplos elementos.
    <>
      {/* A tela de carregamento é renderizada sobre a página e desaparece quando o carregamento termina. */}
      <LoadingScreen isFinished={!isLoading} />
      {/* Container principal da aplicação com estilos de fundo, cor de texto e fonte. */}
      {/* A opacidade é controlada pelo estado de carregamento para criar um efeito de fade-in. */}
      <div className={`
        bg-brand-light dark:bg-brand-dark 
        text-gray-800 dark:text-gray-300 
        font-sans leading-relaxed transition-opacity duration-500 
        ${isLoading ? 'opacity-0' : 'opacity-100'}`
      }>
        {/* Renderiza o cabeçalho da página */}
        <Header theme={theme} toggleTheme={toggleTheme} />
        {/* Tag 'main' para o conteúdo principal */}
        <main>
          {/* Renderiza a seção inicial (Hero) */}
          <HeroSection />
          {/* Renderiza a seção "Sobre Nós" */}
          <AboutSection />
          {/* Renderiza a nova seção de FAQ */}
          <FaqSection />
          {/* Renderiza a seção de Call to Action */}
          <CtaSection />
          {/* Renderiza a nova seção de Passos */}
          <StepsSection />
          {/* Renderiza a segunda seção de Call to Action */}
          <CtaSection2 />
          {/* Renderiza a nova seção de Sites Responsivos */}
          <ResponsiveSitesSection />
          {/* Renderiza a nova seção de Investimento */}
          <InvestmentSection />
          {/* Renderiza a seção de serviços */}
          <ServicesSection />
          {/* Renderiza a seção de projetos */}
          <ProjectsSection />
          {/* Renderiza a seção de depoimentos */}
          <TestimonialsSection />
        </main>
        {/* Renderiza o rodapé da página */}
        <Footer />
      </div>
    </>
  );
};

// Exporta o componente App para ser usado em outros arquivos (como o index.tsx).
export default App;