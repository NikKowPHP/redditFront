import type { AIResponse } from '@/types/api';

const STORAGE_KEY = 'ai_chat_history';
const MAX_HISTORY_ITEMS = 50;

export interface StoredChatItem {
  id: string;
  timestamp: number;
  query: string;
  response: AIResponse;
}

export class StorageService {
  private static instance: StorageService;

  private constructor() {}

  static getInstance(): StorageService {
    if (!this.instance) {
      this.instance = new StorageService();
    }
    return this.instance;
  }

  private getStorage(): StoredChatItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading from storage:', error);
      return [];
    }
  }

  private setStorage(items: StoredChatItem[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error writing to storage:', error);
    }
  }

  saveChat(query: string, response: AIResponse): void {
    const items = this.getStorage();
    const newItem: StoredChatItem = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      query,
      response,
    };

    items.unshift(newItem);
    
    // Keep only the latest MAX_HISTORY_ITEMS
    const trimmedItems = items.slice(0, MAX_HISTORY_ITEMS);
    this.setStorage(trimmedItems);
  }

  getChatHistory(): StoredChatItem[] {
    return this.getStorage();
  }

  clearHistory(): void {
    this.setStorage([]);
  }

  getChatById(id: string): StoredChatItem | null {
    const items = this.getStorage();
    return items.find(item => item.id === id) || null;
  }
}

export const storageService = StorageService.getInstance(); 