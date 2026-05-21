import type { AnalysisResult } from '../types';

const IS_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const API_URL = import.meta.env.VITE_API_URL || '/api/predict';

/**
 * Mock response for demo mode.
 * Returns a realistic-looking analysis result without any network calls.
 */
function getMockResponse(text: string): AnalysisResult {
  // Simulate analysis — use text characteristics to vary the mock result
  const wordCount = text.trim().split(/\s+/).length;
  const hasExclamation = text.includes('!');
  const hasAllCaps = /[A-Z]{5,}/.test(text);
  const hasSensational = /breaking|shocking|unbelievable|you won't believe/i.test(text);

  // Heuristic: sensational language → more likely "FAKE" in demo
  const isFake = hasExclamation || hasAllCaps || hasSensational || wordCount < 20;

  return {
    verdict: isFake ? 'FAKE' : 'REAL',
    confidence: isFake
      ? Math.round(72 + Math.random() * 23) // 72-95%
      : Math.round(68 + Math.random() * 27), // 68-95%
    analysis: {
      word_count: wordCount,
      text_preview: text.slice(0, 200) + (text.length > 200 ? '...' : ''),
    },
  };
}

/**
 * Analyze news text for authenticity.
 * In mock mode (VITE_USE_MOCK=true), returns a hardcoded response.
 * In production, calls the Firebase Function endpoint.
 */
export async function analyzeNews(text: string): Promise<AnalysisResult> {
  if (IS_MOCK) {
    // Simulate network delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800));
    return getMockResponse(text);
  }

  // Real API call to Firebase Function
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error || `Analysis failed with status ${response.status}`
    );
  }

  return response.json();
}
