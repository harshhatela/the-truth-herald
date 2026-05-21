import type { AnalysisResult } from '../types';

interface Props {
  result: AnalysisResult | null;
}

export default function ResultCard({ result }: Props) {
  // BEFORE ANALYSIS — decorative placeholder
  if (!result) {
    return (
      <div style={{ padding: '1.5rem', height: '100%' }}>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.5rem',
          fontWeight: 700,
          textAlign: 'center',
          color: '#1a1208',
          marginBottom: '0.5rem',
          letterSpacing: '-0.5px',
        }}>
          THE TRUTH HERALD
        </h2>
        <p style={{
          fontFamily: "'Special Elite', monospace",
          fontSize: '9px',
          letterSpacing: '2.5px',
          color: '#6b5c40',
          textAlign: 'center',
          marginBottom: '1.5rem',
        }}>
          AWAITING ARTICLE SUBMISSION
        </p>
        {/* Lorem placeholder columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.25rem',
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: '0.85rem',
          lineHeight: 1.7,
          color: '#9a8c78',
          textAlign: 'justify',
        }}>
          <p>
            In an era where information travels at the speed of light, the discerning reader must
            exercise the utmost vigilance. Our bureau of artificial intelligence stands ready to
            assist in the noble pursuit of truth, employing the most advanced methods of textual
            analysis known to modern science.
          </p>
          <p>
            The methods employed herein draw upon a corpus of over forty-five thousand verified
            articles, both authentic and fraudulent, ensuring that our analytical engine maintains
            the highest standards of accuracy in its pronouncements.
          </p>
        </div>
        <p style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: '0.85rem',
          lineHeight: 1.7,
          color: '#9a8c78',
          textAlign: 'justify',
          marginTop: '1rem',
        }}>
          Submit your article in the column to the left, and our computational analysts shall
          render a verdict with all due haste. Each submission is examined for linguistic patterns,
          source credibility markers, and rhetorical devices commonly associated with fabricated
          reportage. We remind our esteemed readers that no machine, however sophisticated, can
          replace the judgement of a well-informed citizenry. Our verdicts are offered as guidance,
          not gospel.
        </p>
        <p style={{
          textAlign: 'center',
          color: '#6b5c40',
          fontSize: '12px',
          letterSpacing: '6px',
          marginTop: '1.5rem',
        }}>
          — ◆ —
        </p>
      </div>
    );
  }

  const isFake = result.verdict === 'FAKE';
  const stampColor = isFake ? '#c0392b' : '#1a6b3c';
  // Note: the mock API returns result.analysis.text_preview instead of result.articlePreview
  const previewText = (result as any).analysis?.text_preview || (result as any).articlePreview || '';
  const firstLetter = previewText[0] ?? 'T';
  const restOfPreview = previewText.slice(1) ?? '';
  const confidencePct = Math.round(result.confidence * 100);

  // Derive key indicators
  const indicators = [
    `Word Count: ${(result as any).analysis?.word_count || 0}`,
    `Classification: ${isFake ? 'Unreliable Source Material' : 'Credible Reportage'}`
  ];

  return (
    <article style={{ padding: '1.5rem', position: 'relative' }}>

      {/* Rubber stamp — absolutely positioned, top right */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        width: '110px',
        height: '110px',
        border: `4px solid ${stampColor}`,
        color: stampColor,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'rotate(-12deg)',
        opacity: 0.88,
        fontFamily: "'Special Elite', monospace",
        zIndex: 2,
      }}>
        {/* Inner border */}
        <div style={{
          position: 'absolute',
          inset: '4px',
          border: `1.5px solid ${stampColor}`,
        }} />
        <span style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '3px' }}>
          {isFake ? 'FAKE' : 'REAL'}
        </span>
        <span style={{ fontSize: '0.55rem', letterSpacing: '1.5px', marginTop: '2px' }}>
          {isFake ? 'NEWS' : 'VERIFIED'}
        </span>
      </div>

      {/* OUR VERDICT header */}
      <p style={{
        fontFamily: "'Special Elite', monospace",
        fontSize: '9px',
        letterSpacing: '3px',
        color: '#6b5c40',
        marginBottom: '0.25rem',
        textTransform: 'uppercase',
      }}>
        OUR VERDICT:
      </p>

      {/* Giant verdict word */}
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 'clamp(3rem, 6vw, 5rem)',
        fontWeight: 900,
        lineHeight: 1,
        color: stampColor,
        marginBottom: '0.5rem',
        letterSpacing: '-1px',
      }}>
        {isFake ? 'FAKE NEWS' : 'VERIFIED TRUE'}
      </h2>

      {/* Thin rule */}
      <hr style={{ border: 'none', borderTop: '1px solid #2c2416', margin: '0.75rem 0' }} />

      {/* Confidence bar */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: "'Special Elite', monospace",
          fontSize: '9px',
          letterSpacing: '2px',
          color: '#6b5c40',
          marginBottom: '4px',
        }}>
          <span>CONFIDENCE INDEX</span>
          <span style={{ color: stampColor, fontWeight: 700 }}>{confidencePct}%</span>
        </div>
        <div className="confidence-bar-track">
          <div
            className={`confidence-bar-fill ${isFake ? 'fake' : 'real'}`}
            style={{ width: `${confidencePct}%` }}
          />
        </div>
      </div>

      {/* Key indicators */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{
          fontFamily: "'Special Elite', monospace",
          fontSize: '9px',
          letterSpacing: '2px',
          color: '#6b5c40',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
          borderBottom: '0.5px solid rgba(44,36,22,0.3)',
          paddingBottom: '4px',
        }}>
          KEY INDICATORS
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {indicators.map((indicator, i) => (
            <li key={i} style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: '0.9rem',
              color: '#2c2416',
              lineHeight: 1.6,
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'baseline',
            }}>
              <span style={{ color: stampColor, flexShrink: 0 }}>◆</span>
              {indicator}
            </li>
          ))}
        </ul>
      </div>

      {/* Pull quote — article preview with dropcap */}
      {previewText && (
        <div className="pull-quote" style={{ marginBottom: '1rem' }}>
          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontSize: '0.95rem',
            lineHeight: 1.65,
            color: '#1a1208',
            margin: 0,
          }}>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '3.5rem',
              fontWeight: 900,
              float: 'left',
              lineHeight: 0.78,
              marginRight: '0.1em',
              marginTop: '0.1em',
              color: '#1a1208',
              fontStyle: 'normal',
            }}>
              {firstLetter}
            </span>
            {restOfPreview}…
          </p>
        </div>
      )}

      {/* Byline */}
      <p style={{
        fontFamily: "'Special Elite', monospace",
        fontSize: '8px',
        letterSpacing: '1.5px',
        color: '#6b5c40',
        textTransform: 'uppercase',
        borderTop: '0.5px solid rgba(44,36,22,0.3)',
        paddingTop: '0.5rem',
        marginTop: '0.5rem',
      }}>
        Analysis by The Truth Herald AI Engine
        {` · ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`}
      </p>

    </article>
  );
}
