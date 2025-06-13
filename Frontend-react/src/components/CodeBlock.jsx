import { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
// Add more languages as needed

import { FaCopy } from 'react-icons/fa';
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
    <div className="relative my-4 rounded-lg bg-[#2d2d2d] text-sm">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700/50 rounded-t-lg">
        <span className="text-gray-300 font-semibold">{language || 'code'}</span>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-1 right-2 p-2 bg-gray-900 hover:bg-gray-500/70 rounded-md text-gray-300 transition-colors"
        title="Copy code"
      >
        <FaCopy />
      </button>
    </div>
  );
};

export default CodeBlock;