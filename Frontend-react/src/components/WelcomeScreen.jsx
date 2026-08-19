import { Icon } from './Logo';

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-12 md:py-24">
      <div className="mb-6 animate-fade-in-up">
        <Icon className="w-16 h-16 shadow-lg shadow-[var(--accent)]/20 rounded-[1.5rem]" />
      </div>
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
        Hi, I'm GuruAI
      </h1>
      <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-md mx-auto">
        Your bilingual mentor for Data Structures, Algorithms, and System Design. How can I help you today?
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl px-4">
        {[
          "Explain Binary Search in Hindi",
          "Design a URL shortener",
          "How to reverse a linked list?",
          "What is dynamic programming?"
        ].map((prompt, i) => (
          <button
            key={i}
            className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:border-[var(--accent)] transition-colors text-sm text-gray-700 dark:text-gray-300 shadow-sm"
            onClick={() => {
              const input = document.getElementById('chat-input');
              if (input) {
                input.value = prompt;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.focus();
              }
            }}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;