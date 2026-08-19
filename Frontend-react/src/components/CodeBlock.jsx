import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';


import { FaCopy } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const CodeBlock = ({ language, code }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-gray-700 bg-[#1e1e1e] shadow-sm">
      <div className="flex justify-between items-center px-4 py-2 bg-[#2d2d2d] text-gray-400 text-xs font-mono uppercase border-b border-gray-700">
        <span>{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 p-1.5 hover:bg-gray-600 rounded-md text-gray-400 hover:text-white transition-colors"
          title="Copy code"
        >
          <FaCopy size={14} />
          <span>Copy</span>
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