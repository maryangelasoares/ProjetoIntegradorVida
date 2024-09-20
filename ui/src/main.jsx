import React from "react";
// Importa o componente StrictMode do React para ajudar na identificação de problemas no código durante o desenvolvimento;
// Importa a função createRoot da biblioteca react-dom/client, que é usada para renderizar a aplicação React na árvore DOM;
import { createRoot } from "react-dom/client"
import App from "./App";
import { AuthProvider } from './hooks/useAuth';

/* Cria um ponto de entrada (root) na árvore DOM, selecionando o elemento HTML com id 'root', 
e renderiza o conteúdo React dentro desse elemento; */
createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <App />
    </AuthProvider>
);
