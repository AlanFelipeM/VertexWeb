
// Importa as bibliotecas React e ReactDOM para renderização de componentes no navegador.
import React from 'react';
import ReactDOM from 'react-dom/client';
// Importa o componente principal da aplicação.
import App from './App';

// Obtém o elemento HTML com o id 'root' onde a aplicação React será montada.
const rootElement = document.getElementById('root');
// Verifica se o elemento root existe para evitar erros em tempo de execução.
if (!rootElement) {
  throw new Error("Não foi possível encontrar o elemento root para montar a aplicação");
}

// Cria uma raiz de renderização do React para o elemento encontrado.
const root = ReactDOM.createRoot(rootElement);
// Renderiza o componente App dentro da raiz.
// React.StrictMode é um wrapper que ajuda a identificar potenciais problemas na aplicação.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
