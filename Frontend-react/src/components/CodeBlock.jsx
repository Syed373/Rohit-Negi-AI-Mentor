import { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const CodeBlock = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard!', {
      style: {
        background: '#333',
        color: '#fff',
        borderRadius: '10px',
      },
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-[#fafafa] dark:bg-[#111111] shadow-sm group">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-100 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-white/5 transition-colors">
        <span className="text-gray-500 dark:text-gray-400 text-xs font-mono font-medium">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Copy code"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          <span className="text-xs font-medium">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-[13px] leading-relaxed">
        <pre className="!m-0 !p-0 !bg-transparent">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;