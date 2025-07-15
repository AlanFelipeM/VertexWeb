// Importa o React e os hooks necessários para animação.
import React, { useState, useEffect, useRef } from 'react';

// Define o componente da seção de FAQ/Informações.
const FaqSection: React.FC = () => {
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
        <section id="faq" ref={sectionRef} className="min-h-screen flex items-center bg-brand-light dark:bg-brand-dark overflow-hidden">
            <div className="container mx-auto px-6 py-20 lg:py-0">
                {/* Grid de duas colunas para o layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    {/* Coluna da Imagem (à esquerda) */}
                    <div className={`flex justify-center items-center ${getTransitionClasses('delay-200')}`}>
                        <img
                            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop"
                            alt="Laptop em uma mesa exibindo um site de negócios"
                            className="w-full max-w-xl drop-shadow-lg rounded-lg"
                        />
                    </div>

                    {/* Coluna de Texto (à direita) */}
                    <div className={getTransitionClasses('delay-100')}>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-snug">
                            Como saber quando minha empresa <span className="text-brand-light-purple">necessita</span> de um Desenvolvimento de Sites?
                        </h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                            <p>
                               Seu site atual parece ultrapassado ou não reflete mais a identidade visual da sua marca? Um design antigo pode afastar clientes e transmitir uma imagem de falta de profissionalismo.
                            </p>
                            <p>
                               Ele funciona bem em celulares e tablets? Com a maioria dos acessos vindo de dispositivos móveis, ter um site que não é responsivo significa perder uma grande oportunidade de negócio.
                            </p>
                            <p>
                                Você encontra dificuldades para atualizar conteúdos, como notícias, produtos ou serviços? Uma plataforma moderna deve oferecer autonomia e agilidade para que você mesmo gerencie suas informações.
                            </p>
                            <p>
                               Se você respondeu "sim" a alguma dessas perguntas, ou se simplesmente deseja adicionar novas funcionalidades como e-commerce ou agendamentos, está na hora de investir em um novo site.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;