import { AIResponse } from "@/types/api";
import { storageService } from "./storage";

export async function fetchAIResponse(query: string): Promise<AIResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3006';
  
  try {
    const response = await fetch(`${apiUrl}/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch response');
    }
    
    const data = await response.json();
    
    // Save the response to storage
    storageService.saveChat(query, data);
    
    return data;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    throw error;
  }
} 