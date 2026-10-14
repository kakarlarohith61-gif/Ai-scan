import React, { useState } from 'react';
import {
  TrendingUp,
  Activity,
  HeartPulse,
  Droplet,
  Moon,
  Footprints,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { HeartIllustration } from '../illustrations/MedicalIllustrations';

export const HealthAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');
  const [activeMetric, setActiveMetric] = useState<'bp' | 'glucose' | 'cholesterol' | 'sleep'>('bp');

  // Blood Pressure Trajectory Points
  const bpData = [
    { date: 'Sep 15', sys: 124, dia: 82 },
    { date: 'Sep 22', sys: 122, dia: 80 },
    { date: 'Sep 29', sys: 120, dia: 78 },
    { date: 'Oct 06', sys: 119, dia: 77 },
    { date: 'Oct 13', sys: 118, dia: 76 },
  ];

  // Glucose Points
  const glucoseData = [
    { date: 'Sep 15', fasting: 98, post: 132 },
    { date: 'Sep 22', fasting: 96, post: 128 },
    { date: 'Sep 29', fasting: 95, post: 124 },
    { date: 'Oct 06', fasting: 93, post: 122 },
    { date: 'Oct 13', fasting: 92, post: 120 },
  ];

  // Cholesterol (LDL vs HDL)
  const lipidData = [
    { date: 'Apr 2026', ldl: 142, hdl: 52 },
    { date: 'Jun 2026', ldl: 136, hdl: 56 },
    { date: 'Aug 2026', ldl: 124, hdl: 59 },
    { date: 'Oct 2026', ldl: 118, hdl: 62 },
  ];

  // Sleep duration
  const sleepData = [
    { date: 'Oct 08', hours: 7.2 },
    { date: 'Oct 09', hours: 6.8 },
    { date: 'Oct 10', hours: 7.5 },
    { date: 'Oct 11', hours: 6.9 },
    { date: 'Oct 12', hours: 8.0 },
    { date: 'Oct 13', hours: 7.5 },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>Biometric Analytics & Trends</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Health Trends & Analytics
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Visualize longitudinal patterns across blood pressure, glycemic biomarkers, sleep, and lipid balance.
          </p>
        </div>

        {/* Range Buttons */}
        <div className="flex items-center bg-white dark:bg-slate-800 rounded-2xl p-1 border border-slate-200 dark:border-slate-700 shadow-xs self-start sm:self-auto">
          {(['7D', '30D', '90D', '1Y'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                timeRange === r
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveMetric('bp')}
          className={`p-4 rounded-3xl border transition-all cursor-pointer text-left ${
            activeMetric === 'bp'
              ? 'bg-white dark:bg-slate-800 border-teal-500 shadow-md ring-2 ring-teal-500/10'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <HeartPulse className="w-5 h-5 text-rose-500" />
            <span className="text-2xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              -6 mmHg
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">Blood Pressure</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white font-mono mt-0.5">
            118 / 76 <span className="text-xs font-normal text-slate-400">mmHg</span>
          </div>
        </button>

        <button
          onClick={() => setActiveMetric('glucose')}
          className={`p-4 rounded-3xl border transition-all cursor-pointer text-left ${
            activeMetric === 'glucose'
              ? 'bg-white dark:bg-slate-800 border-teal-500 shadow-md ring-2 ring-teal-500/10'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <Droplet className="w-5 h-5 text-sky-500" />
            <span className="text-2xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              Optimal
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">Fasting Glucose</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white font-mono mt-0.5">
            92 <span className="text-xs font-normal text-slate-400">mg/dL</span>
          </div>
        </button>

        <button
          onClick={() => setActiveMetric('cholesterol')}
          className={`p-4 rounded-3xl border transition-all cursor-pointer text-left ${
            activeMetric === 'cholesterol'
              ? 'bg-white dark:bg-slate-800 border-teal-500 shadow-md ring-2 ring-teal-500/10'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <TrendingUp className="w-5 h-5 text-teal-500" />
            <span className="text-2xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              HDL +8%
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">HDL / LDL Ratio</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white font-mono mt-0.5">
            62 / 118 <span className="text-xs font-normal text-slate-400">mg/dL</span>
          </div>
        </button>

        <button
          onClick={() => setActiveMetric('sleep')}
          className={`p-4 rounded-3xl border transition-all cursor-pointer text-left ${
            activeMetric === 'sleep'
              ? 'bg-white dark:bg-slate-800 border-teal-500 shadow-md ring-2 ring-teal-500/10'
              : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <Moon className="w-5 h-5 text-indigo-500" />
            <span className="text-2xs font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-full">
              Avg 7.5h
            </span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">Sleep Consistency</div>
          <div className="text-xl font-bold text-slate-900 dark:text-white font-mono mt-0.5">
            7.5 <span className="text-xs font-normal text-slate-400">Hours</span>
          </div>
        </button>
      </div>

      {/* Main Interactive Chart Canvas */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {activeMetric === 'bp' && 'Blood Pressure Trajectory (Systolic vs Diastolic)'}
              {activeMetric === 'glucose' && 'Glycemic Curve: Fasting & Post-Meal Glucose'}
              {activeMetric === 'cholesterol' && 'Lipid Remodeling: HDL Elevation & LDL Reduction'}
              {activeMetric === 'sleep' && 'Restful Sleep Hours Over Time'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Normal guideline zone shaded in mint green. Values automatically aggregated from verified reports and manual logs.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {activeMetric === 'bp' && (
              <>
                <span className="flex items-center gap-1.5 font-bold text-rose-500">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span> Systolic (Target &lt;120)
                </span>
                <span className="flex items-center gap-1.5 font-bold text-teal-600">
                  <span className="w-3 h-3 rounded-full bg-teal-500"></span> Diastolic (Target &lt;80)
                </span>
              </>
            )}
            {activeMetric === 'cholesterol' && (
              <>
                <span className="flex items-center gap-1.5 font-bold text-emerald-600">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span> HDL ("Good")
                </span>
                <span className="flex items-center gap-1.5 font-bold text-amber-600">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span> LDL ("Bad")
                </span>
              </>
            )}
          </div>
        </div>

        {/* High Precision Responsive SVG Chart Canvas */}
        <div className="h-72 w-full pt-4">
          <svg viewBox="0 0 600 240" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="chartShade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#14B8A6" stop-opacity="0.25" />
                <stop offset="100%" stop-color="#14B8A6" stop-opacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid horizontal guidelines */}
            <line x1="50" y1="40" x2="570" y2="40" stroke="#E2E8F0" strokeDasharray="4 4" />
            <line x1="50" y1="90" x2="570" y2="90" stroke="#E2E8F0" strokeDasharray="4 4" />
            <line x1="50" y1="140" x2="570" y2="140" stroke="#E2E8F0" strokeDasharray="4 4" />
            <line x1="50" y1="190" x2="570" y2="190" stroke="#E2E8F0" strokeDasharray="4 4" />

            {/* Normal reference band */}
            <rect x="50" y="80" width="520" height="70" fill="url(#chartShade)" rx="6" />

            {/* BP Render */}
            {activeMetric === 'bp' && (
              <>
                {/* Systolic Line (Rose) */}
                <polyline
                  fill="none"
                  stroke="#F43F5E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="90,65 200,72 310,80 420,84 530,88"
                />
                {/* Diastolic Line (Teal) */}
                <polyline
                  fill="none"
                  stroke="#14B8A6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="90,145 200,150 310,155 420,158 530,160"
                />

                {/* Data Points */}
                {bpData.map((d, i) => {
                  const x = 90 + i * 110;
                  const ySys = 65 + i * 5.7;
                  const yDia = 145 + i * 3.7;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={ySys} r="5" fill="#F43F5E" />
                      <circle cx={x} cy={yDia} r="5" fill="#14B8A6" />
                      <text x={x} y={ySys - 10} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#F43F5E">
                        {d.sys}
                      </text>
                      <text x={x} y={yDia + 18} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14B8A6">
                        {d.dia}
                      </text>
                      <text x={x} y="215" textAnchor="middle" fontSize="10" fill="#94A3B8">
                        {d.date}
                      </text>
                    </g>
                  );
                })}
              </>
            )}

            {/* Cholesterol Render */}
            {activeMetric === 'cholesterol' && (
              <>
                {/* LDL line decreasing */}
                <polyline
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  points="110,50 240,65 370,95 500,110"
                />
                {/* HDL line increasing */}
                <polyline
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  points="110,165 240,155 370,145 500,135"
                />
                {lipidData.map((d, i) => {
                  const x = 110 + i * 130;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={50 + i * 20} r="5" fill="#F59E0B" />
                      <circle cx={x} cy={165 - i * 10} r="5" fill="#10B981" />
                      <text x={x} y={40 + i * 20} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#F59E0B">
                        LDL {d.ldl}
                      </text>
                      <text x={x} y={185 - i * 10} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#10B981">
                        HDL {d.hdl}
                      </text>
                      <text x={x} y="215" textAnchor="middle" fontSize="10" fill="#94A3B8">
                        {d.date}
                      </text>
                    </g>
                  );
                })}
              </>
            )}

            {/* Glucose Render */}
            {activeMetric === 'glucose' && (
              <>
                <polyline
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  points="90,110 200,115 310,120 420,125 530,128"
                />
                {glucoseData.map((d, i) => {
                  const x = 90 + i * 110;
                  const y = 110 + i * 4.5;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="5" fill="#0284C7" />
                      <text x={x} y={y - 10} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0284C7">
                        {d.fasting} mg/dL
                      </text>
                      <text x={x} y="215" textAnchor="middle" fontSize="10" fill="#94A3B8">
                        {d.date}
                      </text>
                    </g>
                  );
                })}
              </>
            )}

            {/* Sleep Render */}
            {activeMetric === 'sleep' && (
              <>
                {sleepData.map((d, i) => {
                  const x = 80 + i * 85;
                  const barH = d.hours * 18;
                  const y = 190 - barH;
                  return (
                    <g key={i}>
                      <rect x={x - 14} y={y} width="28" height={barH} rx="6" fill="#6366F1" opacity="0.85" />
                      <text x={x} y={y - 8} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6366F1">
                        {d.hours}h
                      </text>
                      <text x={x} y="215" textAnchor="middle" fontSize="10" fill="#94A3B8">
                        {d.date}
                      </text>
                    </g>
                  );
                })}
              </>
            )}
          </svg>
        </div>

        {/* AI Insight banner for current graph */}
        <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-900/60 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <div className="text-xs text-teal-900 dark:text-teal-200 leading-relaxed">
            <strong>CareVista Clinical Observation:</strong> Your blood pressure shows steady downward modulation over the last 30 days (-6 mmHg systolic), perfectly correlating with improved sleep consistency (averaging 7.5 hours) and morning brisk walking sessions.
          </div>
        </div>
      </div>
    </div>
  );
};
