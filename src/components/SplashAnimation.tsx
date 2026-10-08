import React, { useEffect, useState } from 'react';

interface SplashAnimationProps {
  onComplete: () => void;
}

export const SplashAnimation: React.FC<SplashAnimationProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'enter' | 'glow' | 'open' | 'text' | 'exit'>('enter');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
      const timer = setTimeout(onComplete, 400);
      return () => clearTimeout(timer);
    }

    // Sequence stages: total ~1.6 seconds
    const t1 = setTimeout(() => setStage('glow'), 250);
    const t2 = setTimeout(() => setStage('open'), 600);
    const t3 = setTimeout(() => setStage('text'), 950);
    const t4 = setTimeout(() => setStage('exit'), 1400);
    const t5 = setTimeout(() => onComplete(), 1750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      onClick={onComplete}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#121316] select-none transition-opacity duration-400 cursor-pointer ${
        stage === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Soft Golden Halo Glow */}
        <div
          className={`absolute w-44 h-44 rounded-full bg-[#D4AF37]/20 blur-2xl transition-all duration-700 ${
            stage !== 'enter' ? 'scale-125 opacity-100' : 'scale-75 opacity-0'
          }`}
        />

        {/* Bible Vector Logo */}
        <div
          className={`relative z-10 transition-all duration-600 ease-out ${
            stage === 'enter' ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          <svg className="w-24 h-24 sm:w-28 sm:h-28" viewBox="0 0 120 120" fill="none">
            <defs>
              <linearGradient id="splashGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCEBA7" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#9C7720" />
              </linearGradient>
            </defs>

            {/* Book Cover Base */}
            <path
              d="M 60 84 C 50 81, 26 80, 14 85 L 14 36 C 26 31, 50 32, 60 37 Z"
              fill="#1F222B"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />
            <path
              d="M 60 84 C 70 81, 94 80, 106 85 L 106 36 C 94 31, 70 32, 60 37 Z"
              fill="#1F222B"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />

            {/* Left Page with subtle opening angle */}
            <path
              d="M 60 80 C 50 77, 28 77, 18 81 L 18 33 C 28 29, 50 29, 60 33 Z"
              fill="#272B36"
              stroke="#3F4555"
              strokeWidth="1"
            />
            {/* Right Page with subtle opening angle */}
            <path
              d="M 60 80 C 70 77, 92 77, 102 81 L 102 33 C 92 29, 70 29, 60 33 Z"
              fill="#272B36"
              stroke="#3F4555"
              strokeWidth="1"
            />

            {/* Center Book Spine */}
            <line x1="60" y1="33" x2="60" y2="80" stroke="#121316" strokeWidth="2" />

            {/* Radiant Cross Motif */}
            <g className={`transition-all duration-500 ${stage === 'open' || stage === 'text' || stage === 'exit' ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}>
              <rect x="58.5" y="42" width="3" height="26" rx="1" fill="url(#splashGold)" />
              <rect x="52.5" y="48" width="15" height="3" rx="1" fill="url(#splashGold)" />
              <circle cx="60" cy="49.5" r="1.5" fill="#FFFDE8" />
            </g>

            {/* Golden Bookmark Ribbon */}
            <path
              d="M 60 80 Q 60 89, 63 96 L 66 98 L 63 93 Q 61 88, 60 80 Z"
              fill="url(#splashGold)"
              opacity="0.9"
            />
          </svg>
        </div>

        {/* SVS Bible Branding */}
        <div
          className={`mt-4 text-center transition-all duration-500 ${
            stage === 'text' || stage === 'exit'
              ? 'translate-y-0 opacity-100'
              : 'translate-y-3 opacity-0'
          }`}
        >
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold tracking-widest text-[#EDE8DF]">
            SVS BIBLE
          </h1>
          <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-medium">
            Accurate Scripture · Simple Faith
          </p>
        </div>

        {/* Quiet skip hint */}
        <span className="mt-8 text-[10px] text-[#55524B] tracking-wider uppercase">
          Tap anywhere to continue
        </span>
      </div>
    </div>
  );
};
