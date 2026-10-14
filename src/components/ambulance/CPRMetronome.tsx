import React, { useState, useEffect } from 'react';
import { Heart, Volume2, VolumeX, Play, Pause, RotateCcw, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { ambulanceAudio } from './AmbulanceAudio';
import { PRE_ARRIVAL_GUIDES } from '../../data/ambulanceData';

export const CPRMetronome: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [compressionCount, setCompressionCount] = useState(0);
  const [cycleCount, setCycleCount] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedGuide, setSelectedGuide] = useState(PRE_ARRIVAL_GUIDES[0].id);

  // 110 BPM = 60000ms / 110 = ~545ms interval
  useEffect(() => {
    let interval: number | null = null;

    if (isActive) {
      interval = window.setInterval(() => {
        setCompressionCount((prev) => {
          const next = prev + 1;
          if (soundEnabled) {
            ambulanceAudio.playSingleBeep(next === 30 ? 1040 : 880, 50);
          }
          if (next >= 30) {
            setCycleCount((c) => c + 1);
            return 0;
          }
          return next;
        });
      }, 545);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, soundEnabled]);

  const handleReset = () => {
    setIsActive(false);
    setCompressionCount(0);
    setCycleCount(1);
  };

  const currentGuideObj = PRE_ARRIVAL_GUIDES.find((g) => g.id === selectedGuide) || PRE_ARRIVAL_GUIDES[0];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
            <Heart className="w-4 h-4 animate-pulse" />
            <span>Pre-Arrival First Responder Assistance</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            CPR Rhythm Metronome & Emergency Protocols
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-xs">
            AHA 110 BPM rhythm guide to maintain continuous chest compressions while ambulance is en route.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 border-rose-200 dark:border-rose-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent'
            }`}
            title="Toggle Metronome Audio Beep"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs text-white shadow-md transition-all cursor-pointer ${
              isActive
                ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20'
                : 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/30'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause CPR Beat</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Start CPR Beat (110 BPM)</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
            title="Reset counter"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metronome Beat Core Display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Animated Compression Pulser (Left) */}
        <div className="md:col-span-5 bg-gradient-to-br from-rose-50 to-rose-100/60 dark:from-rose-950/40 dark:to-slate-900 rounded-3xl p-6 border border-rose-200/80 dark:border-rose-900/60 flex flex-col items-center justify-center relative overflow-hidden text-center min-h-[240px]">
          {/* Pulsing Sonar Ring */}
          <div className="relative flex items-center justify-center my-3">
            {isActive && (
              <>
                <div className="absolute w-36 h-36 rounded-full bg-rose-500/20 animate-ping pointer-events-none" />
                <div className="absolute w-44 h-44 rounded-full border-2 border-rose-500/40 animate-pulse pointer-events-none" />
              </>
            )}

            {/* Inner Compression Disc */}
            <div
              className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-100 ${
                isActive
                  ? 'bg-gradient-to-tr from-rose-600 to-rose-500 text-white shadow-xl shadow-rose-600/40 scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-4 border-rose-200 dark:border-rose-900 shadow-md'
              }`}
            >
              <Heart className={`w-6 h-6 mb-1 ${isActive ? 'animate-bounce' : 'text-rose-500'}`} />
              <span className="text-3xl font-black font-mono leading-none">
                {compressionCount === 0 && cycleCount > 1 ? '30' : compressionCount}
              </span>
              <span className="text-3xs uppercase tracking-wider font-bold opacity-80">
                / 30 Beat
              </span>
            </div>
          </div>

          {/* Prompt status */}
          <div className="mt-2">
            {compressionCount >= 28 ? (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950 animate-bounce">
                💨 Prepare 2 Rescue Breaths!
              </span>
            ) : isActive ? (
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 animate-pulse">
                Push Hard & Fast • Depth 5-6 cm
              </span>
            ) : (
              <span className="text-xs text-slate-500 font-medium">
                Tap 'Start CPR Beat' to align compressions
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center gap-4 text-2xs text-slate-600 dark:text-slate-400 font-mono">
            <span>Cycle: <strong className="text-rose-600 font-bold">{cycleCount}</strong></span>
            <span>Target: <strong className="text-teal-600 font-bold">110 BPM</strong></span>
            <span>Ratio: <strong className="text-slate-900 dark:text-white font-bold">30:2</strong></span>
          </div>
        </div>

        {/* First Aid Emergency Protocols Tabs (Right) */}
        <div className="md:col-span-7 space-y-3">
          {/* Guide Selector Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl">
            {PRE_ARRIVAL_GUIDES.map((guide) => (
              <button
                key={guide.id}
                onClick={() => setSelectedGuide(guide.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedGuide === guide.id
                    ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {guide.title.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Guide Card Body */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 space-y-3">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                {currentGuideObj.title}
              </h4>
              <span className="text-2xs text-slate-400 block mt-0.5">
                {currentGuideObj.subtitle}
              </span>
            </div>

            <ol className="space-y-2">
              {currentGuideObj.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 font-bold flex items-center justify-center text-2xs mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 flex items-center gap-2 text-2xs text-amber-900 dark:text-amber-200">
              <Info className="w-4 h-4 shrink-0 text-amber-600" />
              <span className="font-semibold">{currentGuideObj.highlight}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
