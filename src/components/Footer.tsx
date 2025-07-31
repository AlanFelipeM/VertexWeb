
// Importa o React, hooks e o componente de ícone.
import React, { useState, useEffect, useRef } from 'react';

// Define o componente Footer.
const Footer: React.FC = () => {
    // Lógica para animação de entrada com IntersectionObserver.
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 } // Dispara quando 10% do footer está visível.
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    // Função auxiliar para gerar classes de transição com base na visibilidade e delay.
    // Diferente das outras seções, esta usa apenas 'translate-y' para um efeito mais sutil.
    const getTransitionClasses = (delay: string) => 
        `transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${delay}`;

    return (
        // Elemento footer com a referência para o observer.
        <footer id="contact" ref={sectionRef} className="bg-brand-light-2 dark:bg-brand-dark-2 border-t border-gray-200 dark:border-gray-800/50">
            <div className="container mx-auto px-6 pt-16 pb-8">
                {/* Grid principal do footer com 4 colunas em telas grandes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Coluna 1: Marca e descrição (ocupa 2 colunas em telas médias) */}
                    <div className={`md:col-span-2 lg:col-span-1 ${getTransitionClasses('delay-100')}`}>
                        <a href="#home" className="flex items-center space-x-2 mb-4">
                            <img src="src/img/Logo sem nome.png" alt="Logo Vertex Tech" className="w-8 h-8" />
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">Vertex Tech</span>
                        </a>
                        <p className="text-gray-600 dark:text-gray-400">
                            Transformando ideias em soluções digitais inovadoras!
                        </p>
                    </div>
                    
                    {/* Coluna 2: Serviços */}
                    <div className={getTransitionClasses('delay-200')}>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Serviços</h4>
                        <ul className="space-y-3">
                            <li><a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-custom-purple-1 dark:hover:text-white transition-colors">Desenvolvimento Web</a></li>
                            <li><a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-custom-purple-1 dark:hover:text-white transition-colors">Design UI/UX</a></li>
                            <li><a href="#services" className="text-gray-600 dark:text-gray-400 hover:text-custom-purple-1 dark:hover:text-white transition-colors">Manutenção & Suporte</a></li>
                        </ul>
                    </div>

                    {/* Coluna 3: Contato */}
                    <div className={getTransitionClasses('delay-300')}>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Contato</h4>
                        <ul className="space-y-3">
                            <li><a href="mailto:vertextech@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-custom-purple-1 dark:hover:text-white transition-colors">vertextech@gmail.com</a></li>
                            <li><a href="tel:+5511999999999" className="text-gray-600 dark:text-gray-400 hover:text-custom-purple-1 dark:hover:text-white transition-colors">(11) 99999-9999</a></li>
                            <li className="text-gray-600 dark:text-gray-400">São Roque, SP - Brasil</li>
                        </ul>
                    </div>
                    
                    {/* Coluna 4: Links Rápidos */}
                    <div className={getTransitionClasses('delay-400')}>
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-4">Links Rápidos</h4>
                        <ul className="space-y-3">
                           <li><a href="#projects" className="text-gray-600 dark:text-gray-400 hover:text-custom-purple-1 dark:hover:text-white transition-colors">Projetos</a></li>
                           <li><a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-custom-purple-1 dark:hover:text-white transition-colors">Sobre Nós</a></li>
                           <li><a href="#testimonials" className="text-gray-600 dark:text-gray-400 hover:text-custom-purple-1 dark:hover:text-white transition-colors">Depoimentos</a></li>
                        </ul>
                    </div>
                </div>
                
                {/* Seção inferior do footer com direitos autorais e links de política */}
                <div className={`mt-12 pt-8 border-t border-gray-200 dark:border-gray-800/50 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left ${getTransitionClasses('delay-500')}`}>
                    <p className="text-gray-500 dark:text-gray-500 mb-4 sm:mb-0">
                        © {new Date().getFullYear()} Vertex Tech. Todos os direitos reservados
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-500 dark:text-gray-500 hover:text-custom-purple-1 dark:hover:text-white transition-colors">Política de Privacidade</a>
                        <a href="#" className="text-gray-500 dark:text-gray-500 hover:text-custom-purple-1 dark:hover:text-white transition-colors">Termos de Uso</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;