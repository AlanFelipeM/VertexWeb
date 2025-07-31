// Importa o React, hooks e o ícone de citação.
import React, { useState, useEffect, useRef } from 'react';
import { QuoteIcon } from './IconComponents';

// Componente para renderizar uma única estrela
const Star: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const TestimonialCard: React.FC<{ testimonial: any }> = ({ testimonial }) => (
    <div className="bg-white dark:bg-brand-dark-3 p-8 rounded-2xl border border-gray-200 dark:border-gray-800/60 h-full flex flex-col justify-between shadow-lg">
        <div>
            <QuoteIcon className="w-10 h-10 text-custom-purple-1 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 italic mb-6">"{testimonial.quote}"</p>
        </div>
        <div className="flex items-center">
            <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
            <div className="flex-grow">
                <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{testimonial.role}</p>
            </div>
            <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} filled={i < testimonial.rating} />
                ))}
            </div>
        </div>
    </div>
);

// Define o componente principal da seção de Depoimentos.
const TestimonialsSection: React.FC = () => {
    // Array de objetos contendo os dados de cada depoimento.
    const testimonials = [
        {
            quote: "A equipe da Vertex Tech superou todas as nossas expectativas. O profissionalismo, a atenção aos detalhes e a entrega no prazo foram impecáveis. Nosso novo site elevou a presença digital da nossa advocacia.",
            name: "Jão Pedro Neves",
            role: "Advocacia Neves",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop"
        },
        {
            quote: "Trabalhar com a Vertex foi uma experiência incrível. Eles entenderam perfeitamente nossas necessidades e transformaram nossas ideias em um site moderno e funcional. A comunicação foi clara durante todo o processo.",
            name: "Joana Ferreira",
            role: "Construtora F.S",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
        },
        {
            quote: "O talento para o design e a expertise técnica da Vertex Tech são impressionantes. Eles entregaram um portfólio online que realmente captura a essência do nosso estúdio. Recomendo fortemente!",
            name: "Pedro Martins Ferrugem",
            role: "Studio D'Martins",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop"
        },
        {
            quote: "O impacto do novo site em nosso negócio foi imediato. O design é limpo, a navegação é intuitiva e nossas taxas de conversão aumentaram significativamente. Um trabalho de primeira linha!",
            name: "Mariana Costa",
            role: "CEO, Conecta Soluções",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
        },
        {
            quote: "Desde o briefing até o lançamento, a Vertex Tech demonstrou um comprometimento exemplar. Eles não apenas entregaram um site visualmente deslumbrante, mas também uma plataforma robusta e fácil de gerenciar.",
            name: "Lucas Almeida",
            role: "Diretor, Almeida & Filhos",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop"
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

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

    const getTransitionClasses = (baseClass: string, delay: string) => 
      `${baseClass} transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${delay}`;

    return (
        // Elemento da seção com a referência para o observer.
        <section id="testimonials" ref={sectionRef} className="min-h-screen flex items-center bg-brand-light-2 dark:bg-brand-dark-2">
            <div className="container mx-auto px-6 py-20 lg:py-0">
                {/* Título da seção com animação */}
                <div className={getTransitionClasses('text-center mb-16', 'delay-100')}>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                        O que nossos <span className="text-brand-light-purple">clientes</span> dizem
                    </h2>
                     <div className="w-24 h-1 bg-brand-light-purple mx-auto mt-4 rounded-full"></div>
                </div>

                {/* Container do Carousel */}
                <div className={`relative ${getTransitionClasses('', 'delay-200')}`}>
                    {/* Carousel para desktop (mostra 3 cards) */}
                    <div className="hidden lg:block overflow-hidden">
                        <div 
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${activeIndex * (100 / testimonials.length)}%)` }}
                        >
                            {/* Duplicar os slides para um loop infinito contínuo */}
                             {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                                <div key={index} className="w-full lg:w-1/3 flex-shrink-0 px-4" style={{flexBasis: `${100 / 3}%`}}>
                                    <TestimonialCard testimonial={testimonial} />
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Carousel para telas pequenas (móvel) */}
                    <div className="lg:hidden relative h-[420px] sm:h-[380px]">
                        {testimonials.map((testimonial, index) => (
                           <div key={index} className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}>
                               <div className="h-full flex flex-col justify-between shadow-lg max-w-sm mx-auto">
                                   <TestimonialCard testimonial={testimonial} />
                               </div>
                           </div>
                        ))}
                    </div>

                    {/* Botões de Navegação */}
                    <button onClick={handlePrev} className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-12 text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors p-2 rounded-full focus:outline-none z-10" aria-label="Previous testimonial">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                         </svg>
                    </button>
                    <button onClick={handleNext} className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-12 text-gray-400 dark:text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors p-2 rounded-full focus:outline-none z-10" aria-label="Next testimonial">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                         </svg>
                    </button>
                </div>
                
                {/* Pontos de Paginação */}
                <div className="flex justify-center space-x-3 mt-12">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-8 h-1 rounded-full transition-colors duration-300 ${activeIndex === index ? 'bg-gray-800 dark:bg-white' : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-500'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;