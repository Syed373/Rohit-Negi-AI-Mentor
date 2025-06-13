import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import LandingPage from './components/LandingPage'; 
import { Toaster } from 'react-hot-toast';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3000/api/chat';

function App() {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatting, setIsChatting] = useState(false); 

  
  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem('chats') || '[]');
    setChats(savedChats);
    const lastChatId = localStorage.getItem('lastChatId');
    if (lastChatId) {
      setCurrentChatId(lastChatId);
      setIsChatting(true); 
    }
  }, []);

  /* Theme effect */
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Save chats to localStorage
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('chats', JSON.stringify(chats));
    }
  }, [chats]);
  
  // Save last chat ID to localStorage
  useEffect(() => {
    if (currentChatId) {
      localStorage.setItem('lastChatId', currentChatId);
    } else {
      localStorage.removeItem('lastChatId');
    }
  }, [currentChatId]);

  const handleStartChat = () => {
    setIsChatting(true);
    handleNewChat(); 
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
  };

  const handleLoadChat = (chatId) => {
    setCurrentChatId(chatId);
  };

  const handleSendMessage = async (message) => {
    setIsLoading(true);

    const userMessage = { sender: 'user', text: message };
    let historyForAPI = [];
    let targetChatId = currentChatId;

    if (!targetChatId) {
      targetChatId = `chat_${Date.now()}`;
      
      const newTitle = message.length > 30 ? message.substring(0, 30) + '...' : message;
      
      const newChat = {
        id: targetChatId,
        title: newTitle,
        messages: [userMessage]
      };
      setChats([newChat, ...chats]);
      setCurrentChatId(targetChatId);
    } else {
      const currentChat = chats.find(c => c.id === targetChatId);
      if (currentChat) {
        historyForAPI = currentChat.messages.map(m => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));
      }
      const updatedChats = chats.map(chat =>
        chat.id === targetChatId
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      );
      setChats(updatedChats);
    }

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: historyForAPI })
      });
      const data = await res.json();
      const botMessage = { sender: 'bot', text: data.reply };
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === targetChatId
            ? { ...chat, messages: [...chat.messages, botMessage] }
            : chat
        )
      );
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage = { sender: 'bot', text: "Sorry, I ran into an error. Please try again." };
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === targetChatId
            ? { ...chat, messages: [...chat.messages, errorMessage] }
            : chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const currentChat = chats.find(chat => chat.id === currentChatId);

  return (
    <div className="flex h-screen font-sans bg-white dark:bg-gray-800 overflow-hidden">
      <Toaster position="bottom-center" reverseOrder={false} />
      
      
      {!isChatting ? (
        <LandingPage onStartChat={handleStartChat} />
      ) : (
        <>
          <Sidebar 
            isSidebarOpen={isSidebarOpen}
            onToggleSidebar={toggleSidebar}
            chats={chats} 
            currentChatId={currentChatId} 
            onNewChat={handleNewChat} 
            onLoadChat={handleLoadChat}
          />
          
          <ChatArea 
            chat={currentChat} 
            onSendMessage={handleSendMessage}
            theme={theme}
            onToggleTheme={toggleTheme}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
}

export default App;