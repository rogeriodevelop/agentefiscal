import React from 'react';
import { Message } from '../types';
import { BotIcon, UserIcon } from './icons';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  const isModel = message.role === 'model';

  const formatContent = (content: string) => {
    // Split by code blocks
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.replace(/```\w*\n?/, '').replace(/```$/, '');
        return (
          <pre key={index} className="bg-gray-200 dark:bg-gray-800 p-3 rounded-md overflow-x-auto my-2 text-sm font-mono">
            <code>{code.trim()}</code>
          </pre>
        );
      }

      // Process other markdown within non-code parts
      const sections = part.split(/(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g);
      return sections.map((textPart, textIndex) => {
        const key = `${index}-${textIndex}`;
        if (textPart.startsWith('**') && textPart.endsWith('**')) {
          return <strong key={key}>{textPart.slice(2, -2)}</strong>;
        }
        if (textPart.startsWith('*') && textPart.endsWith('*')) {
          return <em key={key}>{textPart.slice(1, -1)}</em>;
        }
        const linkMatch = textPart.match(/\[(.*?)\]\((.*?)\)/);
        if (linkMatch) {
          return <a href={linkMatch[2]} key={key} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{linkMatch[1]}</a>;
        }
        return <span key={key}>{textPart}</span>;
      });
    });
  };

  return (
    <div className={`flex items-start gap-3 ${isModel ? '' : 'justify-end'}`}>
      {isModel && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <BotIcon className="h-5 w-5" />
        </div>
      )}
      <div
        className={`max-w-xl rounded-lg p-3 ${
          isModel
            ? 'bg-white dark:bg-gray-700'
            : 'bg-blue-500 text-white'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          </div>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap break-words">
             {formatContent(message.content)}
          </div>
        )}
      </div>
      {!isModel && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-800 dark:text-gray-200">
          <UserIcon className="h-5 w-5" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;