import { useState, useRef } from 'react';

interface Props {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export default function AnalyzerForm({ onSubmit, isLoading }: Props) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handlePaste = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      setText(clip);
    } catch {
      textareaRef.current?.focus();
    }
  };

  return (
    <div className="analyzer-form-wrap" style={{ padding: '1.5rem 1.25rem' }}>

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
        SUBMIT FOR ANALYSIS
      </p>

      {/* Description */}
      <p style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        fontSize: '0.95rem',
        lineHeight: 1.65,
        color: '#2c2416',
        marginBottom: '1rem',
      }}>
        Paste or type the full text of any news article below. Our bureau of artificial
        intelligence shall render its verdict.
      </p>

      {/* 3D Paper Sheet wrapper */}
      <div className="paper-sheet-3d" style={{ marginBottom: '0.75rem', padding: '1px' }}>
        <div className="fold-corner" />
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste the article text here for verification..."
          rows={12}
          style={{
            width: '100%',
            background: '#f5f0e8',
            border: 'none',
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: '0.95rem',
            color: '#1a1208',
            padding: '0.75rem',
            resize: 'vertical',
            outline: 'none',
            lineHeight: 1.65,
          }}
        />
      </div>

      {/* Word count + paste row */}
      <div className="analyzer-form-actions" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.75rem',
      }}>
        <span style={{
          fontFamily: "'Special Elite', monospace",
          fontSize: '9px',
          letterSpacing: '1px',
          color: '#6b5c40',
        }}>
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </span>
        <button onClick={handlePaste} className="btn-ghost" type="button">
          PASTE ✂
        </button>
      </div>

      {/* Submit button */}
      <button
        onClick={() => text.trim() && onSubmit(text.trim())}
        disabled={isLoading || wordCount < 3}
        className="btn-primary"
      >
        {isLoading ? 'ANALYSING...' : 'VERIFY NOW →'}
      </button>

      {/* Dinkus ornament */}
      <p style={{
        textAlign: 'center',
        color: '#6b5c40',
        fontSize: '12px',
        letterSpacing: '6px',
        marginTop: '1rem',
      }}>
        ◆ ◆ ◆
      </p>

      {/* HOW IT WORKS mini explainer */}
      <div style={{
        border: '1px solid #2c2416',
        padding: '0.75rem',
        marginTop: '0.5rem',
      }}>
        <p style={{
          fontFamily: "'Special Elite', monospace",
          fontSize: '8px',
          letterSpacing: '2px',
          color: '#6b5c40',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          borderBottom: '0.5px solid rgba(44,36,22,0.3)',
          paddingBottom: '4px',
        }}>
          HOW IT WORKS
        </p>
        {['Paste any news article text above.',
          'Click VERIFY NOW to submit.',
          'AI analyses 50,000+ linguistic patterns.',
          'Verdict appears in the centre column.'].map((step, i) => (
          <p key={i} style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: '0.85rem',
            color: '#2c2416',
            lineHeight: 1.5,
            marginBottom: '0.25rem',
          }}>
            <span style={{ color: '#c0392b', fontFamily: "'Special Elite', monospace", fontSize: '9px' }}>
              {i + 1}.{' '}
            </span>
            {step}
          </p>
        ))}
      </div>

    </div>
  );
}
