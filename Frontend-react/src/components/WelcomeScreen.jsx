const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-4xl font-bold text-white mb-6">
        RN
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 inline-block text-transparent bg-clip-text p-5 mb-2">
        Rohit Negi AI Mentor
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Hello Coder Army! Kaise ho aap sabhi
      </p>
    </div>
  );
};

export default WelcomeScreen;