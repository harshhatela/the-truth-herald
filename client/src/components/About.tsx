export default function About() {
  return (
    <section id="about" className="reveal-section" style={{
      borderTop: '3px double #2c2416',
    }}>

      {/* Section header */}
      <div style={{
        borderBottom: '1px solid #2c2416',
        padding: '0.6rem 0',
        textAlign: 'center',
      }}>
        <span style={{
          fontFamily: "'Special Elite', monospace",
          fontSize: '9px',
          letterSpacing: '3px',
          color: '#6b5c40',
          textTransform: 'uppercase',
        }}>
          ◆ ABOUT THIS PUBLICATION ◆
        </span>
      </div>

      {/* 2-column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1px 1fr',
        width: '100%',
      }}>

        {/* LEFT — story column */}
        <div style={{ padding: '2rem 2.5rem' }}>
          <p style={{
            fontFamily: "'Special Elite', monospace",
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#c0392b',
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
          }}>
            ◆ EDITORIAL DESK ◆
          </p>

          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            color: '#1a1208',
            marginBottom: '1.25rem',
          }}>
            A Machine-Learning Bureau of Truth, Built for the Digital Age
          </h2>

          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: '1rem',
            lineHeight: 1.75,
            textAlign: 'justify',
            color: '#2c2416',
            marginBottom: '1rem',
          }}>
            The Truth Herald was established to combat the rising tide of digital deception. By
            fusing the timeless aesthetics of a 1920s broadsheet with the cutting-edge capabilities
            of modern machine learning, we present a tool that is both authoritative in appearance
            and rigorous in execution.
          </p>

          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: '1rem',
            lineHeight: 1.75,
            textAlign: 'justify',
            color: '#2c2416',
            marginBottom: '1.5rem',
          }}>
            Our prediction engine operates seamlessly in the cloud, utilising Google Vertex AI
            infrastructure to evaluate textual submissions against a vast corpus of known
            fabricated and authentic reports. It stands as a testament to the fact that while
            the mediums of communication may evolve, the value of the truth remains eternal.
          </p>

          {/* GitHub button */}
          <a
            href="https://github.com/harshhatela/fake-news-detector"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#1a1208',
              color: '#f5f0e8',
              fontFamily: "'Special Elite', monospace",
              fontSize: '9px',
              letterSpacing: '2px',
              padding: '10px 18px',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2c2416')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1a1208')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            VIEW ON GITHUB
          </a>
        </div>

        {/* VERTICAL DIVIDER */}
        <div style={{ backgroundColor: '#2c2416' }} />

        {/* RIGHT — tech specs column */}
        <div style={{ padding: '2rem 2.5rem' }}>
          <p style={{
            fontFamily: "'Special Elite', monospace",
            fontSize: '9px',
            letterSpacing: '3px',
            color: '#6b5c40',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            ◆ TECHNICAL SPECIFICATIONS ◆
          </p>

          <div style={{
            borderTop: '1px solid #2c2416',
          }}>
            {[
              ['FRONTEND',      'React 19 + TailwindCSS v4'],
              ['BACKEND',       'Firebase Functions (Python)'],
              ['MODEL',         'TF-IDF + Logistic Regression'],
              ['TRAINING DATA', 'Fake.csv + True.csv (114MB)'],
              ['INFRASTRUCTURE','Google Cloud + Firebase'],
              ['AUTHOR',        'Harsh Hatela'],
            ].map(([label, value]) => (
              <div key={label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                borderBottom: '0.5px solid rgba(44,36,22,0.25)',
                padding: '0.6rem 0',
                gap: '1rem',
                minWidth: 0,
              }}>
                <span style={{
                  fontFamily: "'Special Elite', monospace",
                  fontSize: '9px',
                  letterSpacing: '1.5px',
                  color: '#6b5c40',
                  textTransform: 'uppercase',
                  flexShrink: 0,
                }}>
                  {label}
                </span>
                <span style={{
                  fontFamily: "'Special Elite', monospace",
                  fontSize: '9px',
                  letterSpacing: '0.5px',
                  color: '#1a1208',
                  textAlign: 'right',
                  wordBreak: 'break-word',
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
