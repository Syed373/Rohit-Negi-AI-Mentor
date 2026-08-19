import React from 'react';
import { Icon } from './Logo';

const LoadingMessage = () => {
  return (
    <div className="flex gap-4 my-2">
      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-[var(--accent)] text-white shadow-sm overflow-hidden p-1">
        <Icon className="w-full h-full" />
      </div>
      <div className="p-3 rounded-2xl flex items-center h-10">
        <div className="flex space-x-1.5">
          <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse [animation-delay:-0.3s]"></span>
          <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse [animation-delay:-0.15s]"></span>
          <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessage;