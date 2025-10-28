
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import ChatMessage from './ChatMessage';
import ExamplePrompts from './ExamplePrompts';
import { SendIcon } from './icons';
import { EXAMPLE_PROMPTS } from '../constants';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  const handleSend = async (prompt?: string) => {
    const userMessageContent = prompt || input;
    if (!userMessageContent.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: userMessageContent };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendMessageToGemini(userMessageContent);
      const modelMessage: Message = { role: 'model', content: response };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      setError(err.message || 'Falha ao obter resposta da IA.');
      const errorMessage: Message = { role: 'model', content: `Erro: ${err.message || 'Falha ao obter resposta da IA.'}` };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.length === 0 && !isLoading && (
            <ExamplePrompts prompts={EXAMPLE_PROMPTS} onPromptClick={(prompt) => handleSend(prompt)} />
        )}
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && messages[messages.length-1].role === 'user' && <ChatMessage message={{role: 'model', content: '...'}} isLoading={true} />}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 md:p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        <div className="relative max-w-3xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua dúvida fiscal aqui..."
            className="w-full p-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 dark:bg-gray-700 resize-none text-gray-800 dark:text-gray-200"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
            aria-label="Enviar mensagem"
          >
            <SendIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
