import React, { useState } from 'react';
import { HealthGoal } from '../../types/health';
import {
  Sparkles,
  Target,
  CheckCircle2,
  Plus,
  Droplets,
  Footprints,
  Moon,
  Award,
  ArrowUpRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  goals: HealthGoal[];
  onUpdateGoalCurrent: (goalId: string, delta: number) => void;
}

export const WellnessPlanner: React.FC<Props> = ({
  goals,
  onUpdateGoalCurrent,
}) => {
  const [habitList, setHabitList] = useState([
    { id: 'h-1', title: 'Morning 15-minute natural sunlight walk', done: true },
    { id: 'h-2', title: '500ml water immediately upon waking', done: true },
    { id: 'h-3', title: 'Screen off 45 mins before bedtime', done: false },
    { id: 'h-4', title: 'Mid-afternoon neck and shoulder stretches', done: true },
    { id: 'h-5', title: 'Take Vitamin D3 with healthy breakfast fats', done: true },
  ]);

  const toggleHabit = (id: string) => {
    setHabitList(
      habitList.map((h) => {
        if (h.id === id) {
          if (!h.done) {
            confetti({
              particleCount: 30,
              spread: 40,
              origin: { y: 0.6 },
              colors: ['#10B981', '#14B8A6'],
            });
          }
          return { ...h, done: !h.done };
        }
        return h;
      })
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Personal Health Goals & Habits</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Personal Wellness Planner
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Evidence-based daily habits, circular progress milestones, and AI lifestyle recommendations.
          </p>
        </div>
      </div>

      {/* Wellness Goals Cards Grid with Circular Progress Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {goals.map((g) => {
          const percentage = Math.min(100, Math.round((g.current / g.target) * 100));
          const circumference = 2 * Math.PI * 36;
          const strokeDashoffset = circumference - (percentage / 100) * circumference;

          return (
            <div
              key={g.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">
                  {g.category}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-base mt-0.5">
                  {g.title}
                </h4>
              </div>

              {/* Circular Progress Ring */}
              <div className="flex items-center justify-center my-2 relative">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="7"
                    className="text-slate-100 dark:text-slate-800"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="36"
                    stroke="#14B8A6"
                    strokeWidth="7"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                    {percentage}%
                  </span>
                  <span className="text-3xs text-slate-400">Complete</span>
                </div>
              </div>

              {/* Progress Count & Increment Controls */}
              <div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 font-mono mb-2">
                  <span>Current: {g.current}</span>
                  <span>Target: {g.target} {g.unit}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onUpdateGoalCurrent(g.id, 1)}
                    className="flex-1 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 text-teal-700 dark:text-teal-300 text-xs font-bold transition-colors cursor-pointer"
                  >
                    + Add 1
                  </button>
                  <button
                    onClick={() => onUpdateGoalCurrent(g.id, -1)}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500 text-xs font-bold transition-colors cursor-pointer"
                  >
                    -
                  </button>
                </div>
              </div>

              {/* AI Coaching Tip */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-2xs text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-200/50 dark:border-slate-700/50 flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>{g.aiTip}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Daily Habits Checklist */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Daily Healthy Habits Checklist
            </h3>
          </div>
          <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
            {habitList.filter((h) => h.done).length} / {habitList.length} Completed
          </span>
        </div>

        <div className="space-y-2.5 pt-2">
          {habitList.map((habit) => (
            <div
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                habit.done
                  ? 'bg-teal-50/40 dark:bg-teal-950/20 border-teal-200/80 dark:border-teal-900 text-slate-900 dark:text-white'
                  : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                    habit.done
                      ? 'bg-teal-600 border-teal-600 text-white'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {habit.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span className={`text-xs font-medium ${habit.done ? 'line-through text-slate-400' : ''}`}>
                  {habit.title}
                </span>
              </div>
              <span className="text-2xs text-teal-600 font-bold">
                {habit.done ? '✓ Done' : 'Tap to Complete'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
