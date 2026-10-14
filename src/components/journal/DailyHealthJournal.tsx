import React, { useState } from 'react';
import { JournalEntry } from '../../types/health';
import {
  Droplets,
  Moon,
  Footprints,
  Smile,
  Meh,
  Frown,
  Zap,
  Coffee,
  CheckCircle2,
  Calendar,
  Plus,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  journalHistory: JournalEntry[];
  onSaveJournalEntry: (entry: JournalEntry) => void;
}

export const DailyHealthJournal: React.FC<Props> = ({
  journalHistory,
  onSaveJournalEntry,
}) => {
  const [selectedMood, setSelectedMood] = useState<JournalEntry['mood']>('Good');
  const [waterGlasses, setWaterGlasses] = useState(6);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [sleepQuality, setSleepQuality] = useState<JournalEntry['sleepQuality']>('Good');
  const [exerciseMinutes, setExerciseMinutes] = useState(35);
  const [exerciseType, setExerciseType] = useState('Brisk Outdoor Walking');
  const [symptomsInput, setSymptomsInput] = useState('');
  const [symptomsList, setSymptomsList] = useState<string[]>([
    'Mild screen fatigue around 4 PM',
  ]);
  const [notes, setNotes] = useState(
    'Took regular 20-minute eye stretch breaks today. Felt energized after morning walk.'
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleWaterClick = (index: number) => {
    const newVal = index + 1;
    setWaterGlasses(newVal);
    if (newVal === 8) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#38BDF8', '#0284C7', '#14B8A6'],
      });
    }
  };

  const handleAddSymptom = () => {
    if (symptomsInput.trim()) {
      setSymptomsList([...symptomsList, symptomsInput.trim()]);
      setSymptomsInput('');
    }
  };

  const handleSave = () => {
    const entry: JournalEntry = {
      id: `j-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      moodRating: selectedMood === 'Energized' ? 5 : selectedMood === 'Good' ? 4 : 3,
      waterGlasses,
      sleepHours,
      sleepQuality,
      exerciseMinutes,
      exerciseType,
      symptomsLogged: symptomsList,
      notes,
    };

    onSaveJournalEntry(entry);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const MOOD_OPTIONS: { type: JournalEntry['mood']; label: string; icon: string }[] = [
    { type: 'Energized', label: 'Energized', icon: '⚡' },
    { type: 'Good', label: 'Good & Calm', icon: '😊' },
    { type: 'Neutral', label: 'Neutral', icon: '😐' },
    { type: 'Low', label: 'Low Mood', icon: '😔' },
    { type: 'Exhausted', label: 'Exhausted', icon: '😴' },
    { type: 'Anxious', label: 'Tense', icon: '😰' },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Daily Mind & Body Companion</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Daily Health Journal
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Record daily hydration, restful sleep, emotional mood, physical activity, and subjective sensations.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all shadow-md shadow-teal-600/20 cursor-pointer self-start sm:self-auto"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isSaved ? 'Saved to Health Log!' : 'Save Today\'s Entry'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Daily Log Card */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-6">
          {/* Mood Selector */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              How are you feeling emotionally today?
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {MOOD_OPTIONS.map((m) => (
                <button
                  key={m.type}
                  onClick={() => setSelectedMood(m.type)}
                  className={`p-3 rounded-2xl border transition-all text-center cursor-pointer ${
                    selectedMood === m.type
                      ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 shadow-xs ring-2 ring-teal-500/10'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{m.icon}</div>
                  <div className="text-2xs font-bold text-slate-700 dark:text-slate-200 truncate">
                    {m.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Hydration Tracker: Interactive 8 Glasses */}
          <div className="p-5 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-sky-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Hydration Tracker
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                {waterGlasses} / 8 Glasses ({waterGlasses * 250} ml / 2000 ml)
              </span>
            </div>

            {/* 8 Clickable Cups */}
            <div className="flex items-center justify-between gap-2 pt-1">
              {Array.from({ length: 8 }).map((_, idx) => {
                const filled = idx < waterGlasses;
                return (
                  <button
                    key={idx}
                    onClick={() => handleWaterClick(idx)}
                    className={`flex-1 h-12 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                      filled
                        ? 'bg-sky-500 text-white shadow-xs scale-102'
                        : 'bg-white dark:bg-slate-800 text-slate-300 dark:text-slate-600 border border-slate-200 dark:border-slate-700 hover:border-sky-300'
                    }`}
                  >
                    <Droplets className="w-4 h-4" />
                    <span className="text-3xs font-mono mt-0.5">{idx + 1}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sleep & Exercise Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sleep */}
            <div className="p-5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Sleep Hours</span>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {sleepHours}h
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-2xs text-slate-400 font-medium">
                <span>Quality:</span>
                {(['Fair', 'Good', 'Excellent'] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setSleepQuality(q)}
                    className={`px-2 py-0.5 rounded-md cursor-pointer ${
                      sleepQuality === q
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-white'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Exercise */}
            <div className="p-5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Footprints className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Active Movement</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {exerciseMinutes} mins
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="120"
                step="5"
                value={exerciseMinutes}
                onChange={(e) => setExerciseMinutes(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <input
                type="text"
                value={exerciseType}
                onChange={(e) => setExerciseType(e.target.value)}
                placeholder="Workout type (e.g. Yoga, Walk)..."
                className="w-full text-xs px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-900 text-slate-800 dark:text-slate-200 outline-none"
              />
            </div>
          </div>

          {/* Daily Symptoms & Personal Journal Notes */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Any Aches or Symptoms Today?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Mild headache at 3 PM..."
                  value={symptomsInput}
                  onChange={(e) => setSymptomsInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSymptom();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={handleAddSymptom}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {symptomsList.map((s, i) => (
                  <span
                    key={i}
                    className="text-2xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1"
                  >
                    {s}
                    <button
                      onClick={() => setSymptomsList(symptomsList.filter((_, idx) => idx !== i))}
                      className="text-slate-400 hover:text-rose-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Personal Health Observations & Reflections
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did your body feel today? What was positive?"
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Right: Past Journal History Cards */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>Past Daily Logs</span>
          </div>

          <div className="space-y-3">
            {journalHistory.map((j) => (
              <div
                key={j.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{j.date}</span>
                  <span className="px-2 py-0.5 rounded-full text-2xs font-semibold bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300">
                    Mood: {j.mood}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-2xs text-slate-500 dark:text-slate-400 font-mono">
                  <span>💧 {j.waterGlasses} cups</span>
                  <span>🌙 {j.sleepHours} hrs</span>
                  <span>🏃 {j.exerciseMinutes} mins</span>
                </div>
                {j.notes && (
                  <p className="text-2xs text-slate-600 dark:text-slate-300 italic line-clamp-2">
                    "{j.notes}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
