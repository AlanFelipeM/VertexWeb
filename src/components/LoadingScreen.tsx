
// Importa o React e o componente de ícone necessário.
import React from 'react';

// Define a interface para as propriedades do componente de tela de carregamento.
interface LoadingScreenProps {
    isFinished: boolean;
}

// Define o componente funcional LoadingScreen.
const LoadingScreen: React.FC<LoadingScreenProps> = ({ isFinished }) => {
    return (
        // Container principal que cobre toda a tela.
        // A opacidade muda para '0' quando 'isFinished' é true, acionando a transição de fade-out.
        // 'pointer-events-none' é adicionado quando está desaparecendo para não bloquear cliques.
        <div className={`
            fixed inset-0 bg-brand-dark flex flex-col items-center justify-center 
            z-[9999] transition-opacity duration-700 ease-in-out
            ${isFinished ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}>
            {/* Container para a animação do logo */}
            <div className="relative flex items-center justify-center animate-fade-in-scale">
                {/* Anéis decorativos giratórios */}
                <div className="absolute w-40 h-40 border-t-2 border-brand-light-purple rounded-full animate-spin-slow"></div>
                <div className="absolute w-56 h-56 border-b-2 border-brand-light-blue rounded-full animate-spin-slow-reverse"></div>
                {/* Ícone da logo */}
                <img src="src/img/Logo sem nome.png" alt="Logo Vertex Tech"className="w-24 h-24 relative" />
            </div>
            {/* Container para o texto, que aparece com um efeito de fade-in para cima */}
            <div className="text-center mt-8 animate-fade-in-up opacity-0">
                <h1 className="text-4xl font-bold text-white tracking-widest">
                    Vertex Tech
                </h1>
            </div>
        </div>
    );
};

export default LoadingScreen;
