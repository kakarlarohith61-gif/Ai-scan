import React from 'react';

export const HeartIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-heartbeat drop-shadow-md">
      <defs>
        <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F43F5E" />
          <stop offset="60%" stop-color="#E11D48" />
          <stop offset="100%" stop-color="#BE123C" />
        </linearGradient>
        <linearGradient id="aortaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FB7185" />
          <stop offset="100%" stop-color="#E11D48" />
        </linearGradient>
        <filter id="heartGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Superior Vena Cava & Aorta */}
      <path d="M42 22 V12 C42 9 47 9 47 12 V20" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" />
      <path d="M54 22 C54 10 68 10 68 18 V26" stroke="url(#aortaGrad)" strokeWidth="6" strokeLinecap="round" />
      <path d="M60 14 V8" stroke="url(#aortaGrad)" strokeWidth="4" strokeLinecap="round" />
      {/* Heart Body */}
      <path
        d="M50 86 C25 68 16 52 16 38 C16 26 26 18 37 18 C44 18 48 22 50 26 C52 22 56 18 63 18 C74 18 84 26 84 38 C84 52 75 68 50 86 Z"
        fill="url(#heartGrad)"
        filter="url(#heartGlow)"
      />
      {/* Coronary Vessels */}
      <path d="M46 36 Q42 50 35 60 M43 46 Q48 56 46 68" stroke="#FFE4E6" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      {/* Specular Highlight */}
      <path d="M26 32 C26 26 31 22 37 22" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    </svg>
  </div>
);

export const LungsIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-breath drop-shadow-md">
      <defs>
        <linearGradient id="lungGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2DD4BF" />
          <stop offset="60%" stop-color="#0D9488" />
          <stop offset="100%" stop-color="#115E59" />
        </linearGradient>
      </defs>
      {/* Trachea */}
      <path d="M50 14 V40 M50 20 H54 M50 26 H54 M50 32 H54" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
      {/* Bronchi */}
      <path d="M50 40 L35 52 M50 40 L65 52" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
      {/* Left Lung */}
      <path
        d="M34 46 C20 48 15 62 16 74 C17 84 28 88 38 85 C42 84 45 78 44 70 C43 56 40 48 34 46 Z"
        fill="url(#lungGrad)"
      />
      {/* Right Lung (with cardiac notch) */}
      <path
        d="M66 46 C80 48 85 62 84 74 C83 84 72 88 62 85 C58 84 55 74 57 66 C59 58 60 48 66 46 Z"
        fill="url(#lungGrad)"
      />
      {/* Bronchial internal trees */}
      <path d="M30 56 Q24 64 26 74 M32 66 Q36 74 34 80" stroke="#CCFBF1" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M70 56 Q76 64 74 74 M68 66 Q64 74 66 80" stroke="#CCFBF1" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  </div>
);

export const BrainIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-float drop-shadow-md">
      <defs>
        <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#C084FC" />
          <stop offset="50%" stop-color="#9333EA" />
          <stop offset="100%" stop-color="#6B21A8" />
        </linearGradient>
      </defs>
      {/* Left Hemisphere */}
      <path
        d="M48 24 C34 22 22 30 20 44 C18 54 22 62 26 66 C24 74 30 82 40 82 C44 82 47 78 48 74 Z"
        fill="url(#brainGrad)"
      />
      {/* Right Hemisphere */}
      <path
        d="M52 24 C66 22 78 30 80 44 C82 54 78 62 74 66 C76 74 70 82 60 82 C56 82 53 78 52 74 Z"
        fill="url(#brainGrad)"
      />
      {/* Gyri & Sulci folds */}
      <path d="M30 38 Q38 34 42 42 T32 54 Q40 58 44 66" stroke="#F3E8FF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" />
      <path d="M70 38 Q62 34 58 42 T68 54 Q60 58 56 66" stroke="#F3E8FF" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" />
      {/* Synapse light dots */}
      <circle cx="34" cy="46" r="2.5" fill="#FDE047" className="animate-ping" />
      <circle cx="66" cy="46" r="2.5" fill="#38BDF8" className="animate-ping" style={{ animationDelay: '1s' }} />
    </svg>
  </div>
);

