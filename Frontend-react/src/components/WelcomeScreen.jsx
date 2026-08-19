import { Icon } from './Logo';
import { Search, Network, List, Code2 } from 'lucide-react';

const WelcomeScreen = ({ onSendMessage }) => {
  const suggestions = [
    { text: "Explain Binary Search in Hindi", icon: <Search size={20} /> },
    { text: "Design a URL shortener", icon: <Network size={20} /> },
    { text: "How to reverse a linked list?", icon: <List size={20} /> },
    { text: "What is dynamic programming?", icon: <Code2 size={20} /> }
  ];

  const handleSuggestionClick = (prompt) => {
    if (onSendMessage) {
      onSendMessage(prompt);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-12 md:py-24 animate-in fade-in duration-700">
      <div className="mb-8 relative group">
        <div className="absolute inset-0 bg-[var(--accent)] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 rounded-full"></div>
        <div className="relative bg-white dark:bg-[#1e1e1e] p-4 rounded-3xl shadow-xl shadow-[var(--accent)]/10 border border-gray-200/50 dark:border-white/10">
          <Icon className="w-12 h-12" />
        </div>
      </div>
      
      <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
        Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-teal-400">GuruAI</span>
      </h1>
      <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-md mx-auto">
        Your bilingual mentor for Data Structures, Algorithms, and System Design. How can I help you today?
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl px-4">
        {suggestions.map((suggestion, i) => (
          <button
            key={i}
            className="group flex flex-col gap-3 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1a1a] text-left hover:bg-gray-50 dark:hover:bg-[#222222] hover:border-[var(--accent)]/50 dark:hover:border-[var(--accent)]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[var(--accent)]/5 hover:-translate-y-0.5"
            onClick={() => handleSuggestionClick(suggestion.text)}
          >
            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-[var(--accent)]/10 group-hover:text-[var(--accent)] transition-colors flex items-center justify-center">
              {suggestion.icon}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
              {suggestion.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;