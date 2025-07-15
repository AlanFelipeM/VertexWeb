// Importa o React e os hooks necessários para animação.
import React, { useState, useEffect, useRef } from 'react';

// Define o componente da seção de Sites Responsivos.
const ResponsiveSitesSection: React.FC = () => {
    // Referência ao elemento da seção para o IntersectionObserver.
    const sectionRef = useRef<HTMLElement>(null);
    // Estado para controlar a visibilidade da seção e disparar a animação.
    const [isVisible, setIsVisible] = useState(false);

    // useEffect para configurar o IntersectionObserver e observar a seção.
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Quando a seção entra na viewport, marca como visível e para de observar.
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 } // Animação dispara quando 10% da seção está visível.
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        // Função de limpeza para remover o observer.
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    // Função auxiliar para aplicar classes de transição com base na visibilidade e no delay.
    const getTransitionClasses = (delay: string) =>
        `transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${delay}`;

    return (
        // Elemento da seção com a referência para a animação.
        <section id="responsive" ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center bg-brand-light dark:bg-brand-dark overflow-hidden">
            <div className="container mx-auto px-6 py-20 lg:py-0 text-center">
                {/* Imagem no topo */}
                <div className={`flex justify-center items-center mb-12 lg:mb-16 ${getTransitionClasses('delay-100')}`}>
                    <img
                        src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                        alt="Equipe de desenvolvimento colaborando em um projeto de site responsivo"
                        className="w-full max-w-4xl drop-shadow-2xl rounded-lg"
                    />
                </div>

                {/* Conteúdo de texto abaixo da imagem */}
                <div className={`max-w-3xl mx-auto ${getTransitionClasses('delay-200')}`}>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-snug">
                        O que são <span className="text-brand-light-purple">Sites Responsivos</span>?<br />Como funcionam?
                    </h2>
                    <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed text-left md:text-center">
                        <p>
                            Um site responsivo é aquele que se adapta automaticamente ao tamanho da tela do dispositivo em que está sendo visualizado, seja um computador, tablet ou smartphone. O layout, as imagens e os elementos se reajustam para oferecer a melhor experiência de visualização e navegação.
                        </p>
                        <p>
                            Isso é alcançado através de uma combinação de grids flexíveis, imagens adaptáveis e o uso de Media Queries em CSS. Em vez de criar versões separadas do site para cada dispositivo, o design responsivo permite que um único site atenda a todos os públicos de forma eficaz.
                        </p>
                        <p>
                            O objetivo é garantir que o usuário tenha uma interação fácil e agradável, sem a necessidade de redimensionar a tela ou aplicar zoom. É um pilar fundamental do web design moderno, essencial para alcançar e engajar o público em qualquer plataforma.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResponsiveSitesSection;