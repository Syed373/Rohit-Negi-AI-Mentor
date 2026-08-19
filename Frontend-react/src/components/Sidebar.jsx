import { Plus, MessageSquare, PanelLeftClose, PanelLeft, Sun, Moon } from 'lucide-react';
import Logo from './Logo';

const Sidebar = ({ isSidebarOpen, onToggleSidebar, chats, currentChatId, onNewChat, onLoadChat, theme, onToggleTheme }) => {
  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onToggleSidebar}
        />
      )}
      
      <aside
        className={`
          fixed md:relative z-50 h-full flex flex-col text-gray-900 dark:text-gray-100 bg-[#f9fafb] dark:bg-[#111111] 
          transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-r border-gray-200/80 dark:border-white/10
          ${isSidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'}
        `}
      >
        <div className="flex items-center justify-between p-4 h-[72px] flex-shrink-0">
          <div className={`overflow-hidden transition-all duration-300 ${isSidebarOpen ? 'w-auto opacity-100' : 'w-0 opacity-0 md:w-auto md:opacity-100'}`}>
            <Logo showText={isSidebarOpen} className={isSidebarOpen ? "h-7" : "h-7 justify-center"} />
          </div>
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-200/50 dark:hover:bg-white/5 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors md:block hidden focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50"
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
          </button>
          
          {/* Mobile close button */}
          <button
            onClick={onToggleSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-200/50 dark:hover:bg-white/5 text-gray-400 md:hidden block"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>
        
        <div className="px-3 pb-2 pt-1">
          <button
            onClick={onNewChat}
            className={`
              group relative flex items-center gap-2 p-2.5 rounded-xl font-medium text-white transition-all overflow-hidden
              ${isSidebarOpen ? 'w-full' : 'w-11 h-11 justify-center mx-auto'}
            `}
            title="New Chat"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-teal-500 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            <div className="relative z-10 flex items-center gap-2 w-full justify-center">
              <Plus size={18} className="shrink-0 group-hover:rotate-90 transition-transform duration-300" /> 
              {isSidebarOpen && <span className="text-sm">New Chat</span>}
            </div>
          </button>
        </div>

        {/* History */}
        <nav className="flex-1 px-3 pb-4 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-800">
          <div className={`px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-4 ${!isSidebarOpen && 'hidden'}`}>
            Recent
          </div>
          <ul className="space-y-0.5">
            {chats.map((chat) => (
              <li
                key={chat.id}
                onClick={() => onLoadChat(chat.id)}
                title={chat.title}
                className={`group flex items-center gap-2.5 p-2 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 ease-out
                  ${isSidebarOpen ? '' : 'justify-center w-11 mx-auto'}
                  ${currentChatId === chat.id
                    ? 'bg-[var(--accent)]/10 dark:bg-[var(--accent)]/15 text-[var(--accent)]' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200' 
                }`}
              >
                <MessageSquare size={16} className={`shrink-0 ${currentChatId === chat.id ? 'text-[var(--accent)]' : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300'} transition-colors`} />
                {isSidebarOpen && <span className="truncate">{chat.title}</span>}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer Theme Toggle */}
        <div className="p-3 border-t border-gray-200/80 dark:border-white/10">
          <button
            onClick={onToggleTheme}
            className={`
              flex items-center gap-2.5 p-2 w-full rounded-lg text-sm font-medium transition-all
              text-gray-500 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200
              ${isSidebarOpen ? '' : 'justify-center w-11 h-11 mx-auto'}
            `}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun size={18} className="shrink-0" /> : <Moon size={18} className="shrink-0" />}
            {isSidebarOpen && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;