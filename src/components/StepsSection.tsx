// Importa o React e os hooks necessários para animação.
import React, { useState, useEffect, useRef } from 'react';

// Define o componente da seção de Passos do Desenvolvimento.
const StepsSection: React.FC = () => {
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
        <section id="steps" ref={sectionRef} className="min-h-screen flex items-center bg-brand-light-2 dark:bg-brand-dark-2 overflow-hidden">
            <div className="container mx-auto px-6 py-20 lg:py-0">
                {/* Grid de duas colunas para o layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Coluna de Texto (à esquerda) */}
                    <div className={getTransitionClasses('delay-100')}>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-8 leading-snug">
                            Quais os passos para o<br />
                            <span className="text-brand-light-purple">Desenvolvimento de Site?</span>
                        </h2>
                        <div className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                            <div>
                                <h3 className="font-bold text-gray-800 dark:text-white mb-1">Briefing e Design (UI/UX)</h3>
                                <p>
                                    A primeira etapa é uma imersão no seu negócio. Realizamos um briefing detalhado para entender suas metas e público. Com base nisso, criamos wireframes e um design visual que não só é atraente, mas também focado na usabilidade e experiência do usuário.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 dark:text-white mb-1">Desenvolvimento e Implementação</h3>
                                <p>
                                    Com o design aprovado, nossa equipe de desenvolvedores entra em ação. Codificamos o site utilizando as melhores práticas e tecnologias, garantindo que ele seja rápido, seguro e totalmente responsivo, funcionando perfeitamente em qualquer dispositivo.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 dark:text-white mb-1">Lançamento e Acompanhamento</h3>
                                <p>
                                    Antes do lançamento, realizamos uma bateria de testes para garantir que tudo esteja perfeito. Após a publicação, oferecemos suporte e acompanhamento para realizar otimizações e garantir que seu site continue gerando os melhores resultados.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Coluna da Imagem (à direita) */}
                    <div className={`flex justify-center items-center ${getTransitionClasses('delay-200')}`}>
                        <img
                            src="src/img/img-site.png"
                            alt="Laptop exibindo linhas de código em um ambiente de desenvolvimento"
                            className="w-3/4  "
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StepsSection;