export const ReportIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="clipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" />
          <stop offset="100%" stop-color="#0284C7" />
        </linearGradient>
      </defs>
      {/* Clipboard board */}
      <rect x="22" y="18" width="56" height="72" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />
      {/* Top Clip */}
      <rect x="36" y="12" width="28" height="12" rx="4" fill="url(#clipGrad)" />
      <circle cx="50" cy="18" r="2.5" fill="white" />
      {/* Document Lines */}
      <rect x="30" y="32" width="40" height="4" rx="2" fill="#0D9488" />
      <rect x="30" y="42" width="32" height="3" rx="1.5" fill="#94A3B8" />
      <rect x="30" y="50" width="36" height="3" rx="1.5" fill="#94A3B8" />
      <rect x="30" y="58" width="24" height="3" rx="1.5" fill="#94A3B8" />
      {/* Checkmark badge */}
      <circle cx="62" cy="70" r="10" fill="#10B981" />
      <path d="M57 70 L60 73 L67 66" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export const PillIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="capsuleA" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#34D399" />
          <stop offset="100%" stop-color="#059669" />
        </linearGradient>
        <linearGradient id="capsuleB" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" />
          <stop offset="100%" stop-color="#0284C7" />
        </linearGradient>
      </defs>
      <g transform="rotate(-35 50 50)">
        {/* Capsule Left Half */}
        <path d="M30 40 C30 32 38 26 46 26 H50 V74 H46 C38 74 30 68 30 60 Z" fill="url(#capsuleA)" />
        {/* Capsule Right Half */}
        <path d="M50 26 H54 C62 26 70 32 70 40 V60 C70 68 62 74 54 74 H50 Z" fill="url(#capsuleB)" />
        {/* Dividing Ring */}
        <rect x="48" y="24" width="4" height="52" rx="2" fill="white" opacity="0.8" />
        {/* Specular Highlight */}
        <path d="M36 34 C36 30 40 28 44 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      </g>
    </svg>
  </div>
);

export const DoctorAvatarIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#14B8A6" />
          <stop offset="100%" stop-color="#0F766E" />
        </linearGradient>
      </defs>
      {/* Background Circle */}
      <circle cx="50" cy="50" r="46" fill="url(#docGrad)" />
      {/* Head */}
      <circle cx="50" cy="38" r="16" fill="#FED7AA" />
      {/* Hair */}
      <path d="M34 38 C34 26 42 22 50 22 C58 22 66 26 66 38 C66 32 62 27 50 27 C38 27 34 32 34 38 Z" fill="#475569" />
      {/* Doctor Coat */}
      <path d="M26 84 C26 66 36 60 50 60 C64 60 74 66 74 84 Z" fill="white" />
      {/* Inner Shirt & Stethoscope */}
      <path d="M44 60 L50 72 L56 60 Z" fill="#38BDF8" />
      <path d="M40 60 Q40 76 50 78 Q60 76 60 60" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="50" cy="80" r="3.5" fill="#CBD5E1" stroke="#0F172A" strokeWidth="1.5" />
    </svg>
  </div>
);

export const MedicalShieldIllustration: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => (
  <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10B981" />
          <stop offset="50%" stop-color="#0D9488" />
          <stop offset="100%" stop-color="#0284C7" />
        </linearGradient>
      </defs>
      <path
        d="M50 14 L80 26 C80 58 66 78 50 88 C34 78 20 58 20 26 Z"
        fill="url(#shieldGrad)"
      />
      {/* Medical Cross */}
      <rect x="44" y="36" width="12" height="32" rx="4" fill="white" />
      <rect x="34" y="46" width="32" height="12" rx="4" fill="white" />
    </svg>
  </div>
);
