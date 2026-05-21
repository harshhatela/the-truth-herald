import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger unfold animation after mount
    const el = heroRef.current;
    if (el) {
      el.style.opacity = '0';
      requestAnimationFrame(() => {
        el.classList.add('newspaper-unfold');
      });
    }
  }, []);

  return (
    <section id="front-page" ref={heroRef} style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      borderBottom: '3px double #2c2416',
    }}>

      {/* Full-width 2-column grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1px 1fr',
        width: '100%',
      }}>

        {/* LEFT COLUMN */}
        <div style={{ padding: '3rem 3rem 3rem 2.5rem' }}>

          {/* Kicker */}
          <p style={{
            fontFamily: "'Special Elite', monospace",
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#c0392b',
            marginBottom: '1rem',
            textTransform: 'uppercase',
          }}>
            ◆ BREAKING THIS EDITION ◆
          </p>

          {/* Giant Headline */}
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            color: '#1a1208',
            marginBottom: '1.5rem',
          }}>
            In an Age of{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 700 }}>Misinformation</em>
            , Who Guards the Truth?
          </h2>

          {/* Body text — justified, EB Garamond */}
          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: '1.05rem',
            lineHeight: 1.75,
            textAlign: 'justify',
            color: '#2c2416',
            marginBottom: '1rem',
          }}>
            As the digital printing presses run ceaselessly, churning out untold volumes of daily
            dispatches, the discerning citizen finds themselves adrift in a sea of dubious claims.
            The Truth Herald offers a beacon of clarity: an artificial intelligence trained to
            separate the wheat of verifiable fact from the chaff of sensationalist fiction.
          </p>
          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: '1.05rem',
            lineHeight: 1.75,
            textAlign: 'justify',
            color: '#2c2416',
            marginBottom: '2rem',
          }}>
            Our analytical engine employs the rigorous mathematics of Term Frequency–Inverse
            Document Frequency, having studied over forty-five thousand verified and fabricated
            articles. It stands ready to serve the public interest. Simply submit any text below,
            and receive an instant, objective verdict.
          </p>

          {/* Scroll CTA */}
          <p className="bounce" style={{
            fontFamily: "'Special Elite', monospace",
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#6b5c40',
            textTransform: 'uppercase',
          }}>
            ↓ SUBMIT AN ARTICLE BELOW ↓
          </p>
        </div>

        {/* VERTICAL DIVIDER */}
        <div style={{ backgroundColor: '#2c2416', alignSelf: 'stretch' }} />

        {/* RIGHT COLUMN */}
        <div style={{ padding: '3rem 2.5rem 3rem 3rem' }}>

          {/* HOW IT WORKS */}
          <p style={{
            fontFamily: "'Special Elite', monospace",
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#6b5c40',
            marginBottom: '1.25rem',
            textTransform: 'uppercase',
          }}>
            ◆ HOW IT WORKS ◆
          </p>

          {/* Steps */}
          <ol style={{
            fontFamily: "'Special Elite', monospace",
            fontSize: '11px',
            lineHeight: 2.4,
            color: '#2c2416',
            letterSpacing: '0.5px',
            listStyle: 'none',
            padding: 0,
            margin: '0 0 2rem',
            borderTop: '1px solid #2c2416',
          }}>
            {[
              ['I.',   'PASTE · Submit any news article or dispatch'],
              ['II.',  'ANALYSE · Our engine tokenises the vocabulary'],
              ['III.', 'COMPARE · 50,000-feature logistic regression'],
              ['IV.',  'VERDICT · REAL or FAKE with confidence score'],
            ].map(([num, text]) => (
              <li key={num} style={{
                display: 'grid',
                gridTemplateColumns: '2rem 1fr',
                gap: '0.5rem',
                borderBottom: '0.5px solid rgba(44,36,22,0.25)',
                padding: '0.15rem 0',
              }}>
                <span style={{ color: '#c0392b', fontWeight: 700 }}>{num}</span>
                <span>{text}</span>
              </li>
            ))}
          </ol>

          {/* Dinkus */}
          <p style={{
            textAlign: 'center',
            color: '#6b5c40',
            fontSize: '13px',
            letterSpacing: '6px',
            margin: '0 0 1.5rem',
          }}>
            — ◆ —
          </p>

          {/* Stats grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
          }}>
            {[
              { num: '94%', label: 'ACCURACY RATE' },
              { num: '45K', label: 'ARTICLES STUDIED' },
            ].map(({ num, label }) => (
              <div key={label} className="stat-box">
                <div style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#c0392b',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}>
                  {num}
                </div>
                <div style={{
                  fontFamily: "'Special Elite', monospace",
                  fontSize: '9px',
                  letterSpacing: '2px',
                  color: '#6b5c40',
                }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
