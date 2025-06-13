// src/components/Sidebar.jsx

import { FaPlus, FaMessage, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

const Sidebar = ({ isSidebarOpen, onToggleSidebar, chats, currentChatId, onNewChat, onLoadChat }) => {
  return (
    <aside
      className={`
        flex flex-col text-white bg-gray-100 dark:bg-gray-900 
        transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-800
        ${isSidebarOpen ? 'w-64' : 'w-20'}
      `}
    >
      <div className="flex items-center p-4 h-[93px] border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        {isSidebarOpen && <h1 className="text-xl text-gray-900 dark:text-gray-100 font-bold flex-1">Chats</h1>}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-gray-300 text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700"
          title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
      
      <div className="p-4">
        <button
          onClick={onNewChat}
          className={`
            flex items-center gap-3 p-3 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors 
            ${isSidebarOpen ? 'w-full' : 'w-12 justify-center'}
          `}
        >
          <FaPlus /> {isSidebarOpen && <span>New Chat</span>}
        </button>
      </div>

      {/* REFINED: flex-1 for proper layout and text color fix */}
      <nav className="flex-1 px-4 pb-4 overflow-y-auto overflow-x-hidden">
        <ul className="space-y-1">
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => onLoadChat(chat.id)}
              title={chat.title}
              className={`flex items-center gap-3 p-3 rounded-md cursor-pointer text-sm font-medium transition-colors 
                ${isSidebarOpen ? '' : 'justify-center'}
                ${currentChatId === chat.id
                  ? 'bg-blue-600/20 text-blue-700 dark:bg-gray-700 dark:text-white' // Active chat styling
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50' // REFINED: Text color for light/dark
              }`}
            >
              <FaMessage className="flex-shrink-0" />
              {isSidebarOpen && <span className="truncate">{chat.title}</span>}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;