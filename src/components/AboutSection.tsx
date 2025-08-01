// Importa o React, hooks e os componentes de ícones necessários.
import React, { useState, useEffect, useRef } from 'react';
import { ClockIcon, AwardIcon, TargetIcon } from './IconComponents';

// Define o sub-componente para os cards de características (Entrega, Foco, Qualidade).
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="text-center">
        {/* Ícone estilizado dentro de um círculo com gradiente */}
        <div className="flex items-center justify-center w-16 h-16 mb-4 mx-auto rounded-full bg-gradient-to-br from-custom-blue-1 to-custom-purple-1">
            {icon}
        </div>
        {/* Título e descrição do card */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm max-w-xs mx-auto">{description}</p>
    </div>
);

// Define o componente principal da seção "Sobre".
const AboutSection: React.FC = () => {
    // Cria uma referência para o elemento da seção.
    const sectionRef = useRef<HTMLElement>(null);
    // Estado para controlar a visibilidade da seção para disparar a animação.
    const [isVisible, setIsVisible] = useState(false);

    // useEffect para configurar o IntersectionObserver.
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Se a seção entrar na viewport, marca como visível e para de observar.
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 } // Dispara quando 10% da seção está visível.
        );

        const currentRef = sectionRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        // Função de limpeza para remover o observer quando o componente é desmontado.
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    // Função auxiliar para gerar classes de transição com base na visibilidade e delay.
    const getTransitionClasses = (delay: string) => 
      `transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${delay}`;

    return (
        // Elemento principal da seção com a referência anexada.
        <section id="about" ref={sectionRef} className="min-h-screen flex items-center bg-brand-light-2 dark:bg-brand-dark-2 overflow-hidden">
            <div className="container mx-auto px-6 py-20 mb-12 mt-12 lg:py-0">
                {/* Parte Superior: Texto e Imagem */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-5 lg:mb-5">
                    {/* Lado esquerdo: Textos */}
                    <div className={getTransitionClasses('delay-100')}>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-snug">
                            A <span className="text-brand-light-purple">Vertex Tech</span> é especializado<br />em Desenvolvimento de Sites
                        </h2>
                        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                            <p>
                                Na Vertex Tech, somos mais do que uma agência de desenvolvimento; somos arquitetos da sua presença digital. Nossa paixão é combinar design inovador com tecnologia de ponta para criar websites que não apenas impressionam visualmente, mas também geram resultados concretos.
                            </p>
                            <p>
                                Acreditamos que um ótimo site é a espinha dorsal de qualquer negócio moderno e a ferramenta mais poderosa para o crescimento.
                            </p>
                            <p>
                                Nossa equipe é formada por especialistas dedicados que mergulham em seu projeto para entender suas necessidades e objetivos. Do conceito à implementação, cada etapa é executada com precisão e criatividade, garantindo que sua marca se destaque em um mercado competitivo.
                            </p>
                             <p>
                                Trabalhamos em colaboração total com nossos clientes para transformar suas visões em realidade digital, construindo soluções que são ao mesmo tempo bonitas e funcionais.
                            </p>
                        </div>
                    </div>
                    {/* Lado direito: Imagem */}
                    <div className={`flex justify-center items-center ${getTransitionClasses('delay-200')}`}>
                        <img 
                            src="/src/img/img-tableteecel.png" 
                            alt="Equipe colaborando em um projeto de web design" 
                            className="w-full max-w-lg"
                        />
                    </div>
                </div>

                {/* Parte do Meio: Estatísticas */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20 lg:mb-24 ${getTransitionClasses('delay-300')}`}>
                    <div>
                        <p className="text-4xl lg:text-5xl font-bold text-custom-purple-1">3+</p>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Anos de Experiência</p>
                    </div>
                    <div>
                        <p className="text-4xl lg:text-5xl font-bold text-custom-purple-2">50+</p>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Projetos Entregues</p>
                    </div>
                     <div>
                        <p className="text-4xl lg:text-5xl font-bold text-custom-blue-1">100%</p>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Clientes Satisfeitos</p>
                    </div>
                     <div>
                        <p className="text-4xl lg:text-5xl font-bold text-custom-teal-2">10/10</p>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Suporte Técnico</p>
                    </div>
                </div>

                {/* Parte Inferior: Características */}
                <div className="grid md:grid-cols-3 gap-12 lg:gap-8">
                    <div className={getTransitionClasses('delay-400')}>
                        <FeatureCard 
                            icon={<ClockIcon className="w-8 h-8 text-white"/>} 
                            title="Entrega no prazo" 
                            description="Respeitamos seus prazos como se fossem nossos. Nosso processo otimizado garante entregas pontuais sem comprometer a qualidade."
                        />
                    </div>
                    <div className={getTransitionClasses('delay-500')}>
                        <FeatureCard 
                            icon={<TargetIcon className="w-8 h-8 text-white"/>} 
                            title="Foco no Cliente" 
                            description="Sua satisfação é nossa prioridade máxima. Oferecemos um atendimento personalizado e estamos sempre disponíveis para ouvir suas ideias."
                        />
                    </div>
                    <div className={getTransitionClasses('delay-600')}>
                       <FeatureCard 
                            icon={<AwardIcon className="w-8 h-8 text-white"/>} 
                            title="Qualidade" 
                            description="Nosso compromisso é com a excelência. Utilizamos as melhores práticas e tecnologias para entregar um produto final robusto e seguro."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;