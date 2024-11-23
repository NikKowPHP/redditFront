import { Search } from 'lucide-react';
import { StoredChatItem } from '@/services/storage';
import type { AIResponse } from '@/types/api';
import { SidebarProps } from './types';


export const Sidebar = ({ 
  history, 
  currentQuery, 
  onClearHistory, 
  onSelectHistory 
}: SidebarProps) => {
  return (
    <aside className="lg:w-1/3 w-full transition-all duration-300 ease-in-out">
      <div className="sticky top-4">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Searches</h2>
            <button
              onClick={onClearHistory}
              className="text-sm text-red-500 hover:text-red-600 transition-colors duration-200 flex items-center gap-1"
            >
              Clear History
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectHistory(item.query, item.response);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`
                rounded-2xl border border-gray-200 dark:border-gray-800 p-4
                hover:border-gray-300 dark:hover:border-gray-700
                transition-all duration-200 ease-in-out
                cursor-pointer group
                bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900
                ${currentQuery === item.query ? 'border-blue-500 dark:border-blue-500' : ''}
              `}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-500 transition-colors duration-200">
                  {item.query}
                </h3>
                <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
              </div>
              <p className="text-xs text-gray-500">
                {new Date(item.timestamp).toLocaleDateString()} • {new Date(item.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}; 