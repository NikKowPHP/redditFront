'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchAIResponse } from '@/services/api';
import type { AIResponse } from '@/types/api';
import { ArrowUpRight, Search, ExternalLink, MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/Skeleton';
import { storageService, StoredChatItem } from '@/services/storage';

// Move LoadingSkeleton outside the main component
const LoadingSkeleton = () => (
  <div className="space-y-6 pt-4">
    {/* TLDR Skeleton */}
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
      <Skeleton className="h-7 w-2/3 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-4/5" />
    </div>

    {/* Sources Grid Skeleton */}
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-start justify-between">
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-4" />
          </div>
          <Skeleton className="h-3 w-1/3 mt-2" />
        </div>
      ))}
    </div>

    {/* Main Sections Skeleton */}
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
      <Skeleton className="h-6 w-1/3 mb-4" />
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-4 w-4 rounded-full flex-shrink-0 mt-1" />
            <div className="flex-1">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-11/12 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// SearchForm component to reduce duplication
const SearchForm = ({ 
  query, 
  loading, 
  onSubmit, 
  onChange, 
  className = "" 
}: {
  query: string;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) => (
  <form 
    onSubmit={onSubmit} 
    className={`transition-all duration-300 ease-in-out transform ${className}`}
  >
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={onChange}
        className="
          w-full p-4 pr-12 text-lg
          rounded-2xl border border-gray-200 dark:border-gray-800
          bg-transparent
          transition-all duration-200 ease-in-out
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
          hover:border-gray-300 dark:hover:border-gray-700
        "
        placeholder="Enter your question..."
      />
      <button
        type="submit"
        disabled={loading}
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          transition-all duration-200 ease-in-out
          hover:scale-110
        "
      >
        {loading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-500 border-t-transparent" />
        ) : (
          <Search className="w-6 h-6 text-gray-500 transition-colors duration-200 hover:text-gray-700 dark:hover:text-gray-300" />
        )}
      </button>
    </div>
  </form>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<StoredChatItem[]>([]);

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Load chat history when component mounts
    setHistory(storageService.getChatHistory());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const result = await fetchAIResponse(query);
      setResponse(result);
      // Update history after new response
      setHistory(storageService.getChatHistory());
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = useCallback(() => {
    storageService.clearHistory();
    setHistory([]);
    setResponse(null);
    setQuery('');
  }, []);

  // Update the renderHistory function with matching design patterns
  const renderHistory = () => (
    <div className="space-y-6">
      {history.length > 0 && (
        <>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recent Searches</h2>
              <button
                onClick={clearHistory}
                className="text-sm text-red-500 hover:text-red-600 transition-colors duration-200 flex items-center gap-1"
              >
                Clear History
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setQuery(item.query);
                  setResponse(item.response);
                }}
                className="
                  rounded-2xl border border-gray-200 dark:border-gray-800 p-6
                  hover:border-gray-300 dark:hover:border-gray-700
                  transition-all duration-200 ease-in-out
                  cursor-pointer group
                  bg-transparent hover:bg-gray-50 dark:hover:bg-gray-900
                "
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium line-clamp-2 group-hover:text-blue-500 transition-colors duration-200">
                    {item.query}
                  </h3>
                  <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A]">
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Initial centered search form */}
        <div 
          className={`
            transition-opacity duration-300 ease-in-out
            ${!response && !loading ? 'opacity-100 transform-none' : 'opacity-0 absolute pointer-events-none'}
          `}
        >
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-4xl font-bold mb-8 transition-transform duration-300">Ask anything</h1>
            <div className="w-full max-w-2xl transform transition-transform duration-300">
              <SearchForm
                query={query}
                loading={loading}
                onSubmit={handleSubmit}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            
            {/* Add history section here */}
            {!loading && renderHistory()}
          </div>
        </div>

        {/* Top sticky search form */}
        {(response || loading) && mounted && (
          <div className="space-y-8">
            <div className="sticky top-4 z-10 transition-all duration-300 ease-in-out">
              <div 
                className="
                  transform transition-all duration-300 ease-in-out
                  backdrop-blur-md bg-white/80 dark:bg-[#0A0A0A]/80
                  rounded-2xl shadow-sm
                "
              >
                <SearchForm
                  query={query}
                  loading={loading}
                  onSubmit={handleSubmit}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pt-4 pb-2"
                />
              </div>
            </div>

            {loading ? (
              <LoadingSkeleton />
            ) : (
              <div className="space-y-6 pt-4">
                <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                  <h2 className="text-xl font-semibold mb-4">{response?.tldr.title}</h2>
                  <p className="text-gray-700 dark:text-gray-300">{response?.tldr.concise_summary}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {response?.sources.map((source, index) => (
                    <div key={index} className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-sm line-clamp-2">{source.post_title}</h3>
                        <div className="flex gap-2 flex-shrink-0">
                          <a
                            href={`https://reddit.com/r/${source.subreddit}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                          <a
                            href={source.post_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">r/{source.subreddit}</p>
                    </div>
                  ))}
                </div>

                {response?.main_sections.map((section, index) => (
                  <div key={index} className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                    <h3 className="text-lg font-semibold mb-4">{section.section_title}</h3>
                    <ul className="space-y-4">
                      {section.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex gap-3">
                          <span className="text-gray-400">•</span>
                          <div>
                            <p className="mb-2">{point.text}</p>
                            <div className="flex flex-col gap-2">
                              {point.sources.map((source, sourceIndex) => (
                                <div key={sourceIndex} className="flex flex-col gap-1">
                                  <a
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                                  >
                                    <span>Source {sourceIndex + 1}</span>
                                    <ArrowUpRight className="w-3 h-3" />
                                  </a>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {source.hover_text}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}