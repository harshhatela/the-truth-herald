import { useState, useEffect } from 'react';

export default function Navbar() {
  const [today, setToday] = useState('');
  const isMock = import.meta.env.VITE_USE_MOCK === 'true';

  useEffect(() => {
    const fmt = () => new Date().toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    setToday(fmt());

    // Refresh exactly at midnight
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
    const timer = setTimeout(() => setToday(fmt()), msUntilMidnight);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#f5f0e8' }}>

      {/* Edition strip — black bar at very top */}
      <div style={{
        backgroundColor: '#1a1208',
        color: '#f5f0e8',
        fontFamily: "'Special Elite', monospace",
        fontSize: '10px',
        letterSpacing: '2px',
        padding: '5px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span>EST. 2025 · VOL. I · EDITION 1 · PRICE: FREE</span>
        {isMock && (
          <span style={{ color: '#c0392b', letterSpacing: '3px' }}>◆ DEMO EDITION ◆</span>
        )}
      </div>

      {/* Masthead */}
      <div style={{ textAlign: 'center', padding: '16px 20px 0' }}>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 900,
          letterSpacing: '-1px',
          lineHeight: 1,
          color: '#1a1208',
          margin: 0,
        }}>
          THE TRUTH HERALD
        </h1>
        <p style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontSize: '1rem',
          color: '#6b5c40',
          margin: '6px 0 2px',
        }}>
          All The Truth That's Fit To Print
        </p>
        <p style={{
          fontFamily: "'Special Elite', monospace",
          fontSize: '11px',
          color: '#6b5c40',
          letterSpacing: '1px',
          margin: '0 0 10px',
        }}>
          {today}
        </p>
      </div>

      {/* Double rule */}
      <div style={{ borderTop: '3px double #2c2416', margin: '0 0 0 0' }} />

      {/* Navigation strip */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0',
        borderBottom: '1px solid #2c2416',
        backgroundColor: '#f5f0e8',
        flexWrap: 'wrap',
      }}>
        {[
          { label: 'FRONT PAGE', id: 'front-page' },
          { label: 'ANALYZER',   id: 'analyzer' },
          { label: 'HISTORY',    id: 'history' },
          { label: 'ABOUT',      id: 'about' },
        ].map(({ label, id }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              fontFamily: "'Special Elite', monospace",
              fontSize: '10px',
              letterSpacing: '2px',
              color: '#1a1208',
              background: 'transparent',
              border: 'none',
              borderRight: '1px solid #2c2416',
              padding: '8px 28px',
              cursor: 'pointer',
              transition: 'background 0.15s ease, color 0.15s ease',
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.background = '#1a1208';
              (e.target as HTMLButtonElement).style.color = '#f5f0e8';
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.background = 'transparent';
              (e.target as HTMLButtonElement).style.color = '#1a1208';
            }}
          >
            {label}
          </button>
        ))}
      </nav>

    </header>
  );
}
