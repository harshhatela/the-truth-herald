import { useState, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AnalyzerForm from './components/AnalyzerForm';
import ResultCard from './components/ResultCard';
import HistoryPanel from './components/HistoryPanel';
import About from './components/About';
import Footer from './components/Footer';
import { analyzeNews } from './services/api';
import { addToHistory } from './services/history';
import type { AnalysisResult } from './types';

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

  // Scroll-triggered reveal logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.target.classList.toggle('section-visible', e.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );
    
    document.querySelectorAll('.reveal-section').forEach((el) => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  const handleAnalyze = useCallback(async (text: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeNews(text);
      setResult(analysis);

      // Save to history
      addToHistory({
        text_preview: text.slice(0, 120) + (text.length > 120 ? '...' : ''),
        verdict: analysis.verdict,
        confidence: analysis.confidence,
      });
      setHistoryRefreshKey((k) => k + 1);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Masthead and sticky nav */}
      <Navbar />

      {/* 3D Unfold Front Page */}
      <HeroSection />

      {/* Main Content Area */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        
        {/* Error message */}
        {error && (
          <div style={{
            padding: '0.5rem 1rem',
            borderBottom: '1px solid #2c2416',
          }}>
            <div style={{
              border: '1px solid #c0392b',
              backgroundColor: 'rgba(192, 57, 43, 0.05)',
              padding: '0.5rem 1rem',
              color: '#c0392b',
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: '0.9rem',
            }}>
              <span style={{
                fontFamily: "'Special Elite', monospace",
                fontSize: '10px',
                letterSpacing: '2px',
                marginRight: '0.5rem',
              }}>
                ⚠ ERROR:
              </span>
              {error}
            </div>
          </div>
        )}

        {/* 3-column newspaper grid — wrapping sections with scroll reveal */}
        <div className="analyzer-grid">
          
          {/* Left column — Article Submission (Analyzer) */}
          <section id="analyzer" className="reveal-section border-rule" style={{ minWidth: 0 }}>
            <AnalyzerForm onSubmit={handleAnalyze} isLoading={isLoading} />
          </section>

          {/* Center column — Verdict / Placeholder */}
          <main className="reveal-section border-rule" style={{ minWidth: 0, transitionDelay: '0.1s' }}>
            <ResultCard result={result} />
          </main>

          {/* Right column — Recent Verdicts (History) */}
          <section id="history" className="reveal-section border-rule" style={{ minWidth: 0, transitionDelay: '0.2s' }}>
            <HistoryPanel refreshKey={historyRefreshKey} />
          </section>
          
        </div>

        {/* Full-width About Section with scroll reveal */}
        <About />

      </div>

      <Footer />
    </div>
  );
}

export default App;
