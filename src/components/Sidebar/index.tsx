import { Search, Trash2 } from 'lucide-react';
import type { SidebarProps } from './types';

export const Sidebar = ({ 
  history, 
  currentQuery, 
  onClearHistory, 
  onSelectHistory 
}: SidebarProps) => {
  if (history.length === 0) return null;

  return (
    <aside className="lg:w-80 w-full flex-shrink-0">
      <div className="sticky top-4 space-y-4">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">History</h2>
            <button
              onClick={onClearHistory}
              className="text-sm text-red-500 hover:text-red-600 transition-colors duration-200 
                flex items-center gap-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 px-2 py-1"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 
          scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectHistory(item.query, item.response);
              }}
              className={`
                rounded-xl border p-3
                transition-all duration-200 ease-in-out
                cursor-pointer group
                hover:shadow-sm
                ${currentQuery === item.query 
                  ? 'border-blue-500 dark:border-blue-500 bg-blue-50 dark:bg-blue-500/5' 
                  : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                }
              `}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-500 transition-colors duration-200">
                  {item.query}
                </h3>
                <Search className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(item.timestamp).toLocaleDateString()} • {new Date(item.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}; 