// Importa o React, hooks e o ícone de link externo.
import React, { useState, useEffect, useRef } from 'react';
import { ExternalLinkIcon } from './IconComponents';

// Define a interface de propriedades para o componente ProjectCard.
interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl: string;
}

// Define o sub-componente 'ProjectCard' que exibe um projeto individual.
// O card agora ocupa 100% da altura e largura do seu contêiner.
const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl }) => (
    <div 
        className="relative h-full w-full bg-cover bg-center overflow-hidden group"
        style={{ backgroundImage: `url(${imageUrl})` }}
    >
        {/* O conteúdo do card está dentro deste overlay */}
        <div className="absolute inset-0 bg-black/70 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <a href="#" className="inline-flex items-center gap-2 text-sm text-white font-semibold py-2 px-3 bg-white/10 backdrop-blur-sm rounded-md border border-white/20 hover:bg-white/20 transition-colors mb-3 w-fit">
                <ExternalLinkIcon className="w-4 h-4" />
                Ver Site
            </a>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mt-1 line-clamp-3">
                {description}
            </p>
        </div>
    </div>
);

// Define o componente principal da seção de Projetos.
const ProjectsSection: React.FC = () => {
    // Array de objetos contendo os dados de cada projeto.
    const projects = [
        {
            title: "E-commerce de Moda 'UrbanStyle'",
            description: "Loja virtual completa com design moderno, sistema de pagamento integrado e painel de gerenciamento de produtos.",
            imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
        },
        {
            title: "Site Institucional 'Innovatech'",
            description: "Portal corporativo para empresa de tecnologia, destacando seus serviços, cases de sucesso e cultura inovadora.",
            imageUrl: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1887&auto=format&fit=crop"
        },
        {
            title: "Plataforma de Cursos 'Learnify'",
            description: "Desenvolvimento de uma plataforma EAD com área de membros, upload de vídeos e emissão de certificados.",
            imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"
        },
        {
            title: "Landing Page 'Fintech Boost'",
            description: "Página de captura de leads de alta conversão para uma startup financeira, com design arrojado e foco em resultados.",
            imageUrl: "https://images.unsplash.com/photo-1556742059-e9c3b3a99211?q=80&w=2070&auto=format&fit=crop"
        },
        {
            title: "Blog de Gastronomia 'Sabor & Arte'",
            description: "Criação de um blog com foco em SEO, layout otimizado para leitura e painel de gerenciamento de receitas para o cliente.",
            imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17025?q=80&w=2070&auto=format&fit=crop"
        },
        {
            title: "Site para Clínica 'VitaHealth'",
            description: "Website para clínica médica com sistema de agendamento online, informações sobre especialistas e blog de saúde.",
            imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
        },
        {
            title: "Portfólio para Arquiteto 'Traço Fino'",
            description: "Site minimalista e elegante para exibir projetos de arquitetura, com galerias de imagens de alta resolução.",
            imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop"
        },
        {
            title: "Sistema de Reservas 'Hotel Paraíso'",
            description: "Implementação de um sistema de reservas online integrado ao site de um hotel boutique, com fotos e tours virtuais.",
            imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
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
            { threshold: 0.1 } // Dispara a animação quando a seção aparece.
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
    
    // Função auxiliar para aplicar classes de transição com base na visibilidade e delay.
    const getTransitionClass = (delay: string) =>
        `transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${delay}`;

    return (
        // A seção agora é um container flexível de tela cheia que organiza o título e a grade.
        <section id="projects" ref={sectionRef} className="min-h-screen flex flex-col bg-brand-light dark:bg-brand-dark overflow-hidden">
            {/* Container para o título e subtitulo */}
            <div className="text-center pt-24 pb-12 px-6">
                <div className={getTransitionClass('delay-100')}>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                        Nosso Portfólio
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                        Conheça a qualidade dos trabalhados já desenvolvidos pela Vertex Web
                    </p>
                </div>
            </div>

            {/* A grade agora ocupa o espaço restante da tela, mantendo o efeito imersivo. */}
            <div className={`flex-grow grid grid-cols-1 grid-rows-8 sm:grid-cols-2 sm:grid-rows-4 lg:grid-cols-4 lg:grid-rows-2 w-full gap-px bg-gray-300 dark:bg-gray-800/50 ${getTransitionClass('delay-200')}`}>
                {/* Mapeia o array de projetos para renderizar um ProjectCard para cada um */}
                {projects.map((project, index) => (
                    // O background de cada célula é definido aqui para que o gap (linha) seja visível.
                    <div key={index} className="bg-brand-light dark:bg-brand-dark-3 overflow-hidden">
                        <ProjectCard {...project} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectsSection;