import React, { useState } from 'react';
import { Medication } from '../../types/health';
import {
  Pill,
  Check,
  X,
  Clock,
  Calendar,
  AlertCircle,
  Plus,
  Sparkles,
  Award,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PillIllustration } from '../illustrations/MedicalIllustrations';

interface Props {
  medications: Medication[];
  onUpdateMedication: (updated: Medication) => void;
  onAddMedication: (newMed: Medication) => void;
}

export const MedicationManager: React.FC<Props> = ({
  medications,
  onUpdateMedication,
  onAddMedication,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Medication Form
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [instructions, setInstructions] = useState('');
  const [frequency, setFrequency] = useState<Medication['frequency']>('Once Daily');
  const [scheduleTime, setScheduleTime] = useState('08:30 AM');
  const [totalPills, setTotalPills] = useState(60);
  const [prescribedBy, setPrescribedBy] = useState('Dr. Jennifer Vance');

  const handleMarkDose = (med: Medication, status: 'taken' | 'skipped' | 'missed') => {
    if (status === 'taken') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10B981', '#14B8A6', '#0284C7'],
      });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const existingHistory = med.history.filter((h) => h.date !== todayStr);

    const updated: Medication = {
      ...med,
      statusToday: status,
      remainingPills: status === 'taken' ? Math.max(0, med.remainingPills - 1) : med.remainingPills,
      history: [...existingHistory, { date: todayStr, status }],
    };

    onUpdateMedication(updated);
  };

  const handleCreateMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name,
      dosage: dosage || '1 Tablet',
      instructions: instructions || 'Take with water after meals',
      frequency,
      scheduleTimes: [scheduleTime],
      startDate: new Date().toISOString().split('T')[0],
      remainingPills: totalPills,
      totalPills,
      prescribedBy: prescribedBy || 'Self-Care Log',
      statusToday: 'pending',
      history: [],
      aiInteractionNote: 'Ensure consistent timing to optimize therapeutic serum concentration.',
    };

    onAddMedication(newMed);
    setIsAddModalOpen(false);
    setName('');
    setDosage('');
    setInstructions('');
  };

  const takenCount = medications.filter((m) => m.statusToday === 'taken').length;
  const adherenceRate = Math.round((takenCount / Math.max(1, medications.length)) * 100);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold uppercase tracking-wider">
            <PillIllustration size={24} />
            <span>Prescription & Supplement Tracker</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            My Medications & Supplements
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Maintain daily dose adherence, monitor pill counts, and check drug-food interaction safety.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all shadow-md shadow-teal-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Medication</span>
        </button>
      </div>

      {/* Daily Progress & Adherence Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-lg shadow-teal-600/15 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-100">
              Today's Adherence
            </span>
            <div className="text-3xl font-extrabold mt-1">
              {takenCount} / {medications.length}
            </div>
            <p className="text-xs text-teal-100 mt-1">
              {takenCount === medications.length ? 'All daily doses complete!' : `${medications.length - takenCount} doses remaining`}
            </p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-lg">
            {adherenceRate}%
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Adherence Streak
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              7 Days
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Flawless 100% weekly record
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Interaction Safety
            </div>
            <div className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              Verified Clean
            </div>
            <p className="text-xs text-sky-600 dark:text-sky-400 font-medium">
              No negative contraindications
            </p>
          </div>
        </div>
      </div>

      {/* Medication Cards List */}
      <div className="space-y-4">
        {medications.map((med) => {
          const isTaken = med.statusToday === 'taken';
          const isSkipped = med.statusToday === 'skipped';
          const pillPercentage = Math.round((med.remainingPills / med.totalPills) * 100);

          return (
            <div
              key={med.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 shrink-0">
                  <Pill className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                      {med.name}
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {med.dosage}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {med.instructions} • Frequency: {med.frequency}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {med.scheduleTimes.join(', ')}
                    </span>
                    <span>Prescribed: {med.prescribedBy}</span>
                  </div>

                  {/* AI Interaction Note */}
                  {med.aiInteractionNote && (
                    <div className="mt-3 p-2.5 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 text-2xs text-teal-800 dark:text-teal-300 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{med.aiInteractionNote}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pill Supply & Dose Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-slate-800">
                {/* Pill count bar */}
                <div className="w-36 space-y-1">
                  <div className="flex justify-between text-2xs text-slate-400 font-semibold">
                    <span>Supply</span>
                    <span className="font-mono text-slate-700 dark:text-slate-200">
                      {med.remainingPills} / {med.totalPills} left
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        pillPercentage > 30 ? 'bg-teal-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${pillPercentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Dose Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMarkDose(med, 'taken')}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isTaken
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>{isTaken ? 'Dose Taken!' : 'Mark Taken'}</span>
                  </button>

                  <button
                    onClick={() => handleMarkDose(med, 'skipped')}
                    className={`p-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      isSkipped
                        ? 'bg-slate-300 text-slate-800'
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                    title="Mark Skipped"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Medication Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Add New Medication
                </h3>
                <p className="text-xs text-slate-500">
                  Track schedule, dosage, and receive adherence reminders.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateMedication} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Medicine Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Atorvastatin, Vitamin B-Complex"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10 mg, 1 Capsule"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100 cursor-pointer"
                  >
                    <option value="Once Daily">Once Daily</option>
                    <option value="Twice Daily">Twice Daily</option>
                    <option value="Three Times Daily">Three Times Daily</option>
                    <option value="As Needed">As Needed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Instructions & Meal Guidelines
                </label>
                <input
                  type="text"
                  placeholder="e.g. Take after dinner with full glass of water"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Schedule Time
                  </label>
                  <input
                    type="text"
                    placeholder="08:30 AM"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Total Pills
                  </label>
                  <input
                    type="number"
                    value={totalPills}
                    onChange={(e) => setTotalPills(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all shadow-md shadow-teal-600/20 cursor-pointer"
                >
                  Save Medication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
