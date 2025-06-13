import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock';

const ChatMessage = ({ sender, text }) => {
  const isBot = sender === 'bot';

  return (
    <div className={`flex gap-4 my-4 ${!isBot ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white ${isBot ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gray-500'
          }`}
      >
        {isBot ? 'RN' : 'You'}
      </div>
      <div
        className={`max-w-2xl p-4 rounded-2xl ${isBot
            ? 'bg-white dark:bg-gray-700 rounded-tl-none'
            : 'bg-blue-500 text-white prose-strong:text-white rounded-br-none'
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
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    
    </div >
  );
};

export default ChatMessage;