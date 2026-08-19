import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock';
import { Icon } from './Logo';

const ChatMessage = ({ sender, text }) => {
  const isBot = sender === 'bot';

  return (
    <div className={`py-4 flex gap-4 md:gap-6 group animate-in fade-in slide-in-from-bottom-2 duration-300 ${isBot ? '' : ''}`}>
      <div
        className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-white shadow-sm overflow-hidden p-1.5 transition-shadow ${
          isBot ? 'bg-gradient-to-br from-[var(--accent)] to-teal-500 shadow-[var(--accent)]/20' : 'bg-gray-200 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 border border-gray-300/50 dark:border-white/10'
        }`}
      >
        {isBot ? <Icon className="w-full h-full text-white" /> : <span className="text-xs uppercase tracking-wider">You</span>}
      </div>
      <div
        className={`flex-1 min-w-0 prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:my-0 prose-pre:bg-transparent prose-pre:p-0 ${
          isBot ? 'text-gray-900 dark:text-gray-100' : 'text-gray-800 dark:text-gray-200'
        }`}
      >
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <CodeBlock
                  language={match[1]}
                  code={String(children).replace(/\n$/, '')}
                />
              ) : (
                <code className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-md px-1.5 py-0.5 font-mono text-[0.85em] text-gray-800 dark:text-gray-200" {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;