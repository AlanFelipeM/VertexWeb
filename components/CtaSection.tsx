// Importa o React e os hooks necessários para animação.
import React, { useState, useEffect, useRef } from 'react';

// Define o componente da seção de Call-to-Action (CTA).
const CtaSection: React.FC = () => {
    // Referência ao elemento da seção para o IntersectionObserver.
    const sectionRef = useRef<HTMLDivElement>(null);
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
            { threshold: 0.2 } // Animação dispara quando 20% da seção está visível.
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

    return (
        // Container wrapper que aplica a imagem de fundo com efeito parallax.
        // 'bg-fixed' mantém a imagem fixa em relação à viewport, criando o efeito de parallax quando a página rola.
        <div
            className="bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop')" }}
        >
            {/* Container do conteúdo que ocupa a altura total da tela e centraliza o conteúdo. */}
            <div ref={sectionRef} className="bg-black/60 backdrop-blur-sm min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6 text-center">
                    {/* Conteúdo animado que aparece suavemente. */}
                    <div
                        className={`max-w-3xl mx-auto transition-all duration-1000 transform ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
                            Precisa de um site de qualidade com foco em resultados?
                        </h2>
                        <a
                            href="#contact"
                            className="inline-block bg-custom-purple-1 text-white font-bold py-4 px-10 rounded-lg text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-custom-purple-1/30"
                        >
                            Solicitar orçamento
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CtaSection;