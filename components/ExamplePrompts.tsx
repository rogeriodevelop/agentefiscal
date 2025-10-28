
import React from 'react';
import { LightBulbIcon } from './icons';

interface ExamplePromptsProps {
  prompts: string[];
  onPromptClick: (prompt: string) => void;
}

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ prompts, onPromptClick }) => {
  return (
    <div className="max-w-3xl mx-auto text-center p-4">
      <div className="inline-block bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-full mb-4">
        <LightBulbIcon className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Bem-vindo!</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Comece fazendo uma pergunta ou tente um destes exemplos:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt)}
            className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExamplePrompts;
