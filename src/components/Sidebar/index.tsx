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
      <div className="sticky top-4 space-y-3">
        <div className="rounded-2xl border border-secondary-border dark:border-secondary-borderDark 
          bg-primary-surface dark:bg-primary-surfaceDark p-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-secondary-text dark:text-secondary-textDark">History</h2>
            <button
              onClick={onClearHistory}
              className="text-sm text-accent-red hover:text-accent-redDark transition-colors duration-200 
                flex items-center gap-1.5 rounded-lg px-2 py-1"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectHistory(item.query, item.response)}
              className={`
                rounded-xl p-3 transition-all duration-200
                cursor-pointer group
                ${currentQuery === item.query 
                  ? 'bg-accent-blue/5 dark:bg-accent-blueDark/5 border-accent-blue dark:border-accent-blueDark' 
                  : 'border border-secondary-border dark:border-secondary-borderDark hover:bg-primary-background dark:hover:bg-primary-backgroundDark'
                }
              `}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-medium text-sm line-clamp-2 text-secondary-text dark:text-secondary-textDark">
                  {item.query}
                </h3>
                <Search className="w-4 h-4 flex-shrink-0 text-secondary-text/40 dark:text-secondary-textDark/40" />
              </div>
              <p className="text-xs text-secondary-text/60 dark:text-secondary-textDark/60 mt-2">
                {new Date(item.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}; 