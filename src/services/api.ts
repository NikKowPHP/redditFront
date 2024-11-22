import { AIResponse } from "@/types/api";

export async function fetchAIResponse(query: string): Promise<AIResponse> {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching AI response:', error);
    throw error;
  }
} 