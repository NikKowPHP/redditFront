import type { AIResponse } from '@/types/api';
import type { StoredChatItem } from '@/services/storage';

export interface SidebarProps {
  history: StoredChatItem[];
  currentQuery: string;
  onClearHistory: () => void;
  onSelectHistory: (query: string, response: AIResponse) => void;
} 