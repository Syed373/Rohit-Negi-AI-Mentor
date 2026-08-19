import React from 'react';

export const Icon = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="24" fill="var(--accent, #059669)" />
    <path d="M50 20C50 20 50 45 25 45C50 45 50 70 50 70C50 70 50 45 75 45C50 45 50 20 50 20Z" fill="white" />
    <circle cx="75" cy="25" r="5" fill="white" opacity="0.8" />
  </svg>
);

export const Logo = ({ className = "h-8", showText = true }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Icon className="w-8 h-8 flex-shrink-0" />
      {showText && (
        <span className="font-semibold text-xl tracking-tight text-gray-900 dark:text-white">
          Guru<span style={{ color: 'var(--accent, #059669)' }}>AI</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
