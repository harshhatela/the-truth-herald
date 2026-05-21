import { useEffect, useState } from 'react';
// Import from existing history service — do not modify history.ts
import { getHistory } from '../services/history';

interface HistoryEntry {
  id: string;
  verdict: 'FAKE' | 'REAL';
  text_preview?: string;
  articlePreview?: string;
  confidence: number;
  timestamp: number;
}

const DID_YOU_KNOW = [
  'Our analytical engine is trained on a corpus of over 45,000 news articles — both authentic and fabricated — employing the method of Term Frequency–Inverse Document Frequency, a technique first described in 1972.',
  'Fake news stories are shared on social media six times faster than true ones, according to a landmark 2018 MIT study.',
  'The term "yellow journalism" was coined in the 1890s to describe sensationalist reporting by rival New York newspapers.',
  'Logistic regression, the model powering The Truth Herald, was first described by statistician David Cox in 1958.',
];

interface Props {
  refreshKey?: number;
}

export default function HistoryPanel({ refreshKey }: Props) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [didYouKnow] = useState(() => DID_YOU_KNOW[Math.floor(Math.random() * DID_YOU_KNOW.length)]);

  useEffect(() => {
    // getHistory returns items with text_preview and timestamp
    setHistory(getHistory().slice(0, 5) as unknown as HistoryEntry[]);
  }, [refreshKey]);

  return (
    <div style={{ padding: '1.5rem 1.25rem' }}>

      {/* Section header */}
      <p style={{
        fontFamily: "'Special Elite', monospace",
        fontSize: '9px',
        letterSpacing: '3px',
        color: '#6b5c40',
        textTransform: 'uppercase',
        borderBottom: '1px solid #2c2416',
        paddingBottom: '6px',
        marginBottom: '1rem',
      }}>
        RECENT VERDICTS
      </p>

      {/* History list */}
      {history.length === 0 ? (
        <p style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontSize: '0.9rem',
          color: '#6b5c40',
          lineHeight: 1.6,
        }}>
          No articles have yet been submitted for verification. Verdicts shall appear here as
          they are rendered.
        </p>
      ) : (
        <div>
          {history.map(entry => (
            <div key={entry.id} className="history-item">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '2px',
              }}>
                <span className={`verdict-badge verdict-badge-${entry.verdict.toLowerCase()}`}>
                  {entry.verdict}
                </span>
                <span style={{
                  fontFamily: "'Special Elite', monospace",
                  fontSize: '8px',
                  letterSpacing: '1px',
                  color: '#9a8c78',
                }}>
                  {Math.round(entry.confidence * 100)}%
                </span>
              </div>
              <p style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: '0.85rem',
                lineHeight: 1.5,
                color: '#2c2416',
                margin: 0,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}>
                {entry.text_preview || entry.articlePreview}
              </p>
              <p style={{
                fontFamily: "'Special Elite', monospace",
                fontSize: '8px',
                color: '#9a8c78',
                letterSpacing: '1px',
                marginTop: '2px',
              }}>
                {new Date(entry.timestamp).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Thin rule */}
      <hr style={{
        border: 'none',
        borderTop: '1px solid #2c2416',
        margin: '1rem 0',
      }} />

      {/* DID YOU KNOW */}
      <div>
        <p style={{
          fontFamily: "'Special Elite', monospace",
          fontSize: '9px',
          letterSpacing: '3px',
          color: '#6b5c40',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          DID YOU KNOW?
        </p>
        <p style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: '0.875rem',
          lineHeight: 1.65,
          color: '#2c2416',
        }}>
          {didYouKnow}
        </p>
      </div>

      {/* Dinkus */}
      <p style={{
        textAlign: 'center',
        color: '#6b5c40',
        fontSize: '11px',
        letterSpacing: '6px',
        marginTop: '1rem',
      }}>
        — ◆ —
      </p>

      {/* POWERED BY box */}
      <div style={{
        border: '1px solid #2c2416',
        padding: '0.5rem',
        textAlign: 'center',
        marginTop: '0.5rem',
      }}>
        <p style={{
          fontFamily: "'Special Elite', monospace",
          fontSize: '8px',
          letterSpacing: '1.5px',
          color: '#6b5c40',
          textTransform: 'uppercase',
          margin: 0,
        }}>
          POWERED BY GOOGLE VERTEX AI
        </p>
      </div>

    </div>
  );
}
