import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ShieldAlert, Sparkles, Gauge } from 'lucide-react';
import { ambulanceAudio } from './AmbulanceAudio';

interface Props {
  variant?: 'road' | 'air';
  isEmergencyActive?: boolean;
  speed?: 'normal' | 'fast' | 'urgent';
  interactive?: boolean;
  showRoad?: boolean;
  className?: string;
}

export const AmbulanceVehicleAnimation: React.FC<Props> = ({
  variant = 'road',
  isEmergencyActive = true,
  speed = 'urgent',
  interactive = true,
  showRoad = true,
  className = '',
}) => {
  const [isSirenAudioOn, setIsSirenAudioOn] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState<'normal' | 'fast' | 'urgent'>(speed);

  useEffect(() => {
    return () => {
      ambulanceAudio.stopSiren();
    };
  }, []);

  const toggleSirenSound = () => {
    if (isSirenAudioOn) {
      ambulanceAudio.stopSiren();
      setIsSirenAudioOn(false);
    } else {
      ambulanceAudio.startSiren(0.06);
      setIsSirenAudioOn(true);
    }
  };

  // Speed multiplier for road dashed animation
  const roadDuration = currentSpeed === 'urgent' ? '0.45s' : currentSpeed === 'fast' ? '0.8s' : '1.3s';
  const wheelDuration = currentSpeed === 'urgent' ? '0.35s' : currentSpeed === 'fast' ? '0.6s' : '1s';

  if (variant === 'air') {
    return (
      <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-b from-sky-900 via-slate-900 to-slate-950 p-6 flex flex-col items-center justify-center text-white ${className}`}>
        {/* Sky Background with Clouds & Stars */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-4 left-10 w-24 h-6 bg-white/40 rounded-full blur-md animate-pulse"></div>
          <div className="absolute top-12 right-16 w-36 h-8 bg-white/30 rounded-full blur-md"></div>
        </div>

        {/* Air Chopper SVG */}
        <div className="relative z-10 w-full max-w-md py-4 flex flex-col items-center">
          <div className="relative animate-float" style={{ animationDuration: '3.5s' }}>
            {/* Spinning Main Rotor Blades */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-64 h-2.5 z-20 flex items-center justify-center">
              <div
                className="w-full h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent rounded-full opacity-90 blur-2xs"
                style={{
                  animation: 'spinRotor 0.08s linear infinite',
                }}
              />
            </div>

            {/* Helicopter Body SVG */}
            <svg viewBox="0 0 340 160" className="w-72 sm:w-84 h-auto drop-shadow-2xl">
              <defs>
                <linearGradient id="heliBody" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" />
                  <stop offset="60%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#991B1B" />
                </linearGradient>
                <linearGradient id="heliGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369A1" stopOpacity="0.9" />
                </linearGradient>
                <filter id="heliSirenGlow">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Rotor Mast */}
              <rect x="156" y="24" width="8" height="18" fill="#475569" rx="2" />

              {/* Tail Boom & Tail Rotor */}
              <path d="M70 78 L5 68 L2 62 L65 72 Z" fill="#DC2626" />
              <path d="M5 68 L0 44 L8 44 L15 65 Z" fill="#B91C1C" />
              {/* Spinning Tail Rotor Blade */}
              <ellipse cx="6" cy="46" rx="1.5" ry="14" fill="#FDE047" opacity="0.85" className="animate-pulse" />

              {/* Main Fuselage */}
              <path
                d="M65 72 C65 52 90 40 140 40 L210 40 C250 40 275 60 270 85 C265 105 235 115 170 115 L100 115 C75 115 65 95 65 72 Z"
                fill="url(#heliBody)"
              />

              {/* Cockpit Canopy Bubble */}
              <path
                d="M175 44 L215 44 C248 45 264 62 260 84 L175 84 Z"
                fill="url(#heliGlass)"
              />

              {/* White Emergency Flank Stripe */}
              <path d="M70 76 L220 76 L216 88 L70 88 Z" fill="#FFFFFF" />

              {/* Red Cross on white flank */}
              <rect x="110" y="78" width="16" height="6" fill="#DC2626" rx="1" />
              <rect x="115" y="73" width="6" height="16" fill="#DC2626" rx="1" />

              <text x="135" y="86" fill="#DC2626" fontSize="9" fontWeight="900" fontFamily="sans-serif">
                MEDEVAC-1
              </text>

              {/* Landing Skids */}
              <line x1="95" y1="115" x2="90" y2="135" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
              <line x1="200" y1="115" x2="205" y2="135" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
              <path d="M60 137 L240 137 C248 137 254 133 256 128" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" fill="none" />

              {/* Strobe Light on Tail & Belly */}
              <circle cx="8" cy="44" r="4" fill="#EF4444" filter="url(#heliSirenGlow)" className="animate-ping" />
              <circle cx="160" cy="118" r="4" fill="#38BDF8" filter="url(#heliSirenGlow)" className="animate-ping" style={{ animationDelay: '0.4s' }} />
            </svg>

            {/* Downward Searchlight Beam */}
            <div
              className="absolute left-1/2 -bottom-16 -translate-x-1/2 w-48 h-32 opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(254, 240, 138, 0.6) 0%, rgba(254, 240, 138, 0) 70%)',
                clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)',
              }}
            />
          </div>

          <div className="mt-4 flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span className="font-bold text-amber-200">Air Ambulance Medevac En Route</span>
            <span className="text-white/60">• Cruising at 240 km/h</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-4 sm:p-6 text-white shadow-2xl border border-slate-800 ${className}`}>
      {/* Top Banner & Audio / Speed Controls */}
      {interactive && (
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-2 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="relative">
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              Code 3 Rapid Response Unit Active
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Speed Selector */}
            <div className="flex items-center bg-slate-800/90 rounded-xl p-1 text-2xs font-bold border border-slate-700/60">
              <Gauge className="w-3 h-3 text-slate-400 ml-1.5 mr-1" />
              <button
                onClick={() => setCurrentSpeed('normal')}
                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  currentSpeed === 'normal' ? 'bg-teal-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Cruise
              </button>
              <button
                onClick={() => setCurrentSpeed('fast')}
                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  currentSpeed === 'fast' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Fast
              </button>
              <button
                onClick={() => setCurrentSpeed('urgent')}
                className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer ${
                  currentSpeed === 'urgent' ? 'bg-rose-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                Emergency
              </button>
            </div>

            {/* Siren Sound Toggle */}
            <button
              onClick={toggleSirenSound}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                isSirenAudioOn
                  ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-600/40 animate-pulse'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              {isSirenAudioOn ? (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Siren Playing</span>
                  <div className="flex items-center gap-0.5 ml-1">
                    <span className="w-1 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-1 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="w-1 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span>Sound Muted</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Main Vehicle Stage Container */}
      <div className="relative w-full py-4 sm:py-6 flex flex-col items-center justify-center">
        {/* Dynamic Lightbar Strobe Ambient Halos in Background */}
        {isEmergencyActive && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-28 pointer-events-none z-0">
            {/* Red Light Strobe Glow */}
            <div
              className="absolute left-1/4 top-0 w-36 h-28 rounded-full blur-2xl opacity-60"
              style={{
                backgroundColor: '#EF4444',
                animation: 'sirenStrobeRed 0.6s infinite alternate ease-in-out',
              }}
            />
            {/* Blue Light Strobe Glow */}
            <div
              className="absolute right-1/4 top-0 w-36 h-28 rounded-full blur-2xl opacity-60"
              style={{
                backgroundColor: '#38BDF8',
                animation: 'sirenStrobeBlue 0.6s infinite alternate ease-in-out',
                animationDelay: '0.3s',
              }}
            />
          </div>
        )}

        {/* Vehicle Body with Vertical Suspension Vibration */}
        <div
          className="relative z-10 w-full max-w-xl"
          style={{
            animation: currentSpeed === 'urgent' ? 'vehicleVibe 0.28s infinite alternate ease-in-out' : 'vehicleVibe 0.5s infinite alternate ease-in-out',
          }}
        >
          {/* Animated Speed Trails behind the vehicle */}
          <div className="absolute top-1/2 -left-12 -translate-y-1/2 pointer-events-none opacity-40">
            <div className="w-16 h-0.5 bg-gradient-to-l from-white to-transparent mb-3 animate-pulse" />
            <div className="w-24 h-0.5 bg-gradient-to-l from-rose-400 to-transparent mb-2 animate-pulse" style={{ animationDelay: '0.1s' }} />
            <div className="w-20 h-0.5 bg-gradient-to-l from-sky-400 to-transparent animate-pulse" style={{ animationDelay: '0.2s' }} />
          </div>

          {/* Forward Projecting Headlight Cones */}
          <div
            className="absolute top-[48%] right-[-100px] sm:right-[-140px] w-36 sm:w-52 h-20 -translate-y-1/2 pointer-events-none z-20"
            style={{
              background: 'radial-gradient(ellipse at 0% 50%, rgba(254, 240, 138, 0.45) 0%, rgba(254, 240, 138, 0.1) 60%, transparent 80%)',
              clipPath: 'polygon(0% 40%, 100% 0%, 100% 100%, 0% 60%)',
            }}
          />

          {/* High-Fidelity SVG Ambulance */}
          <svg
            viewBox="0 0 540 240"
            className="w-full h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
          >
            <defs>
              {/* Paint Gradients */}
              <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#F8FAFC" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>

              <linearGradient id="stripeRed" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="50%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#B91C1C" />
              </linearGradient>

              <linearGradient id="windowTint" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="50%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#020617" />
              </linearGradient>

              <linearGradient id="wheelRubber" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>

              <linearGradient id="rimAlloy" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F1F5F9" />
                <stop offset="50%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>

              {/* Siren Glow Filter */}
              <filter id="sirenStrobeRedFilter" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              <filter id="sirenStrobeBlueFilter" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Ground Shadow under vehicle */}
            <ellipse cx="260" cy="208" rx="220" ry="14" fill="#000000" opacity="0.6" />

            {/* ROOF EMERGENCY LIGHTBAR */}
            <g id="roof-lightbar">
              {/* Lightbar base mount */}
              <rect x="230" y="32" width="130" height="8" rx="2" fill="#334155" />
              <rect x="250" y="24" width="90" height="9" rx="3" fill="#1E293B" />

              {/* Left Flashing Strobe (RED) */}
              <rect
                x="254"
                y="18"
                width="38"
                height="10"
                rx="3"
                fill="#EF4444"
                filter="url(#sirenStrobeRedFilter)"
                style={{
                  animation: 'sirenFlashRed 0.4s infinite alternate',
                }}
              />

              {/* Center White Pulse Strobe */}
              <rect
                x="294"
                y="19"
                width="8"
                height="8"
                rx="2"
                fill="#FFFFFF"
                className="animate-ping"
              />

              {/* Right Flashing Strobe (BLUE) */}
              <rect
                x="304"
                y="18"
                width="38"
                height="10"
                rx="3"
                fill="#0284C7"
                filter="url(#sirenStrobeBlueFilter)"
                style={{
                  animation: 'sirenFlashBlue 0.4s infinite alternate',
                  animationDelay: '0.2s',
                }}
              />
            </g>

            {/* MAIN VEHICLE BODY */}
            <g id="ambulance-chassis">
              {/* Back Box Patient Compartment */}
              <path
                d="M50 48 C50 42 55 38 62 38 L375 38 C382 38 388 43 389 50 L400 95 C410 98 425 105 440 120 L485 130 C498 135 505 145 505 160 L505 186 C505 190 502 194 498 194 L450 194 C450 170 415 170 415 194 L170 194 C170 170 135 170 135 194 L56 194 C52 194 48 190 48 186 L48 56 C48 52 50 48 50 48 Z"
                fill="url(#bodyGrad)"
                stroke="#CBD5E1"
                strokeWidth="2"
              />

              {/* Aerodynamic Cab Top Transition */}
              <path d="M375 38 L386 92 L340 92 Z" fill="#E2E8F0" />

              {/* Front Windshield */}
              <path
                d="M388 52 L398 94 L440 94 L422 55 C418 53 395 51 388 52 Z"
                fill="url(#windowTint)"
                stroke="#475569"
                strokeWidth="1.5"
              />
              {/* Driver Window Reflection */}
              <path d="M396 60 L425 90 L415 90 L392 60 Z" fill="#FFFFFF" opacity="0.18" />

              {/* Cab Side Door & Window */}
              <path
                d="M345 52 L382 52 L394 94 L345 94 Z"
                fill="url(#windowTint)"
                stroke="#475569"
                strokeWidth="1.5"
              />
              <line x1="344" y1="48" x2="344" y2="185" stroke="#94A3B8" strokeWidth="1.5" />
              <rect x="350" y="104" width="14" height="4" rx="2" fill="#64748B" />

              {/* Rear Patient Cabin Window (Frosted with ECG pulse inside) */}
              <rect
                x="85"
                y="54"
                width="85"
                height="38"
                rx="4"
                fill="url(#windowTint)"
                stroke="#64748B"
                strokeWidth="1.5"
              />
              <path
                d="M92 73 L105 73 L110 65 L116 81 L122 70 L128 73 L162 73"
                stroke="#2DD4BF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.9"
                className="animate-pulse"
              />

              {/* Rear Side Door Outline */}
              <rect x="185" y="54" width="70" height="38" rx="4" fill="url(#windowTint)" stroke="#64748B" strokeWidth="1.5" />
              <line x1="178" y1="45" x2="178" y2="185" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="265" y1="45" x2="265" y2="185" stroke="#94A3B8" strokeWidth="1.5" />
              <rect x="250" y="104" width="14" height="4" rx="2" fill="#64748B" />

              {/* HIGH-VISIBILITY EMERGENCY RED STRIPING */}
              <path
                d="M48 116 L498 116 L494 140 L48 140 Z"
                fill="url(#stripeRed)"
              />

              {/* STAR OF LIFE / MEDICAL RED CROSS */}
              <g id="medical-cross" transform="translate(130, 128) scale(0.9)">
                <circle cx="0" cy="0" r="18" fill="#FFFFFF" />
                <rect x="-4" y="-12" width="8" height="24" fill="#DC2626" rx="2" />
                <rect x="-12" y="-4" width="24" height="8" fill="#DC2626" rx="2" />
              </g>

              {/* AMBULANCE TEXT */}
              <text
                x="170"
                y="134"
                fill="#FFFFFF"
                fontSize="18"
                fontWeight="900"
                fontFamily="sans-serif"
                letterSpacing="3"
              >
                AMBULANCE
              </text>

              <text
                x="355"
                y="134"
                fill="#FFFFFF"
                fontSize="13"
                fontWeight="900"
                fontFamily="sans-serif"
              >
                108 / 911
              </text>

              {/* CareVista Fleet Badge */}
              <rect x="60" y="146" width="90" height="15" rx="3" fill="#0F766E" />
              <text x="66" y="157" fill="#FFFFFF" fontSize="8" fontWeight="800" fontFamily="sans-serif">
                CARE-VISTA ADVANCED
              </text>

              {/* Rear Safety Chevron Stripes (Yellow/Red reflective) */}
              <g id="chevrons" transform="translate(48, 146)">
                <path d="M0 0 L15 20 L0 40 L-10 40 L5 20 L-10 0 Z" fill="#FACC15" />
                <path d="M12 0 L27 20 L12 40 L2 40 L17 20 L2 0 Z" fill="#DC2626" />
              </g>

              {/* Front Grille & Bumper */}
              <path d="M495 145 L512 150 C516 155 516 180 508 188 L496 188 Z" fill="#1E293B" />
              {/* Front Grille LED Flashing Strobes */}
              <rect
                x="504"
                y="156"
                width="6"
                height="8"
                rx="1"
                fill="#38BDF8"
                className="animate-ping"
              />
              <rect
                x="504"
                y="168"
                width="6"
                height="8"
                rx="1"
                fill="#EF4444"
                className="animate-ping"
                style={{ animationDelay: '0.2s' }}
              />

              {/* Front Headlight Assembly */}
              <path
                d="M480 135 L502 138 C506 142 506 148 498 152 L478 150 Z"
                fill="#F8FAFC"
                stroke="#64748B"
              />
              <ellipse cx="494" cy="144" rx="6" ry="4" fill="#FEF08A" className="animate-pulse" />

              {/* Rear Tail Lights */}
              <rect x="46" y="144" width="5" height="18" rx="2" fill="#DC2626" className="animate-pulse" />
              <rect x="46" y="164" width="5" height="10" rx="1" fill="#FACC15" />

              {/* Side Mirror */}
              <rect x="388" y="86" width="6" height="14" rx="2" fill="#0F172A" />
              <rect x="384" y="88" width="4" height="10" rx="1" fill="#F8FAFC" />
            </g>

            {/* WHEELS (Animated spinning spokes & rim) */}
            {/* REAR WHEEL */}
            <g id="rear-wheel" transform="translate(152, 194)">
              {/* Tire Rubber */}
              <circle cx="0" cy="0" r="32" fill="url(#wheelRubber)" />
              <circle cx="0" cy="0" r="23" fill="#475569" />
              {/* Alloy Rim with Spoke Lines spinning */}
              <g
                style={{
                  transformOrigin: '0 0',
                  animation: `spinWheel ${wheelDuration} linear infinite`,
                }}
              >
                <circle cx="0" cy="0" r="18" fill="url(#rimAlloy)" />
                <circle cx="0" cy="0" r="6" fill="#0F172A" />
                <line x1="-16" y1="0" x2="16" y2="0" stroke="#0F172A" strokeWidth="3" />
                <line x1="0" y1="-16" x2="0" y2="16" stroke="#0F172A" strokeWidth="3" />
                <line x1="-12" y1="-12" x2="12" y2="12" stroke="#0F172A" strokeWidth="2.5" />
                <line x1="-12" y1="12" x2="12" y2="-12" stroke="#0F172A" strokeWidth="2.5" />
              </g>
            </g>

            {/* FRONT WHEEL */}
            <g id="front-wheel" transform="translate(432, 194)">
              {/* Tire Rubber */}
              <circle cx="0" cy="0" r="32" fill="url(#wheelRubber)" />
              <circle cx="0" cy="0" r="23" fill="#475569" />
              {/* Alloy Rim with Spoke Lines spinning */}
              <g
                style={{
                  transformOrigin: '0 0',
                  animation: `spinWheel ${wheelDuration} linear infinite`,
                }}
              >
                <circle cx="0" cy="0" r="18" fill="url(#rimAlloy)" />
                <circle cx="0" cy="0" r="6" fill="#0F172A" />
                <line x1="-16" y1="0" x2="16" y2="0" stroke="#0F172A" strokeWidth="3" />
                <line x1="0" y1="-16" x2="0" y2="16" stroke="#0F172A" strokeWidth="3" />
                <line x1="-12" y1="-12" x2="12" y2="12" stroke="#0F172A" strokeWidth="2.5" />
                <line x1="-12" y1="12" x2="12" y2="-12" stroke="#0F172A" strokeWidth="2.5" />
              </g>
            </g>
          </svg>
        </div>

        {/* ROAD WITH MOVING DASHED MARKS */}
        {showRoad && (
          <div className="relative w-full mt-[-8px] h-10 overflow-hidden flex flex-col justify-center">
            {/* Dark Asphalt base */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/80" />

            {/* Continuous Rapid Moving Dashed Stripes */}
            <div
              className="relative z-10 w-[200%] h-1.5 flex gap-8 items-center"
              style={{
                animation: `roadMove ${roadDuration} linear infinite`,
              }}
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-1.5 bg-amber-400/90 rounded-full shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                />
              ))}
            </div>

            {/* Lower edge road curb */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-950" />
          </div>
        )}
      </div>

      {/* Real-Time Telemetry Bar */}
      <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-2xs pt-3 border-t border-slate-800">
        <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/40">
          <span className="text-slate-400 block uppercase font-semibold">Priority Status</span>
          <span className="font-bold text-rose-400 flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
            Green Corridor Active
          </span>
        </div>

        <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/40">
          <span className="text-slate-400 block uppercase font-semibold">Speed Telemetry</span>
          <span className="font-mono font-bold text-teal-400 mt-0.5 block">
            {currentSpeed === 'urgent' ? '82 km/h' : currentSpeed === 'fast' ? '64 km/h' : '45 km/h'}
          </span>
        </div>

        <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/40">
          <span className="text-slate-400 block uppercase font-semibold">Oxygen System</span>
          <span className="font-mono font-bold text-emerald-400 mt-0.5 block">100% Pressurized</span>
        </div>

        <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/40">
          <span className="text-slate-400 block uppercase font-semibold">Hospital ER Link</span>
          <span className="font-bold text-sky-400 flex items-center gap-1 mt-0.5">
            <Sparkles className="w-2.5 h-2.5" />
            Trauma Unit Alerted
          </span>
        </div>
      </div>
    </div>
  );
};
