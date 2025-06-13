// src/components/ChatArea.jsx

import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import WelcomeScreen from './WelcomeScreen';
import LoadingMessage from './LoadingMessage';
import { FaPaperPlane, FaMicrophone, FaSun, FaMoon } from 'react-icons/fa';

const ChatArea = ({ chat, onSendMessage, theme, onToggleTheme, isLoading }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const chatBoxRef = useRef(null);

  // ... (All existing functions and useEffects remain unchanged) ...

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat?.messages, isLoading]);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => {
        setIsRecording(false);
        const finalTranscript = document.getElementById('chat-input')?.value;
        if (finalTranscript && finalTranscript.trim()) {
            handleSubmit(null, finalTranscript);
        }
    };
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map(r => r[0].transcript).join('');
      setInput(transcript);
    };
    recognitionRef.current = recognition;
    
    return () => {
      recognitionRef.current?.abort();
    };

  }, []);

  const handleMicClick = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      setInput('');
      recognitionRef.current?.start();
    }
  };

  const handleSubmit = (e, voiceInput = null) => {
    e?.preventDefault();
    const messageToSend = voiceInput || input;
    if (!messageToSend.trim() || isLoading) return;
    onSendMessage(messageToSend);
    setInput('');
  };


  return (
    <main className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-800 min-w-0">
      {/* Top Bar - Height adjusted */}
      <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex-shrink-0 h-[93px]">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-xl font-bold text-white mx-4">
          RN
        </div>
        <div className="flex items-center gap-4 justify-center flex-1">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-500  to-purple-600 inline-block text-transparent bg-clip-text p-1">
                Rohit Negi AI Mentor
            </h2>
        </div>

        <button 
          onClick={onToggleTheme}
          className="p-2 mx-4 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {theme === 'dark' ? <FaSun size={24} /> : <FaMoon size={24} />}
        </button>
      </div>
      
      {/* Chat Messages */}
      <div ref={chatBoxRef} className="flex-1 overflow-y-auto p-6">
        {chat && chat.messages.length > 0 ? (
            chat.messages.map((msg, index) => (
                <ChatMessage key={index} sender={msg.sender} text={msg.text} />
            )
        )) : (
            <WelcomeScreen />
        )}
        {isLoading && <LoadingMessage />}
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="flex items-center gap-4 bg-gray-100 dark:bg-gray-700 p-2 rounded-xl shadow-md max-w-4xl mx-auto">
            <button type="button" onClick={handleMicClick} disabled={isLoading} className={`p-3 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed ${isRecording ? 'text-red-500 animate-pulse' : ''}`}>
                <FaMicrophone size={20}/>
            </button>
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLoading ? "Rohit is thinking..." : "Chalo, problem solve karte hain..."}
            className="w-full bg-transparent focus:outline-none text-gray-800 dark:text-gray-200 disabled:opacity-50"
          />
          <button type="submit" className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed" disabled={!input.trim()}>
            <FaPaperPlane size={20}/>
          </button>
        </form>
      </div>
    </main>
  );
};

export default ChatArea;