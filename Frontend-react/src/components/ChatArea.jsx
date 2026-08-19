import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import WelcomeScreen from './WelcomeScreen';
import LoadingMessage from './LoadingMessage';
import { FaPaperPlane, FaMicrophone, FaBars } from 'react-icons/fa6';
import Logo from './Logo';

const ChatArea = ({ chat, onSendMessage, theme, onToggleTheme, isLoading }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const chatBoxRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat?.messages, isLoading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

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
        const finalTranscript = input;
        if (finalTranscript && finalTranscript.trim()) {
            handleSubmit(null, finalTranscript);
        }
    };
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map(r => r[0].transcript).join('');
      setInput(prev => prev ? prev + ' ' + transcript : transcript);
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
      recognitionRef.current?.start();
    }
  };

  const handleSubmit = (e, voiceInput = null) => {
    e?.preventDefault();
    const messageToSend = voiceInput || input;
    if (!messageToSend.trim() || isLoading) return;
    onSendMessage(messageToSend);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-white dark:bg-gray-800 min-w-0 relative h-full">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-center items-center p-4 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-10">
        <Logo showText={true} className="h-6" />
      </div>
      
      {/* Chat Messages */}
      <div ref={chatBoxRef} className="flex-1 overflow-y-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto w-full py-8 flex flex-col gap-6">
          {chat && chat.messages.length > 0 ? (
              chat.messages.map((msg, index) => (
                  <ChatMessage key={index} sender={msg.sender} text={msg.text} />
              ))
          ) : (
              <WelcomeScreen />
          )}
          {isLoading && <LoadingMessage />}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-4 bg-gradient-to-t from-white via-white dark:from-gray-800 dark:via-gray-800 to-transparent pt-6">
        <div className="max-w-3xl mx-auto w-full relative">
          <form 
            onSubmit={handleSubmit} 
            className="flex items-end gap-2 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-200 dark:border-gray-600 shadow-sm focus-within:ring-1 focus-within:ring-[var(--accent)] focus-within:border-[var(--accent)] transition-all overflow-hidden p-2 pl-4"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isLoading ? "GuruAI is thinking..." : "Ask GuruAI anything..."}
              className="w-full bg-transparent focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 disabled:opacity-50 resize-none py-3 max-h-[200px] leading-relaxed"
              rows={1}
            />
            <div className="flex items-center gap-1 self-end pb-1 pr-1">
              <button 
                type="button" 
                onClick={handleMicClick} 
                disabled={isLoading} 
                className={`p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isRecording ? 'text-[var(--accent)] bg-[var(--accent)]/10 animate-pulse' : ''}`}
                title="Voice Input"
              >
                <FaMicrophone size={18}/>
              </button>
              <button 
                type="submit" 
                className={`p-2 rounded-xl transition-colors disabled:cursor-not-allowed flex items-center justify-center ${input.trim() ? 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]' : 'bg-gray-200 text-gray-400 dark:bg-gray-600 dark:text-gray-500'}`} 
                disabled={!input.trim()}
                title="Send Message"
              >
                <FaPaperPlane size={18}/>
              </button>
            </div>
          </form>
          <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3 mb-1">
            GuruAI can make mistakes. Consider verifying important information.
          </div>
        </div>
      </div>
    </main>
  );
};

export default ChatArea;