import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  MessageSquare,
  Share2,
  Navigation,
  MapPin,
  Clock,
  Radio,
  Hospital,
  AlertTriangle,
  CheckCircle2,
  HeartPulse,
  Activity,
  Sparkles,
} from 'lucide-react';
import { ActiveAmbulanceBooking } from '../../types/ambulance';

interface Props {
  booking: ActiveAmbulanceBooking;
  onCancelBooking?: () => void;
  onCallDriver?: () => void;
}

export const AmbulanceLiveTracker: React.FC<Props> = ({
  booking,
  onCancelBooking,
  onCallDriver,
}) => {
  // Animated countdown seconds
  const [secondsRemaining, setSecondsRemaining] = useState(booking.etaMinutes * 60);
  const [distance, setDistance] = useState(booking.distanceKm);
  const [speed, setSpeed] = useState(booking.speedKmH);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [isDriverCalling, setIsDriverCalling] = useState(false);

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });

      setDistance((prev) => {
        if (prev <= 0.2) return 0.1;
        return parseFloat((prev - 0.01).toFixed(2));
      });

      // fluctuate speed slightly for realism
      setSpeed(68 + Math.floor(Math.sin(Date.now() / 1000) * 8));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate percentage of journey completed for route progress
  const totalSeconds = booking.etaMinutes * 60;
  const progressPercent = Math.min(
    95,
    Math.max(5, ((totalSeconds - secondsRemaining) / totalSeconds) * 100)
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `🚨 CareVista Live Ambulance SOS Tracking: ${booking.ambulanceName} (#${booking.vehicleNumber}) is en route to ${booking.pickupAddress}. ETA: ${formatTime(secondsRemaining)}. Track live: https://carevista.health/track/${booking.shareToken}`
    );
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 3000);
  };

  const handleCall = () => {
    setIsDriverCalling(true);
    if (onCallDriver) onCallDriver();
    setTimeout(() => setIsDriverCalling(false), 2000);
  };

  return (
    <div className="w-full space-y-6 animate-fade-in">
      {/* Top Emergency Status Bar */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-rose-600 via-rose-700 to-rose-900 text-white shadow-xl shadow-rose-600/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white text-rose-600 font-black text-2xs flex items-center justify-center">
                !
              </span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xs font-extrabold uppercase tracking-widest text-rose-200">
                Live Dispatch In Progress
              </span>
              <span className="px-2 py-0.5 rounded-full text-3xs font-extrabold bg-white/20 backdrop-blur-md">
                {booking.triageCode}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {booking.ambulanceName} En Route
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-3xs text-rose-200 uppercase tracking-wider block">
              Estimated Arrival
            </span>
            <div className="text-3xl font-black font-mono tracking-tight text-white flex items-center gap-1.5 justify-end">
              <Clock className="w-6 h-6 text-rose-200 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{formatTime(secondsRemaining)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Radar Map (Left) + Driver / Telemetry (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Simulated GPS Radar Map (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative">
          {/* Map Grid Canvas Simulation */}
          <div className="relative w-full h-[380px] sm:h-[440px] bg-[#0b132b] overflow-hidden flex items-center justify-center">
            {/* Grid Coordinates Texture */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: `
                  linear-gradient(to right, #38bdf8 1px, transparent 1px),
                  linear-gradient(to bottom, #38bdf8 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />

            {/* City Street Vector Lines */}
            <svg
              viewBox="0 0 800 500"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22C55E" />
                  <stop offset="50%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>

                <filter id="routeGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Background Roads */}
              <path d="M50 120 L750 120" stroke="#1E293B" strokeWidth="12" />
              <path d="M50 260 L750 260" stroke="#1E293B" strokeWidth="16" />
              <path d="M50 400 L750 400" stroke="#1E293B" strokeWidth="10" />
              <path d="M180 30 L180 470" stroke="#1E293B" strokeWidth="12" />
              <path d="M420 30 L420 470" stroke="#1E293B" strokeWidth="18" />
              <path d="M640 30 L640 470" stroke="#1E293B" strokeWidth="12" />

              {/* Diagonal Arterial Expressway */}
              <path d="M80 450 L380 260 L720 80" stroke="#334155" strokeWidth="22" strokeLinecap="round" />

              {/* The Dispatched Ambulance Route (Curved S-shape to patient) */}
              <path
                id="emergencyRoute"
                d="M120 120 Q 280 140 380 260 T 640 380"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                filter="url(#routeGlow)"
                strokeDasharray="8 8"
                className="animate-pulse"
              />

              {/* Destination Receiving Hospital Marker */}
              <g transform="translate(110, 110)">
                <circle cx="10" cy="10" r="22" fill="#0284C7" opacity="0.3" className="animate-ping" />
                <circle cx="10" cy="10" r="14" fill="#0284C7" />
                <path d="M10 5 L10 15 M5 10 L15 10" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                <text x="24" y="14" fill="#E2E8F0" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                  Destination Hospital (ER Trauma Bay)
                </text>
              </g>

              {/* Patient Pickup Location Marker (With triple expanding radar ping) */}
              <g transform="translate(630, 370)">
                <circle cx="10" cy="10" r="38" fill="none" stroke="#EF4444" strokeWidth="2" className="animate-sonar-1" />
                <circle cx="10" cy="10" r="38" fill="none" stroke="#EF4444" strokeWidth="2" className="animate-sonar-2" />
                <circle cx="10" cy="10" r="38" fill="none" stroke="#EF4444" strokeWidth="2" className="animate-sonar-3" />
                <circle cx="10" cy="10" r="14" fill="#EF4444" />
                <circle cx="10" cy="10" r="6" fill="#FFFFFF" />
                <text x="-90" y="-12" fill="#FCA5A5" fontSize="12" fontWeight="900" fontFamily="sans-serif">
                  📍 YOUR LOCATION
                </text>
              </g>
            </svg>

            {/* Dynamic Moving Ambulance Icon on Route */}
            <div
              className="absolute z-20 pointer-events-none transition-all duration-1000 ease-linear"
              style={{
                // Interpolate along route based on progressPercent
                left: `${15 + (progressPercent / 100) * 65}%`,
                top: `${25 + (progressPercent / 100) * 50}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative flex flex-col items-center">
                {/* Flashing roof strobe */}
                <div className="absolute -top-3 w-4 h-4 rounded-full bg-rose-500 animate-ping opacity-90" />
                <div className="p-2.5 rounded-2xl bg-rose-600 text-white shadow-2xl shadow-rose-600/80 border-2 border-white flex items-center justify-center">
                  <Navigation className="w-5 h-5 -rotate-45" />
                </div>
                {/* ETA Floating Pill */}
                <span className="mt-1 px-2 py-0.5 rounded-lg bg-slate-900/95 text-white text-3xs font-black font-mono border border-slate-700 shadow-md whitespace-nowrap">
                  🚑 {formatTime(secondsRemaining)} ({distance} km)
                </span>
              </div>
            </div>

            {/* Live Map Overlays */}
            {/* Top Left: Map Mode & Green Wave Corridor Status */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
              <div className="px-3 py-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-2xs flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="font-bold">GPS Precision: 0.8m • Satellite Live</span>
              </div>
              <div className="px-3 py-1 rounded-2xl bg-emerald-950/80 backdrop-blur-md border border-emerald-700/80 text-emerald-300 text-3xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Priority Emergency Traffic Signals Synchronized</span>
              </div>
            </div>

            {/* Bottom Right: Location details */}
            <div className="absolute bottom-4 right-4 z-20 max-w-xs p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white text-xs">
              <div className="flex items-center gap-1.5 text-slate-400 text-2xs uppercase font-bold">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Pickup Address</span>
              </div>
              <div className="font-bold text-slate-100 truncate mt-0.5">
                {booking.pickupAddress}
              </div>
              <div className="text-3xs text-teal-300 mt-0.5">
                Destination: {booking.hospitalDestination}
              </div>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="p-4 bg-slate-950/90 border-t border-slate-800">
            <div className="grid grid-cols-4 gap-2 text-2xs">
              <div className="text-center">
                <div className="w-6 h-6 mx-auto rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-3xs mb-1">
                  ✓
                </div>
                <span className="font-bold text-emerald-400 block">Dispatched</span>
                <span className="text-3xs text-slate-500">Unit Confirmed</span>
              </div>

              <div className="text-center">
                <div className="w-6 h-6 mx-auto rounded-full bg-rose-600 text-white font-bold flex items-center justify-center text-3xs mb-1 animate-pulse">
                  2
                </div>
                <span className="font-bold text-rose-400 block">En Route</span>
                <span className="text-3xs text-slate-500">{speed} km/h</span>
              </div>

              <div className="text-center opacity-60">
                <div className="w-6 h-6 mx-auto rounded-full bg-slate-800 text-slate-400 font-bold flex items-center justify-center text-3xs mb-1">
                  3
                </div>
                <span className="font-bold text-slate-300 block">Scene Arrival</span>
                <span className="text-3xs text-slate-500">&lt; 2 mins away</span>
              </div>

              <div className="text-center opacity-60">
                <div className="w-6 h-6 mx-auto rounded-full bg-slate-800 text-slate-400 font-bold flex items-center justify-center text-3xs mb-1">
                  4
                </div>
                <span className="font-bold text-slate-300 block">ER Handover</span>
                <span className="text-3xs text-slate-500">Trauma Ready</span>
              </div>
            </div>
          </div>
        </div>

        {/* Paramedic Crew & Emergency Telemetry (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Driver & Paramedic Crew Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Ambulance Crew
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-2xs font-extrabold bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                {booking.vehicleNumber}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white font-black text-xl flex items-center justify-center shadow-md">
                {booking.driverName.charAt(0)}
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-white text-base">
                  {booking.driverName}
                </h4>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Certified EVOC Ambulance Pilot
                </div>
                <div className="flex items-center gap-1 text-2xs text-amber-500 font-bold mt-0.5">
                  <span>★ {booking.driverRating}</span>
                  <span className="text-slate-400">• 1,420+ Emergency Trips</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Lead Paramedic:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{booking.paramedicDoctor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Triage Reason:</span>
                <span className="font-bold text-rose-600">{booking.emergencyReason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Patient:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{booking.patientName}</span>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleCall}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{isDriverCalling ? 'Connecting...' : 'Call Driver'}</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedShareLink ? 'Link Copied!' : 'Share SOS'}</span>
              </button>
            </div>
          </div>

          {/* Real-Time Telemetry Bridge Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider">
                <HeartPulse className="w-4 h-4 animate-pulse" />
                <span>Pre-Hospital Telemetry Bridge</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/60">
                <span className="text-3xs text-teal-600 uppercase font-bold block">Patient SpO2</span>
                <span className="text-xl font-black font-mono text-teal-700 dark:text-teal-300">
                  {booking.vitalVesselSpo2}%
                </span>
                <span className="text-3xs text-slate-400 block">Normal reserve</span>
              </div>

              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/60">
                <span className="text-3xs text-rose-600 uppercase font-bold block">Pulse Telemetry</span>
                <span className="text-xl font-black font-mono text-rose-700 dark:text-rose-300">
                  {booking.vitalVesselPulse} bpm
                </span>
                <span className="text-3xs text-slate-400 block">Live Sinus</span>
              </div>
            </div>

            {/* ECG Strip Animation */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden relative">
              <div className="text-3xs text-emerald-400 font-mono mb-1 flex items-center justify-between">
                <span>LEAD II ECG TELEMETRY</span>
                <span className="animate-pulse">25 mm/s • 10 mm/mV</span>
              </div>
              <svg viewBox="0 0 300 40" className="w-full h-8 stroke-emerald-400 fill-none stroke-2">
                <path
                  d="M0 20 L40 20 L45 10 L50 30 L55 5 L60 35 L65 20 L110 20 L115 10 L120 30 L125 5 L130 35 L135 20 L180 20 L185 10 L190 30 L195 5 L200 35 L205 20 L250 20 L255 10 L260 30 L265 5 L270 35 L275 20 L300 20"
                  strokeDasharray="400"
                  style={{
                    animation: 'ecgScroll 2s linear infinite',
                  }}
                />
              </svg>
            </div>

            {/* Cancel booking option */}
            {onCancelBooking && (
              <button
                onClick={onCancelBooking}
                className="w-full py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 font-semibold text-xs transition-all cursor-pointer"
              >
                Cancel Dispatch Request
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
