import { FaArrowRight } from 'react-icons/fa';

const LandingPage = ({ onStartChat }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center bg-gray-100 dark:bg-gray-900">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center text-5xl font-bold text-white mb-6 shadow-lg">
        RN
      </div>
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 inline-block text-transparent bg-clip-text p-2 mb-2">
        Rohit Negi AI Mentor
      </h1>
      <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-md">
        Your personal AI companion for coding, problem-solving, and learning. Let's build something amazing together.
      </p>
      <button 
        onClick={onStartChat}
        className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        Start New Chat <FaArrowRight />
      </button>
    </div>
  );
};

export default LandingPage;