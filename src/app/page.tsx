
'use client';

import { useState } from 'react';
import { fetchAIResponse } from '@/services/api';
import type { AIResponse } from '@/types/api';

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
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">AI Analysis</h1>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Enter your query..."
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </form>

        {response && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">{response.query_title}</h2>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Comments</p>
                  <p className="text-xl font-bold">{response.stats.total_comments}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Relevant Comments</p>
                  <p className="text-xl font-bold">{response.stats.relevant_comments}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Discussions</p>
                  <p className="text-xl font-bold">{response.stats.relevant_discussions}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">TLDR</h3>
              <p className="text-lg font-medium mb-2">{response.tldr.title}</p>
              <p className="text-gray-700 dark:text-gray-300">{response.tldr.concise_summary}</p>
            </div>

            {response.main_sections.map((section, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-4">{section.section_title}</h3>
                <ul className="space-y-4">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex gap-2">
                      <span>•</span>
                      <p>{point.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
