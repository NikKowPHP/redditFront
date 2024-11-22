'use client';

import { useState } from 'react';
import { fetchAIResponse } from '@/services/api';
import type { AIResponse } from '@/types/api';
import { ArrowUpRight, Search, ExternalLink } from 'lucide-react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await fetchAIResponse(query);
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A]">
      <main className="max-w-3xl mx-auto px-4 py-8">
        {!response && (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <h1 className="text-4xl font-bold mb-8">Ask anything</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full p-4 pr-12 text-lg rounded-2xl border border-gray-200 dark:border-gray-800 bg-transparent"
                  placeholder="Enter your question..."
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-500 border-t-transparent" />
                  ) : (
                    <Search className="w-6 h-6 text-gray-500" />
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {response && (
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="sticky top-4 z-10">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full p-4 pr-12 text-lg rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                  placeholder="Enter your question..."
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-500 border-t-transparent" />
                  ) : (
                    <Search className="w-6 h-6 text-gray-500" />
                  )}
                </button>
              </div>
            </form>

            <div className="space-y-6 pt-4">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-semibold mb-4">{response.tldr.title}</h2>
                <p className="text-gray-700 dark:text-gray-300">{response.tldr.concise_summary}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {response.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source.post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-sm line-clamp-2">{source.post_title}</h3>
                      <ExternalLink className="w-4 h-4 flex-shrink-0 ml-2" />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">r/{source.subreddit}</p>
                  </a>
                ))}
              </div>

              {response.main_sections.map((section, index) => (
                <div key={index} className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                  <h3 className="text-lg font-semibold mb-4">{section.section_title}</h3>
                  <ul className="space-y-4">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex gap-3">
                        <span className="text-gray-400">•</span>
                        <div>
                          <p className="mb-2">{point.text}</p>
                          <div className="flex gap-2 flex-wrap">
                            {point.sources.map((source, sourceIndex) => (
                              <a
                                key={sourceIndex}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                              >
                                <span>Source {sourceIndex + 1}</span>
                                <ArrowUpRight className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}