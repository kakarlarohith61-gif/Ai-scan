import React, { useState } from 'react';
import { Appointment } from '../../types/health';
import {
  Calendar,
  Clock,
  User,
  Building,
  CheckSquare,
  Plus,
  Bell,
  CheckCircle2,
  Sparkles,
  MapPin,
  ChevronRight,
  X,
} from 'lucide-react';
import { DoctorAvatarIllustration } from '../illustrations/MedicalIllustrations';

interface Props {
  appointments: Appointment[];
  onAddAppointment: (apt: Appointment) => void;
  onToggleQuestion: (aptId: string, qId: string) => void;
  onAddQuestionToAppointment: (aptId: string, qText: string) => void;
}

export const AppointmentManager: React.FC<Props> = ({
  appointments,
  onAddAppointment,
  onToggleQuestion,
  onAddQuestionToAppointment,
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAptId, setSelectedAptId] = useState<string>(appointments[0]?.id || '');
  const [customQuestionInput, setCustomQuestionInput] = useState('');

  // Form State
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('Cardiology');
  const [clinic, setClinic] = useState('Metropolis Health Pavilion');
  const [dateTime, setDateTime] = useState('2026-10-25T11:00:00');
  const [purpose, setPurpose] = useState('Routine review & consultation');
  const [reminderSet, setReminderSet] = useState(true);

  const selectedAppointment = appointments.find((a) => a.id === selectedAptId) || appointments[0];

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorName.trim()) return;

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      doctorName,
      specialty,
      clinic,
      dateTime,
      purpose,
      status: 'Upcoming',
      reminderSet,
      doctorQuestions: [
        {
          id: `q-${Date.now()}-1`,
          text: `Are there specific lifestyle changes to complement this ${specialty.toLowerCase()} evaluation?`,
          answered: false,
        },
      ],
    };

    onAddAppointment(newApt);
    setSelectedAptId(newApt.id);
    setIsAddModalOpen(false);
    setDoctorName('');
  };

  const handleAddQuestion = () => {
    if (!customQuestionInput.trim() || !selectedAppointment) return;
    onAddQuestionToAppointment(selectedAppointment.id, customQuestionInput.trim());
    setCustomQuestionInput('');
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 text-sm font-semibold uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Clinical Consultations & Preparation</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Appointments & Doctor Prep
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Schedule visits, organize diagnostic talking points, and review post-consultation notes.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-sm transition-all shadow-md shadow-teal-600/20 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Appointment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Appointments List */}
        <div className="lg:col-span-5 space-y-4">
          {appointments.map((apt) => {
            const isSelected = selectedAppointment?.id === apt.id;
            const dateObj = new Date(apt.dateTime);
            const dateStr = dateObj.toLocaleDateString([], {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
            const timeStr = dateObj.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <div
                key={apt.id}
                onClick={() => setSelectedAptId(apt.id)}
                className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-slate-800 border-teal-500 shadow-md ring-2 ring-teal-500/10'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <DoctorAvatarIllustration size={44} />
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-base">
                        {apt.doctorName}
                      </h4>
                      <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold">
                        {apt.specialty}
                      </p>
                    </div>
                  </div>

                  <span className="text-2xs px-2.5 py-0.5 rounded-full font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                    {apt.status}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{dateStr} at {timeStr}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{apt.clinic}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-2xs">
                  <span className="text-slate-400">
                    {apt.doctorQuestions.filter((q) => q.answered).length} of{' '}
                    {apt.doctorQuestions.length} questions prepared
                  </span>
                  <span className="text-teal-600 dark:text-teal-400 font-bold flex items-center gap-1">
                    Prepare Checklist <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Appointment Prep & Doctor Questions Checklist */}
        {selectedAppointment && (
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-6">
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-2xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                  Upcoming Clinical Visit
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {selectedAppointment.doctorName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedAppointment.specialty} • {selectedAppointment.clinic}
                </p>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-semibold">
                <Bell className="w-3.5 h-3.5" />
                <span>Reminder Set</span>
              </div>
            </div>

            {/* Visit Purpose Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <strong>Purpose of Visit:</strong> {selectedAppointment.purpose}
            </div>

            {/* Interactive Doctor Questions Checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    Questions for Your Doctor
                  </h4>
                </div>
                <span className="text-2xs text-slate-400">
                  Tap to check off during consultation
                </span>
              </div>

              {/* Add Custom Question Box */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add another question for the doctor..."
                  value={customQuestionInput}
                  onChange={(e) => setCustomQuestionInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddQuestion();
                    }
                  }}
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs cursor-pointer"
                >
                  Add
                </button>
              </div>

              {/* Questions List */}
              <div className="space-y-2 pt-2">
                {selectedAppointment.doctorQuestions.map((q) => (
                  <div
                    key={q.id}
                    onClick={() => onToggleQuestion(selectedAppointment.id, q.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      q.answered
                        ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                        : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 hover:border-teal-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          q.answered
                            ? 'bg-teal-600 border-teal-600 text-white'
                            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'
                        }`}
                      >
                        {q.answered && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span
                        className={`text-xs ${
                          q.answered ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200 font-medium'
                        }`}
                      >
                        {q.text}
                      </span>
                    </div>

                    <span className="text-2xs text-slate-400 shrink-0">
                      {q.answered ? 'Answered' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Appointment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Schedule Doctor Visit
                </h3>
                <p className="text-xs text-slate-500">
                  Organize doctor notes and configure reminder alerts.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAppointment} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Doctor Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Full Name, MD"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Specialty
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Cardiology, Neurology"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Clinic / Hospital Location
                </label>
                <input
                  type="text"
                  placeholder="Clinic Name or Telehealth Link"
                  value={clinic}
                  onChange={(e) => setClinic(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  Visit Purpose & Chief Complaint
                </label>
                <input
                  type="text"
                  placeholder="e.g. Follow-up for cholesterol & lab results"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none text-slate-900 dark:text-slate-100"
                />
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
                  Save Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
