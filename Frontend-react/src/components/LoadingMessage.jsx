import React from 'react';
import { Icon } from './Logo';

const LoadingMessage = () => {
  return (
    <div className="py-4 flex gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[var(--accent)] to-teal-500 shadow-sm shadow-[var(--accent)]/20 overflow-hidden p-1.5">
        <Icon className="w-full h-full text-white" />
      </div>
      <div className="p-3 rounded-2xl flex items-center h-10 border border-transparent">
        <div className="flex space-x-2 items-center h-full">
          <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessage;