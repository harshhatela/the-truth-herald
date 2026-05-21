import type { AnalysisHistoryItem } from '../types';

const STORAGE_KEY = 'fnd-analysis-history';
const MAX_ITEMS = 20;

/**
 * Get analysis history from localStorage.
 */
export function getHistory(): AnalysisHistoryItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

/**
 * Add an item to the analysis history.
 */
export function addToHistory(item: Omit<AnalysisHistoryItem, 'id' | 'timestamp'>): void {
  const history = getHistory();
  const newItem: AnalysisHistoryItem = {
    ...item,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  history.unshift(newItem);
  if (history.length > MAX_ITEMS) {
    history.pop();
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

/**
 * Clear all analysis history.
 */
export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}
