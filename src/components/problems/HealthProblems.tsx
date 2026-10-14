import React, { useState } from 'react';
import { HealthProblem, BodyRegion, ProblemStatus, SeverityLevel } from '../../types/health';
import {
  Plus,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  TrendingDown,
  Trash2,
  Edit3,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  HelpCircle,
  X,
} from 'lucide-react';
import { BrainIllustration, HeartIllustration, LungsIllustration } from '../illustrations/MedicalIllustrations';

interface Props {
  problems: HealthProblem[];
  onAddProblem: (newProblem: HealthProblem) => void;
  onUpdateProblem: (updated: HealthProblem) => void;
  onDeleteProblem: (id: string) => void;
  prefillRegion?: BodyRegion | null;
  prefillName?: string | null;
  onClearPrefill?: () => void;
}

export const HealthProblems: React.FC<Props> = ({
  problems,
  onAddProblem,
  onUpdateProblem,
  onDeleteProblem,
  prefillRegion,
  prefillName,
  onClearPrefill,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(Boolean(prefillRegion || prefillName));
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(problems[0]?.id || null);
  const [filterStatus, setFilterStatus] = useState<'All' | ProblemStatus>('All');
  const [expandedSection, setExpandedSection] = useState<'selfCare' | 'causes' | 'warnings' | 'doctor' | null>('selfCare');

  // Form State
  const [name, setName] = useState(prefillName || '');
  const [category, setCategory] = useState<HealthProblem['category']>('General');
  const [affectedBodyPart, setAffectedBodyPart] = useState<BodyRegion>(prefillRegion || 'head');
  const [symptomsInput, setSymptomsInput] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'Aching sensation',
    'Fatigue',
  ]);
  const [severity, setSeverity] = useState<number>(4);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [frequency, setFrequency] = useState<HealthProblem['frequency']>('Daily');
  const [description, setDescription] = useState('');
  const [existingDiagnosis, setExistingDiagnosis] = useState('');
  const [currentMedication, setCurrentMedication] = useState('');
  const [status, setStatus] = useState<ProblemStatus>('Active');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Daily symptom logger input for active problem
  const [newLogSeverity, setNewLogSeverity] = useState(3);
  const [newLogNote, setNewLogNote] = useState('');

  const activeProblem = problems.find((p) => p.id === selectedProblemId) || problems[0];

  const handleAddSymptomTag = () => {
    if (symptomsInput.trim() && !selectedSymptoms.includes(symptomsInput.trim())) {
      setSelectedSymptoms([...selectedSymptoms, symptomsInput.trim()]);
      setSymptomsInput('');
    }
  };

  const handleRemoveSymptomTag = (tag: string) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s !== tag));
  };

  const calculateSeverityLevel = (val: number): SeverityLevel => {
    if (val <= 3) return 'Mild';
    if (val <= 6) return 'Moderate';
    return 'Severe';
  };

  const handleSubmitProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProblem: HealthProblem = {
      id: `prob-${Date.now()}`,
      name,
      category,
      affectedBodyPart,
      symptoms: selectedSymptoms,
      severity,
      severityLevel: calculateSeverityLevel(severity),
      startDate,
      frequency,
      description: description || 'User-reported health issue.',
      existingDiagnosis: existingDiagnosis || undefined,
      currentMedication: currentMedication || undefined,
      status,
      additionalNotes: additionalNotes || undefined,
      dailyProgress: [
        {
          date: new Date().toISOString().split('T')[0],
          severity,
          note: 'Initial entry logged',
        },
      ],
      aiGuidance: {
        understanding: `This reported concern involves ${category.toLowerCase()} symptoms in the ${affectedBodyPart} region with ${frequency.toLowerCase()} frequency.`,
        selfCare: [
          'Maintain steady hydration and monitor symptom triggers.',
          'Ensure regular rest cycles and avoid strenuous biomechanical strain.',
          'Keep a daily log of onset timing and dietary factors.',
        ],
        possibleCauses: [
          'Postural or mechanical strain in the affected tissue',
          'Environmental stress and irregular sleep routines',
          'Localized inflammatory or neuromuscular response',
        ],
        warningSigns: [
          'Sudden severe exacerbation or unrelenting pain above 7/10',
          'High fever (>101°F) or chills',
          'Numbness, loss of motor control, or rapid swelling',
        ],
        doctorQuestions: [
          `How long should I observe this ${name.toLowerCase()} before specialized clinical imaging?`,
          'Are there specific aggravating lifestyle factors I should eliminate?',
        ],
      },
    };

    onAddProblem(newProblem);
    setSelectedProblemId(newProblem.id);
    setIsAddModalOpen(false);
    if (onClearPrefill) onClearPrefill();
  };

  const handleLogDailyProgress = () => {
    if (!activeProblem) return;
    const updated: HealthProblem = {
      ...activeProblem,
      severity: newLogSeverity,
      severityLevel: calculateSeverityLevel(newLogSeverity),
      dailyProgress: [
        ...activeProblem.dailyProgress,
        {
          date: new Date().toISOString().split('T')[0],
          severity: newLogSeverity,
          note: newLogNote || 'Daily progress logged',
        },
      ],
    };
    onUpdateProblem(updated);
    setNewLogNote('');
  };

  const filteredProblems = problems.filter((p) => {
    if (filterStatus === 'All') return true;
    return p.status === filterStatus;
  });

  return (
    <div className="w-full space-y-6">
      {/* Top Header & New Concern Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
            Personal Health Conditions & Concerns
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            My Health Problems
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Log symptoms, track daily recovery trajectories, and review safe evidence-based AI guidance.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all shadow-md shadow-teal-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Health Problem</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {(['All', 'Active', 'Improving', 'Resolved'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterStatus === st
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {st} ({st === 'All' ? problems.length : problems.filter((p) => p.status === st).length})
          </button>
        ))}
      </div>

      {/* Main Two-Column View: List Cards + Detailed Interactive Problem View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left List Column */}
        <div className="lg:col-span-5 space-y-3">
          {filteredProblems.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200/80 dark:border-slate-700">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <p className="font-semibold text-slate-800 dark:text-slate-200">No issues matching this filter</p>
              <p className="text-xs text-slate-500 mt-1">All clear in this category.</p>
            </div>
          ) : (
            filteredProblems.map((prob) => {
              const isSelected = selectedProblemId === prob.id;
              const severityColor =
                prob.severity >= 7
                  ? 'bg-rose-500'
                  : prob.severity >= 4
                  ? 'bg-amber-500'
                  : 'bg-emerald-500';

              return (
                <div
                  key={prob.id}
                  onClick={() => setSelectedProblemId(prob.id)}
                  className={`p-5 rounded-3xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-white dark:bg-slate-800/95 border-teal-500 dark:border-teal-400 shadow-md ring-2 ring-teal-500/10'
                      : 'bg-white dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center shrink-0">
                        {prob.affectedBodyPart === 'head' && <BrainIllustration size={28} />}
                        {prob.affectedBodyPart === 'chest' && <HeartIllustration size={28} />}
                        {prob.affectedBodyPart === 'abdomen' && <LungsIllustration size={28} />}
                        {!['head', 'chest', 'abdomen'].includes(prob.affectedBodyPart) && (
                          <span className="font-bold text-teal-600 text-sm">
                            {prob.affectedBodyPart.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">
                          {prob.name}
                        </h4>
                        <span className="text-xs text-slate-400 capitalize">
                          {prob.category} • {prob.affectedBodyPart}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-2xs px-2.5 py-0.5 rounded-full font-bold ${
                        prob.status === 'Active'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                          : prob.status === 'Improving'
                          ? 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                      }`}
                    >
                      {prob.status}
                    </span>
                  </div>

                  {/* Severity meter */}
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Severity</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {prob.severity}/10 ({prob.severityLevel})
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2 mt-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${severityColor}`}
                      style={{ width: `${(prob.severity / 10) * 100}%` }}
                    ></div>
                  </div>

                  {/* Symptoms Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {prob.symptoms.slice(0, 3).map((sym, idx) => (
                      <span
                        key={idx}
                        className="text-2xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {sym}
                      </span>
                    ))}
                    {prob.symptoms.length > 3 && (
                      <span className="text-2xs px-1.5 py-0.5 text-slate-400">
                        +{prob.symptoms.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail & AI Guidance View */}
        {activeProblem ? (
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none">
              {/* Header with status toggles */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {activeProblem.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Started: {activeProblem.startDate} • Frequency: {activeProblem.frequency} • Diagnosed: {activeProblem.existingDiagnosis || 'None confirmed'}
                  </p>
                </div>

                {/* Status Switcher & Delete */}
                <div className="flex items-center gap-2">
                  <select
                    value={activeProblem.status}
                    onChange={(e) => {
                      onUpdateProblem({
                        ...activeProblem,
                        status: e.target.value as ProblemStatus,
                      });
                    }}
                    className="text-xs px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold border-none outline-none cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Improving">Improving</option>
                    <option value="Resolved">Resolved</option>
                  </select>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${activeProblem.name}"?`)) {
                        onDeleteProblem(activeProblem.id);
                      }
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
                    title="Delete Problem"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Description & Symptoms */}
              <div className="mt-5 space-y-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeProblem.description}
                </p>

                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Reported Symptoms
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeProblem.symptoms.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl text-xs font-medium bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-200 border border-teal-200/60 dark:border-teal-800"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Daily Progress Timeline Chart */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      Symptom Severity Trajectory
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400">
                    Latest: {activeProblem.severity}/10
                  </span>
                </div>

                {/* Progress Sparkline & Logs */}
                <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
                  <div className="flex items-end gap-3 h-28 pt-2">
                    {activeProblem.dailyProgress.map((dp, idx) => {
                      const barHeight = (dp.severity / 10) * 100;
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                          <span className="text-2xs font-bold text-slate-600 dark:text-slate-300">
                            {dp.severity}
                          </span>
                          <div
                            className={`w-full max-w-[28px] rounded-t-lg transition-all ${
                              dp.severity >= 6
                                ? 'bg-rose-400 dark:bg-rose-500'
                                : dp.severity >= 4
                                ? 'bg-amber-400 dark:bg-amber-500'
                                : 'bg-teal-400 dark:bg-teal-500'
                            }`}
                            style={{ height: `${barHeight}%` }}
                            title={`${dp.date}: ${dp.note}`}
                          ></div>
                          <span className="text-2xs text-slate-400 truncate w-full text-center">
                            {dp.date.slice(5)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Today's Severity Log Form */}
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <span className="text-xs text-slate-500 shrink-0">Log Today:</span>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={newLogSeverity}
                        onChange={(e) => setNewLogSeverity(Number(e.target.value))}
                        className="accent-teal-500 w-28 cursor-pointer"
                      />
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 w-6">
                        {newLogSeverity}/10
                      </span>
                    </div>

                    <input
                      type="text"
                      placeholder="Note (e.g. rested with compress)..."
                      value={newLogNote}
                      onChange={(e) => setNewLogNote(e.target.value)}
                      className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 flex-1 w-full outline-none"
                    />

                    <button
                      onClick={handleLogDailyProgress}
                      className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-all cursor-pointer shrink-0"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>

              {/* Contextual AI Guidance Accordion */}
              {activeProblem.aiGuidance && (
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>CareVista AI Clinical Guidance</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 italic bg-teal-50/50 dark:bg-teal-950/20 p-3 rounded-xl border border-teal-100 dark:border-teal-900/40">
                    "{activeProblem.aiGuidance.understanding}"
                  </p>

                  {/* Accordion Tabs */}
                  {/* Safe Self-Care */}
                  <div className="border border-slate-200/80 dark:border-slate-700 rounded-2xl overflow-hidden">
                    <button
                      onClick={() =>
                        setExpandedSection(expandedSection === 'selfCare' ? null : 'selfCare')
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 flex items-center justify-between text-left text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Evidence-Informed Safe Self-Care</span>
                      </div>
                      {expandedSection === 'selfCare' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedSection === 'selfCare' && (
                      <div className="p-4 bg-white dark:bg-slate-900 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                        {activeProblem.aiGuidance.selfCare.map((sc, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                            <span>{sc}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Possible Causes (framed as possibilities) */}
                  <div className="border border-slate-200/80 dark:border-slate-700 rounded-2xl overflow-hidden">
                    <button
                      onClick={() =>
                        setExpandedSection(expandedSection === 'causes' ? null : 'causes')
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 flex items-center justify-between text-left text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
                        <HelpCircle className="w-4 h-4" />
                        <span>Possible Differential Factors (Not a diagnosis)</span>
                      </div>
                      {expandedSection === 'causes' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedSection === 'causes' && (
                      <div className="p-4 bg-white dark:bg-slate-900 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                        {activeProblem.aiGuidance.possibleCauses.map((pc, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0"></span>
                            <span>{pc}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Warning Signs (Require urgent attention) */}
                  <div className="border border-rose-200 dark:border-rose-900/60 rounded-2xl overflow-hidden">
                    <button
                      onClick={() =>
                        setExpandedSection(expandedSection === 'warnings' ? null : 'warnings')
                      }
                      className="w-full px-4 py-3 bg-rose-50/60 dark:bg-rose-950/40 flex items-center justify-between text-left text-xs font-bold text-rose-800 dark:text-rose-300 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-rose-500" />
                        <span>Warning Signs Requiring Urgent Medical Care</span>
                      </div>
                      {expandedSection === 'warnings' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedSection === 'warnings' && (
                      <div className="p-4 bg-white dark:bg-slate-900 space-y-2 text-xs text-rose-700 dark:text-rose-300">
                        {activeProblem.aiGuidance.warningSigns.map((ws, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                            <span>{ws}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Doctor Questions */}
                  <div className="border border-slate-200/80 dark:border-slate-700 rounded-2xl overflow-hidden">
                    <button
                      onClick={() =>
                        setExpandedSection(expandedSection === 'doctor' ? null : 'doctor')
                      }
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 flex items-center justify-between text-left text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                        <Sparkles className="w-4 h-4" />
                        <span>Suggested Questions for Your Doctor</span>
                      </div>
                      {expandedSection === 'doctor' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    {expandedSection === 'doctor' && (
                      <div className="p-4 bg-white dark:bg-slate-900 space-y-2 text-xs text-slate-700 dark:text-slate-300">
                        {activeProblem.aiGuidance.doctorQuestions.map((dq, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                            <span>{dq}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* Add Health Problem Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Register Health Problem
                </h3>
                <p className="text-xs text-slate-500">
                  Provide detailed information for personalized safe guidance & tracking.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitProblem} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Problem Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tension Headache, Knee Ache"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="General">General</option>
                    <option value="Neurological">Neurological</option>
                    <option value="Respiratory">Respiratory</option>
                    <option value="Digestive">Digestive</option>
                    <option value="Cardiovascular">Cardiovascular</option>
                    <option value="Musculoskeletal">Musculoskeletal</option>
                    <option value="Skin">Skin</option>
                    <option value="ENT">ENT (Ear/Nose/Throat)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Affected Body Region *
                  </label>
                  <select
                    value={affectedBodyPart}
                    onChange={(e) => setAffectedBodyPart(e.target.value as BodyRegion)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 cursor-pointer capitalize"
                  >
                    <option value="head">Head & Neck</option>
                    <option value="neck">Neck & Cervical</option>
                    <option value="chest">Chest, Heart & Lungs</option>
                    <option value="abdomen">Abdomen & Digestive</option>
                    <option value="back">Back & Spine</option>
                    <option value="arms">Arms & Shoulders</option>
                    <option value="hands">Hands & Wrists</option>
                    <option value="pelvis">Pelvis & Hips</option>
                    <option value="legs">Legs & Knees</option>
                    <option value="feet">Feet & Ankles</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Frequency *
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="Occasional">Occasional</option>
                    <option value="Daily">Daily</option>
                    <option value="Continuous">Continuous</option>
                  </select>
                </div>
              </div>

              {/* Symptoms Pills Input */}
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Symptoms (Type & Press Enter or Add)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Throbbing ache, Nausea"
                    value={symptomsInput}
                    onChange={(e) => setSymptomsInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSymptomTag();
                      }
                    }}
                    className="flex-1 px-3.5 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSymptomTag}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs cursor-pointer"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedSymptoms.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs bg-teal-50 dark:bg-teal-950 text-teal-800 dark:text-teal-200 flex items-center gap-1.5"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveSymptomTag(tag)}
                        className="text-teal-500 hover:text-rose-500 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Severity Slider 1-10 */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Severity Level (1 to 10 Scale)
                  </label>
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                    {severity} / 10 ({calculateSeverityLevel(severity)})
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

              {/* Description */}
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Description & Context
                </label>
                <textarea
                  rows={3}
                  placeholder="When does it occur? What makes it better or worse?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500"
                ></textarea>
              </div>

              {/* Optional Clinician Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Existing Confirmed Diagnosis (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Doctor-confirmed diagnosis"
                    value={existingDiagnosis}
                    onChange={(e) => setExistingDiagnosis(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Current Medications (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ibuprofen, Antacids"
                    value={currentMedication}
                    onChange={(e) => setCurrentMedication(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all shadow-md shadow-teal-600/20 cursor-pointer"
                >
                  Save & Generate AI Guidance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
