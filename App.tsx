
import React from 'react';
import ChatInterface from './components/ChatInterface';
import { BotIcon } from './components/icons';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center space-x-3 sticky top-0 z-10">
        <div className="bg-blue-600 p-2 rounded-full">
          <BotIcon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Consultor Fiscal Inteligente
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Atualizado em Tempo Real com Fontes Oficiais
          </p>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <ChatInterface />
      </main>
    </div>
  );
};

export default App;
