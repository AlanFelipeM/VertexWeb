// Importa o React e os hooks necessários para animação.
import React, { useState, useEffect, useRef } from 'react';

// Define o componente da seção de Investimento em Sites Responsivos.
const InvestmentSection: React.FC = () => {
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
        <section id="investment" ref={sectionRef} className="min-h-screen flex items-center bg-brand-light-2 dark:bg-brand-dark-2 overflow-hidden">
            <div className="container mx-auto px-6 py-20 lg:py-0">
                {/* Grid de duas colunas para o layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Coluna de Texto (à esquerda) */}
                    <div className={getTransitionClasses('delay-100')}>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-snug">
                            Por que <span className="text-brand-light-purple">investir</span> em Sites<br/>Responsivos?
                        </h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                            <p>
                                Investir em um site responsivo melhora drasticamente a experiência do usuário. Clientes que acessam seu site pelo celular encontram um layout otimizado e fácil de navegar, o que aumenta o tempo de permanência e a satisfação.
                            </p>
                            <p>
                                O Google prioriza sites mobile-friendly em seus resultados de busca. Ter um design responsivo é um fator crucial de SEO, aumentando sua visibilidade online e atraindo mais tráfego orgânico qualificado.
                            </p>
                            <p>
                                Com o número de usuários de smartphones crescendo a cada dia, um site responsivo garante que sua empresa seja acessível para a maior fatia possível do mercado, evitando perder clientes para concorrentes.
                            </p>
                             <p>
                                Um site fácil de usar em qualquer dispositivo leva a taxas de conversão mais altas. A simplicidade do processo em um site responsivo transforma visitantes em clientes fiéis.
                            </p>
                        </div>
                    </div>

                    {/* Coluna da Imagem (à direita) */}
                    <div className={`flex justify-center items-center ${getTransitionClasses('delay-200')}`}>
                        <img
                            src="src/img/img-celular.png"
                            alt="Design responsivo exibido em um laptop e um tablet, demonstrando a importância do investimento em sites mobile-friendly"
                            
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InvestmentSection;