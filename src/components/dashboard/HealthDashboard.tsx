import React from 'react';
import {
  UserProfile,
  VitalsSnapshot,
  HealthProblem,
  MedicalReport,
  Medication,
  Appointment,
  HealthGoal,
} from '../../types/health';
import {
  HeartPulse,
  Droplets,
  Moon,
  Footprints,
  Calendar,
  AlertCircle,
  FileText,
  Pill,
  Sparkles,
  Plus,
  ArrowRight,
  CheckCircle2,
  Activity,
  ShieldAlert,
  ChevronRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {
  HeartIllustration,
  LungsIllustration,
  BrainIllustration,
  ReportIllustration,
  DoctorAvatarIllustration,
} from '../illustrations/MedicalIllustrations';

interface Props {
  profile: UserProfile;
  vitals: VitalsSnapshot;
  problems: HealthProblem[];
  reports: MedicalReport[];
  medications: Medication[];
  appointments: Appointment[];
  goals: HealthGoal[];
  onNavigateTab: (tab: string) => void;
  onTakeMedication: (med: Medication) => void;
}

export const HealthDashboard: React.FC<Props> = ({
  profile,
  vitals,
  problems,
  reports,
  medications,
  appointments,
  goals,
  onNavigateTab,
  onTakeMedication,
}) => {
  const activeProblems = problems.filter((p) => p.status === 'Active');
  const upcomingAppointment = appointments[0];
  const pendingMed = medications.find((m) => m.statusToday === 'pending');

  return (
    <div className="w-full space-y-8 animate-fade-in">
      {/* Hero Personalized Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-teal-700 to-sky-700 text-white p-6 lg:p-8 shadow-xl shadow-teal-700/15">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-teal-100 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              CareVista AI Health Copilot • Connected
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
              Good morning, {profile.name}!
            </h1>
            <p className="text-sm lg:text-base text-teal-100 leading-relaxed">
              Your resting vitals are optimal today. HDL cholesterol rose by +8% on your verified lab panel, and your 7-day medication streak is holding strong.
            </p>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={() => onNavigateTab('problems')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-teal-800 hover:bg-teal-50 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Health Concern</span>
              </button>
              <button
                onClick={() => onNavigateTab('reports')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800/60 hover:bg-teal-800 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Upload Report</span>
              </button>
              <button
                onClick={() => onNavigateTab('bodyMap')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800/60 hover:bg-teal-800 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
              >
                <span>Interactive Body Map</span>
              </button>
              <button
                onClick={() => onNavigateTab('assistant')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800/60 hover:bg-teal-800 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI Copilot</span>
              </button>
            </div>
          </div>

          {/* Interactive Medical Illustration Cluster */}
          <div className="flex items-center gap-3 shrink-0 self-center md:self-auto">
            <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center">
              <HeartIllustration size={56} />
              <span className="text-2xs font-mono font-bold mt-2 text-rose-200">
                {vitals.heartRate} bpm
              </span>
            </div>
            <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center">
              <LungsIllustration size={56} />
              <span className="text-2xs font-mono font-bold mt-2 text-teal-200">
                {vitals.spo2}% SpO2
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vitals Summary Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Blood Pressure */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Blood Pressure
            </span>
            <span className="text-2xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              Optimal
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              {vitals.bloodPressureSystolic} / {vitals.bloodPressureDiastolic}
            </div>
            <span className="text-2xs text-slate-400">mmHg (AHA Tier 1)</span>
          </div>
          <div className="text-2xs text-emerald-600 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" />
            <span>-4 mmHg vs last month</span>
          </div>
        </div>

        {/* Resting Heart Rate */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Resting Pulse
            </span>
            <span className="text-2xs font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-full">
              Normal
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              {vitals.heartRate} <span className="text-sm font-normal text-slate-400">bpm</span>
            </div>
            <span className="text-2xs text-slate-400">ECG sinus rhythm</span>
          </div>
          <div className="text-2xs text-teal-600 flex items-center gap-1">
            <HeartPulse className="w-3 h-3" />
            <span>Steady variability</span>
          </div>
        </div>

        {/* Blood Glucose */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Fasting Glucose
            </span>
            <span className="text-2xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              Optimal
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              {vitals.bloodGlucose} <span className="text-sm font-normal text-slate-400">mg/dL</span>
            </div>
            <span className="text-2xs text-slate-400">HbA1c 5.3%</span>
          </div>
          <div className="text-2xs text-emerald-600 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Healthy glycemic reserve</span>
          </div>
        </div>

        {/* Oxygen Saturation */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Blood Oxygen
            </span>
            <span className="text-2xs font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-full">
              SpO2 99%
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
              {vitals.spo2}%
            </div>
            <span className="text-2xs text-slate-400">Cellular oxygenation</span>
          </div>
          <div className="text-2xs text-teal-600 flex items-center gap-1">
            <Activity className="w-3 h-3" />
            <span>Optimal room air</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Health Concerns + Medication Reminders + Upcoming Doctor Visit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Active Concerns & Reports */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Health Concerns Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  Active Health Concerns ({activeProblems.length})
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('problems')}
                className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All Concerns</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {activeProblems.map((prob) => (
                <div
                  key={prob.id}
                  onClick={() => onNavigateTab('problems')}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-teal-400 dark:hover:border-teal-500 transition-all cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/60 flex items-center justify-center font-bold text-teal-700 dark:text-teal-300">
                      {prob.affectedBodyPart.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {prob.name}
                      </h4>
                      <div className="text-2xs text-slate-400">
                        {prob.category} • Severity: {prob.severity}/10 ({prob.severityLevel})
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-2xs px-2.5 py-1 rounded-full font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                      {prob.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Medical Reports Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ReportIllustration size={28} />
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                  Recent Medical Lab Reports
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('reports')}
                className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Report Center</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {reports.slice(0, 2).map((rep) => (
                <div
                  key={rep.id}
                  onClick={() => onNavigateTab('reports')}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 hover:border-teal-400 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {rep.name}
                      </h4>
                      <div className="text-2xs text-slate-400">
                        {rep.hospital} • {rep.testDate}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="text-2xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                      {rep.verificationStatus}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateTab('analyzer');
                      }}
                      className="px-3 py-1 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-2xs font-bold hover:bg-teal-100"
                    >
                      AI Summary
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Med Reminders & Doctor Visit */}
        <div className="lg:col-span-4 space-y-6">
          {/* Next Medication Reminder */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-teal-600" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Medication Reminder
                </h4>
              </div>
              <span className="text-2xs font-bold text-teal-600 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded-full">
                Today
              </span>
            </div>

            {pendingMed ? (
              <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/40 space-y-3">
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                    {pendingMed.name}
                  </h5>
                  <p className="text-2xs text-slate-500 mt-0.5">
                    {pendingMed.dosage} • {pendingMed.scheduleTimes[0]}
                  </p>
                </div>
                <button
                  onClick={() => onTakeMedication(pendingMed)}
                  className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Dose Taken</span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-center text-xs text-slate-500">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
                All scheduled doses taken for today!
              </div>
            )}
          </div>

          {/* Upcoming Doctor Visit */}
          {upcomingAppointment && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    Doctor Consultation
                  </h4>
                </div>
                <span className="text-2xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-full">
                  In 5 Days
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 space-y-3">
                <div className="flex items-center gap-3">
                  <DoctorAvatarIllustration size={38} />
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">
                      {upcomingAppointment.doctorName}
                    </h5>
                    <p className="text-2xs text-purple-700 dark:text-purple-300 font-semibold">
                      {upcomingAppointment.specialty}
                    </p>
                  </div>
                </div>

                <div className="text-2xs text-slate-500 dark:text-slate-400">
                  {new Date(upcomingAppointment.dateTime).toLocaleDateString([], {
                    month: 'short',
                    day: 'numeric',
                  })}{' '}
                  • {upcomingAppointment.clinic}
                </div>

                <button
                  onClick={() => onNavigateTab('appointments')}
                  className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Review Doctor Checklist ({upcomingAppointment.doctorQuestions.length} Questions)
                </button>
              </div>
            </div>
          )}

          {/* AI Daily Wellness Insight Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-teal-50 to-sky-50 dark:from-teal-950/30 dark:to-sky-950/30 border border-teal-200/60 dark:border-teal-900/40 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-800 dark:text-teal-300">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Today's CareVista AI Insight</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Hydration is currently at 6 glasses. Reaching 8 glasses before your evening stretch will support cerebral perfusion and alleviate tension headache onset.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
