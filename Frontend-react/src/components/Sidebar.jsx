import { FaPlus, FaMessage, FaChevronLeft, FaChevronRight, FaSun, FaMoon } from 'react-icons/fa6';
import Logo from './Logo';

const Sidebar = ({ isSidebarOpen, onToggleSidebar, chats, currentChatId, onNewChat, onLoadChat, theme, onToggleTheme }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={onToggleSidebar}
        />
      )}
      
      <aside
        className={`
          fixed md:relative z-50 h-full flex flex-col text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 
          transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-800
          ${isSidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'}
        `}
      >
        <div className="flex items-center justify-between p-4 h-[72px] flex-shrink-0">
          <div className={`overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 md:w-auto md:opacity-100'}`}>
            <Logo showText={isSidebarOpen} className={isSidebarOpen ? "h-8" : "h-8 justify-center"} />
          </div>
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 md:block hidden"
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
          
          {/* Mobile close button */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 md:hidden block"
          >
            <FaChevronLeft />
          </button>
        </div>
        
        <div className="p-3">
          <button
            onClick={onNewChat}
            className={`
              flex items-center gap-3 p-3 rounded-lg font-semibold text-white transition-colors bg-[var(--accent)] hover:bg-[var(--accent-hover)]
              ${isSidebarOpen ? 'w-full' : 'w-12 justify-center mx-auto'}
            `}
            title="New Chat"
          >
            <FaPlus /> {isSidebarOpen && <span>New Chat</span>}
          </button>
        </div>

        {/* History */}
        <nav className="flex-1 px-3 pb-4 overflow-y-auto overflow-x-hidden">
          <ul className="space-y-1">
            {chats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => onLoadChat(chat.id)}
                title={chat.title}
                className={`flex items-center gap-3 p-3 rounded-md cursor-pointer text-sm font-medium transition-colors 
                  ${isSidebarOpen ? '' : 'justify-center'}
                  ${currentChatId === chat.id
                    ? 'bg-gray-200 dark:bg-gray-800 text-[var(--accent)]' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50' 
                }`}
              >
                <FaMessage className={`flex-shrink-0 ${currentChatId === chat.id ? 'text-[var(--accent)]' : ''}`} />
                {isSidebarOpen && <span className="truncate">{chat.title}</span>}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Theme Toggle */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={onToggleTheme}
            className={`
              flex items-center gap-3 p-2 w-full rounded-md text-sm font-medium transition-colors
              text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800
              ${isSidebarOpen ? '' : 'justify-center'}
            `}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <FaSun className="text-lg flex-shrink-0" /> : <FaMoon className="text-lg flex-shrink-0" />}
            {isSidebarOpen && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;