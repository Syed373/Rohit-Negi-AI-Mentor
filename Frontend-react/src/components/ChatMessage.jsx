import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock';
import { Icon } from './Logo';

const ChatMessage = ({ sender, text }) => {
  const isBot = sender === 'bot';

  return (
    <div className={`py-2 flex gap-4 md:gap-6 ${isBot ? '' : ''}`}>
      <div
        className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white shadow-sm overflow-hidden p-1 ${
          isBot ? 'bg-[var(--accent)]' : 'bg-gray-400 dark:bg-gray-600'
        }`}
      >
        {isBot ? <Icon className="w-full h-full" /> : <span className="text-sm">You</span>}
      </div>
      <div
        className={`flex-1 min-w-0 prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed ${
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
                <code className="bg-gray-100 dark:bg-gray-700 rounded px-1.5 py-0.5 font-mono text-sm" {...props}>
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