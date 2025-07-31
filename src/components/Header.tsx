// Importa o React e os hooks useState e useEffect, além dos ícones necessários.
import React, { useState, useEffect } from 'react';
import { MenuIcon, XIcon, SunIcon, MoonIcon } from './IconComponents';

// Define a estrutura de dados para os links de navegação.
const navLinks = [
  { name: 'Início', href: '#home' },
  { name: 'Serviços', href: '#services' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Sobre', href: '#about' },
  { name: 'Contato', href: '#contact' },
];

// Define a interface para as props do Header
interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

// Define o componente Header.
const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  // Estado para controlar a visibilidade do menu móvel (aberto/fechado).
  const [isOpen, setIsOpen] = useState(false);
  // Estado para controlar se a página foi rolada para baixo.
  const [isScrolled, setIsScrolled] = useState(false);

  // useEffect para adicionar um ouvinte de evento de rolagem na janela.
  useEffect(() => {
    // Função que será chamada quando o usuário rolar a página.
    const handleScroll = () => {
      // Define isScrolled como true se a posição de rolagem for maior que 10 pixels, senão false.
      setIsScrolled(window.scrollY > 10);
    };
    // Adiciona o ouvinte de evento.
    window.addEventListener('scroll', handleScroll);
    // Função de limpeza: remove o ouvinte quando o componente for desmontado para evitar vazamentos de memória.
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // O array vazio assegura que o efeito rode apenas uma vez (na montagem do componente).

  return (
    // Elemento header com posicionamento fixo e transições suaves.
    // A classe de fundo muda dinamicamente com base no estado 'isScrolled'.
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-light/70 dark:bg-brand-dark/70 backdrop-blur-lg shadow-lg dark:shadow-black/20' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo e nome da empresa */}
          <a href="#home" className="flex items-center space-x-2">
            <img src="src/img/Logo sem nome.png" alt="Logo Vertex Tech" className="w-8 h-8" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Vertex Tech</span>
          </a>

          {/* Navegação para telas grandes (desktop) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="relative group text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 font-medium py-2">
                {link.name}
                {/* Efeito de "cobrinha" (underline) que aparece no hover */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-light-blue to-brand-light-purple transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          
          <div className="hidden lg:flex items-center space-x-4">
             <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-brand-dark-3 transition-colors duration-300" aria-label="Toggle theme">
                {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
             </button>
             <a href="#contact" className="inline-block bg-custom-purple-1 text-white font-bold py-2 px-5 rounded-md hover:opacity-90 transition-opacity duration-300">
                Orçamento Gratis
             </a>
          </div>


          {/* Botão do menu hamburguer para telas pequenas (mobile) */}
          <div className="lg:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-800 dark:text-gray-300" aria-label="Toggle theme">
                {theme === 'dark' ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
             </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 dark:text-white focus:outline-none" aria-label="Open menu">
              {/* Mostra o ícone X se o menu estiver aberto, senão mostra o ícone de menu */}
              {isOpen ? <XIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Móvel (visível apenas quando 'isOpen' é true) */}
      <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} bg-brand-light/80 dark:bg-brand-dark/80 backdrop-blur-lg`}>
        <nav className="flex flex-col items-center space-y-4 pt-4 pb-6 border-t border-gray-200 dark:border-gray-800/50">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-800 dark:text-gray-300 hover:text-custom-purple-1 dark:hover:text-white transition-colors duration-300 font-medium text-lg">
              {link.name}
            </a>
          ))}
          {/* Botão de Orçamento para mobile */}
          <a href="#contact" onClick={() => setIsOpen(false)} className="bg-custom-purple-1 text-white font-bold py-3 px-8 rounded-md hover:opacity-90 transition-opacity duration-300 mt-4">
            Orçamento Gratis
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;