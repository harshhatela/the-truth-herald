// Types for the fake news detector API

export interface AnalysisResult {
  verdict: 'FAKE' | 'REAL';
  confidence: number;
  analysis: {
    word_count: number;
    text_preview: string;
  };
}

export interface AnalysisHistoryItem {
  id: string;
  text_preview: string;
  verdict: 'FAKE' | 'REAL';
  confidence: number;
  timestamp: number;
}
