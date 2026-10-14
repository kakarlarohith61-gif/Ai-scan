import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  RotateCcw,
  PlusCircle,
  HelpCircle,
} from 'lucide-react';
import { HeartIllustration } from '../illustrations/MedicalIllustrations';
import { BodyRegion } from '../../types/health';

interface Props {
  onTransferToProblem?: (problemData: {
    name: string;
    category: any;
    bodyPart: BodyRegion;
    symptoms: string[];
    severity: number;
    description: string;
  }) => void;
  onAskAiAboutSymptoms?: (promptText: string) => void;
}

export const SymptomChecker: React.FC<Props> = ({
  onTransferToProblem,
  onAskAiAboutSymptoms,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Wizard State
  const [primarySymptom, setPrimarySymptom] = useState('Tension Headache');
  const [duration, setDuration] = useState('3-7 Days');
  const [severity, setSeverity] = useState(4);
  const [painType, setPainType] = useState('Throbbing / Aching');
  const [associatedSymptoms, setAssociatedSymptoms] = useState<string[]>([
    'Screen fatigue',
    'Neck tightness',
  ]);
  const [hasRedFlags, setHasRedFlags] = useState<boolean>(false);

  const PRIMARY_SYMPTOMS_LIST = [
    { name: 'Tension Headache', category: 'Neurological', bodyPart: 'head' as BodyRegion },
    { name: 'Acid Reflux / Heartburn', category: 'Digestive', bodyPart: 'abdomen' as BodyRegion },
    { name: 'Joint / Knee Ache', category: 'Musculoskeletal', bodyPart: 'legs' as BodyRegion },
    { name: 'Cough & Throat Irritation', category: 'Respiratory', bodyPart: 'chest' as BodyRegion },
    { name: 'Lower Back Muscle Strain', category: 'Musculoskeletal', bodyPart: 'back' as BodyRegion },
    { name: 'Skin Rash or Itchiness', category: 'Skin', bodyPart: 'arms' as BodyRegion },
    { name: 'Mid-Day Fatigue & Sluggishness', category: 'General', bodyPart: 'head' as BodyRegion },
    { name: 'Chest Tightness', category: 'Cardiovascular', bodyPart: 'chest' as BodyRegion },
  ];

  const handleToggleAssociated = (sym: string) => {
    if (associatedSymptoms.includes(sym)) {
      setAssociatedSymptoms(associatedSymptoms.filter((s) => s !== sym));
    } else {
      setAssociatedSymptoms([...associatedSymptoms, sym]);
    }
  };

  const getTriageResult = () => {
    if (hasRedFlags || primarySymptom === 'Chest Tightness') {
      return {
        level: 'Urgent Evaluation Needed',
        color: 'rose',
        badge: 'Emergency / Urgent Care',
        summary:
          'Because of potential red-flag features (such as acute chest tightness or systemic distress), immediate professional evaluation at an urgent care or emergency facility is advised.',
        selfCare: ['Do not exert yourself physically', 'Keep someone notified nearby', 'Seek immediate in-person triage'],
        warningSigns: [
          'Pain radiating into left arm or jaw',
          'Shortness of breath or clammy diaphoresis',
          'Fainting, confusion, or sudden vision loss',
        ],
      };
    }

    if (severity >= 6 || duration === '> 2 Weeks') {
      return {
        level: 'Moderate: Schedule Physician Appointment',
        color: 'amber',
        badge: 'Clinic Visit Recommended',
        summary:
          'Your reported symptoms are moderate in intensity. An outpatient consultation with your primary physician within the next 48 to 72 hours is recommended to prevent chronic recurrence.',
        selfCare: [
          'Hydrate well and maintain a symptom log',
          'Avoid known ergonomic and dietary triggers',
          'Ensure regular sleep timing and gentle stretching',
        ],
        warningSigns: ['Sudden spike in pain score above 7', 'High fever (>101°F)', 'Unexplained motor weakness'],
      };
    }

    return {
      level: 'Low: Safe Supportive Self-Care',
      color: 'emerald',
      badge: 'Home Care Protocol',
      summary:
        'Your symptoms appear mild and stable. Supportive evidence-informed home care, hydration, rest intervals, and posture adjustments are appropriate while monitoring progress.',
      selfCare: [
        'Apply warm or cool compress to affected muscle zones',
        'Follow 20-20-20 screen break protocol',
        'Maintain baseline 2.5L daily hydration',
        'Practice slow diaphragmatic breathing to reduce autonomic tension',
      ],
      warningSigns: [
        'Persistent worsening beyond 10 days',
        'New onset of nocturnal awakening from pain',
      ],
    };
  };

  const triage = getTriageResult();

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            AI Clinical Triage Wizard
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Symptom Checker
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Step-by-step evidence-informed evaluation with safe triage guidance.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`w-8 h-2 rounded-full transition-all ${
                step >= s ? 'bg-teal-500' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Step 1: Select Primary Symptom */}
      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Step 1: What is your primary symptom?
          </h3>
          <p className="text-xs text-slate-500">
            Select the most noticeable health discomfort you are experiencing right now.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {PRIMARY_SYMPTOMS_LIST.map((item) => (
              <div
                key={item.name}
                onClick={() => setPrimarySymptom(item.name)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  primarySymptom === item.name
                    ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-100 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="text-2xs text-slate-400 capitalize">{item.category}</div>
                </div>
                {primarySymptom === item.name && (
                  <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-md shadow-teal-600/20"
            >
              <span>Next: Duration & Severity</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Duration, Severity & Pain Quality */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Step 2: How does it feel and how long has it lasted?
          </h3>

          {/* Duration Selector */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Symptom Duration
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['< 24 Hours', '1-3 Days', '3-7 Days', '> 2 Weeks'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    duration === d
                      ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Pain Character */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Pain / Sensation Quality
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['Throbbing / Aching', 'Sharp / Stabbing', 'Burning / Acidic', 'Dull Heaviness'].map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => setPainType(p)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      painType === p
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Severity Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Current Severity Scale
              </label>
              <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                {severity} / 10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={severity}
              onChange={(e) => setSeverity(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-sm font-semibold cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-md shadow-teal-600/20"
            >
              <span>Next: Accompanying Symptoms</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Associated Symptoms & Red Flags */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Step 3: Associated Symptoms & Safety Screen
          </h3>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Select any accompanying sensations
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'Screen fatigue',
                'Neck tightness',
                'Light sensitivity',
                'Mild nausea',
                'Acid taste in mouth',
                'Difficulty falling asleep',
                'Muscle stiffness',
              ].map((sym) => {
                const isSelected = associatedSymptoms.includes(sym);
                return (
                  <button
                    key={sym}
                    onClick={() => handleToggleAssociated(sym)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {sym}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Red Flag Screen */}
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Emergency Safety Screen</span>
            </div>
            <p className="text-xs text-rose-700 dark:text-rose-300">
              Do you have any of: severe shortness of breath, sudden thunderclap onset, high fever above 102°F, or sudden numbness in face/arms?
            </p>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs font-bold text-rose-900 dark:text-rose-200 cursor-pointer">
                <input
                  type="radio"
                  name="redflag"
                  checked={hasRedFlags}
                  onChange={() => setHasRedFlags(true)}
                  className="accent-rose-600"
                />
                Yes, one or more present
              </label>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="radio"
                  name="redflag"
                  checked={!hasRedFlags}
                  onChange={() => setHasRedFlags(false)}
                  className="accent-teal-600"
                />
                No, none of these are present
              </label>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-sm font-semibold cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-md shadow-teal-600/20"
            >
              <span>Analyze & Generate Triage</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: AI Clinical Triage Results */}
      {step === 4 && (
        <div className="space-y-6 animate-fade-in">
          {/* Urgency Badge Header */}
          <div
            className={`p-5 rounded-2xl border ${
              triage.color === 'rose'
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-900 dark:text-rose-200'
                : triage.color === 'amber'
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-900 dark:text-amber-200'
                : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/70 dark:bg-slate-900/60">
                {triage.badge}
              </span>
              <span className="text-xs font-mono opacity-80">CareVista Clinical Protocol</span>
            </div>
            <h3 className="text-xl font-bold mt-2">{triage.level}</h3>
            <p className="text-sm mt-1 leading-relaxed opacity-95">{triage.summary}</p>
          </div>

          {/* Self-Care & Warning Signs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                Evidence-Based Supportive Steps
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {triage.selfCare.map((sc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                    <span>{sc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                Red Flags: When to Seek Immediate Care
              </div>
              <ul className="space-y-1.5 text-xs text-rose-700 dark:text-rose-300">
                {triage.warningSigns.map((ws, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                    <span>{ws}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs: Save as Health Problem or Ask AI */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => {
                setStep(1);
                setHasRedFlags(false);
              }}
              className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-semibold cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Start New Check</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {onAskAiAboutSymptoms && (
                <button
                  onClick={() =>
                    onAskAiAboutSymptoms(
                      `I just ran a symptom check for ${primarySymptom} (Severity ${severity}/10, duration ${duration}, type: ${painType}). What should I discuss with my doctor?`
                    )
                  }
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-semibold text-xs cursor-pointer transition-colors"
                >
                  💬 Discuss with AI Assistant
                </button>
              )}

              {onTransferToProblem && (
                <button
                  onClick={() => {
                    const matched = PRIMARY_SYMPTOMS_LIST.find((s) => s.name === primarySymptom);
                    onTransferToProblem({
                      name: primarySymptom,
                      category: (matched?.category || 'General') as any,
                      bodyPart: matched?.bodyPart || 'head',
                      symptoms: [painType, ...associatedSymptoms],
                      severity,
                      description: `Reported via Symptom Checker. Duration: ${duration}. Characteristics: ${painType}.`,
                    });
                  }}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-all shadow-md shadow-teal-600/20 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Save to Active Problems</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
