import React from 'react';

const LoadingMessage = () => {
  return (
    <div className="flex gap-4 my-4">
      <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white bg-gradient-to-br from-blue-500 to-purple-600">
        RN
      </div>
      <div className="max-w-2xl p-4 rounded-2xl bg-white dark:bg-gray-700 rounded-tl-none flex items-center">
        <div className="flex space-x-1">
          <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessage;