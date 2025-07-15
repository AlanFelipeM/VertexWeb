// Importa o React, hooks e os componentes de ícones necessários.
import React, { useState, useEffect, useRef } from 'react';
import { CodeIcon, PaletteIcon, ShieldIcon } from './IconComponents';

// Define o componente principal da seção de Serviços.
const ServicesSection: React.FC = () => {
    // Array de objetos contendo os dados de cada serviço.
    const services = [
        {
            icon: <CodeIcon className="w-8 h-8"/>,
            title: "Desenvolvimento Web",
            description: "Criamos sites robustos e escaláveis com as tecnologias mais recentes, focados em performance e segurança.",
            features: ["Sites Institucionais", "Lojas Virtuais (E-commerce)", "Sistemas Web Customizados"]
        },
        {
            icon: <PaletteIcon className="w-8 h-8"/>,
            title: "Design UI/UX",
            description: "Desenhamos interfaces intuitivas e experiências de usuário memoráveis que engajam e convertem visitantes.",
            features: ["Prototipagem e Wireframing", "Design de Interface", "Testes de Usabilidade"]
        },
        {
            icon: <ShieldIcon className="w-8 h-8"/>,
            title: "Manutenção & Suporte",
            description: "Garantimos que seu site opere com máxima eficiência, oferecendo suporte técnico contínuo e atualizações.",
            features: ["Atualizações de Segurança", "Backups Regulares", "Suporte Técnico Ágil"]
        }
    ];

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
            { threshold: 0.1 }
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
    
    // Função auxiliar para aplicar classes de transição com delay.
    const getTransitionClasses = (baseClass: string, delay: string) => 
      `${baseClass} transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'} ${delay}`;

    return (
        // Elemento da seção com a referência para o observer.
        <section id="services" ref={sectionRef} className="min-h-screen flex items-center bg-brand-light dark:bg-brand-dark">
            <div className="container mx-auto px-6 py-20 lg:py-0">
                {/* Título da seção com animação */}
                <div className={getTransitionClasses('text-center mb-16', 'delay-100')}>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                        Confira outras especialidades da <span className="text-brand-light-purple">Vertex Web</span>
                    </h2>
                     <div className="w-48 h-1 bg-brand-light-purple mx-auto mt-4 rounded-full"></div>
                </div>
                {/* Grid para os cards de serviço */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {/* Mapeia o array de serviços para renderizar um ServiceCard para cada um */}
                    {services.map((service, index) => (
                        // Aplica uma animação com delay escalonado para cada card.
                        <div key={service.title} className={getTransitionClasses(`text-center`, `delay-[${(index + 2) * 150}ms]`)}>
                             <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 border border-brand-purple/20 dark:border-brand-purple/30 text-gray-800 dark:text-white">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs mx-auto text-sm leading-relaxed">{service.description}</p>
                            <ul className="space-y-2 text-left inline-block">
                                {service.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-center text-sm">
                                        <span className="text-brand-light-purple mr-3 text-lg">•</span>
                                        <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className={getTransitionClasses('text-center mt-20', 'delay-[800ms]')}>
                    <p className="text-xl lg:text-2xl text-gray-900 dark:text-white">
                        Mais que uma agência, um <span className="text-brand-light-purple font-semibold">parceiro de crescimento</span>.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;