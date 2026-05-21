interface ConfidenceMeterProps {
  confidence: number;
  verdict: 'FAKE' | 'REAL';
}

/**
 * ConfidenceMeter — simple horizontal ink-style progress bar
 * No animations, no gradients — clean newspaper typography
 */
export default function ConfidenceMeter({ confidence, verdict }: ConfidenceMeterProps) {
  const fillColor = verdict === 'FAKE' ? 'bg-red-stamp' : 'bg-green-stamp';

  return (
    <div className="w-full" id="confidence-meter">
      {/* Label row */}
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="font-label text-[10px] tracking-widest text-muted uppercase">
          Confidence Index
        </span>
        <span className="font-headline text-lg font-bold text-ink">
          {confidence}%
        </span>
      </div>

      {/* Bar track */}
      <div className="w-full h-3 bg-paper-dark border border-rule/30">
        <div
          className={`h-full ${fillColor} transition-all duration-500`}
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  );
}
